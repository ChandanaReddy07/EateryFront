# Restaurant App - MERN Stack

Welcome to the Restaurant App, a full-stack web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. This application simulates the process of dining at a restaurant, allowing users to view the menu, place orders, calculate bills, and pay online.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Demo

You can access the live demo of the application here: [Live Demo](https://eatery-front.vercel.app/)

## Features

- **User Authentication:** Users can sign up and log in to the application.
- **Menu Viewing:** Users can view the restaurant's menu, including item names and prices.
- **Order Placement:** Users can add items to their orders, specify quantities, and place orders.
- **Bill Calculation:** The application automatically calculates the bill, including the subtotal and tip.
- **Payment Processing:** Users can pay their bills online using secure payment methods.
- **PDF Bill Generation:** A PDF bill is generated for each order, including all details.
- **User-Friendly Interface:** The application provides an intuitive and visually appealing user interface.

## Technologies Used

- **Frontend:**
  - React.js
  - HTML5
  - CSS3

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (MongoDB Atlas)

- **Payment Gateway:**
  - [Razorpay](https://razorpay.com/)

- **PDF Generation:**
  - [jsPDF](https://github.com/MrRio/jsPDF)
  - [jspdf-autotable](https://github.com/simonbengtsson/jsPDF-AutoTable)

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed locally.
- MongoDB database connection or a MongoDB Atlas account.
- Razorpay account for payment processing.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/restaurant-app.git
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Set up the environment variable
   ```
   # MongoDB connection URL
   MONGO_URI=your-mongodb-uri

   # Razorpay API keys
   KEY_ID=your-razorpay-key-id
   KEY_SECRET=your-razorpay-secret-key
      
4. Star the frontend development server:
   ```bash
   npm start
   ```
   
