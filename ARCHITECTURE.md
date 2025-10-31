# 🏗️ Fatima Oils - System Architecture

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              React Application (Vite)                │  │
│  │  ┌────────────┐  ┌──────────┐  ┌─────────────────┐  │  │
│  │  │   Routes   │  │  Store   │  │   Components    │  │  │
│  │  │            │  │ (Zustand)│  │                 │  │  │
│  │  │ • Home     │  │          │  │ • UI Library    │  │  │
│  │  │ • Products │  │ • Auth   │  │ • Common        │  │  │
│  │  │ • Mixer    │  │ • Cart   │  │ • 3D Scenes     │  │  │
│  │  │ • Cart     │  │ • Mix    │  │                 │  │  │
│  │  │ • Checkout │  │ • UI     │  │                 │  │  │
│  │  └────────────┘  └──────────┘  └─────────────────┘  │  │
│  │                                                       │  │
│  │  ┌──────────────────────────────────────────────┐   │  │
│  │  │           API Client Layer                   │   │  │
│  │  │  • HTTP Client • Auth API • Products API    │   │  │
│  │  │  • Mixes API   • Cart API • Orders API      │   │  │
│  │  └──────────────────────────────────────────────┘   │  │
│  └──────────────────────────────────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTP/REST
                            │ JSON
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                        API GATEWAY                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                 Express.js Server                    │  │
│  │  ┌────────────┐  ┌──────────────┐  ┌─────────────┐  │  │
│  │  │ Middleware │  │    Routes    │  │ Controllers │  │  │
│  │  │            │  │              │  │             │  │  │
│  │  │ • CORS     │  │ • /auth      │  │ • auth      │  │  │
│  │  │ • Security │  │ • /products  │  │ • products  │  │  │
│  │  │ • Auth     │  │ • /mixes     │  │ • mixes     │  │  │
│  │  │ • Error    │  │ • /cart      │  │ • cart      │  │  │
│  │  │            │  │ • /orders    │  │ • orders    │  │  │
│  │  └────────────┘  └──────────────┘  └─────────────┘  │  │
│  │                                                       │  │
│  │  ┌──────────────────────────────────────────────┐   │  │
│  │  │           Business Logic Layer               │   │  │
│  │  │  • Services • Repositories • Validators     │   │  │
│  │  └──────────────────────────────────────────────┘   │  │
│  └──────────────────────────────────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     DATA LAYER                              │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐  │
│  │  PostgreSQL  │  │    Prisma    │  │   Cloudinary    │  │
│  │   Database   │◄─┤      ORM     │  │  Image Storage  │  │
│  │              │  │              │  │                 │  │
│  │ • users      │  │ • Schema     │  │ • Products      │  │
│  │ • products   │  │ • Migrations │  │ • 3D Models     │  │
│  │ • mixes      │  │ • Seed       │  │                 │  │
│  │ • orders     │  │              │  │                 │  │
│  └──────────────┘  └──────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Request Flow

### 1. User Authentication Flow

```
User → SignIn Page → API Client → POST /api/auth/sign-in
                                        ↓
                              Auth Controller
                                        ↓
                              Auth Service (validate credentials)
                                        ↓
                              Auth Repository (find user)
                                        ↓
                              PostgreSQL
                                        ↓
                              Generate JWT Token
                                        ↓
                              Return { user, token }
                                        ↓
User ← Update Auth Store ← API Response
```

### 2. Product Browsing Flow

```
User → Products Page → API Client → GET /api/products?category=OIL&page=1
                                        ↓
                              Products Controller
                                        ↓
                              Products Service
                                        ↓
                              Products Repository (with pagination)
                                        ↓
                              PostgreSQL
                                        ↓
                              Return { products, pagination }
                                        ↓
User ← Render Products Grid ← API Response
```

### 3. Mix Creation Flow

```
User → Mixer Page
     ↓
Select Ingredients → Add to Mix Store (Zustand)
     ↓
Enter Grams → Calculate Total Price
     ↓
Save Mix → API Client → POST /api/mixes (with JWT)
                              ↓
                        Verify Token (Middleware)
                              ↓
                        Mixes Controller
                              ↓
                        Mixes Service (validate stock)
                              ↓
                        Mixes Repository (create with transaction)
                              ↓
                        PostgreSQL
                              ↓
                        Return { mix, price }
                              ↓
User ← Show Success ← API Response
```

### 4. Checkout Flow

```
User → Cart Page → Checkout Page
                        ↓
Enter Address → API Client → POST /api/orders/checkout (with JWT)
                                    ↓
                              Verify Token
                                    ↓
                              Orders Controller
                                    ↓
                              Orders Service
                                    ↓
                              Database Transaction:
                              1. Create Order
                              2. Create Order Items
                              3. Deduct Stock
                              4. Clear Cart
                                    ↓
                              Return { order }
                                    ↓
User ← Redirect to Home ← Success Notification
```

## Module Architecture

### Backend Module Structure

Each module follows this pattern:

