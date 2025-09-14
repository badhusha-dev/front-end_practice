# E-commerce React Application

A modern, full-featured e-commerce application built with React, Vite, and Tailwind CSS. This application includes authentication, product management, shopping cart, checkout flow, and an admin dashboard.

## Features

### 🔐 Authentication & Security
- Login and registration pages
- JWT-based authentication (mock with MirageJS)
- Protected routes with role-based access
- Admin and user roles

### 🛍️ Product & Order Management
- Product listing with search and filtering
- Product detail pages with image galleries
- Shopping cart with persistent storage
- Complete checkout flow
- Order management system

### 💳 Payments
- Stripe integration (test mode)
- Secure checkout process
- Order confirmation and tracking

### 🎨 UI/UX
- Responsive design with Tailwind CSS
- Modern and clean interface
- Toast notifications
- Loading states and error handling
- Smooth animations and transitions

### 👨‍💼 Admin Dashboard
- Role-based access control
- Product CRUD operations
- Order management
- Analytics and reporting
- CSV export functionality

### 📊 Analytics & Notifications
- Sales analytics with charts
- Real-time order updates
- Push-style notifications
- Performance monitoring

## Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router v6
- **Data Fetching**: TanStack Query (React Query)
- **Forms**: React Hook Form + Yup validation
- **Mock Backend**: MirageJS
- **Payments**: Stripe (test mode)
- **Charts**: Recharts
- **Notifications**: React Toastify
- **Icons**: React Icons

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ecommerce-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Demo Credentials

### Admin Account
- **Email**: admin@example.com
- **Password**: admin123
- **Access**: Full admin dashboard, product management, order management

### User Account
- **Email**: user@example.com
- **Password**: user123
- **Access**: Shopping, cart, checkout, order history

## Project Structure

```
src/
├── api/                 # API service layer
├── app/                 # Main app pages
├── components/          # Reusable UI components
│   ├── Layout.jsx      # Main layout wrapper
│   ├── Navbar.jsx      # Navigation component
│   ├── Footer.jsx      # Footer component
│   ├── Loading.jsx     # Loading components
│   └── ErrorBoundary.jsx # Error handling
├── features/           # Feature-based modules
│   ├── auth/          # Authentication
│   ├── products/      # Product management
│   ├── cart/          # Shopping cart
│   ├── checkout/      # Checkout flow
│   ├── admin/         # Admin dashboard
│   └── analytics/     # Analytics and reporting
├── mocks/             # MirageJS mock server
├── utils/             # Utility functions
└── App.jsx            # Main app component
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Key Features Explained

### Authentication System
- JWT-based authentication with mock backend
- Role-based access control (admin/user)
- Persistent login state with localStorage
- Protected routes for authenticated users

### Product Management
- Dynamic product listing with search and filters
- Product detail pages with image galleries
- Category-based filtering
- Stock management and availability

### Shopping Cart
- Persistent cart storage using Zustand
- Add/remove/update quantities
- Real-time price calculations
- Cart persistence across sessions

### Checkout Process
- Multi-step checkout form
- Address and payment validation
- Stripe payment integration (test mode)
- Order confirmation and tracking

### Admin Dashboard
- Comprehensive admin interface
- Product CRUD operations
- Order management and status updates
- Analytics and reporting
- CSV export functionality

## API Endpoints

The application uses MirageJS for mock API endpoints:

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Get products by category
- `POST /api/admin/products` - Create product (admin)
- `PUT /api/admin/products/:id` - Update product (admin)
- `DELETE /api/admin/products/:id` - Delete product (admin)

### Orders
- `GET /api/orders` - Get orders
- `POST /api/orders` - Create order
- `PUT /api/admin/orders/:id` - Update order status (admin)

### Analytics
- `GET /api/admin/analytics` - Get analytics data (admin)

## Customization

### Adding New Products
Products are defined in `src/mocks/server.js`. Add new products to the `products` array.

### Styling
The application uses Tailwind CSS. Custom styles can be added to `src/index.css` or by extending the Tailwind configuration.

### Adding New Features
Follow the feature-based structure in the `src/features/` directory for new functionality.

## Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy the `dist` folder to your preferred hosting service (Vercel, Netlify, etc.)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository.