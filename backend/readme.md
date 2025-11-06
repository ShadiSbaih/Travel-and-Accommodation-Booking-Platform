# Backend Server

## Overview
This is the backend server for the Travel and Accommodation Booking Platform. It provides RESTful APIs for managing hotels, rooms, cities, bookings, and user authentication.

## Prerequisites
- **Node.js**: >= 18.0.0
- **npm**: Latest version

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Server

To start the backend server, run:

```bash
node server.js
```

The server will start on `http://localhost:5000`

## API Documentation

**Swagger Documentation**: The API documentation is available at `http://localhost:5000/api-docs/` when the server is running.

## Important Notes

⚠️ **The backend server must be running before starting the frontend application.**

The frontend application depends on this backend server for all data operations. Make sure to:
1. Start the backend server first (`node server.js`)
2. Wait for the server to be fully running (you should see a success message in the terminal)
3. Then start the frontend application in a separate terminal

## Available Endpoints

- Authentication endpoints
- Hotels management
- Rooms management
- Cities management
- Bookings management
- Search functionality

For detailed endpoint documentation, visit the Swagger documentation at `http://localhost:5000/api-docs/` once the server is running.
