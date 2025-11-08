#  Travel and Accommodation Booking Platform

A modern, full-featured travel and accommodation booking platform built with React, TypeScript, and a comprehensive tech stack. This application provides seamless hotel search, booking management, and administrative capabilities with a focus on user experience and code quality.



##  Table of Contents

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

##  Overview

This Travel and Accommodation Booking Platform is a comprehensive web application that enables users to search for hotels, view detailed information, make bookings, and manage reservations. The platform includes a robust admin panel for managing cities, hotels, and rooms, making it a complete solution for travel accommodation businesses.

### Key Highlights

- **Modern React Architecture**: Built with React 19 and TypeScript for type safety
- **State Management**: Redux Toolkit with React Query for efficient data fetching
- **Form Handling**: Formik with Yup validation for robust form management
- **UI/UX**: Material-UI components with Tailwind CSS for responsive design
- **Testing**: Comprehensive unit tests with Jest and React Testing Library
- **Code Quality**: ESLint, Prettier, and Storybook for component development

##  Features

### User Features

#### 1. **Authentication & Authorization**
<img width="1919" height="922" alt="image" src="https://github.com/user-attachments/assets/065be7d4-42fb-4625-aa48-75273dab62a7" />

- **Secure JWT Authentication**: Token-based authentication system
- **Role-Based Access Control (RBAC)**:
  - **User Role**: Access to search, booking, and user features
  - **Admin Role**: Full access to admin dashboard and management features
- **Protected Routes**: Route guards prevent unauthorized access
- **Form Validation**: Client-side validation with Formik and Yup
- **Error Handling**: Clear error messages for invalid credentials
- **Persistent Sessions**: JWT tokens stored securely
- **Auto-redirect**: Users and admins redirected to appropriate dashboards after login

#### 2. **Home Page**
<img width="1915" height="928" alt="image" src="https://github.com/user-attachments/assets/329442ef-e045-48d5-a842-551dfe4d9639" />
<img width="1903" height="935" alt="image" src="https://github.com/user-attachments/assets/75d5027c-3a1b-4bfb-9c9c-7cbabe8ea44d" />
<img width="1907" height="933" alt="image" src="https://github.com/user-attachments/assets/ea2b8bda-89ce-4568-9e86-cfac5f70d8b0" />
<img width="1906" height="924" alt="image" src="https://github.com/user-attachments/assets/4e250df8-e9fb-493f-bb54-c32dcef3e300" />
<img width="1902" height="926" alt="image" src="https://github.com/user-attachments/assets/03ff8c00-5bc8-4db1-a7c0-5f40be97a855" />

##### **Hero Section with Advanced Search**
- **Intelligent Search Bar**:
  - City/destination text input with real-time suggestions
  - **Date Range Picker**: Check-in and check-out date selection with calendar UI
  - **Guest Configuration**: Separate controls for adults and children counts
  - **Room Selection**: Number of rooms needed
  - URL parameter persistence for shareable search links
  - Input validation and error handling
  - Keyboard shortcuts (Enter to search)

##### **Featured Deals Section**
- **Curated Special Offers**: Hand-picked deals with significant discounts
- **Deal Cards Display**:
  - High-quality hotel images with lazy loading
  - Original price with strikethrough
  - Discounted price prominently displayed
  - Discount percentage badge
  - Star ratings and location information
  - Quick "View Details" action
- **Responsive Grid Layout**: Adapts to different screen sizes
- **Skeleton Loading States**: Smooth loading experience

##### **Recently Visited Hotels**
- **Personalized User History**: Shows hotels previously viewed by the logged-in user
- **Smart Caching**: Fast load times using React Query
- **Empty State Handling**: Friendly message when no history exists
- **Quick Navigation**: One-click return to previously viewed hotels

##### **Trending Destinations**
- **Popular Cities Showcase**: Highlights most sought-after destinations
- **Destination Cards**:
  - Beautiful city images
  - City name and country
  - Brief description
  - Number of available hotels
