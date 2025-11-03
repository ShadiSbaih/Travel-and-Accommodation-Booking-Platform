# 🏨 Travel and Accommodation Booking Platform

A modern, full-featured travel and accommodation booking platform built with React, TypeScript, and a comprehensive tech stack. This application provides seamless hotel search, booking management, and administrative capabilities with a focus on user experience and code quality.



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
<img width="1919" height="922" alt="image" src="https://github.com/user-attachments/assets/065be7d4-42fb-4625-aa48-75273dab62a7" />


- Secure login with JWT authentication
- User and Admin role-based access control
- Password validation and error handling

#### 2. **Home Page**
<img width="1915" height="928" alt="image" src="https://github.com/user-attachments/assets/329442ef-e045-48d5-a842-551dfe4d9639" />
<img width="1903" height="935" alt="image" src="https://github.com/user-attachments/assets/75d5027c-3a1b-4bfb-9c9c-7cbabe8ea44d" />
<img width="1911" height="921" alt="image" src="https://github.com/user-attachments/assets/235d2e09-cd5c-4737-bea2-3501bb2c1a1d" />



- **Robust Search Functionality**: Central search bar with advanced filters
  - Date range picker (check-in/check-out)
  - Guest configuration (adults, children)
  - Room selection
- **Featured Deals Section**: Curated special offers with discounted pricing
- **Recently Visited Hotels**: Personalized user history
- **Trending Destinations**: Popular city highlights

#### 3. **Search Results**

<img width="1908" height="924" alt="image" src="https://github.com/user-attachments/assets/66f0d4ea-93ea-40eb-86ee-280489c8afd9" />
<img width="1903" height="927" alt="image" src="https://github.com/user-attachments/assets/45c5fb6d-7153-4a3b-9d3a-e765851dc7df" />



- Comprehensive filtering system:
  - Amenities selection
- Infinite scroll pagination
- Real-time search results
- Sort by price, rating, or popularity

#### 4. **Hotel Details**
<img width="1903" height="929" alt="image" src="https://github.com/user-attachments/assets/60799027-6ad2-47d0-86fe-f66131a7f0fc" />
<img width="1907" height="926" alt="image" src="https://github.com/user-attachments/assets/41419306-3900-4c01-a748-b98999cb5e61" />
<img width="1909" height="858" alt="image" src="https://github.com/user-attachments/assets/52aa8fe5-3693-42c1-bbb6-962fbb439443" />




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
<img width="1904" height="929" alt="image" src="https://github.com/user-attachments/assets/3e3ad2d8-311f-4ead-a6cc-0dd78cdfa009" />
<img width="1918" height="915" alt="image" src="https://github.com/user-attachments/assets/4e7f6a97-ba6c-4935-915d-e3e7a38463bd" />
<img width="1919" height="918" alt="image" src="https://github.com/user-attachments/assets/f73bc0b0-23fb-4099-8c42-075d65497259" />
<img width="1913" height="912" alt="image" src="https://github.com/user-attachments/assets/3ef927b0-1d9d-4835-a9c1-5da4afe243d3" />
<img width="1905" height="935" alt="image" src="https://github.com/user-attachments/assets/c3fb8871-962f-4b81-ac5a-3292eb15696b" />
<img width="1906" height="921" alt="image" src="https://github.com/user-attachments/assets/a0683377-0e8a-4bf4-ba97-f16571002deb" />



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
<img width="1909" height="930" alt="image" src="https://github.com/user-attachments/assets/b5041c67-cb27-41bf-ba05-ca5f41d9e45a" />
<img width="1905" height="925" alt="image" src="https://github.com/user-attachments/assets/43beb6bc-5310-47ea-aae3-f82c4dc2e5ab" />
<img width="1902" height="932" alt="image" src="https://github.com/user-attachments/assets/f207758c-449d-4600-8858-86231c3879ad" />
<img width="1919" height="929" alt="image" src="https://github.com/user-attachments/assets/5edc9532-de23-4a31-b792-f7a93720be4a" />
<img width="1919" height="913" alt="image" src="https://github.com/user-attachments/assets/00b07fdb-8854-42d3-a9a4-20be92c5dbaa" />
<img width="1919" height="928" alt="image" src="https://github.com/user-attachments/assets/2baa6b03-2a65-4a46-903e-c3b33bd193ce" />


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

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Start the backend server** (in a separate terminal)
   ```bash
   cd backend
   node server.js
   ```

The application will be available at `http://localhost:5173`

##  Available Scripts

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

##  Testing

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



### Code Standards

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting



---

##  Developer

**Developer**: Shadi Sbaih  
**Repository**: [Travel-and-Accommodation-Booking-Platform](https://github.com/ShadiSbaih/Travel-and-Accommodation-Booking-Platform)

---

##  Acknowledgments

- Material-UI for the excellent component library
- React Query team for the powerful data fetching solution
- Redux Toolkit for simplified state management
- The React and TypeScript communities

---


