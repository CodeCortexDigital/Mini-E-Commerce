const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const userRoutes = require("./routes/userRoutes");

const errorHandler = require("./middlewares/errorMiddleware");

const app = express();

/* ---------- Body Parsers ---------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------- CORS (FIXED & SAFE) ---------- */
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
      ];

      // Allow requests with no origin (Postman / Thunder Client)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

/* ---------- Security ---------- */
app.use(helmet());

/* ---------- Routes ---------- */
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/products", reviewRoutes);
app.use("/api/users", userRoutes);

/* ---------- Root ---------- */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Mini E-Commerce Backend is running",
  });
});

/* ---------- Health Check ---------- */
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
  });
});

/* ---------- Error Handler (MUST be last) ---------- */
app.use(errorHandler);

module.exports = app;
