# 🎬 Movie Ticket Booking System

## 📌 Project Overview

A full-stack **Movie Ticket Booking System** developed using **React.js**, **Spring Boot**, **PostgreSQL**, **Spring Security**, **BCrypt Authentication**, and **Docker**.

The application allows users to browse movie shows, select theaters and seats, book tickets, manage reservations, and view booking history through an interactive dashboard. Administrators can monitor bookings, manage reservations, and analyze theater statistics through a dedicated admin dashboard.

---

# 🚀 Features

## 👤 User Features

- User Registration & Login
- BCrypt Password Encryption
- Role-Based Authentication
- Browse Available Movie Shows
- Theater & Show Selection
- Interactive Seat Booking System
- Real-Time Seat Availability
- Available & Booked Seat Statistics
- Booking Confirmation
- Booking Dashboard
- Cancel Bookings
- Movie Poster Integration
- Entry & Exit Theater Indicators

---

## 🛡️ Admin Features

- Secure Admin Login
- Role Validation
- View All User Bookings
- Booking Statistics Dashboard
- Theater Statistics
- Monitor Seat Occupancy
- Manage Booking Cancellations

---

## 🎭 Theater Features

### PVR Chennai
- Movie: **Salaar**
- Time: **10:00 AM**
- Capacity: **100 Seats**

### INOX Bangalore
- Movie: **RRR**
- Time: **02:00 PM**
- Capacity: **120 Seats**

### Cinepolis Hyderabad
- Movie: **Pushpa 2**
- Time: **06:00 PM**
- Capacity: **110 Seats**

### AGS Chennai
- Movie: **Peddi**
- Time: **09:00 PM**
- Capacity: **140 Seats**

---

# 🏗️ System Architecture

```text
React Frontend
        ↓
Spring Boot REST APIs
        ↓
PostgreSQL Database
```

---

# 🔐 Authentication Flow

```text
User/Admin Login
        ↓
Email Validation
        ↓
Role Validation
        ↓
BCrypt Password Verification
        ↓
Authentication Success
        ↓
Dashboard Access
```

---

# 🛠️ Tech Stack

## Frontend
- React.js
- JavaScript (ES6+)
- CSS3
- Axios
- React Router DOM

## Backend
- Spring Boot
- Java
- Spring Security
- Spring Data JPA
- REST APIs

## Database
- PostgreSQL

## Security
- BCrypt Password Hashing
- Role-Based Access Control (RBAC)
- Spring Security

## DevOps
- Docker
- Docker Compose
- Docker Volumes

## Tools
- Git
- GitHub
- Postman
- VS Code

---

# 📂 Project Structure

```text
movie-ticket-booking-system/

├── ticket-booking-system/
│   └── ticket-booking-system/
│       ├── src/
│       │   ├── main/
│       │   │   ├── java/
│       │   │   └── resources/
│       │   └── test/
│       ├── Dockerfile
│       └── pom.xml
│
├── ticket-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   └── services/
│   └── Dockerfile
│
├── docker-compose.yml
├── README.md
└── screenshots/
```

---

# 📸 Screenshots

### Login Page
- User/Admin Role Selection
- BCrypt Authentication
- Role Validation

### Register Page
- New User Registration

### Seat Booking Page
- Interactive Seat Selection
- Real-Time Seat Availability
- Theater Statistics

### Booking Confirmation Page
- Movie Details
- Theater Details
- Selected Seats
- Total Price

### User Dashboard
- Booking History
- Movie Posters
- Booking Statistics

### Admin Dashboard
- Booking Management
- Theater Monitoring
- Statistics Dashboard

---

# 🐳 Docker Architecture

```text
Docker Compose
       │
       ├── Frontend Container (React)
       ├── Backend Container (Spring Boot)
       └── PostgreSQL Container
               │
               └── Persistent Docker Volume
```

---

# 🐳 Run Using Docker

## Build and Start

```bash
docker compose up --build -d
```

## Start Existing Containers

```bash
docker compose up -d
```

## Stop Containers

```bash
docker compose down
```

## View Running Containers

```bash
docker ps
```

---

# ▶️ Run Locally

## Backend

```bash
cd ticket-booking-system/ticket-booking-system

mvn clean install

mvn spring-boot:run
```

Backend URL:

```text
http://localhost:8083
```

---

## Frontend

```bash
cd ticket-frontend

npm install

npm start
```

Frontend URL:

```text
http://localhost:3000
```

---

# 📊 Database Design

## Tables

- users
- shows
- seats
- bookings
- booking_seats
- movie

---

# 🎯 Core Modules

## Authentication Module
- User Login
- Admin Login
- BCrypt Authentication
- Role Validation

## Booking Module
- Theater Selection
- Seat Selection
- Ticket Booking
- Booking Confirmation
- Booking Cancellation

## Dashboard Module
- Booking History
- Movie Information
- Booking Statistics

## Admin Module
- Booking Management
- Seat Monitoring
- Theater Statistics

---

# 🔮 Future Improvements

- Payment Gateway Integration
- QR Code Tickets
- Email Ticket Confirmation
- Movie Search & Filters
- Notification System
- Booking Reports
- Responsive Mobile Design
- Dark Mode Support
- Theater Analytics

---

# 🎓 Learning Outcomes

Through this project, I gained practical experience in:

- Full Stack Development
- React.js Development
- Spring Boot Development
- REST API Design
- PostgreSQL Database Design
- Spring Security
- BCrypt Authentication
- Role-Based Access Control
- Docker Containerization
- Docker Compose
- Persistent Docker Volumes
- Git & GitHub Workflow
- Frontend-Backend Integration
- UI/UX Design

---

# 👨‍💻 Author

**Sunil Kamatham**

Computer Science Student | Full Stack Developer

GitHub: https://github.com/kamathamsunil9
