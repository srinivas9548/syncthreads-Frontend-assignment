# React Frontend Development

## **Overview**
This project is a React-based frontend application that includes user authentication, a dashboard with interactive cards, and a map view displaying the map of India.

---

## Features

### 1. Login Page  
- User interface with input fields for username and password.  
- Submit button for login.  
- Stores JWT token upon successful login.  

### 2. Dashboard  
- Displays card components, each with a unique ID.  
- Fetches data from the backend API.  
- Clicking on a card navigates to the Map View.  

### 3. Map View  
- Displays a map of India using Leaflet.  
- Allows zooming in and out.  
- Highlights the border when the map is opened.  
- Shows the country name at the top of the page.  

---

## Routing  
- Uses React Router for navigation between Login, Dashboard, and Map View.  
- Redirects users to the dashboard upon successful login.  
- Prevents unauthorized access and shows a "User not logged in" message if needed.  

---

## API Integration  
- Fetches dashboard data from the backend.  
- Fetches map details using the backend API.  
- Uses JWT authentication for secure API calls.  

### Backend API  
- **Base URL:** `https://srinivas-syncthreads-backend-assignment.vercel.app`  
- **Endpoints:**  
  - `/api/login` – User authentication  
  - `/api/dashboard` – Fetches dashboard data  
  - `/api/map` – Fetches map details  

---
## **Setup Instructions**
### **1. Clone the Repository**
```sh
git clone https://github.com/srinivas9548/syncthreads-Frontend-assignment.git
cd syncthreads-Frontend-assignment
```

### **2. Install dependencies:**
```sh
npm install
```

### **3. Start the development server:**
```sh
npm start
```