- **Interactive Cards**: Hover effects and click-through to city hotels
- **Auto-updated**: Reflects current booking trends

#### 3. **Search Results & Filtering**

<img width="1904" height="929" alt="image" src="https://github.com/user-attachments/assets/f25dc263-bd8f-4f6b-898a-720f321a5841" />
<img width="1908" height="929" alt="image" src="https://github.com/user-attachments/assets/378c5e5a-b7f9-4ad2-81e6-7daac3ec7be5" />
<img width="1907" height="926" alt="image" src="https://github.com/user-attachments/assets/6e347d58-e218-49fc-a238-84597ecb2a2e" />
<img width="1903" height="927" alt="image" src="https://github.com/user-attachments/assets/a7517886-8d18-490a-bf3f-e4f5047ea0e6" />

##### **Smart Search System**
- **Query Parameter Persistence**: Search criteria maintained in URL for sharing
- **Default Results**: Shows diverse hotels when no specific search is provided
- **Real-time Results**: Instant updates as search parameters change
- **Search Query Display**: Shows active search criteria at the top

##### **Advanced Filtering System**
- **Amenities Filter**:
  - Comprehensive list of hotel amenities (Pool, Gym, Spa, WiFi, Parking, etc.)
  - **Filter Modes**:
    - **ANY Mode**: Hotels with at least one selected amenity
    - **ALL Mode**: Hotels with all selected amenities
  - Visual checkboxes with icons
  - Selected count badge
  - Clear all filters option
  - Filter persistence across navigation
  - Loading states and error handling

##### **Hotel Results Display**
- **Interactive Hotel Cards**:
  - High-resolution images with optimized loading
  - Hotel name, location, and star rating
  - Brief description excerpt
  - Starting price per night
  - "View Details" button
  - Responsive card layout
- **Search Results Counter**: Total number of matching hotels
- **Empty State**: Helpful message when no results found
- **Error Handling**: Retry mechanism for failed searches
- **Skeleton Loaders**: Smooth loading experience

##### **Performance Optimizations**
- **React Query Caching**: 5-minute cache for faster subsequent searches
- **Debounced Search**: Prevents excessive API calls during typing
- **Lazy Image Loading**: Images load as they enter viewport
- **Abort Controller**: Cancels outdated search requests when new search starts

#### 4. **Hotel Details Page**
<img width="1906" height="928" alt="image" src="https://github.com/user-attachments/assets/ae47dce7-df0d-4e82-9e05-00b059f5642f" />
<img width="1902" height="926" alt="image" src="https://github.com/user-attachments/assets/c90d41b4-1639-4942-bbd9-e157d8ecb999" />
<img width="1907" height="926" alt="image" src="https://github.com/user-attachments/assets/d4a6288b-9add-44d7-aaed-30b661f3561c" />
<img width="1903" height="924" alt="image" src="https://github.com/user-attachments/assets/4bdb208f-3f8d-4a13-8a6a-bd8593b356b8" />


##### **Hotel Information**
- **Visual Gallery**:
  - High-quality image carousel/slider
  - Thumbnail navigation
  - Full-screen image viewer
  - Multiple images per hotel
  - Touch/swipe gestures support
  - Lazy loading for performance

- **Hotel Overview**:
  - Hotel name and star rating
  - Complete address with city and country
  - Detailed description
  - Check-in/check-out times
  - Contact information
  - Amenities list with icons

##### **Guest Reviews Section**
- **Review Display**:
  - Customer name and review date
  - Star rating (1-5 stars)
  - Review text/comments
  - Review slider/carousel for multiple reviews
  - Average rating calculation
  - Total number of reviews

##### **Interactive Map**
- **Location Visualization**:
  - Integrated Leaflet map showing hotel location
  - Interactive markers
  - Zoom controls
  - Map dragging and panning
  - Responsive map sizing

