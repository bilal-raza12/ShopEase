# ShopEase - E-Commerce Web Application

A full-stack e-commerce web application built with React, Node.js, Express, and MongoDB, deployed on cloud platforms (Azure & Vercel).

## Live Demo

| Component | URL |
|-----------|-----|
| **Frontend** | https://shop-ease-psi-peach.vercel.app |
| **Backend API** | https://shopease-bula1-btdef3bwaacmgxd6.centralindia-01.azurewebsites.net |
| **Database** | MongoDB Atlas (Cloud) |

### Test Credentials
- **Admin**: `admin@shopease.com` / `Admin@123456`
- **User**: Register a new account on the website

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Architecture](#architecture)
5. [Project Structure](#project-structure)
6. [Installation & Setup](#installation--setup)
7. [API Endpoints](#api-endpoints)
8. [Deployment](#deployment)
9. [Security Features](#security-features)
10. [Project Scope & Achievements](#project-scope--achievements)
11. [FAQs for Viva](#faqs-for-viva)

---

## Project Overview

**ShopEase** is a complete e-commerce solution that allows users to browse products, add items to cart, place orders, and manage their accounts. It includes an admin panel for managing products, orders, and users.

### Project Objective
Create a fully functional web application deployed on cloud infrastructure, demonstrating:
- Full-stack web development
- Cloud deployment (Azure App Service)
- Database management (MongoDB Atlas)
- CI/CD pipeline (GitHub Actions)
- Modern web technologies

---

## Features

### Customer Features
- **Product Browsing**: View all products with categories, search, and filters
- **Product Details**: Detailed product view with images, descriptions, and reviews
- **Shopping Cart**: Add/remove items, update quantities
- **User Authentication**: Register, login, logout with JWT tokens
- **Order Management**: Place orders, view order history, track status
- **Responsive Design**: Works on desktop, tablet, and mobile

### Admin Features
- **Dashboard**: Overview of sales, orders, users, and products
- **Product Management**: Add, edit, delete products
- **Order Management**: View all orders, update order status
- **User Management**: View and manage registered users

---

## Technology Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React.js | UI Library |
| React Router | Navigation |
| Axios | HTTP Client |
| CSS3 | Styling |
| Vercel | Hosting |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime Environment |
| Express.js | Web Framework |
| MongoDB | Database |
| Mongoose | ODM (Object Data Modeling) |
| JWT | Authentication |
| bcryptjs | Password Hashing |
| Azure App Service | Hosting |

### DevOps & Cloud
| Technology | Purpose |
|------------|---------|
| GitHub | Version Control |
| GitHub Actions | CI/CD Pipeline |
| Azure App Service | Backend Hosting (Linux) |
| Vercel | Frontend Hosting |
| MongoDB Atlas | Cloud Database |

---

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│   Frontend      │────▶│   Backend API   │────▶│   MongoDB       │
│   (Vercel)      │     │   (Azure)       │     │   (Atlas)       │
│                 │     │                 │     │                 │
│   React.js      │     │   Node.js       │     │   Cloud DB      │
│   Port: 443     │     │   Express.js    │     │                 │
│                 │     │   Port: 443     │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │                       │
        └───────────────────────┴───────────────────────┘
                            HTTPS
```

### Data Flow
1. User interacts with React Frontend (Vercel)
2. Frontend makes API calls to Backend (Azure)
3. Backend processes requests and queries MongoDB (Atlas)
4. Response flows back to user

---

## Project Structure

```
ShopEase/
├── Backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── middleware/
│   │   └── auth.js            # JWT authentication middleware
│   ├── models/
│   │   ├── User.js            # User schema
│   │   ├── Product.js         # Product schema
│   │   ├── Order.js           # Order schema
│   │   └── Cart.js            # Cart schema
│   ├── routes/
│   │   ├── auth.js            # Authentication routes
│   │   ├── products.js        # Product routes
│   │   ├── orders.js          # Order routes
│   │   ├── cart.js            # Cart routes
│   │   └── admin.js           # Admin routes
│   ├── server.js              # Express server entry point
│   ├── package.json           # Backend dependencies
│   └── .env                   # Environment variables
│
├── Frontend/
│   ├── public/
│   │   └── index.html         # HTML template
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   ├── ProductCard.js
│   │   │   └── Loading.js
│   │   ├── pages/             # Page components
│   │   │   ├── Home.js
│   │   │   ├── Products.js
│   │   │   ├── ProductDetail.js
│   │   │   ├── Cart.js
│   │   │   ├── Checkout.js
│   │   │   ├── Orders.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── admin/         # Admin pages
│   │   │       ├── Dashboard.js
│   │   │       ├── AdminProducts.js
│   │   │       ├── AdminOrders.js
│   │   │       └── Users.js
│   │   ├── context/           # React Context
│   │   │   ├── AuthContext.js
│   │   │   └── CartContext.js
│   │   ├── services/
│   │   │   └── api.js         # API service layer
│   │   ├── App.js             # Main App component
│   │   └── index.js           # React entry point
│   ├── package.json           # Frontend dependencies
│   └── vercel.json            # Vercel configuration
│
├── .github/
│   └── workflows/
│       ├── main_shopease-bula1.yml    # Backend CI/CD
│       └── azure-static-web-apps.yml  # Frontend CI/CD
│
└── README.md                  # This file
```

---

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account
- Git

### Local Development

#### 1. Clone the Repository
```bash
git clone https://github.com/bilal-raza12/ShopEase.git
cd ShopEase
```

#### 2. Backend Setup
```bash
cd Backend
npm install
```

Create `.env` file:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/shopease
JWT_SECRET=your-secret-key
JWT_EXPIRE=30d
ADMIN_EMAIL=admin@shopease.com
ADMIN_PASSWORD=Admin@123456
```

Start backend:
```bash
npm start
```

#### 3. Frontend Setup
```bash
cd Frontend
npm install
npm start
```

Frontend runs on `http://localhost:3000`
Backend runs on `http://localhost:5000`

---

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login |
| GET | `/api/auth/profile` | Get user profile |
| PUT | `/api/auth/profile` | Update profile |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product |
| GET | `/api/products/categories` | Get categories |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Create order |
| GET | `/api/orders` | Get user orders |
| GET | `/api/orders/:id` | Get single order |

### Cart
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get cart |
| POST | `/api/cart` | Add to cart |
| PUT | `/api/cart/:id` | Update cart item |
| DELETE | `/api/cart/:id` | Remove from cart |

### Admin (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/dashboard` | Dashboard stats |
| GET | `/api/admin/users` | Get all users |
| GET | `/api/admin/products` | Get all products |
| POST | `/api/admin/products` | Create product |
| PUT | `/api/admin/products/:id` | Update product |
| DELETE | `/api/admin/products/:id` | Delete product |
| GET | `/api/admin/orders` | Get all orders |
| PUT | `/api/admin/orders/:id` | Update order |

---

## Deployment

### Backend Deployment (Azure App Service)

1. **Create Azure App Service**
   - Platform: Linux
   - Runtime: Node.js 20 LTS
   - Region: Central India

2. **Configure Environment Variables**
   - MONGODB_URI
   - JWT_SECRET
   - JWT_EXPIRE
   - NODE_ENV=production

3. **CI/CD Pipeline**
   - GitHub Actions automatically deploys on push to main
   - Workflow: `.github/workflows/main_shopease-bula1.yml`

### Frontend Deployment (Vercel)

1. **Connect to Vercel**
   - Import GitHub repository
   - Set root directory to `Frontend`

2. **Automatic Deployment**
   - Vercel auto-deploys on push to main
   - Build command: `npm run build`
   - Output directory: `build`

### Database (MongoDB Atlas)

1. **Create Cluster**
   - Provider: AWS
   - Region: Closest to your users
   - Tier: M0 (Free)

2. **Network Access**
   - Allow access from anywhere (0.0.0.0/0)

3. **Database User**
   - Create user with read/write permissions

---

## Security Features

1. **Password Hashing**: bcryptjs with salt rounds
2. **JWT Authentication**: Secure token-based auth
3. **Protected Routes**: Middleware for admin routes
4. **CORS Configuration**: Controlled cross-origin access
5. **Environment Variables**: Sensitive data not in code
6. **HTTPS**: All production traffic encrypted

---

## Project Scope & Achievements

### Original Scope: "Create a Web App"

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| Web Application | ✅ Achieved | Full-stack e-commerce app |
| Cloud Deployment | ✅ Achieved | Azure App Service + Vercel |
| Database | ✅ Achieved | MongoDB Atlas (Cloud) |
| User Authentication | ✅ Achieved | JWT-based auth system |
| CRUD Operations | ✅ Achieved | Products, Orders, Users |
| Admin Panel | ✅ Achieved | Full admin dashboard |
| Responsive Design | ✅ Achieved | Mobile-friendly UI |
| CI/CD Pipeline | ✅ Achieved | GitHub Actions |

### Additional Achievements
- **12 Products** seeded in database
- **2 User roles**: Admin and Customer
- **Order Management** with status tracking
- **Shopping Cart** functionality
- **Search & Filter** products
- **Real-time Stats** in admin dashboard

### Project Statistics
- **Total Users**: 2
- **Total Products**: 12
- **Total Orders**: 2
- **Total Revenue**: $541.20

---

## FAQs for Viva

### General Questions

**Q1: What is this project about?**
> This is a full-stack e-commerce web application called ShopEase. It allows users to browse products, add them to cart, place orders, and manage their accounts. It also has an admin panel for managing the store.

**Q2: What technologies did you use?**
> - Frontend: React.js
> - Backend: Node.js with Express.js
> - Database: MongoDB (Atlas - Cloud)
> - Hosting: Azure App Service (Backend) and Vercel (Frontend)
> - Version Control: Git & GitHub
> - CI/CD: GitHub Actions

**Q3: Why did you choose these technologies?**
> - **React**: Component-based, efficient virtual DOM, large ecosystem
> - **Node.js/Express**: JavaScript everywhere, non-blocking I/O, fast development
> - **MongoDB**: Flexible schema, JSON-like documents, scales horizontally
> - **Azure**: Enterprise-grade cloud, free tier available, good for learning
> - **Vercel**: Optimized for React, free hosting, automatic deployments

**Q4: What is the architecture of your application?**
> Three-tier architecture:
> 1. **Presentation Layer**: React frontend (Vercel)
> 2. **Business Logic Layer**: Node.js/Express backend (Azure)
> 3. **Data Layer**: MongoDB database (Atlas)
> All communication happens over HTTPS.

### Technical Questions

**Q5: How does authentication work in your app?**
> We use JWT (JSON Web Tokens):
> 1. User sends credentials to `/api/auth/login`
> 2. Server validates and returns a JWT token
> 3. Token is stored in localStorage
> 4. Token is sent in Authorization header for protected routes
> 5. Server middleware validates token on each request

**Q6: How do you secure passwords?**
> We use bcryptjs library:
> 1. Password is hashed with salt before storing
> 2. During login, entered password is compared with hash
> 3. Original password is never stored or logged

**Q7: What is CORS and how did you handle it?**
> CORS (Cross-Origin Resource Sharing) is a security feature that restricts web pages from making requests to different domains. We configured Express to allow requests from our frontend domain using the `cors` middleware with appropriate options.

**Q8: Explain the CI/CD pipeline.**
> We use GitHub Actions:
> 1. Push code to GitHub (main branch)
> 2. GitHub Actions workflow triggers automatically
> 3. Workflow installs dependencies, builds the app
> 4. Deploys to Azure (backend) or Vercel (frontend)
> 5. Zero-downtime deployment

**Q9: What is MongoDB Atlas?**
> MongoDB Atlas is a cloud-hosted MongoDB service. Benefits:
> - No server management needed
> - Automatic backups
> - Scalable
> - Free tier available (M0)
> - Global clusters

**Q10: What is the difference between Azure App Service and Vercel?**
> - **Azure App Service**: Full-featured PaaS for backend applications, supports Node.js, Python, .NET, etc. Good for APIs and dynamic applications.
> - **Vercel**: Optimized for frontend frameworks like React, Next.js. Provides CDN, automatic HTTPS, and edge functions.

### Database Questions

**Q11: What is Mongoose and why use it?**
> Mongoose is an ODM (Object Data Modeling) library for MongoDB:
> - Provides schema validation
> - Middleware support (pre/post hooks)
> - Type casting
> - Query building
> - Business logic encapsulation

**Q12: Explain your database schema.**
> We have 4 main collections:
> - **Users**: name, email, password (hashed), role
> - **Products**: name, price, description, category, stock, images
> - **Orders**: user reference, items, shipping address, status, payment
> - **Cart**: user reference, items with quantities

**Q13: How do you handle database connections?**
> - Connection string stored in environment variables
> - Mongoose connects on server startup
> - Connection pooling handled automatically
> - Error handling with retry logic

### Cloud & Deployment Questions

**Q14: Why did you choose Azure over AWS?**
> - Free tier with $200 credit
> - Easy integration with GitHub
> - Good documentation for beginners
> - App Service simplifies deployment
> - No complex configuration needed

**Q15: What challenges did you face during deployment?**
> 1. **Windows vs Linux**: Initially tried Windows App Service but had issues with IIS and iisnode. Switched to Linux which worked seamlessly.
> 2. **Environment Variables**: Had to configure them separately in Azure Portal.
> 3. **MongoDB IP Whitelist**: Had to allow all IPs (0.0.0.0/0) for Azure to connect.

**Q16: How does auto-deployment work?**
> 1. Developer pushes code to GitHub
> 2. GitHub webhook triggers GitHub Actions
> 3. Workflow runs: checkout → install → build → deploy
> 4. Azure/Vercel receives new build
> 5. Old version replaced with new version
> 6. Zero downtime using rolling deployment

### Security Questions

**Q17: How do you protect admin routes?**
> Using middleware:
> ```javascript
> const protect = (req, res, next) => {
>   const token = req.headers.authorization?.split(' ')[1];
>   if (!token) return res.status(401).json({ message: 'Not authorized' });
>   const decoded = jwt.verify(token, process.env.JWT_SECRET);
>   req.user = decoded;
>   next();
> };
>
> const admin = (req, res, next) => {
>   if (req.user.role !== 'admin') {
>     return res.status(403).json({ message: 'Admin access required' });
>   }
>   next();
> };
> ```

**Q18: What security measures have you implemented?**
> 1. Password hashing with bcrypt
> 2. JWT tokens with expiration
> 3. HTTPS in production
> 4. Environment variables for secrets
> 5. Input validation
> 6. CORS configuration
> 7. Protected routes with middleware

### React/Frontend Questions

**Q19: What is React Context and why did you use it?**
> React Context provides a way to share state globally without prop drilling:
> - **AuthContext**: Manages user authentication state
> - **CartContext**: Manages shopping cart state
> Both are accessible throughout the component tree.

**Q20: How does routing work in your React app?**
> We use React Router v6:
> - `BrowserRouter` wraps the app
> - `Routes` and `Route` define paths
> - `useNavigate` for programmatic navigation
> - Protected routes redirect unauthenticated users

**Q21: How do you make API calls from React?**
> We use Axios with a centralized api.js service:
> ```javascript
> const api = axios.create({
>   baseURL: 'https://backend-url.com/api',
>   headers: { 'Content-Type': 'application/json' }
> });
>
> // Interceptor adds auth token
> api.interceptors.request.use(config => {
>   const token = localStorage.getItem('token');
>   if (token) config.headers.Authorization = `Bearer ${token}`;
>   return config;
> });
> ```

### Project Management Questions

**Q22: How did you manage version control?**
> - Git for local version control
> - GitHub for remote repository
> - Main branch for production
> - Meaningful commit messages
> - .gitignore for sensitive files

**Q23: What would you improve if you had more time?**
> 1. Add payment gateway integration (Stripe/PayPal)
> 2. Implement product reviews and ratings
> 3. Add email notifications
> 4. Implement caching with Redis
> 5. Add unit and integration tests
> 6. Implement image upload to cloud storage

**Q24: What did you learn from this project?**
> 1. Full-stack development workflow
> 2. Cloud deployment and DevOps practices
> 3. Database design and management
> 4. Authentication and security
> 5. CI/CD pipelines
> 6. Debugging production issues
> 7. Working with Azure and Vercel

---

## Contributors

- **Muhammad Bilal Raza** - Full Stack Developer

## License

This project is created for educational purposes as part of the PDC (Parallel and Distributed Computing) course project.

---

## Quick Links

- **Live Site**: https://shop-ease-psi-peach.vercel.app
- **API Health Check**: https://shopease-bula1-btdef3bwaacmgxd6.centralindia-01.azurewebsites.net/api/health
- **GitHub Repository**: https://github.com/bilal-raza12/ShopEase
