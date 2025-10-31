# 🌿 Fatima Oils

A full-stack herbal apothecary web application with immersive 3D experience for buying natural oils and herbs, customizing mixtures, and visually experiencing the process of weighing and mixing ingredients.

## ✨ Features

### User Features
- 🏠 **Home Page** - Beautiful landing page with hero section and featured products
- 🛍️ **Product Catalog** - Browse oils, herbs, and seeds with filtering
- ⚗️ **Custom Mixer** - Create custom herbal blends with interactive selection
- 🛒 **Shopping Cart** - Manage items before checkout
- 💳 **Secure Checkout** - Complete orders with shipping details
- 👤 **User Authentication** - Sign up and sign in functionality
- 🌐 **Bilingual Support** - Arabic and English language support

### Technical Features
- 🎨 Modern UI with TailwindCSS and Framer Motion animations
- 🔐 JWT-based authentication with bcrypt password hashing
- 📦 PostgreSQL database with Prisma ORM
- 🚀 RESTful API with Express.js
- ⚡ Real-time state management with Zustand
- 🎯 Type-safe validation with Zod
- 🔄 Automatic API token management
- 📱 Responsive design for mobile and desktop

## 🏗️ Project Structure

```
fatima-oils/
├── apps/
│   ├── client/          # React + Vite frontend
│   │   ├── src/
│   │   │   ├── routes/  # Page components
│   │   │   ├── components/
│   │   │   │   ├── ui/       # Reusable UI components
│   │   │   │   └── common/   # Common components (Navbar, etc.)
│   │   │   ├── store/        # Zustand state management
│   │   │   ├── api/          # API client layer
│   │   │   ├── i18n/         # Internationalization
│   │   │   └── styles/       # CSS and Tailwind config
│   │   └── package.json
│   └── server/          # Node.js + Express backend
│       ├── src/
│       │   ├── modules/      # Feature modules
│       │   │   ├── auth/
│       │   │   ├── products/
│       │   │   ├── mixes/
│       │   │   ├── orders/
│       │   │   ├── cart/
│       │   │   ├── points/
│       │   │   └── uploads/
│       │   ├── core/         # Core utilities
│       │   ├── middleware/   # Express middleware
│       │   ├── integrations/ # Third-party services
│       │   └── utils/        # Helper functions
│       ├── prisma/
│       │   ├── schema.prisma # Database schema
│       │   └── seed.js       # Database seeding
│       └── package.json
├── infra/
│   └── docker/          # Docker configuration
└── package.json         # Root package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- pnpm installed (`npm install -g pnpm`)
- PostgreSQL database (or use Docker)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd fatima-oils
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Set up environment variables**

Create `.env` file in `apps/server/`:
```bash
cp .env.example apps/server/.env
```

Edit `apps/server/.env` with your configuration:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/fatima_oils?schema=public"
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
```

4. **Start PostgreSQL** (using Docker)
```bash
cd infra/docker
docker-compose -f docker-compose.dev.yml up -d
```

5. **Set up the database**
```bash
# Generate Prisma client
cd apps/server
pnpm db:generate

# Run migrations
pnpm db:migrate

# Seed the database
pnpm db:seed
```

6. **Start the development servers**

In the root directory:
```bash
pnpm dev
```

This will start:
- **Backend API**: http://localhost:5000
- **Frontend**: http://localhost:5173

## 📚 API Documentation

### Authentication Endpoints

#### Sign Up
```http
POST /api/auth/sign-up
Content-Type: application/json

{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

#### Sign In
```http
POST /api/auth/sign-in
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}
```

#### Get Profile
```http
GET /api/auth/profile
Authorization: Bearer {token}
```

### Products Endpoints

#### Get All Products
```http
GET /api/products?page=1&limit=20&category=OIL
```

#### Get Product by ID
```http
GET /api/products/:id
```

#### Search Products
```http
GET /api/products/search?q=lavender
```

### Mixes Endpoints

#### Create Mix
```http
POST /api/mixes
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "My Custom Blend",
  "description": "A relaxing blend",
  "ingredients": [
    {
      "productId": "uuid",
      "gramsSelected": 10
    }
  ]
}
```

#### Get User Mixes
```http
GET /api/mixes/my-mixes
Authorization: Bearer {token}
```

#### Get Public Mixes
```http
GET /api/mixes/public
```

### Cart Endpoints

#### Get Cart
```http
GET /api/cart
Authorization: Bearer {token}
```

#### Add to Cart
```http
POST /api/cart/add
Authorization: Bearer {token}
Content-Type: application/json