##### **Available Rooms**
- **Room Cards Display**:
  - Room type (Single, Double, Suite, etc.)
  - Room capacity (adults and children)
  - Price per night
  - Room amenities and features
  - Availability status
  - "Add to Cart" button for available rooms
- **Room Management**:
  - Real-time availability checking
  - Multiple rooms can be added to cart
  - Visual feedback on cart actions
  - Price calculations

##### **Page Features**
- **Breadcrumb Navigation**: Easy navigation back to search results
- **Loading States**: Skeleton loaders for smooth UX
- **Error Handling**: Retry mechanism for failed data loads
- **Responsive Design**: Adapts to all screen sizes
- **Back to Search**: Quick return to search results with filters preserved

#### 5. **Shopping Cart & Checkout**
<img width="1906" height="924" alt="image" src="https://github.com/user-attachments/assets/970d9d7e-6666-46a6-af5d-78f04d77e000" />
<img width="1914" height="916" alt="image" src="https://github.com/user-attachments/assets/e462ea47-8280-4165-a7aa-599cdaad335b" />
<img width="1917" height="919" alt="image" src="https://github.com/user-attachments/assets/976ddae7-cc30-41cc-9f19-32028026caa4" />
<img width="1906" height="925" alt="image" src="https://github.com/user-attachments/assets/bede508f-cf15-4e8d-baf7-2ac4c3704e38" />
<img width="1902" height="929" alt="image" src="https://github.com/user-attachments/assets/d3d137f8-c24d-47a6-ba13-684def43b584" />
<img width="1904" height="928" alt="image" src="https://github.com/user-attachments/assets/306c3b5f-fbc4-406f-bcaa-bcd363d6aaf3" />
<img width="1902" height="921" alt="image" src="https://github.com/user-attachments/assets/ba0bdd0b-19b0-4bd0-b348-2c74c149b8cb" />
<img width="1859" height="936" alt="image" src="https://github.com/user-attachments/assets/0239f529-2ffd-41bb-abfd-fee3f99dcb65" />


##### **Shopping Cart System**
- **Redux State Management**: Global cart state accessible throughout the app
- **Cart Icon**: Displays item count badge in navbar
- **Cart Items Display**:
  - Hotel name and location
  - Room type and number
  - Check-in/check-out dates
  - Number of guests (adults/children)
  - Price per night
  - Room amenities list
  - Individual item removal
- **Cart Actions**:
  - Remove individual items with confirmation
  - Clear entire cart option
  - Continue shopping button
- **Empty Cart State**: Friendly message with "Browse Hotels" call-to-action

##### **Checkout Page**
- **Customer Information Form** (Formik + Yup validation):
  - Full name (required)
  - Email address (required, email validation)
  - Phone number (optional)
  - Special requests/notes (optional)
  - Real-time validation feedback
  - Error messages for invalid inputs

- **Payment Method Selection**:
  - Credit Card option
  - PayPal option
  - Radio button selection
  - Payment method required validation

- **Order Summary Section**:
  - Cart items review
  - Subtotal calculation
  - Service fees
  - Taxes calculation
  - **Total Price** prominently displayed
  - Item count

- **Booking Confirmation**:
  - Form validation before submission
  - Loading state during booking process
  - Success notification on completion

##### **Confirmation Page**
- **Booking Receipt**:
  - Unique confirmation/booking number
  - Customer details summary
  - Hotel and room information
  - Check-in/check-out dates
  - Guest information
  - Payment method used
  - Total amount paid
  - Booking date/timestamp

- **Receipt Actions**:
  - **Download as PDF**: Uses html2canvas + jsPDF to generate downloadable receipt
  - **Print Receipt**: Browser print functionality
  - Return to home button

- **Success Messaging**: Clear confirmation of successful booking

### Admin Features

