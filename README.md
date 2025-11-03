# 🏨 Travel and Accommodation Booking Platform

A modern, full-featured travel and accommodation booking platform built with React, TypeScript, and a comprehensive tech stack. This application provides seamless hotel search, booking management, and administrative capabilities with a focus on user experience and code quality.

![Application Banner](./docs/images/banner-placeholder.png)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture & Design Patterns](#architecture--design-patterns)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview

This Travel and Accommodation Booking Platform is a comprehensive web application that enables users to search for hotels, view detailed information, make bookings, and manage reservations. The platform includes a robust admin panel for managing cities, hotels, and rooms, making it a complete solution for travel accommodation businesses.

### Key Highlights

- **Modern React Architecture**: Built with React 19 and TypeScript for type safety
- **State Management**: Redux Toolkit with React Query for efficient data fetching
- **Form Handling**: Formik with Yup validation for robust form management
- **UI/UX**: Material-UI components with Tailwind CSS for responsive design
- **Testing**: Comprehensive unit tests with Jest and React Testing Library
- **Code Quality**: ESLint, Prettier, and Storybook for component development

## ✨ Features

### User Features

#### 1. **Authentication**
![Login Page](./docs/images/login-page-placeholder.png)

- Secure login with JWT authentication
- User and Admin role-based access control
- Password validation and error handling

#### 2. **Home Page**
![Home Page](./docs/images/home-page-placeholder.png)

- **Robust Search Functionality**: Central search bar with advanced filters
  - Date range picker (check-in/check-out)
  - Guest configuration (adults, children)
  - Room selection
- **Featured Deals Section**: Curated special offers with discounted pricing
- **Recently Visited Hotels**: Personalized user history
- **Trending Destinations**: Popular city highlights

#### 3. **Search Results**
![Search Results](./docs/images/search-results-placeholder.png)

- Comprehensive filtering system:
  - Price range slider
  - Star rating filter
  - Amenities selection
  - Room type categories
- Infinite scroll pagination
- Real-time search results
- Sort by price, rating, or popularity

#### 4. **Hotel Details**
![Hotel Details](./docs/images/hotel-details-placeholder.png)

- **Visual Gallery**: High-quality images with fullscreen view
- **Detailed Information**: 
  - Hotel description and amenities
  - Star ratings and guest reviews
  - Interactive location map with nearby attractions
- **Room Selection**:
  - Multiple room types with descriptions
  - Real-time availability
  - Add to cart functionality
  - Price comparison

#### 5. **Checkout & Booking**
![Checkout Page](./docs/images/checkout-page-placeholder.png)

- **Secure Payment Processing**:
  - Personal information form
  - Payment method selection
  - Special requests field
- **Confirmation Page**:
  - Booking confirmation number
  - Complete reservation details
  - PDF download and print options

### Admin Features

#### 6. **Admin Dashboard**
![Admin Dashboard](./docs/images/admin-dashboard-placeholder.png)

- **Navigation**: Collapsible sidebar for Cities, Hotels, and Rooms management
- **Search & Filter**: Advanced search functionality for all entities
- **Data Grids**:
  - **Cities**: Name, country, postal code, hotel count, timestamps
  - **Hotels**: Name, rating, owner, room count, timestamps
  - **Rooms**: Number, availability, capacity, timestamps
- **CRUD Operations**:
  - Create new entities with form validation
  - Update existing records with inline editing
  - Delete with confirmation prompts
- **Real-time Updates**: Changes reflected immediately across the platform

## 🛠 Tech Stack

### Frontend Core
- **React** `19.1.1` - UI rendering and component architecture
- **TypeScript** `5.9.3` - Static type checking and enhanced IDE support
- **Vite** - Fast build tool and development server

### State Management
- **Redux Toolkit** `2.9.0` - Global state management
- **React Query** `5.90.2` - Server state management and caching
- **React Redux** `9.2.0` - React bindings for Redux

### Routing & Navigation
- **React Router DOM** `7.9.4` - Client-side routing and navigation

### UI Framework & Styling
- **Material-UI (MUI)** `7.3.4` - Component library
  - `@mui/icons-material` - Icon components
  - `@mui/x-date-pickers` - Date picker components
- **Tailwind CSS** `3.4.17` - Utility-first CSS framework
- **Emotion** - CSS-in-JS styling
- **Class Variance Authority** - Dynamic className generation
- **Lucide React** - Icon library

### Form Management
- **Formik** `2.4.6` - Form state management
- **Yup** `1.7.1` - Schema validation

### Data Fetching & API
- **Axios** `1.12.2` - HTTP client
- **JWT Decode** `4.0.0` - Token decoding

### Utilities
- **date-fns** `4.1.0` - Date manipulation
- **Lodash** `4.17.21` - Utility functions
- **Leaflet** `1.9.4` + **React Leaflet** `5.0.0` - Interactive maps
- **html2canvas** `1.4.1` + **jsPDF** `3.0.3` - PDF generation

### Development Tools
- **Storybook** `10.0.3` - Component development and documentation
  - Accessibility addon
  - Documentation addon
- **Jest** `30.2.0` - Testing framework
- **React Testing Library** `16.3.0` - Component testing utilities
- **ESLint** `9.36.0` - Code linting
- **TypeScript ESLint** - TypeScript-specific linting rules

### Additional Libraries
- **React Error Boundary** - Error handling
- **React Intersection Observer** - Lazy loading and infinite scroll

## 🏗 Architecture & Design Patterns

### Project Architecture

This application follows a **Feature-Driven Architecture** with clear separation of concerns:

```
src/
├── core/           # Core application logic
│   ├── api/        # API configuration and clients
│   ├── constants/  # Global constants
│   ├── context/    # React contexts
│   ├── providers/  # Application providers
│   ├── routes/     # Route definitions and guards
│   ├── store/      # Redux store and slices
│   └── theme/      # Theme configuration
├── features/       # Feature-based modules
│   ├── admin/      # Admin functionality
│   ├── auth/       # Authentication
│   ├── bookings/   # Booking management
│   ├── cart/       # Shopping cart
│   ├── filters/    # Search filters
│   ├── home/       # Home page
│   ├── hotels/     # Hotel details
│   └── search/     # Search functionality
└── shared/         # Shared resources
    ├── components/ # Reusable components
    ├── hooks/      # Custom React hooks
    ├── types/      # TypeScript types
    └── utils/      # Utility functions
```

### Design Patterns

1. **Feature-Slice Design**: Each feature is self-contained with its own:
   - API calls
   - Components
   - Hooks
   - Types
   - Constants

2. **Container/Presenter Pattern**: Separation of business logic from presentation

3. **Custom Hooks**: Reusable logic extraction for:
   - Data fetching
   - Form handling
   - State management

4. **Protected Routes**: Route guards for authentication and authorization

5. **Error Boundaries**: Graceful error handling at component boundaries

### State Management Strategy

- **Redux Toolkit**: Global application state (auth, cart, UI state)
- **React Query**: Server state with automatic caching and refetching
- **Local State**: Component-specific state with useState
- **Context API**: Theme and shared UI preferences

## 📁 Project Structure

```
travel-app-fts/
├── backend/                 # Backend API (Node.js)
│   ├── config/             # Database and environment config
│   ├── controllers/        # Request handlers
│   ├── data/               # Mock data (JSON files)
│   ├── middleware/         # Express middleware
│   ├── models/             # Data models
│   ├── routes/             # API routes
│   └── server.js           # Entry point
├── src/                    # Frontend source code
│   ├── core/               # Core application logic
│   ├── features/           # Feature modules
│   ├── shared/             # Shared resources
│   ├── stories/            # Storybook stories
│   ├── __mocks__/          # Test mocks
│   ├── main.tsx            # Application entry
│   └── setupTests.ts       # Test configuration
├── public/                 # Static assets
├── coverage/               # Test coverage reports
├── docs/                   # Documentation and images
├── .github/                # GitHub configuration
├── eslint.config.js        # ESLint configuration
├── jest.config.ts          # Jest configuration
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── package.json            # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: >= 18.0.0
- **npm** or **yarn**: Latest version
- **Git**: For version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ShadiSbaih/Travel-and-Accommodation-Booking-Platform.git
   cd Travel-and-Accommodation-Booking-Platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:3000/api
   VITE_JWT_SECRET=your-secret-key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Start the backend server** (in a separate terminal)
   ```bash
   cd backend
   node server.js
   ```

The application will be available at `http://localhost:5173`

## 📜 Available Scripts

### Development
```bash
npm run dev          # Start development server with HMR
npm run preview      # Preview production build locally
```

### Building
```bash
npm run build        # Build for production (TypeScript + Vite)
npm run lint         # Run ESLint for code quality checks
```

### Testing
```bash
npm run test         # Run all tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate test coverage report
npm run test:ui      # Run tests with verbose output
```

### Storybook
```bash
npm run storybook           # Start Storybook dev server (port 6006)
npm run build-storybook     # Build Storybook for deployment
```

## 🧪 Testing

### Testing Strategy

This project implements comprehensive testing practices:

#### Unit Testing
- **Framework**: Jest 30.2.0
- **Library**: React Testing Library 16.3.0
- **Coverage Target**: > 80%

#### Test Types
- **Component Tests**: UI component rendering and interactions
- **Hook Tests**: Custom hook behavior
- **Utility Tests**: Helper function logic
- **Integration Tests**: Feature-level workflows

#### Running Tests

```bash
# Run all tests
npm test

# Watch mode for development
npm run test:watch

# Generate coverage report
npm run test:coverage
```

Coverage reports are generated in the `coverage/` directory and include:
- HTML report: `coverage/lcov-report/index.html`
- LCOV format: `coverage/lcov.info`
- JSON format: `coverage/coverage-final.json`

### Code Quality

- **ESLint**: Enforces code style and catches common errors
- **TypeScript**: Provides static type checking
- **Prettier**: Ensures consistent code formatting
- **Storybook**: Documents and tests components in isolation

## 📡 API Documentation

The backend API is documented using Swagger/OpenAPI specification.

### Base URL
```
http://localhost:3000/api
```

### Authentication
```http
POST /auth/login
Content-Type: application/json

{
  "username": "user@example.com",
  "password": "password123"
}
```

### Main Endpoints

#### Search
```http
GET /search?checkInDate=2025-11-10&checkOutDate=2025-11-15&adults=2&children=0&rooms=1
```

#### Hotels
```http
GET /hotels/{hotelId}
GET /hotels/{hotelId}/gallery
GET /hotels/{hotelId}/rooms
GET /hotels/{hotelId}/available_rooms
```

#### Bookings
```http
POST /booking
GET /booking/{bookingId}
```

#### Admin
```http
GET /cities
POST /cities
PUT /cities/{cityId}

GET /hotels
POST /hotels
PUT /hotels/{hotelId}

GET /rooms
POST /rooms
PUT /rooms/{roomId}
```

For complete API documentation, visit the Swagger UI (when available).

## 📸 Screenshots

### User Interface

#### Login Page
![Login Page](./docs/images/login-page-placeholder.png)
*Secure authentication with form validation*

#### Home Page
![Home Page](./docs/images/home-page-placeholder.png)
*Featured deals, trending destinations, and search functionality*

#### Search Results
![Search Results](./docs/images/search-results-placeholder.png)
*Comprehensive filtering and sorting options*

#### Hotel Details
![Hotel Details](./docs/images/hotel-details-placeholder.png)
*Image gallery, amenities, and room selection*

#### Checkout
![Checkout](./docs/images/checkout-placeholder.png)
*Secure payment and booking confirmation*

### Admin Panel

#### Admin Dashboard
![Admin Dashboard](./docs/images/admin-dashboard-placeholder.png)
*Comprehensive management interface*

#### City Management
![City Management](./docs/images/admin-cities-placeholder.png)
*CRUD operations for cities*

#### Hotel Management
![Hotel Management](./docs/images/admin-hotels-placeholder.png)
*Hotel inventory management*

#### Room Management
![Room Management](./docs/images/admin-rooms-placeholder.png)
*Room availability and configuration*

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Standards

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👥 Team

**Developer**: Shadi Sbaih  
**Repository**: [Travel-and-Accommodation-Booking-Platform](https://github.com/ShadiSbaih/Travel-and-Accommodation-Booking-Platform)

---

## 🙏 Acknowledgments

- Material-UI for the excellent component library
- React Query team for the powerful data fetching solution
- Redux Toolkit for simplified state management
- The React and TypeScript communities

---

**Built with ❤️ using React, TypeScript, and modern web technologies**
