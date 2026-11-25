# ShopSphere – Full Stack E-Commerce Application

ShopSphere is a full-stack e-commerce web application developed using Java Spring Boot, React, and MySQL. It allows users to browse products, manage their shopping cart, place orders, and view their order history.

## 🚀 Technologies Used

### Backend
- Java
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- JWT Authentication
- Maven

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- React Router

### Database & Tools
- MySQL
- IntelliJ IDEA
- Visual Studio Code
- Postman
- Git & GitHub

## ✨ Features

### User Authentication
- User registration and login
- Password encryption using BCrypt
- JWT-based authentication
- Protected routes and API endpoints

### Product Management
- Display products dynamically
- Product and category management
- Search products
- Filter products by category

### Shopping Cart
- Add products to cart
- View cart items
- Remove products from cart

### Order Management
- Place orders
- View order history
- Automatic stock reduction after successful order
- Clear cart after successful checkout

### Frontend
- Responsive user interface
- Separate pages for Home, Products, Login, Register, Cart, and Orders
- Protected pages for authenticated users

## 📁 Project Structure

```text
shopsphere/
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── ...
│
├── src/
│   ├── main/
│   │   ├── java/com/shopsphere/
│   │   │   ├── config/
│   │   │   ├── controller/
│   │   │   ├── dto/
│   │   │   ├── entity/
│   │   │   ├── exception/
│   │   │   ├── repository/
│   │   │   ├── security/
│   │   │   └── service/
│   │   └── resources/
│   └── test/
│
├── pom.xml
└── README.md
```

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Shabuddin2005/shopsphere-ecommerce.git
cd shopsphere-ecommerce
```

### 2. Backend Setup

- Install Java and MySQL.
- Create a MySQL database.
- Configure your database connection.
- Set the required environment variables.

Required environment variables:

```text
DB_PASSWORD=your_mysql_password
JWT_SECRET=your_jwt_secret
```

The application uses these variables in `application.properties`.

Run the Spring Boot application:

```bash
.\mvnw.cmd spring-boot:run
```

Backend runs at:

`http://localhost:8080`

### 3. Frontend Setup

Open a terminal inside the frontend directory:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

`http://localhost:5173`

## 🔐 Security

- Passwords are encrypted using BCrypt.
- JWT is used for authentication.
- Protected APIs require valid authentication.
- Sensitive configuration values are stored using environment variables.

## 👨‍💻 Developer

**Shabuddin Shaik**

GitHub: https://github.com/Shabuddin2005

## 📌 Project

**ShopSphere – Full Stack E-Commerce Application**

Built to demonstrate full-stack development using Java Spring Boot, React, and MySQL.