#### 6. **Admin Dashboard**
<img width="1908" height="925" alt="image" src="https://github.com/user-attachments/assets/3b951d5d-344b-41ab-85ca-ac46bfc6ad28" />
<img width="1888" height="919" alt="image" src="https://github.com/user-attachments/assets/46bc9e82-858c-4fd7-ae87-2746ac8a2f34" />
<img width="1907" height="935" alt="image" src="https://github.com/user-attachments/assets/536c58d2-55c2-44dc-ac20-2e1073c58377" />
<img width="1919" height="936" alt="image" src="https://github.com/user-attachments/assets/e7b3d4e9-fd6c-4570-9d0b-87e7735aabb6" />
<img width="1919" height="920" alt="image" src="https://github.com/user-attachments/assets/82e2e283-5a43-4e7b-b456-49dae0e88a9a" />
<img width="1916" height="917" alt="image" src="https://github.com/user-attachments/assets/14b0ef0e-1203-4e5a-9bd7-52a2240ee262" />
<img width="1919" height="923" alt="image" src="https://github.com/user-attachments/assets/5952e774-9fc6-4e77-a17a-452a686cbe0e" />
<img width="1900" height="922" alt="image" src="https://github.com/user-attachments/assets/ce2fe0d0-8ce0-4dd6-a583-7c4d51f59e5d" />
<img width="1913" height="925" alt="image" src="https://github.com/user-attachments/assets/db8550f9-0655-45b4-a057-f74a815a0aeb" />


##### **Admin Layout & Navigation**
- **Collapsible Sidebar**:
  - Cities Management
  - Hotels Management
  - Rooms Management
  - Visual active state indicators
  - Responsive drawer for mobile
  - Persistent state across sessions

- **Admin Search Bar**:
  - Global search across all entity types
  - Real-time search results
  - Debounced input for performance
  - Clear search button

##### **Cities Management**
- **Cities Data Table**:
  - **Columns**:
    - City ID
    - City Name
    - Country
    - Postal Code
    - Number of Hotels
    - Created Date
    - Updated Date
  - Actions column (Edit/Delete)
  - Pagination support
  - Search/filter by city name
  
- **CRUD Operations**:
  - **Create City**:
    - Dialog form with validation
    - Fields: Name, Country, Postal Code, Description
    - Formik form handling
    - Success/error notifications
  - **Update City**:
    - Pre-populated edit form
    - Inline editing or dialog modal
    - Field validation
  - **Delete City**:
    - Confirmation dialog
    - Prevents deletion if city has hotels
    - Success notification

##### **Hotels Management**
- **Hotels Data Table**:
  - **Columns**:
    - Hotel ID
    - Hotel Name
    - Star Rating (1-5 stars)
    - Owner/Manager
    - City/Location
    - Number of Rooms
    - Created Date
    - Updated Date
  - Actions column (Edit/Delete)
  - Pagination
  - Search functionality
  
- **CRUD Operations**:
  - **Create Hotel**:
    - Comprehensive form with multiple fields
    - Hotel name, description, star rating
    - City selection dropdown
    - Address and contact details
    - Amenities selection
    - Image upload capability
    - Form validation (Formik + Yup)
  - **Update Hotel**:
    - Edit existing hotel details
    - Update amenities and features
    - Change city assignment
  - **Delete Hotel**:
    - Confirmation required
    - Cascade checks for rooms
    - Permanent deletion

##### **Rooms Management**
- **Rooms Data Table**:
  - **Columns**:
    - Room ID
    - Room Number
    - Room Type (Single, Double, Suite, etc.)
    - Hotel Name
    - Capacity (Adults/Children)
    - Price per Night
    - Availability Status
    - Created Date
    - Updated Date
  - Actions column (Edit/Delete)
  - Filter by hotel
  - Search by room number
  
- **CRUD Operations**:
  - **Create Room**:
    - Room number/identifier
    - Hotel selection
    - Room type selection
    - Capacity configuration
    - Price setting
    - Amenities assignment
    - Availability toggle
    - Validation rules
  - **Update Room**:
    - Modify room details
    - Update pricing
    - Change availability
    - Edit amenities
  - **Delete Room**:
    - Confirmation dialog
    - Check for active bookings
    - Remove from availability

