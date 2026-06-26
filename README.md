# 🎬 Movie Ticket Booking System

## Overview

A full-stack Movie Ticket Booking System built using React.js, Spring Boot, PostgreSQL, JWT Authentication, and Docker.

The application allows users to browse movie shows, select theaters and seats, book tickets, manage reservations, and view booking history through an interactive dashboard. Administrators can monitor bookings, analyze theater statistics, manage cancellations, and oversee seat occupancy through a dedicated admin dashboard.

---

## 🚀 Features

### 👤 User Features
- User Registration & Login
- JWT-Based Authentication
- Browse Available Movie Shows
- Theater & Show Selection
- Interactive Seat Booking System
- Real-Time Seat Availability
- Available & Booked Seat Statistics
- Booking Confirmation Page
- Booking Dashboard
- Cancel Bookings
- Movie Poster Integration
- Entry & Exit Theater Indicators

### 🛡️ Admin Features
- Secure Admin Login
- View All User Bookings
- Booking Statistics Dashboard
- Theater Statistics
- Monitor Seat Occupancy
- Manage Booking Cancellations

### 🎭 Theater Features
- Dynamic Seat Generation
- Multiple Theaters
- Different Theater Capacities
- Real-Time Seat Availability
- Available & Booked Seat Statistics
- Entry & Exit Indicators
- Interactive Seat Selection Interface

---

## 🏗️ System Architecture

```text
React Frontend
      ↓
Spring Boot REST APIs
      ↓
PostgreSQL Database
```

### Authentication Flow

```text
User Login
    ↓
JWT Token Generated
    ↓
Token Stored in Browser
    ↓
Protected Routes Access
    ↓
Authenticated API Requests
```

---

## 🛠️ Tech Stack

### Frontend
- React.js
- JavaScript (ES6+)
- CSS3
- Axios
- React Router DOM

### Backend
- Spring Boot
- Java
- Spring Security
- Spring Data JPA
- REST APIs

### Database
- PostgreSQL

### Security
- JWT Authentication
- Role-Based Access Control (RBAC)

### DevOps
- Docker
- Docker Compose

### Tools
- Git
- GitHub
- Postman
- VS Code

---

## 📂 Project Structure

```text
movie-ticket-booking-system/

├── backend/
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── model/
│   ├── security/
│   ├── config/
│   └── Dockerfile
│
├── ticket-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── assets/
│   │   └── styles/
│   └── Dockerfile
│
├── docker-compose.yml
├── README.md
└── screenshots/
```

---

## 📸 Screenshots

### Login Page
Role-based login interface with User and Admin access.

### Register Page
New user registration page.

### User Dashboard
View booking history, movie posters, and booking statistics.

### Seat Booking Page
Interactive theater seat selection with real-time availability.

### Booking Confirmation Page
Dedicated booking success page displaying movie, theater, seats, and booking amount.

### Admin Dashboard
Monitor bookings and theater statistics.

---

## 🔐 Security

The application uses JWT Authentication for secure access.

### Authentication Features

- Secure Login
- JWT Token Generation
- Protected Routes
- Role-Based Authorization
- Session Validation

---

## 🐳 Run Using Docker

### Build and Start Containers

```bash
docker compose up --build -d
```

### Stop Containers

```bash
docker compose down
```

### View Running Containers

```bash
docker ps
```

---

## ▶️ Run Locally

### Backend

```bash
cd backend

mvn clean install

mvn spring-boot:run
```

### Frontend

```bash
cd ticket-frontend

npm install

npm start
```

Frontend URL:

```text
http://localhost:3000
```

Backend URL:

```text
http://localhost:8083
```

---

## 📊 Core Modules

### Authentication Module
- User Login
- Admin Login
- JWT Security

### Booking Module
- Seat Selection
- Ticket Booking
- Booking Confirmation Page
- Booking Cancellation
- Seat Availability Statistics

### Dashboard Module
- User Statistics
- Booking Overview
- Movie Information

### Admin Module
- Booking Management
- Theater Monitoring
- Statistics Dashboard

---

## 🔮 Future Improvements

- Online Payment Gateway Integration
- Email Ticket Confirmation
- QR Code-Based Tickets
- Movie Search & Filtering
- Responsive Mobile Design
- Notification System
- Theater Analytics
- Booking Reports
- Dark Mode Support

---

## 🎯 Learning Outcomes

Through this project, I gained hands-on experience in:

- Full Stack Development
- React.js Frontend Development
- Spring Boot Backend Development
- REST API Design
- JWT Authentication
- PostgreSQL Database Management
- Docker Containerization
- Git & GitHub Workflow
- Frontend and Backend Integration
- Role-Based Access Control
- UI/UX Design and Frontend Optimization

---

## 👨‍💻 Author

**Sunil Kamatham**

Computer Science Student | Full Stack Developer

GitHub: https://github.com/kamathamsunil9

---
