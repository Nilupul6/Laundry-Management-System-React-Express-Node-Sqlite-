// Load environment variables from .env file
require("dotenv").config();
const session = require("express-session");

const express = require("express");
const cors = require("cors");
const db = require("./database/database.js"); // This will run the DB setup

const app = express();

// --- Middleware ---
// Enable Cross-Origin Resource Sharing (CORS)
app.use(
  cors({
    origin: "http://localhost:5173", // The address of your React app
    credentials: true, // This allows the browser to send cookies
  })
);
// Parse incoming JSON requests
app.use(express.json());

// Session Middleware (THIS IS THE CRITICAL PART)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "a-very-strong-secret",
    resave: false,
    saveUninitialized: false, // Don't create session until something is stored
    cookie: {
      secure: false, // Set to true if using HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// --- Simple Welcome Route ---
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Laundry Service API!" });
});

// --- API Routes ---
const authRoutes = require("./routes/auth.routes.js");
const orderRoutes = require("./routes/order.routes.js");
const itemRoutes = require("./routes/item.routes.js");

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/items", itemRoutes);

// --- Start the Server ---
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