##### **Admin Features**
- **Real-time Updates**: Changes reflected immediately across the platform
- **Data Validation**: Client-side and server-side validation
- **Error Handling**: Comprehensive error messages and retry mechanisms
- **Loading States**: Skeleton loaders and progress indicators
- **Success Notifications**: Toast notifications for all actions
- **Responsive Design**: Works on all device sizes
- **Confirmation Dialogs**: Prevent accidental deletions
- **Search & Filter**: Quick find functionality for all entities
- **Pagination**: Handle large datasets efficiently

### Additional Features

#### 7. **User Experience Enhancements**

##### **Theme Customization**
- **Dark/Light Mode Toggle**:
  - Persistent theme preference (localStorage)
  - Smooth transitions between themes
  - Custom MUI theme implementation
  - Theme context provider
  - Icon toggle button in navbar

##### **Network Status Monitoring**
- **Online/Offline Detection**:
  - Real-time network status monitoring
  - Toast notifications when connection changes
  - "You're online" success notification (green)
  - "You're offline" error notification (red)
  - Automatic detection of browser network state

##### **Error Handling**
- **Error Boundaries**:
  - Graceful error catching at component level
  - User-friendly error messages
  - Retry mechanisms
  - Error details in development mode
  - Navigate back to safety buttons

- **Error States**:
  - Network error handling
  - 404 Not Found page
  - API error notifications
  - Form validation errors
  - Empty states with helpful messages

##### **Loading States**
- **Skeleton Loaders**:
  - Hotel card skeletons
  - Search results skeletons
  - Admin table skeletons
  - Image loading placeholders
  - Smooth shimmer animations

- **Page Loaders**:
  - Route transition loaders
  - Lazy-loaded component fallbacks
  - Full-page loading indicators

##### **Performance Optimizations**
- **Code Splitting**: Lazy loading with React.lazy()
- **Image Optimization**:
  - Lazy loading images (Intersection Observer)
  - Responsive image sizing
  - Fallback images on error
  - Progressive loading
  - Optimized Image component
- **Request Cancellation**:
  - AbortController for search API
  - Cancel outdated requests
  - Prevent race conditions
- **Caching Strategy**:
  - React Query caching (5 min stale time)
  - Local storage for preferences
  - Redux persist for cart state

##### **Responsive Design**
- **Mobile-First Approach**:
  - Breakpoints for all screen sizes
  - Touch-friendly interfaces
  - Mobile navigation drawer
  - Responsive grids and layouts
  - Adaptive typography

##### **Accessibility**
- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Visible focus indicators
- **Semantic HTML**: Proper HTML5 structure
- **Alt Text**: Descriptive image alt attributes

##### **Form Enhancements**
- **Real-time Validation**: Instant feedback on input
- **Error Messages**: Clear, actionable error descriptions
- **Auto-focus**: Smart focus management
- **Date Pickers**: Material-UI date pickers with calendar UI
- **Debounced Inputs**: Prevent excessive API calls

##### **Navigation**
- **Breadcrumbs**: Clear navigation path
- **Protected Routes**: Authentication-based routing
- **Redirects**: Smart redirects after login/logout
- **Browser History**: Proper back/forward support
- **Shareable URLs**: Search parameters in URL

##  Tech Stack

### Frontend Core
- **React** `19.1.1` - Modern UI library with latest features
- **TypeScript** `5.9.3` - Static type checking for enhanced reliability
- **Vite** `6.2.1` - Lightning-fast build tool and HMR dev server

### State Management
- **Redux Toolkit** `2.9.0` - Simplified Redux with less boilerplate
  - Cart state management
  - Filter state management
  - Notification system
  - Admin UI state
- **React Query (TanStack Query)** `5.90.2` - Powerful server state management
  - Automatic caching and refetching
  - Request deduplication
  - Background updates
  - Optimistic updates