{
  "productId": "uuid",
  "grams": 10
}
```

### Orders Endpoints

#### Create Order
```http
POST /api/orders/checkout
Authorization: Bearer {token}
Content-Type: application/json

{
  "address": "123 Main St",
  "notes": "Please deliver in the morning",
  "items": [
    {
      "productId": "uuid",
      "quantity": 10,
      "price": 25.00
    }
  ]
}
```

#### Get User Orders
```http
GET /api/orders/my-orders
Authorization: Bearer {token}
```

## 🧪 Default Credentials

After seeding the database, you can use these credentials:

**Admin Account:**
- Email: `admin@fatimasoils.com`
- Password: `admin123`

**User Account:**
- Email: `user@example.com`
- Password: `user123`

## 🛠️ Development Commands

### Root Level
```bash
pnpm dev              # Start all apps in development mode
pnpm build            # Build all apps
pnpm clean            # Clean all dependencies
```

### Server
```bash
cd apps/server
pnpm dev              # Start server with watch mode
pnpm start            # Start server in production mode
pnpm db:generate      # Generate Prisma client
pnpm db:migrate       # Run database migrations
pnpm db:seed          # Seed the database
pnpm db:studio        # Open Prisma Studio
```

### Client
```bash
cd apps/client
pnpm dev              # Start Vite dev server
pnpm build            # Build for production
pnpm preview          # Preview production build
```

## 🗄️ Database Schema

The application uses PostgreSQL with the following main tables:

- **users** - User accounts with authentication
- **products** - Oils, herbs, and seeds
- **mixes** - Custom herbal blends
- **mix_ingredients** - Ingredients in each mix
- **orders** - Customer orders
- **order_items** - Items in each order
- **cart_items** - Shopping cart items
- **points_log** - Reward points tracking

## 🌐 Internationalization

The app supports Arabic and English. Language can be toggled using the button in the navbar.

Translation files:
- `apps/client/src/i18n/en.json`
- `apps/client/src/i18n/ar.json`

## 🎨 Customization

### Adding New Products

Use the seed file or admin endpoints to add products:
```javascript
{
  "nameAr": "زيت اللافندر",
  "nameEn": "Lavender Oil",
  "category": "OIL",  // OIL, HERB, or SEED
  "pricePerGram": 2.5,
  "descriptionAr": "زيت اللافندر الأساسي",
  "descriptionEn": "Essential lavender oil",
  "stockGrams": 1000
}
```

### Styling

The app uses TailwindCSS. Main theme colors can be customized in:
- `apps/client/tailwind.config.js`

Custom CSS is in:
- `apps/client/src/styles/index.css`

## 🚀 Deployment

### Backend Deployment
The backend can be deployed to:
- Railway
- Render
- Vercel (Serverless)
- AWS

Set environment variables in your hosting platform.

### Frontend Deployment
The frontend can be deployed to:
- Vercel (recommended)
- Netlify
- AWS S3 + CloudFront

Build command: `pnpm build`
Output directory: `apps/client/dist`

### Database
Use managed PostgreSQL from:
- Supabase
- Neon
- Railway
- AWS RDS

## 📦 Tech Stack

### Frontend
- React 18
- Vite
- React Router DOM
- TailwindCSS
- Framer Motion
- Zustand (State Management)
- i18next (Internationalization)
- React Three Fiber (3D - ready for future implementation)

### Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Bcrypt
- Zod (Validation)
- Cloudinary (Image Upload)
- Stripe (Payment Processing)

## 🔒 Security

- Passwords hashed with bcrypt
- JWT token-based authentication
- CORS protection
- Rate limiting on API endpoints
- Helmet.js for security headers
- Input validation with Zod
- SQL injection protection via Prisma

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation
- Review the API endpoints

## 🎯 Future Enhancements

- [ ] 3D visualization with React Three Fiber
- [ ] Robot arm animation for mixing process
- [ ] Real-time inventory updates
- [ ] Email notifications
- [ ] Social sharing of custom mixes
- [ ] Advanced reward points system
- [ ] Admin dashboard
- [ ] Order tracking
- [ ] Product reviews and ratings
- [ ] Subscription boxes
- [ ] Mobile app (React Native)

---

Built with ❤️ for herbal enthusiasts