```
modules/{module_name}/
├── {module}.controller.js    # HTTP request handling
├── {module}.service.js       # Business logic
├── {module}.repository.js    # Database operations
├── {module}.routes.js        # Route definitions
└── {module}.validators.js    # Input validation
```

**Example: Products Module**

```javascript
// Flow: Route → Controller → Service → Repository → Database

Route (products.routes.js)
  → GET /products?category=OIL

Controller (products.controller.js)
  → Parse query params
  → Call service

Service (products.service.js)
  → Business logic
  → Call repository

Repository (products.repository.js)
  → Prisma queries
  → Database operations

Database (PostgreSQL)
  → Return data
```

## Data Models

### Core Entities

```
User
├── id: UUID (PK)
├── username: String (Unique)
├── email: String (Unique)
├── passwordHash: String
├── role: Enum (USER, ADMIN)
└── points: Integer

Product
├── id: UUID (PK)
├── nameAr: String
├── nameEn: String
├── category: Enum (OIL, HERB, SEED)
├── pricePerGram: Float
├── stockGrams: Float
└── imageUrl: String

Mix
├── id: UUID (PK)
├── userId: UUID (FK → User)
├── name: String
├── isPublic: Boolean
└── ingredients: MixIngredient[]

Order
├── id: UUID (PK)
├── userId: UUID (FK → User)
├── totalPrice: Float
├── status: Enum
└── items: OrderItem[]

CartItem
├── id: UUID (PK)
├── userId: UUID (FK → User)
├── productId: UUID (FK → Product)
└── grams: Float
```

## State Management (Frontend)

### Zustand Stores

```javascript
// Auth Store
{
  user: User | null,
  token: string | null,
  isAuthenticated: boolean,
  setAuth(),
  logout()
}

// Cart Store
{
  items: CartItem[],
  total: number,
  addItem(),
  removeItem(),
  updateItem(),
  clearCart()
}

// Mix Store
{
  ingredients: Ingredient[],
  mixName: string,
  addIngredient(),
  removeIngredient(),
  getTotalPrice(),
  clearMix()
}

// UI Store
{
  isLoading: boolean,
  notification: Notification | null,
  modalOpen: boolean,
  showNotification(),
  openModal()
}
```

## Security Architecture

### Authentication & Authorization

```
Request → Middleware → Verify JWT Token
              ↓
        Extract User Info
              ↓
        Add to req.user
              ↓
        Protected Route Handler
              ↓
        Check User Role (if needed)
              ↓
        Process Request
```

### Security Layers

1. **Transport Layer**
   - CORS policy
   - HTTPS in production

2. **Application Layer**
   - Helmet.js headers
   - Rate limiting
   - Input validation (Zod)
   - JWT authentication
   - Password hashing (bcrypt)

3. **Database Layer**
   - SQL injection prevention (Prisma)
   - Foreign key constraints
   - Unique constraints

## API Design Patterns

### RESTful Conventions

```
GET    /api/products           # List all products
GET    /api/products/:id       # Get single product
POST   /api/products           # Create product (admin)
PUT    /api/products/:id       # Update product (admin)
DELETE /api/products/:id       # Delete product (admin)
GET    /api/products/search    # Search products
```

### Response Format

```json
// Success Response
{
  "success": true,
  "message": "Operation successful",
  "data": { /* payload */ }
}

// Paginated Response
{
  "success": true,
  "data": [ /* items */ ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}

// Error Response
{
  "success": false,
  "message": "Error description",
  "statusCode": 400
}
```

## Performance Considerations

### Backend Optimizations
- Database query pagination
- Index on frequently queried fields
- Transaction for multi-step operations
- Efficient join operations with Prisma

### Frontend Optimizations
- Code splitting (ready)
- Lazy loading for routes
- Optimistic UI updates
- Debounced search
- Cached API responses

## Deployment Architecture

### Production Environment

```
┌─────────────────────────────────────────┐
│           CDN (CloudFront)              │
│        Static Assets + Client           │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│      Load Balancer / API Gateway        │
└────────────────┬────────────────────────┘
                 │
    ┌────────────┴───────────┐
    ▼                        ▼
┌─────────┐            ┌─────────┐
│ Server  │            │ Server  │
│ Node.js │            │ Node.js │
└────┬────┘            └────┬────┘
     │                      │
     └──────────┬───────────┘
                ▼
        ┌──────────────┐
        │  PostgreSQL  │
        │   Database   │
        └──────────────┘
```

### Recommended Hosting
- **Frontend**: Vercel, Netlify
- **Backend**: Railway, Render, AWS
- **Database**: Supabase, Neon, Railway

## Scalability Considerations

### Horizontal Scaling
- Stateless API servers
- JWT tokens (no session state)
- Database connection pooling

### Vertical Scaling
- Database indexes
- Query optimization
- Caching layer (Redis ready)

### Future Enhancements
- Message queue (Bull)
- Background jobs (for emails)
- Caching layer (Redis)
- Search engine (Elasticsearch)
- CDN for 3D assets

---

**Architecture Version**: 1.0
**Last Updated**: 2025-01-31