- **React Redux** `9.2.0` - Official React bindings for Redux

### Routing & Navigation
- **React Router DOM** `7.9.4` - Declarative routing for React
  - Protected routes
  - Lazy loading
  - URL parameter handling
  - Navigation guards

### UI Framework & Component Library
- **Material-UI (MUI)** `7.3.4` - Comprehensive React component library
  - `@mui/material` - Core components (Buttons, Cards, Dialogs, etc.)
  - `@mui/icons-material` - 2000+ Material Design icons
  - `@mui/x-date-pickers` - Advanced date/time pickers
  - Custom theme configuration
  - Responsive design system
- **Tailwind CSS** `3.4.17` - Utility-first CSS framework
  - Custom color palette
  - Responsive utilities
  - Dark mode support
- **Emotion** `11.14.0` - CSS-in-JS library
  - Styled components
  - Dynamic styling
- **Class Variance Authority (CVA)** `0.7.1` - Type-safe variant classes
- **clsx** `2.1.1` - Utility for constructing className strings
- **Lucide React** `0.468.0` - Beautiful consistent icon library

### Form Management & Validation
- **Formik** `2.4.6` - Form state management and handling
  - Field-level validation
  - Form submission handling
  - Error management
  - Touch state tracking
- **Yup** `1.7.1` - Object schema validation
  - Type-safe validation schemas
  - Custom validation rules
  - Async validation support

### Data Fetching & API Communication
- **Axios** `1.12.2` - Promise-based HTTP client
  - Request/response interceptors
  - Request cancellation (AbortController)
  - Automatic JSON transformation
  - Error handling
- **JWT Decode** `4.0.0` - Decode JWT tokens for auth

### Utilities & Helpers
- **date-fns** `4.1.0` - Modern JavaScript date utility library
  - Date formatting
  - Date calculations
  - Timezone support
- **Lodash** `4.17.21` - Utility functions library
  - Debouncing
  - Deep cloning
  - Array/object manipulation
- **Leaflet** `1.9.4` - Interactive maps library
- **React Leaflet** `5.0.0` - React components for Leaflet maps
- **html2canvas** `1.4.1` - Screenshot HTML to canvas
- **jsPDF** `3.0.3` - PDF generation in browser

### Development & Build Tools
- **Vite** - Build tool with features:
  - Hot Module Replacement (HMR)
  - Fast cold starts
  - Optimized builds
  - CSS code splitting
- **TypeScript** - Type system providing:
  - IntelliSense support
  - Compile-time error detection
  - Better refactoring
  - Interface definitions

### Testing Framework
- **Jest** `30.2.0` - JavaScript testing framework
  - Unit testing
  - Integration testing
  - Snapshot testing
  - Code coverage reports
- **React Testing Library** `16.3.0` - React component testing
  - User-centric testing approach
  - Query utilities
  - Async utilities
  - Accessibility testing
- **@testing-library/jest-dom** `6.6.3` - Custom Jest matchers
- **@testing-library/user-event** `14.6.1` - User interaction simulation
- **jest-environment-jsdom** `30.2.0` - DOM testing environment

### Code Quality & Linting
- **ESLint** `9.36.0` - Pluggable linting utility
  - Code quality enforcement
  - Best practices checking
  - Custom rules configuration
- **TypeScript ESLint** `8.24.0` - TypeScript-specific linting
- **eslint-plugin-react-hooks** `5.1.0` - React Hooks linting rules
- **eslint-plugin-react-refresh** `0.4.17` - React Fast Refresh linting
- **eslint-plugin-storybook** `0.12.1` - Storybook linting rules

### Component Development
- **Storybook** `10.0.3` - UI component development environment
  - Component isolation
  - Interactive documentation
  - Visual testing
  - Accessibility checks
- **Storybook Addons**:
  - `@storybook/addon-essentials` - Essential Storybook addons
  - `@storybook/addon-interactions` - Interaction testing
  - `@storybook/addon-links` - Component linking
  - `@storybook/addon-a11y` - Accessibility testing

