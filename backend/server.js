const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
// const bodyParser = require("body-parser");
const app = express();
const PORT = 5000;

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
// Swagger Setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hotel API",
      version: "1.0.0",
      description: "A simple Express API to manage hotels and bookings",
    },
  },
  apis: ["./server.js"], // Adjust if your routes are in a different file
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ============================================
// HELPER FUNCTIONS FOR FILE OPERATIONS
// ============================================

const readJsonFile = (fileName) => {
  const filePath = path.join(__dirname, "data", fileName);
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
};

const writeJsonFile = (fileName, data) => {
  const filePath = path.join(__dirname, "data", fileName);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
};

// For backward compatibility
const getJsonData = (fileName) => {
  return readJsonFile(fileName);
};

const deleteJsonData = (fileName, key, value) => {
  const data = readJsonFile(fileName);
  const filteredData = data.filter(item => item[key] !== Number(value));
  writeJsonFile(fileName, filteredData);
  return filteredData;
};

const writeJsonData = (fileName, newData, uniqueKey = "id") => {
  const data = readJsonFile(fileName);
  const index = data.findIndex(item => item[uniqueKey] === newData[uniqueKey]);
  
  if (index !== -1) {
    // Update existing
    data[index] = { ...data[index], ...newData };
  } else {
    // Add new
    data.push(newData);
  }
  
  writeJsonFile(fileName, data);
  return data;
};

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// ============================================
// CRON JOB - KEEP-ALIVE (every 14 minutes)
// Sends a GET request to keep free hosting services awake.
// Configure target URL via API_URL env var.
// ============================================
const cron = require("node-cron");
const https = require("https");

