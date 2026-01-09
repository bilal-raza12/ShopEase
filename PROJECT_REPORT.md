# PROJECT REPORT

# ShopEase - E-Commerce Web Application

---

## Course: Parallel and Distributed Computing (PDC)

### Submitted By:
**Muhammad Bilal Raza**

### Submission Date:
**January 2026**

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Description](#2-project-description)
3. [Objectives](#3-objectives)
4. [Scope](#4-scope)
5. [Technology Stack](#5-technology-stack)
6. [System Architecture](#6-system-architecture)
7. [Flowcharts](#7-flowcharts)
8. [Workflow](#8-workflow)
9. [Database Design](#9-database-design)
10. [Implementation](#10-implementation)
11. [Cloud Deployment](#11-cloud-deployment)
12. [Screenshots](#12-screenshots)
13. [Testing](#13-testing)
14. [Results & Achievements](#14-results--achievements)
15. [Challenges & Solutions](#15-challenges--solutions)
16. [Future Enhancements](#16-future-enhancements)
17. [Conclusion](#17-conclusion)
18. [References](#18-references)

---

# 1. Project Overview

## 1.1 Project Title
**ShopEase - E-Commerce Web Application**

## 1.2 Project Type
Full-Stack Web Application with Cloud Deployment

## 1.3 Live URLs

| Component | URL |
|-----------|-----|
| Frontend | https://shop-ease-psi-peach.vercel.app |
| Backend API | https://shopease-bula1-btdef3bwaacmgxd6.centralindia-01.azurewebsites.net |
| GitHub Repository | https://github.com/bilal-raza12/ShopEase |

## 1.4 Project Summary
ShopEase is a complete e-commerce solution that demonstrates the implementation of a distributed web application using modern technologies. The project showcases cloud deployment, database management, and full-stack development skills.

---

# 2. Project Description

## 2.1 What is ShopEase?
ShopEase is a fully functional e-commerce web application that allows customers to browse products, manage their shopping cart, place orders, and track their purchases. It includes a comprehensive admin panel for store management.

## 2.2 Problem Statement
Traditional retail businesses face challenges in reaching a wider audience and managing operations efficiently. There is a need for a digital platform that enables businesses to sell products online while providing customers with a seamless shopping experience.

## 2.3 Proposed Solution
A cloud-based e-commerce platform with the following components:
- **Customer Portal**: Browse, search, and purchase products
- **Shopping Cart**: Manage selected items before checkout
- **Order Management**: Track orders and delivery status
- **Admin Dashboard**: Manage products, orders, and users
- **Secure Authentication**: JWT-based login system

## 2.4 Key Features

### Customer Features
| Feature | Description |
|---------|-------------|
| Product Browsing | View products with categories and search |
| Product Details | Detailed view with images and descriptions |
| Shopping Cart | Add, remove, update items |
| User Authentication | Register, login, logout |
| Order Placement | Checkout with shipping details |
| Order History | View past orders and status |

### Admin Features
| Feature | Description |
|---------|-------------|
| Dashboard | Sales statistics and analytics |
| Product Management | CRUD operations on products |
| Order Management | Update order status |
| User Management | View and manage users |

---

# 3. Objectives

## 3.1 Primary Objectives

1. **Create a Web Application**
   - Develop a full-stack web application from scratch
   - Implement both frontend and backend components

2. **Cloud Deployment**
   - Deploy application on cloud infrastructure
   - Ensure high availability and accessibility

3. **Database Integration**
   - Implement a cloud-based database solution
   - Design efficient data models

## 3.2 Secondary Objectives

4. **User Authentication & Security**
   - Implement secure login/registration
   - Protect sensitive routes and data

5. **CI/CD Pipeline**
   - Automate deployment process
   - Enable continuous integration

6. **Responsive Design**
   - Mobile-friendly user interface
   - Cross-browser compatibility

## 3.3 Learning Objectives

- Understanding of distributed systems
- Cloud computing concepts (IaaS, PaaS)
- DevOps practices
- Full-stack development
- Database design and management

---

# 4. Scope

## 4.1 In Scope

| Category | Items Included |
|----------|----------------|
| Frontend | React.js SPA, Responsive UI, Product pages, Cart, Checkout |
| Backend | RESTful API, Authentication, Authorization, CRUD operations |
| Database | MongoDB Atlas, User data, Products, Orders |
| Cloud | Azure App Service, Vercel, MongoDB Atlas |
| DevOps | GitHub Actions, CI/CD Pipeline |
| Security | JWT, Password hashing, HTTPS |

## 4.2 Out of Scope

| Item | Reason |
|------|--------|
| Payment Gateway Integration | Requires merchant account |
| Email Notifications | Requires email service setup |
| Real-time Chat | Beyond project requirements |
| Mobile Application | Focus on web platform |
| Multi-language Support | Time constraints |

## 4.3 Deliverables

1. Fully functional e-commerce website
2. RESTful API backend
3. Cloud-deployed application
4. Admin dashboard
5. Project documentation
6. Source code repository

---

# 5. Technology Stack

## 5.1 Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| React.js | 18.x | UI Library |
| React Router | 6.x | Client-side Routing |
| Axios | 1.x | HTTP Client |
| CSS3 | - | Styling |
| HTML5 | - | Markup |

## 5.2 Backend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 20.x | Runtime Environment |
| Express.js | 4.x | Web Framework |
| Mongoose | 8.x | MongoDB ODM |
| JWT | 9.x | Authentication |
| bcryptjs | 2.x | Password Hashing |
| cors | 2.x | Cross-Origin Requests |
| dotenv | 16.x | Environment Variables |

## 5.3 Database

| Technology | Type | Purpose |
|------------|------|---------|
| MongoDB Atlas | NoSQL | Cloud Database |

## 5.4 Cloud & DevOps

| Technology | Purpose |
|------------|---------|
| Microsoft Azure | Backend Hosting |
| Vercel | Frontend Hosting |
| GitHub | Version Control |
| GitHub Actions | CI/CD Pipeline |

## 5.5 Development Tools

| Tool | Purpose |
|------|---------|
| VS Code | Code Editor |
| Git | Version Control |
| Postman | API Testing |
| npm | Package Manager |

---

# 6. System Architecture

## 6.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                           INTERNET                                   │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
                    ▼                               ▼
        ┌───────────────────┐           ┌───────────────────┐
        │   VERCEL CDN      │           │   AZURE CLOUD     │
        │   (Frontend)      │           │   (Backend)       │
        │                   │           │                   │
        │  ┌─────────────┐  │           │  ┌─────────────┐  │
        │  │   React     │  │  HTTPS    │  │  Node.js    │  │
        │  │   App       │──┼───────────┼─▶│  Express    │  │
        │  │             │  │   API     │  │  API        │  │
        │  └─────────────┘  │  Calls    │  └─────────────┘  │
        │                   │           │         │         │
        └───────────────────┘           │         │         │
                                        │         ▼         │
                                        │  ┌─────────────┐  │
                                        │  │  MongoDB    │  │
                                        │  │  Atlas      │  │
                                        │  │  (Cloud DB) │  │
                                        │  └─────────────┘  │
                                        └───────────────────┘
```

## 6.2 Three-Tier Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                               │
│                        (Frontend)                                    │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │  React Components  │  React Router  │  Context API  │  Axios   ││
│  └─────────────────────────────────────────────────────────────────┘│
│                              Vercel                                  │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                              HTTPS/REST
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     BUSINESS LOGIC LAYER                             │
│                         (Backend)                                    │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │  Express Routes  │  Controllers  │  Middleware  │  Services    ││
│  └─────────────────────────────────────────────────────────────────┘│
│                          Azure App Service                           │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                              Mongoose ODM
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       DATA LAYER                                     │
│                      (Database)                                      │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │  Users Collection  │  Products  │  Orders  │  Carts            ││
│  └─────────────────────────────────────────────────────────────────┘│
│                          MongoDB Atlas                               │
└─────────────────────────────────────────────────────────────────────┘
```

## 6.3 Component Architecture

```
Frontend (React)                    Backend (Node.js)
┌────────────────────┐              ┌────────────────────┐
│      App.js        │              │     server.js      │
│         │          │              │         │          │
│    ┌────┴────┐     │              │    ┌────┴────┐     │
│    │ Router  │     │              │    │ Routes  │     │
│    └────┬────┘     │              │    └────┬────┘     │
│         │          │              │         │          │
│  ┌──────┼──────┐   │              │  ┌──────┼──────┐   │
│  │      │      │   │   ──────▶    │  │      │      │   │
│ Pages Context  │   │    API       │ Auth Products   │   │
│  │      │   Services  Calls      │ Orders Cart Admin│   │
│  └──────┴──────┘   │              │  └──────┴──────┘   │
│         │          │              │         │          │
│    ┌────┴────┐     │              │    ┌────┴────┐     │
│    │Components│    │              │    │ Models  │     │
│    └─────────┘     │              │    └────┬────┘     │
└────────────────────┘              │         │          │
                                    │    ┌────┴────┐     │
                                    │    │MongoDB  │     │
                                    │    └─────────┘     │
                                    └────────────────────┘
```

---

# 7. Flowcharts

## 7.1 User Registration Flow

```
                    ┌─────────────┐
                    │   START     │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │ User Opens  │
                    │ Register    │
                    │ Page        │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │ Enter Name, │
                    │ Email,      │
                    │ Password    │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │ Submit Form │
                    └──────┬──────┘
                           │
                           ▼
                   ┌───────────────┐
                  ╱ Email Already  ╲     YES    ┌─────────────┐
                 ╱  Exists?        ╲───────────▶│ Show Error  │
                 ╲                 ╱             └──────┬──────┘
                  ╲               ╱                     │
                   └──────┬──────┘                      │
                          │ NO                          │
                          ▼                             │
                   ┌─────────────┐                      │
                   │ Hash        │                      │
                   │ Password    │                      │
                   └──────┬──────┘                      │
                          │                             │
                          ▼                             │
                   ┌─────────────┐                      │
                   │ Save to     │                      │
                   │ Database    │                      │
                   └──────┬──────┘                      │
                          │                             │
                          ▼                             │
                   ┌─────────────┐                      │
                   │ Generate    │                      │
                   │ JWT Token   │                      │
                   └──────┬──────┘                      │
                          │                             │
                          ▼                             │
                   ┌─────────────┐                      │
                   │ Redirect to │◀─────────────────────┘
                   │ Home Page   │
                   └──────┬──────┘
                          │
                          ▼
                    ┌─────────────┐
                    │    END      │
                    └─────────────┘
```

## 7.2 Order Placement Flow

```
                    ┌─────────────┐
                    │   START     │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │ User Adds   │
                    │ Products to │
                    │ Cart        │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │ View Cart   │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │ Click       │
                    │ Checkout    │
                    └──────┬──────┘
                           │
                           ▼
                   ┌───────────────┐
                  ╱ User Logged    ╲     NO     ┌─────────────┐
                 ╱  In?            ╲───────────▶│ Redirect to │
                 ╲                 ╱             │ Login       │
                  ╲               ╱              └──────┬──────┘
                   └──────┬──────┘                      │
                          │ YES                         │
                          ▼                             │
                   ┌─────────────┐                      │
                   │ Enter       │◀─────────────────────┘
                   │ Shipping    │
                   │ Details     │
                   └──────┬──────┘
                          │
                          ▼
                   ┌─────────────┐
                   │ Select      │
                   │ Payment     │
                   │ Method      │
                   └──────┬──────┘
                          │
                          ▼
                   ┌─────────────┐
                   │ Place Order │
                   └──────┬──────┘
                          │
                          ▼
                   ┌─────────────┐
                   │ Create      │
                   │ Order in DB │
                   └──────┬──────┘
                          │
                          ▼
                   ┌─────────────┐
                   │ Clear Cart  │
                   └──────┬──────┘
                          │
                          ▼
                   ┌─────────────┐
                   │ Show Order  │
                   │ Confirmation│
                   └──────┬──────┘
                          │
                          ▼
                    ┌─────────────┐
                    │    END      │
                    └─────────────┘
```

## 7.3 Admin Product Management Flow

```
                    ┌─────────────┐
                    │   START     │
                    └──────┬──────┘
                           │
                           ▼
                   ┌───────────────┐
                  ╱ Admin Logged   ╲     NO     ┌─────────────┐
                 ╱  In?            ╲───────────▶│ Redirect to │
                 ╲                 ╱             │ Admin Login │
                  ╲               ╱              └─────────────┘
                   └──────┬──────┘
                          │ YES
                          ▼
                   ┌─────────────┐
                   │ Admin       │
                   │ Dashboard   │
                   └──────┬──────┘
                          │
                          ▼
                   ┌─────────────┐
                   │ Select      │
                   │ Products    │
                   │ Menu        │
                   └──────┬──────┘
                          │
              ┌───────────┼───────────┐
              │           │           │
              ▼           ▼           ▼
        ┌──────────┐┌──────────┐┌──────────┐
        │  ADD     ││  EDIT    ││  DELETE  │
        │  NEW     ││  EXISTING││  PRODUCT │
        │  PRODUCT ││  PRODUCT ││          │
        └────┬─────┘└────┬─────┘└────┬─────┘
             │           │           │
             ▼           ▼           ▼
        ┌──────────┐┌──────────┐┌──────────┐
        │ Fill     ││ Update   ││ Confirm  │
        │ Product  ││ Product  ││ Delete   │
        │ Form     ││ Details  ││          │
        └────┬─────┘└────┬─────┘└────┬─────┘
             │           │           │
             └───────────┼───────────┘
                         │
                         ▼
                   ┌─────────────┐
                   │ Update      │
                   │ Database    │
                   └──────┬──────┘
                          │
                          ▼
                   ┌─────────────┐
                   │ Refresh     │
                   │ Product     │
                   │ List        │
                   └──────┬──────┘
                          │
                          ▼
                    ┌─────────────┐
                    │    END      │
                    └─────────────┘
```

---

# 8. Workflow

## 8.1 Development Workflow

```
┌─────────────────────────────────────────────────────────────────────┐
│                      DEVELOPMENT WORKFLOW                            │
└─────────────────────────────────────────────────────────────────────┘

    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
    │  CODE    │───▶│  COMMIT  │───▶│   PUSH   │───▶│  DEPLOY  │
    │          │    │  (Git)   │    │ (GitHub) │    │  (Auto)  │
    └──────────┘    └──────────┘    └──────────┘    └──────────┘
         │                                               │
         │                                               │
         ▼                                               ▼
    ┌──────────┐                                   ┌──────────┐
    │  LOCAL   │                                   │  CLOUD   │
    │  TEST    │                                   │  LIVE    │
    └──────────┘                                   └──────────┘
```

## 8.2 CI/CD Pipeline Workflow

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CI/CD PIPELINE                                │
│                      (GitHub Actions)                                │
└─────────────────────────────────────────────────────────────────────┘

Developer                  GitHub                    Cloud
    │                         │                         │
    │  git push              │                         │
    │────────────────────────▶│                         │
    │                         │                         │
    │                         │  Trigger Workflow       │
    │                         │─────────┐               │
    │                         │         │               │
    │                         │         ▼               │
    │                         │  ┌─────────────┐        │
    │                         │  │  Checkout   │        │
    │                         │  │  Code       │        │
    │                         │  └──────┬──────┘        │
    │                         │         │               │
    │                         │         ▼               │
    │                         │  ┌─────────────┐        │
    │                         │  │  Install    │        │
    │                         │  │  Deps       │        │
    │                         │  └──────┬──────┘        │
    │                         │         │               │
    │                         │         ▼               │
    │                         │  ┌─────────────┐        │
    │                         │  │  Build      │        │
    │                         │  │  App        │        │
    │                         │  └──────┬──────┘        │
    │                         │         │               │
    │                         │         ▼               │
    │                         │  ┌─────────────┐        │
    │                         │  │  Deploy     │────────▶│
    │                         │  │  to Cloud   │        │
    │                         │  └─────────────┘        │
    │                         │                         │
    │                         │                    ┌────┴────┐
    │                         │                    │  LIVE   │
    │                         │                    │  SITE   │
    │                         │                    └─────────┘
```

## 8.3 Request-Response Workflow

```
┌─────────────────────────────────────────────────────────────────────┐
│                    REQUEST-RESPONSE FLOW                             │
└─────────────────────────────────────────────────────────────────────┘

User Browser              Frontend              Backend              Database
     │                       │                     │                     │
     │  1. Click Product     │                     │                     │
     │──────────────────────▶│                     │                     │
     │                       │                     │                     │
     │                       │  2. API Request     │                     │
     │                       │  GET /api/products  │                     │
     │                       │────────────────────▶│                     │
     │                       │                     │                     │
     │                       │                     │  3. Query DB        │
     │                       │                     │  db.products.find() │
     │                       │                     │────────────────────▶│
     │                       │                     │                     │
     │                       │                     │  4. Return Data     │
     │                       │                     │◀────────────────────│
     │                       │                     │                     │
     │                       │  5. JSON Response   │                     │
     │                       │◀────────────────────│                     │
     │                       │                     │                     │
     │  6. Render Products   │                     │                     │
     │◀──────────────────────│                     │                     │
     │                       │                     │                     │
```

---

# 9. Database Design

## 9.1 Entity Relationship Diagram

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│     USERS       │       │     ORDERS      │       │    PRODUCTS     │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ _id (PK)        │       │ _id (PK)        │       │ _id (PK)        │
│ name            │       │ user (FK)       │       │ name            │
│ email           │───┐   │ items[]         │   ┌───│ description     │
│ password        │   │   │ shippingAddress │   │   │ price           │
│ role            │   │   │ paymentMethod   │   │   │ category        │
│ createdAt       │   │   │ subtotal        │   │   │ stock           │
└─────────────────┘   │   │ tax             │   │   │ image           │
                      │   │ total           │   │   │ rating          │
                      │   │ status          │   │   │ createdAt       │
                      │   │ createdAt       │   │   └─────────────────┘
                      │   └────────┬────────┘   │
                      │            │            │
                      └────────────┼────────────┘
                                   │
                           ┌───────┴───────┐
                           │  ORDER ITEMS  │
                           ├───────────────┤
                           │ product (FK)  │
                           │ name          │
                           │ price         │
                           │ quantity      │
                           └───────────────┘
```

## 9.2 Collection Schemas

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['user', 'admin'], default: 'user'),
  createdAt: Date (default: Date.now)
}
```

### Products Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  description: String (required),
  price: Number (required),
  originalPrice: Number,
  discount: Number (default: 0),
  category: String (required),
  image: String (required),
  images: [String],
  stock: Number (required, default: 0),
  rating: Number (default: 0),
  numReviews: Number (default: 0),
  features: [String],
  createdAt: Date (default: Date.now)
}
```

### Orders Collection
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: 'User'),
  items: [{
    product: ObjectId (ref: 'Product'),
    name: String,
    image: String,
    price: Number,
    quantity: Number
  }],
  shippingAddress: {
    fullName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  paymentMethod: String,
  subtotal: Number,
  shipping: Number,
  tax: Number,
  total: Number,
  status: String (enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
  isPaid: Boolean,
  paidAt: Date,
  isDelivered: Boolean,
  deliveredAt: Date,
  createdAt: Date
}
```

---

# 10. Implementation

## 10.1 Backend Implementation

### Server Setup (server.js)
```javascript
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/admin', require('./routes/admin'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

### Authentication Middleware
```javascript
const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalid' });
  }
};
```

## 10.2 Frontend Implementation

### API Service (api.js)
```javascript
import axios from 'axios';

const API_URL = 'https://shopease-bula1-btdef3bwaacmgxd6.centralindia-01.azurewebsites.net/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const productService = {
  getProducts: () => api.get('/products'),
  getProduct: (id) => api.get(`/products/${id}`)
};

export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData)
};
```

### React Context (AuthContext.js)
```javascript
import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const login = (userData, token) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

---

# 11. Cloud Deployment

## 11.1 Deployment Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                     CLOUD DEPLOYMENT ARCHITECTURE                    │
└─────────────────────────────────────────────────────────────────────┘

                              GitHub
                                │
                    ┌───────────┴───────────┐
                    │                       │
                    ▼                       ▼
            ┌──────────────┐        ┌──────────────┐
            │   Vercel     │        │    Azure     │
            │   (Frontend) │        │   (Backend)  │
            │              │        │              │
            │  React App   │        │  Node.js     │
            │  Static      │        │  App Service │
            │  Hosting     │        │  Linux       │
            │              │        │              │
            │  CDN         │        │  Central     │
            │  Global      │        │  India       │
            └──────────────┘        └──────┬───────┘
                                           │
                                           ▼
                                   ┌──────────────┐
                                   │   MongoDB    │
                                   │   Atlas      │
                                   │              │
                                   │   Cloud DB   │
                                   │   AWS        │
                                   └──────────────┘
```

## 11.2 Azure App Service Configuration

| Setting | Value |
|---------|-------|
| App Name | shopease-bula1 |
| Runtime | Node.js 20 LTS |
| OS | Linux |
| Region | Central India |
| Plan | Free (F1) |

### Environment Variables
| Variable | Purpose |
|----------|---------|
| MONGODB_URI | Database connection string |
| JWT_SECRET | Token signing key |
| JWT_EXPIRE | Token expiration (30d) |
| NODE_ENV | production |

## 11.3 Vercel Configuration

| Setting | Value |
|---------|-------|
| Framework | Create React App |
| Root Directory | Frontend |
| Build Command | npm run build |
| Output Directory | build |

## 11.4 MongoDB Atlas Configuration

| Setting | Value |
|---------|-------|
| Cluster | M0 (Free) |
| Provider | AWS |
| Region | Mumbai |
| Database | shopease |

---

# 12. Screenshots

## 12.1 Application Screenshots

### Home Page
```
[Screenshot: Home page showing featured products and categories]
URL: https://shop-ease-psi-peach.vercel.app/
```

### Products Page
```
[Screenshot: Products listing with filters and search]
URL: https://shop-ease-psi-peach.vercel.app/products
```

### Product Detail Page
```
[Screenshot: Individual product with details and add to cart]
URL: https://shop-ease-psi-peach.vercel.app/products/{id}
```

### Shopping Cart
```
[Screenshot: Cart with items, quantities, and total]
URL: https://shop-ease-psi-peach.vercel.app/cart
```

### Checkout Page
```
[Screenshot: Shipping form and order summary]
URL: https://shop-ease-psi-peach.vercel.app/checkout
```

### Admin Dashboard
```
[Screenshot: Dashboard with stats - Users, Products, Orders, Revenue]
URL: https://shop-ease-psi-peach.vercel.app/admin
Login: admin@shopease.com / Admin@123456
```

### Admin Products Management
```
[Screenshot: Product list with edit/delete options]
URL: https://shop-ease-psi-peach.vercel.app/admin/products
```

### Admin Orders Management
```
[Screenshot: Orders list with status updates]
URL: https://shop-ease-psi-peach.vercel.app/admin/orders
```

## 12.2 Cloud Platform Screenshots

### Azure App Service
```
[Screenshot: Azure Portal - App Service Overview]
- Shows: App name, URL, Status, Resource group
- Location: Azure Portal > App Services > shopease-bula1
```

### Azure Deployment Center
```
[Screenshot: Azure Deployment Center with GitHub integration]
- Shows: Connected repository, deployment history
- Location: Azure Portal > shopease-bula1 > Deployment Center
```

### Azure Configuration
```
[Screenshot: Azure Application Settings]
- Shows: Environment variables configured
- Location: Azure Portal > shopease-bula1 > Configuration
```

### MongoDB Atlas Dashboard
```
[Screenshot: MongoDB Atlas Cluster Overview]
- Shows: Cluster name, connection count, storage
- Location: MongoDB Atlas > Clusters
```

### MongoDB Collections
```
[Screenshot: MongoDB Atlas Collections]
- Shows: users, products, orders collections
- Location: MongoDB Atlas > Browse Collections
```

### Vercel Dashboard
```
[Screenshot: Vercel Project Dashboard]
- Shows: Deployments, domains, analytics
- Location: Vercel Dashboard > shopease project
```

### GitHub Actions
```
[Screenshot: GitHub Actions Workflow Runs]
- Shows: Successful deployments
- Location: GitHub > Actions tab
```

---

# 13. Testing

## 13.1 API Testing Results

| Endpoint | Method | Status | Response Time |
|----------|--------|--------|---------------|
| /api/health | GET | 200 OK | ~200ms |
| /api/products | GET | 200 OK | ~300ms |
| /api/products/:id | GET | 200 OK | ~250ms |
| /api/auth/register | POST | 201 Created | ~400ms |
| /api/auth/login | POST | 200 OK | ~350ms |
| /api/orders | POST | 201 Created | ~500ms |
| /api/admin/dashboard | GET | 200 OK | ~400ms |

## 13.2 Functional Testing

| Test Case | Expected Result | Actual Result | Status |
|-----------|-----------------|---------------|--------|
| User Registration | Account created | Account created | PASS |
| User Login | JWT token received | Token received | PASS |
| View Products | Products displayed | 12 products shown | PASS |
| Add to Cart | Item added | Item in cart | PASS |
| Place Order | Order created | Order confirmed | PASS |
| Admin Login | Dashboard access | Dashboard shown | PASS |
| Admin Add Product | Product created | Product added | PASS |
| Admin Update Order | Status changed | Status updated | PASS |

## 13.3 Performance Metrics

| Metric | Value |
|--------|-------|
| Frontend Load Time | ~2.5s |
| API Response Time | ~300ms avg |
| Database Query Time | ~100ms avg |
| Lighthouse Score | 85+ |

---

# 14. Results & Achievements

## 14.1 Project Statistics

| Metric | Value |
|--------|-------|
| Total Users | 2 |
| Total Products | 12 |
| Total Orders | 2 |
| Total Revenue | $541.20 |
| API Endpoints | 20+ |
| React Components | 25+ |

## 14.2 Objectives Achievement

| Objective | Target | Achieved | Status |
|-----------|--------|----------|--------|
| Create Web App | Full-stack app | Complete e-commerce | ✅ ACHIEVED |
| Cloud Deployment | Deploy to cloud | Azure + Vercel | ✅ ACHIEVED |
| Database | Cloud database | MongoDB Atlas | ✅ ACHIEVED |
| Authentication | Secure login | JWT implementation | ✅ ACHIEVED |
| Admin Panel | Management UI | Full dashboard | ✅ ACHIEVED |
| CI/CD | Auto deployment | GitHub Actions | ✅ ACHIEVED |
| Responsive | Mobile-friendly | Responsive CSS | ✅ ACHIEVED |

## 14.3 Technical Achievements

1. **Distributed Architecture**: Successfully implemented three-tier architecture
2. **Cloud Native**: Application runs entirely on cloud infrastructure
3. **DevOps**: Automated CI/CD pipeline with zero-downtime deployments
4. **Security**: Implemented industry-standard authentication
5. **Scalability**: Architecture supports horizontal scaling

---

# 15. Challenges & Solutions

## 15.1 Deployment Challenges

| Challenge | Description | Solution |
|-----------|-------------|----------|
| Windows IIS Issues | Node.js not working on Windows App Service | Switched to Linux App Service |
| Azure Policy | Static Web Apps blocked by policy | Used Vercel for frontend |
| MongoDB Connection | Connection timeout from Azure | Added IP 0.0.0.0/0 to whitelist |
| CORS Errors | Frontend couldn't access API | Configured CORS middleware |

## 15.2 Development Challenges

| Challenge | Description | Solution |
|-----------|-------------|----------|
| State Management | Complex cart state | Implemented React Context |
| Token Expiry | Users logged out unexpectedly | Set 30-day token expiry |
| Image Loading | Slow image loading | Used optimized image URLs |

---

# 16. Future Enhancements

## 16.1 Planned Features

| Feature | Priority | Complexity |
|---------|----------|------------|
| Payment Gateway (Stripe) | High | Medium |
| Email Notifications | High | Low |
| Product Reviews | Medium | Medium |
| Wishlist | Medium | Low |
| Order Tracking | Medium | Medium |
| Multi-language | Low | High |

## 16.2 Technical Improvements

| Improvement | Benefit |
|-------------|---------|
| Redis Caching | Faster API responses |
| Image CDN | Faster image loading |
| Unit Tests | Better code quality |
| Docker | Easier deployment |
| Kubernetes | Better scalability |

---

# 17. Conclusion

## 17.1 Project Summary

The ShopEase e-commerce web application project has been successfully completed, achieving all primary objectives:

1. **Full-Stack Development**: Built a complete e-commerce solution with React frontend and Node.js backend
2. **Cloud Deployment**: Successfully deployed on Azure App Service (backend) and Vercel (frontend)
3. **Database Integration**: Implemented MongoDB Atlas for cloud-based data storage
4. **Authentication**: Secure JWT-based authentication system
5. **Admin Panel**: Comprehensive dashboard for store management
6. **CI/CD Pipeline**: Automated deployments via GitHub Actions

## 17.2 Key Learnings

- Cloud computing concepts and practical implementation
- Full-stack development with modern technologies
- DevOps practices and CI/CD pipelines
- Database design and management
- Security best practices
- Problem-solving in distributed systems

## 17.3 Project Scope Achievement

**The project scope "Create a Web App" has been FULLY ACHIEVED and EXCEEDED** by implementing:
- A production-ready e-commerce application
- Cloud deployment on multiple platforms
- Automated deployment pipelines
- Comprehensive documentation

---

# 18. References

1. **React Documentation** - https://react.dev
2. **Node.js Documentation** - https://nodejs.org/docs
3. **Express.js Guide** - https://expressjs.com
4. **MongoDB Documentation** - https://docs.mongodb.com
5. **Azure App Service Docs** - https://docs.microsoft.com/azure/app-service
6. **Vercel Documentation** - https://vercel.com/docs
7. **GitHub Actions** - https://docs.github.com/actions
8. **JWT Introduction** - https://jwt.io/introduction

---

## Appendix A: Live URLs

| Resource | URL |
|----------|-----|
| Live Website | https://shop-ease-psi-peach.vercel.app |
| API Endpoint | https://shopease-bula1-btdef3bwaacmgxd6.centralindia-01.azurewebsites.net |
| API Health | https://shopease-bula1-btdef3bwaacmgxd6.centralindia-01.azurewebsites.net/api/health |
| GitHub Repo | https://github.com/bilal-raza12/ShopEase |

## Appendix B: Test Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@shopease.com | Admin@123456 |
| User | Register new account | - |

---

**End of Project Report**
