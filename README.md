# Men's Clothing Store - E-commerce Platform

A full-stack, production-ready e-commerce platform for men's clothing built with modern web technologies.

## 🚀 Features

### Customer Features
- **Product Browsing**: Browse 80+ products across 8 premium brands
- **Advanced Filtering**: Filter by brand, category, size, color, price range
- **Product Search**: Full-text search across product names and descriptions
- **Shopping Cart**: Persistent cart with size and color selection
- **Wishlist**: Save favorite products
- **User Authentication**: Secure JWT-based authentication
- **Checkout**: Multi-step checkout with Stripe payment integration
- **Order Management**: View order history and track status
- **Product Reviews**: Rate and review purchased products
- **Responsive Design**: Optimized for mobile, tablet, and desktop

### Admin Features
- **Dashboard**: Analytics with revenue, orders, and user metrics
- **Product Management**: Create, edit, delete products
- **Order Management**: View and update order status
- **User Management**: View and manage registered users
- **Inventory Control**: Track stock levels

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with bcrypt password hashing
- **Payment**: Stripe API integration
- **Email**: Nodemailer for transactional emails
- **Validation**: express-validator
- **Security**: Helmet, CORS, rate limiting

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form with Zod validation
- **Animations**: Framer Motion
- **Payment UI**: Stripe Elements

### DevOps
- **Containerization**: Docker & Docker Compose
- **Database**: MongoDB container
- **Environment Management**: dotenv

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- MongoDB (or use Docker)
- npm or yarn
- Stripe account (for payments)
- Email account (for SMTP)

### 1. Clone the Repository

```bash
git clone https://github.com/KINGFX-BIT/mens-clothing-store.git
cd mens-clothing-store
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configuration
nano .env
```

**Backend Environment Variables** (.env):
```env
NODE_ENV=development
PORT=5000

# MongoDB
MONGODB_URI=mongodb://localhost:27017/mens-clothing-store

# JWT Secret (generate a secure random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# Email Configuration (Gmail example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
```

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Edit .env.local with your configuration
nano .env.local
```

**Frontend Environment Variables** (.env.local):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

### 4. Database Seeding

The project includes a comprehensive seed script with:
- 8 brands (Nike, Adidas, Zara, H&M, Ralph Lauren, Levi's, Tommy Hilfiger, Uniqlo)
- 80+ products across all categories
- 8 categories
- Admin user account

```bash
cd backend

# Run the seed script
npm run seed
```

**Default Admin Credentials:**
- Email: `admin@mensclothing.com`
- Password: `admin123`

⚠️ **Important**: Change the admin password after first login in production!

### 5. Running the Application

#### Option A: Manual Start

**Terminal 1 - Start MongoDB:**
```bash
mongod
```

**Terminal 2 - Start Backend:**
```bash
cd backend
npm run dev
```

**Terminal 3 - Start Frontend:**
```bash
cd frontend
npm run dev
```

#### Option B: Docker Compose (Recommended)

```bash
# From project root
docker-compose up --build
```

## 🌐 Accessing the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **MongoDB**: mongodb://localhost:27017

## 📁 Project Structure

```
mens-clothing-store/
├── backend/
│   ├── src/
│   │   ├── config/          # Database and Stripe configuration
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Auth, validation, error handling
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API routes
│   │   ├── types/           # TypeScript interfaces
│   │   ├── utils/           # Helper functions, email, seed
│   │   └── server.ts        # Express app entry point
│   ├── .env.example
│   ├── tsconfig.json
│   └── package.json
├── frontend/
│   ├── app/
│   │   ├── (auth)/          # Authentication pages
│   │   ├── products/        # Product pages
│   │   ├── cart/            # Shopping cart
│   │   ├── orders/          # Order history
│   │   ├── admin/           # Admin dashboard
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Homepage
│   ├── components/
│   │   ├── layout/          # Navbar, Footer
│   │   └── ui/              # Reusable UI components
│   ├── lib/
│   │   ├── store/           # Zustand stores
│   │   ├── api.ts           # Axios configuration
│   │   ├── types.ts         # TypeScript types
│   │   └── utils.ts         # Utility functions
│   ├── .env.local.example
│   └── package.json
└── docker-compose.yml
```

## 🔌 API Documentation

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Products
- `GET /api/products` - Get all products (with filtering, sorting, pagination)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `POST /api/orders` - Create order (protected)
- `GET /api/orders/my-orders` - Get user orders (protected)
- `GET /api/orders/:id` - Get single order (protected)
- `POST /api/orders/payment-intent` - Create Stripe payment intent (protected)
- `PUT /api/orders/:id/pay` - Update order to paid (protected)
- `GET /api/orders/all` - Get all orders (admin)
- `PUT /api/orders/:id/status` - Update order status (admin)

### Cart
- `GET /api/cart` - Get user cart (protected)
- `POST /api/cart` - Add item to cart (protected)
- `PUT /api/cart/:itemId` - Update cart item (protected)
- `DELETE /api/cart/:itemId` - Remove item from cart (protected)
- `DELETE /api/cart` - Clear cart (protected)

### Wishlist
- `GET /api/wishlist` - Get user wishlist (protected)
- `POST /api/wishlist` - Add item to wishlist (protected)
- `DELETE /api/wishlist/:productId` - Remove from wishlist (protected)

### Reviews
- `GET /api/reviews/:productId` - Get product reviews
- `POST /api/reviews/:productId` - Create review (protected)

### Categories & Brands
- `GET /api/categories` - Get all categories
- `GET /api/categories/:slug` - Get category by slug
- `GET /api/brands` - Get all brands
- `GET /api/brands/:slug` - Get brand by slug

### Admin
- `GET /api/admin/dashboard` - Get dashboard stats (admin)
- `GET /api/admin/users` - Get all users (admin)
- `DELETE /api/admin/users/:id` - Delete user (admin)

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: express-validator for all inputs
- **Rate Limiting**: Prevent brute force attacks
- **CORS**: Configured for frontend origin
- **Helmet**: Security headers
- **Environment Variables**: Sensitive data protection

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach
- **Loading States**: Skeleton screens and spinners
- **Error Handling**: User-friendly error messages
- **Form Validation**: Real-time validation feedback
- **Toast Notifications**: Success/error notifications
- **Smooth Animations**: Framer Motion transitions
- **Accessible**: ARIA labels and keyboard navigation

## 🚢 Deployment

### Backend Deployment (Railway, Heroku, DigitalOcean)

1. Set environment variables in your hosting platform
2. Build the TypeScript code: `npm run build`
3. Start the server: `npm start`
4. Ensure MongoDB connection string is updated

### Frontend Deployment (Vercel, Netlify)

1. Connect your Git repository
2. Set environment variables
3. Build command: `npm run build`
4. Output directory: `.next`

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

## 📝 License

This project is licensed under the ISC License.

## 👥 Authors

- **KINGFX-BIT** - *Initial work*

---

**Happy Coding! 🎉**