// Health check endpoint for the cron job
app.get("/api/status", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

const API_URL = process.env.API_URL || `http://localhost:${PORT}`;

const job = cron.schedule("*/14 * * * *", function () {
  https
    .get(API_URL + "/api/status", (res) => {
      if (res.statusCode === 200) {
        console.log("[CRON] GET request sent successfully at", new Date().toISOString());
      } else {
        console.log("[CRON] GET request failed", res.statusCode);
      }
    })
    .on("error", (e) => {
      console.error("[CRON] Error while sending request", e.message);
    });
});

job.start();

app.post("/api/auth/authenticate", (req, res) => {
  if (req.body.userName == "user" && req.body.password == "user") {
    res.json({
      authentication:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMiIsImdpdmVuX25hbWUiOiJNYXplbiIsImZhbWlseV9uYW1lIjoiU2FtaSIsInVzZXJUeXBlIjoiVXNlciIsIm5iZiI6MTczMjExNTQyMCwiZXhwIjoxNzMyMTE5MDIwLCJpc3MiOiJodHRwczovL2FwcC1ob3RlbC1yZXNlcnZhdGlvbi13ZWJhcGktdWFlLWRldi0wMDEuYXp1cmV3ZWJzaXRlcy5uZXQifQ.SosxseAWXFuoNqSkeeurjet6FiqEX-4Mheo4o1DbCYc",
      userType: "User",
    });
  } else if (req.body.userName == "admin" && req.body.password == "admin") {
    res.json({
      authentication:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMSIsImdpdmVuX25hbWUiOiJNb2hhbWFkIiwiZmFtaWx5X25hbWUiOiJNaWxoZW0iLCJ1c2VyVHlwZSI6IkFkbWluIiwibmJmIjoxNzMyNjQ4ODU5LCJleHAiOjE3MzI2NTI0NTksImlzcyI6Imh0dHBzOi8vYXBwLWhvdGVsLXJlc2VydmF0aW9uLXdlYmFwaS11YWUtZGV2LTAwMS5henVyZXdlYnNpdGVzLm5ldCJ9.IJ-ekmzr0FF1oNSrjDwElMZhoyc42H7nFq-3bWKuG8Q",
      userType: "Admin",
    });
  } else {
    res.status(401).json({ message: "Invalid user or password" });
  }
});

app.get("/api/home/users/2/recent-hotels", (req, res) => {
  res.json(getJsonData("recentHotels.json"));
});

app.get("/api/home/featured-deals", (req, res) => {
  res.json(getJsonData("featuredDeals.json"));
});

app.get("/api/home/destinations/trending", (req, res) => {
  res.json(getJsonData("trending.json"));
});

app.get("/api/hotels", (req, res) => {
  const hotels = getJsonData("hotels.json");
  const totalHotels = hotels.length;
  const { searchQuery = "", pageNumber = 1, pageSize = 5 } = req.query;
  let filteredHotels = hotels;
  if (searchQuery) {
    filteredHotels = filteredHotels.filter(
      (hotel) =>
        (hotel.hotelName &&
          hotel.hotelName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (hotel.name &&
          hotel.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        hotel.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + parseInt(pageSize);
  filteredHotels = filteredHotels.map((hotel) => {
    return {
      ...hotel,
      name: hotel.hotelName || hotel.name,
    };
  });
  const paginatedHotels = filteredHotels.slice(startIndex, endIndex);
  res.json(paginatedHotels);
});

app.get("/api/hotels/:id/gallery", (req, res) => {
  res.json(getJsonData("gallery.json"));
});

app.get("/api/hotels/:id", (req, res) => {
  res.json(getJsonData("hotelId.json"));
});

app.get("/api/hotels/:id/available-rooms", (req, res) => {
  res.json(getJsonData("availableRooms.json"));
});

app.get("/api/hotels/:id/reviews", (req, res) => {
  res.json(getJsonData("reviews.json"));
});

app.post("/api/bookings", (req, res) => {
  res.json(getJsonData("reviews.json"));
});

app.get("/api/bookings/:id", (req, res) => {
  res.json(getJsonData("bookings.json"));
});

app.get("/api/home/search", async (req, res) => {
  const { city, checkInDate, checkOutDate, adults, children, numberOfRooms } =
    req.query;
  const rooms = getJsonData("searchResults.json");
  let filteredResults = rooms;
  
  // If no city is provided, return a diverse set of popular hotels
  if (!city) {
    // Get unique cities and select varied results
    const uniqueCities = [...new Set(rooms.map(r => r.cityName))];
    const defaultResults = [];
    
    // Get at least one hotel from each city, up to 10 total
    for (const cityName of uniqueCities) {
      if (defaultResults.length >= 10) break;
      const cityHotels = rooms.filter(r => r.cityName === cityName);
      defaultResults.push(cityHotels[0]); // Take first hotel from each city
    }
    
    filteredResults = defaultResults;
  } else {
    filteredResults = filteredResults.filter((room) =>
      room.cityName.toLowerCase().includes(city.toLowerCase())
    );
  }

  if (adults) {
    filteredResults = filteredResults.filter((room) => {
      return room.numberOfAdults >= adults;
    });
  }

  if (children) {
    filteredResults = filteredResults.filter(
      (room) => room.numberOfChildren >= children
    );
  }

  if (numberOfRooms) {
    filteredResults = filteredResults.filter(
      (room) => room.numberOfRooms >= numberOfRooms
    );
  }

  res.json(filteredResults);
});

app.get("/api/search-results/amenities", (req, res) => {
  res.json(getJsonData("amenities.json"));
});

// ============================================
// CITIES CRUD ENDPOINTS
// ============================================

app.get("/api/cities", (req, res) => {
  res.json(readJsonFile("cities.json"));
});

app.post("/api/cities", (req, res) => {
  const cities = readJsonFile("cities.json");
  const maxId = cities.length > 0 ? Math.max(...cities.map(c => c.id)) : 0;
  
  const newCity = {
    id: maxId + 1,
    ...req.body,
  };
  
  cities.push(newCity);
  writeJsonFile("cities.json", cities);
  res.json(cities);
});

app.put("/api/cities/:id", (req, res) => {
  const cities = readJsonFile("cities.json");
  const cityId = Number(req.params.id);
  const index = cities.findIndex(c => c.id === cityId);
  
  if (index === -1) {
    return res.status(404).json({ error: "City not found" });
  }
  
  cities[index] = {
    ...cities[index],
    ...req.body,
    id: cityId,
  };
  
  writeJsonFile("cities.json", cities);
  res.json(cities);
});

app.delete("/api/cities/:id", (req, res) => {
  const cities = readJsonFile("cities.json");
  const cityId = Number(req.params.id);
  const filteredCities = cities.filter(c => c.id !== cityId);
  
  if (filteredCities.length === cities.length) {
    return res.status(404).json({ error: "City not found" });
  }
  
  writeJsonFile("cities.json", filteredCities);
  res.json(filteredCities);
});

// ============================================
// HOTELS CRUD ENDPOINTS
// ============================================

app.post("/api/hotels", (req, res) => {
  const hotels = readJsonFile("hotels.json");
  const maxId = hotels.length > 0 ? Math.max(...hotels.map(h => h.id)) : 0;
  
  const newHotel = {
    id: maxId + 1,
    ...req.body,
  };
  
  hotels.push(newHotel);
  writeJsonFile("hotels.json", hotels);
  res.json(hotels);
});

app.put("/api/hotels/:id", (req, res) => {
  const hotels = readJsonFile("hotels.json");
  const hotelId = Number(req.params.id);
  const index = hotels.findIndex(h => h.id === hotelId);
  
  if (index === -1) {
    return res.status(404).json({ error: "Hotel not found" });
  }
  
  hotels[index] = {
    ...hotels[index],
    ...req.body,
    id: hotelId,
  };
  
  writeJsonFile("hotels.json", hotels);
  res.json(hotels);
});

app.delete("/api/hotels/:id", (req, res) => {
  const hotels = readJsonFile("hotels.json");
  const hotelId = Number(req.params.id);
  const filteredHotels = hotels.filter(h => h.id !== hotelId);
  
  if (filteredHotels.length === hotels.length) {
    return res.status(404).json({ error: "Hotel not found" });
  }
  
  writeJsonFile("hotels.json", filteredHotels);
  res.json(filteredHotels);
});

// ============================================
// ROOMS CRUD ENDPOINTS
// ============================================

// GET all rooms from hotel endpoint (frontend uses this)
app.get("/api/hotels/:id/rooms", (req, res) => {
  const rooms = readJsonFile("rooms.json");
  res.json(rooms);
});

// GET all rooms
app.get("/api/rooms", (req, res) => {
  const rooms = readJsonFile("rooms.json");
  const { searchQuery } = req.query;
  
  if (searchQuery) {
    const filtered = rooms.filter(
      (room) =>
        room.roomType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(room.roomNumber).includes(searchQuery)
    );
    return res.json(filtered);
  }
  
  res.json(rooms);
});

// GET room by ID
app.get("/api/rooms/:id", (req, res) => {
  const rooms = readJsonFile("rooms.json");
  const room = rooms.find(r => r.roomId === Number(req.params.id));
  
  if (!room) {
    return res.status(404).json({ error: "Room not found" });
  }
  
  res.json(room);
});

// POST - Create new room
app.post("/api/rooms", (req, res) => {
  console.log('➕ [CREATE ROOM] Starting...');
  const rooms = readJsonFile("rooms.json");
  console.log('📊 [CREATE ROOM] Current rooms count:', rooms.length);
  
  const maxId = rooms.length > 0 ? Math.max(...rooms.map(r => r.roomId)) : 0;
  console.log('🔢 [CREATE ROOM] Max existing ID:', maxId);
  
  const newRoom = {
    roomId: maxId + 1,
    ...req.body,
  };
  console.log('✅ [CREATE ROOM] New room to add:', newRoom);
  
  rooms.push(newRoom);
  console.log('📊 [CREATE ROOM] Rooms count after push:', rooms.length);
  
  writeJsonFile("rooms.json", rooms);
  console.log('💾 [CREATE ROOM] File written successfully');
  
  // Verify the write
  const verifyRooms = readJsonFile("rooms.json");
  console.log('✅ [CREATE ROOM] Verified count:', verifyRooms.length);
  
  res.json(verifyRooms);
});

// PUT - Update room
app.put("/api/rooms/:id", (req, res) => {
  const rooms = readJsonFile("rooms.json");
  const roomId = Number(req.params.id);
  const index = rooms.findIndex(r => r.roomId === roomId);
  
  if (index === -1) {
    return res.status(404).json({ error: "Room not found" });
  }
  
  // Update the room, preserving roomId
  rooms[index] = {
    ...rooms[index],
    ...req.body,
    roomId: roomId, // Ensure roomId doesn't change
  };
  
  writeJsonFile("rooms.json", rooms);
  res.json(rooms);
});

// DELETE - Delete room
app.delete("/api/rooms/:id", (req, res) => {
  const rooms = readJsonFile("rooms.json");
  const roomId = Number(req.params.id);
  const filteredRooms = rooms.filter(room => room.roomId !== roomId);
  
  if (filteredRooms.length === rooms.length) {
    return res.status(404).json({ error: "Room not found" });
  }
  
  writeJsonFile("rooms.json", filteredRooms);
  res.json(filteredRooms);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`[CRON] Keep-alive job scheduled every 14 minutes targeting ${API_URL}/api/status`);
});

/**
 * @swagger
 * /api/auth/authenticate:
 *   post:
 *     summary: Authenticate a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful authentication
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 authentication:
 *                   type: string
 *                 userType:
 *                   type: string
 *       401:
 *         description: Invalid user or password
 */

/**
 * @swagger
 * /api/home/users/{userId}/recent-hotels:
 *   get:
 *     summary: Get recent hotels for a user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of recent hotels
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

/**
 * @swagger
 * /api/home/featured-deals:
 *   get:
 *     summary: Get featured hotel deals
 *     responses:
 *       200:
 *         description: List of featured hotel deals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

/**
 * @swagger
 * /api/home/destinations/trending:
 *   get:
 *     summary: Get trending destinations
 *     responses:
 *       200:
 *         description: List of trending destinations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

/**
 * @swagger
 * /api/hotels:
 *   get:
 *     summary: Get a list of hotels
 *     parameters:
 *       - in: query
 *         name: searchQuery
 *         required: false
 *         schema:
 *           type: string
 *         description: Search query for filtering hotels
 *       - in: query
 *         name: pageNumber
 *         required: false
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: pageSize
 *         required: false
 *         schema:
 *           type: integer
 *         description: Number of hotels per page
 *     responses:
 *       200:
 *         description: List of hotels
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

/**
 * @swagger
 * /api/hotels/{id}/gallery:
 *   get:
 *     summary: Get hotel gallery by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Hotel ID
 *     responses:
 *       200:
 *         description: Hotel gallery
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

/**
 * @swagger
 * /api/hotels/{id}:
 *   get:
 *     summary: Get hotel details by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Hotel ID
 *     responses:
 *       200:
 *         description: Hotel details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */

/**
 * @swagger
 * /api/hotels/{id}/available-rooms:
 *   get:
 *     summary: Get available rooms for a hotel by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Hotel ID
 *     responses:
 *       200:
 *         description: List of available rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

/**
 * @swagger
 * /api/hotels/{id}/reviews:
 *   get:
 *     summary: Get hotel reviews by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Hotel ID
 *     responses:
 *       200:
 *         description: List of hotel reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Create a booking
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hotelId:
 *                 type: integer
 *               roomId:
 *                 type: integer
 *               userId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Booking confirmation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */

/**
 * @swagger
 * /api/bookings/{id}:
 *   get:
 *     summary: Get booking details by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */

/**
 * @swagger
 * /api/home/search:
 *   get:
 *     summary: Search for rooms
 *     parameters:
 *       - in: query
 *         name: city
 *         required: false
 *         schema:
 *           type: string
 *         description: City for search filter
 *       - in: query
 *         name: checkInDate
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         description: Check-in date
 *       - in: query
 *         name: checkOutDate
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         description: Check-out date
 *       - in: query
 *         name: adults
 *         required: false
 *         schema:
 *           type: integer
 *         description: Number of adults
 *       - in: query
 *         name: children
 *         required: false
 *         schema:
 *           type: integer
 *         description: Number of children
 *       - in: query
 *         name: numberOfRooms
 *         required: false
 *         schema:
 *           type: integer
 *         description: Number of rooms
 *     responses:
 *       200:
 *         description: Search results
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

/**
 * @swagger
 * /api/search-results/amenities:
 *   get:
 *     summary: Get list of available amenities
 *     responses:
 *       200:
 *         description: List of amenities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

/**
 * @swagger
 * /api/cities:
 *   get:
 *     summary: Get list of cities
 *     responses:
 *       200:
 *         description: List of cities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

/**
 * @swagger
 * /api/hotels/{id}/rooms:
 *   get:
 *     summary: Get rooms available in a hotel by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Hotel ID
 *     responses:
 *       200:
 *         description: List of rooms in a hotel
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

/**
 * @swagger
 * /api/cities/{id}:
 *   put:
 *     summary: Update a city by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: City ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: City updated
 */

/**
 * @swagger
 * /api/cities/{id}:
 *   delete:
 *     summary: Delete a city by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: City ID
 *     responses:
 *       200:
 *         description: City deleted
 */

/**
 * @swagger
 * /api/cities:
 *   post:
 *     summary: Create a new city
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: City created
 */

/**
 * @swagger
 * /api/hotels/{id}:
 *   put:
 *     summary: Update a hotel by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Hotel ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Hotel updated
 */

/**
 * @swagger
 * /api/hotels/{id}:
 *   delete:
 *     summary: Delete a hotel by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Hotel ID
 *     responses:
 *       200:
 *         description: Hotel deleted
 */

/**
 * @swagger
 * /api/hotels:
 *   post:
 *     summary: Create a new hotel
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Hotel created
 */

/**
 * @swagger
 * /api/rooms/{id}:
 *   put:
 *     summary: Update a room by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Room ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Room updated
 */

/**
 * @swagger
 * /api/rooms/{id}:
 *   delete:
 *     summary: Delete a room by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Room ID
 *     responses:
 *       200:
 *         description: Room deleted
 */

/**
 * @swagger
 * /api/rooms:
 *   post:
 *     summary: Create a new room
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Room created
 */