### Additional Libraries
- **React Error Boundary** `4.1.2` - Error boundary component
- **React Intersection Observer** `9.14.0` - Intersection Observer hook
  - Lazy loading
  - Infinite scroll
  - Viewport detection
- **PostCSS** `8.5.1` - CSS transformation tool
- **Autoprefixer** `10.4.20` - Automatic vendor prefixing

### Backend (Node.js/Express)
- **Express** - Web application framework
- **CORS** - Cross-Origin Resource Sharing
- **Morgan** - HTTP request logger
- **Swagger UI Express** - API documentation
- **Swagger JSDoc** - Generate OpenAPI documentation

### Package Manager
- **npm** - Node package manager for dependency management

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

##  Project Structure

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

##  Getting Started

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

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

### Running the Application

⚠️ **IMPORTANT**: You must start the backend server BEFORE starting the frontend application.

#### Step 1: Start the Backend Server (Required First!)

Open a terminal and run:

```bash
cd backend
node server.js
```

The backend server will start on `http://localhost:5000`

**Wait for the server to display a success message** before proceeding to the next step.

#### Step 2: Start the Frontend Application

Open a **NEW/SEPARATE terminal** and run:

```bash
npm run dev
```

The frontend application will be available at `http://localhost:5173`

### Quick Start Summary

```bash
# Terminal 1 - Backend (Start this FIRST)
cd backend
node server.js

# Terminal 2 - Frontend (Start this AFTER backend is running)
npm run dev
```

### API Documentation

Once the backend server is running, you can access the Swagger API documentation at:
`http://localhost:5000/api-docs/`

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

The backend provides a RESTful API with Swagger documentation available at `http://localhost:5000/api-docs/`

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Login
```http
POST /auth/authenticate
Content-Type: application/json

Request Body:
{
  "userName": "user",      // or "admin"
  "password": "user"       // or "admin"
}

Response:
{
  "authentication": "eyJhbGci...",  // JWT token
  "userType": "User"                // or "Admin"
}
```

**Test Credentials:**
- **User**: username: `user`, password: `user`
- **Admin**: username: `admin`, password: `admin`

### Home Page Endpoints

#### Get Featured Deals
```http
GET /home/featured-deals

Response: Array of featured hotel deals with discounts
```

#### Get Trending Destinations
```http
GET /home/destinations/trending

Response: Array of popular destination cities
```

#### Get Recently Visited Hotels
```http
GET /home/users/{userId}/recent-hotels

Response: Array of recently viewed hotels for the user
```

### Search Endpoints

#### Search Hotels
```http
GET /home/search?city={city}&checkInDate={date}&checkOutDate={date}&adults={number}&children={number}&numberOfRooms={number}

Query Parameters:
- city (optional): City name to search in
- checkInDate (optional): Check-in date (YYYY-MM-DD)
- checkOutDate (optional): Check-out date (YYYY-MM-DD)
- adults (optional): Number of adults
- children (optional): Number of children
- numberOfRooms (optional): Number of rooms needed

Response: Array of matching hotels/rooms

Note: If no city is provided, returns diverse default results
```

### Hotel Endpoints

#### Get All Hotels (Paginated)
```http
GET /hotels?searchQuery={query}&pageNumber={number}&pageSize={number}

Query Parameters:
- searchQuery (optional): Search term for hotel name/description
- pageNumber (default: 1): Page number for pagination
- pageSize (default: 5): Number of results per page

Response: Array of hotels with pagination
```

#### Get Hotel Details
```http
GET /hotels/{hotelId}

Response: Detailed hotel information including:
- Hotel name, description, star rating
- Address and location
- Amenities list
- Check-in/check-out times
```

#### Get Hotel Gallery
```http
GET /hotels/{hotelId}/gallery

Response: Array of hotel image URLs
```

