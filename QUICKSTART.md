# 🚀 Quick Start Guide - Fatima Oils

Get the Fatima Oils application running in 5 minutes!

## Prerequisites

Make sure you have these installed:
- **Node.js** v18 or higher ([Download](https://nodejs.org/))
- **pnpm** package manager
  ```bash
  npm install -g pnpm
  ```
- **Docker** (for database) ([Download](https://www.docker.com/))

## Step-by-Step Setup

### 1️⃣ Install Dependencies

```bash
# Install all dependencies for both client and server
pnpm install
```

### 2️⃣ Start the Database

```bash
# Start PostgreSQL using Docker Compose
cd infra/docker
docker-compose -f docker-compose.dev.yml up -d

# Go back to root
cd ../..
```

### 3️⃣ Set Up Environment Variables

```bash
# Copy the example env file
cp .env.example apps/server/.env
```

The default values in `.env.example` will work for local development!

### 4️⃣ Initialize the Database

```bash
# Navigate to server directory
cd apps/server

# Generate Prisma Client
pnpm db:generate

# Run database migrations
pnpm db:migrate

# Seed the database with sample data
pnpm db:seed

# Go back to root
cd ../..
```

### 5️⃣ Start the Application

```bash
# Start both frontend and backend
pnpm dev
```

🎉 **That's it!** The application should now be running:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 🧪 Test the Application

### Default Login Credentials

**Admin Account:**
- Email: `admin@fatimasoils.com`
- Password: `admin123`

**User Account:**
- Email: `user@example.com`
- Password: `user123`

### Try These Features

1. **Browse Products** → http://localhost:5173/products
2. **Create a Mix** → http://localhost:5173/mixer
3. **Sign In** → http://localhost:5173/signin
4. **Add to Cart** → Click any product
5. **Toggle Language** → Click العربية/English in navbar

## 🔧 Useful Commands

```bash
# Development
pnpm dev              # Start everything
pnpm server:dev       # Start only backend
pnpm client:dev       # Start only frontend

# Database
cd apps/server
pnpm db:studio        # Open Prisma Studio (database GUI)
pnpm db:seed          # Re-seed the database

# Build for Production
pnpm build            # Build both apps
```

## 🐛 Common Issues

### Port Already in Use

If you get a port conflict error:

```bash
# For port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# For port 5173 (frontend)
lsof -ti:5173 | xargs kill -9
```

### Database Connection Error

Make sure Docker is running and the PostgreSQL container is up:

```bash
docker ps
# Should show fatima-oils-db container
```

### Dependencies Not Installing

Try cleaning and reinstalling:

```bash
pnpm clean
pnpm install
```

## 📚 Next Steps

- Read the full [README.md](./README.md) for detailed documentation
- Check out the [API Documentation](./README.md#-api-documentation)
- Explore the codebase structure
- Start customizing for your needs!

## 🆘 Need Help?

- Check if Docker containers are running: `docker ps`
- Check if database is accessible: `cd apps/server && pnpm db:studio`
- Check server logs in the terminal where you ran `pnpm dev`
- Open browser console to see frontend errors

---

Happy coding! 🌿