#### Get Hotel Reviews
```http
GET /hotels/{hotelId}/reviews

Response: Array of customer reviews with:
- Reviewer name
- Rating (1-5 stars)
- Review text
- Review date
```

#### Get Available Rooms
```http
GET /hotels/{hotelId}/available-rooms

Response: Array of available rooms with:
- Room type and number
- Capacity (adults/children)
- Price per night
- Amenities
- Availability status
```

### Booking Endpoints

#### Create Booking
```http
POST /bookings
Content-Type: application/json

Request Body:
{
  "customerName": "John Doe",
  "hotelName": "Grand Hotel",
  "roomType": "Deluxe Suite",
  "checkInDate": "2025-12-01",
  "checkOutDate": "2025-12-05",
  "totalPrice": 500,
  "paymentMethod": "Credit Card"
}

Response: Booking confirmation with booking ID
```

#### Get Booking Details
```http
GET /bookings/{bookingId}

Response: Complete booking information
```

### Admin - Cities Endpoints

#### Get All Cities
```http
GET /cities?searchQuery={query}&pageNumber={number}&pageSize={number}

Query Parameters:
- searchQuery (optional): Search cities by name
- pageNumber (default: 1): Page number
- pageSize (default: 10): Results per page

Response: Array of cities with hotel counts
```

#### Create City
```http
POST /cities
Content-Type: application/json

Request Body:
{
  "name": "New York",
  "country": "USA",
  "postalCode": "10001",
  "description": "The Big Apple"
}

Response: Created city object with ID
```

#### Update City
```http
PUT /cities/{cityId}
Content-Type: application/json

Request Body: Same as Create City
Response: Updated city object
```

#### Delete City
```http
DELETE /cities/{cityId}

Response: Success message
```

### Admin - Hotels Endpoints

#### Create Hotel
```http
POST /hotels
Content-Type: application/json

Request Body:
{
  "hotelName": "Luxury Resort",
  "cityId": 1,
  "description": "5-star luxury resort",
  "starRating": 5,
  "amenities": ["Pool", "Gym", "Spa"],
  "address": "123 Main St",
  // ... other hotel details
}

Response: Created hotel object
```

#### Update Hotel
```http
PUT /hotels/{hotelId}
Content-Type: application/json

Response: Updated hotel object
```

#### Delete Hotel
```http
DELETE /hotels/{hotelId}

Response: Success message
```

### Admin - Rooms Endpoints

#### Get All Rooms
```http
GET /rooms?searchQuery={query}&pageNumber={number}&pageSize={number}

Response: Array of rooms with hotel information
```

#### Create Room
```http
POST /rooms
Content-Type: application/json

Request Body:
{
  "roomNumber": "101",
  "roomType": "Deluxe",
  "hotelId": 1,
  "price": 150,
  "capacityAdults": 2,
  "capacityChildren": 1,
  "availability": true
}

Response: Created room object
```

#### Update Room
```http
PUT /rooms/{roomId}
Content-Type: application/json

Response: Updated room object
```

#### Delete Room
```http
DELETE /rooms/{roomId}

Response: Success message
```

### Amenities Endpoint

#### Get All Amenities
```http
GET /amenities

Response: Array of available amenities
[
  { "id": 1, "name": "Wi-Fi", "description": "Free WiFi" },
  { "id": 2, "name": "Pool", "description": "Swimming Pool" },
  // ... more amenities
]
```

### Error Responses

All endpoints return standard HTTP status codes:
- `200 OK` - Successful request
- `201 Created` - Resource successfully created
- `400 Bad Request` - Invalid request parameters
- `401 Unauthorized` - Authentication required
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

Error Response Format:
```json
{
  "message": "Error description",
  "error": "Detailed error information"
}
```

### API Documentation UI

For interactive API documentation and testing, visit:
```
http://localhost:5000/api-docs/
```

This provides a Swagger UI interface with:
- All available endpoints
- Request/response schemas
- Try-it-out functionality
- Example requests and responses



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


