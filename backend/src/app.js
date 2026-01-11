const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes"); // ✅ ADD THIS

const app = express();

/* ---------- Middlewares ---------- */
app.use(express.json());
app.use(cors());
app.use(helmet());

/* ---------- Routes ---------- */
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes); // ✅ ADD THIS

/* ---------- Root ---------- */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Mini E-Commerce Backend is running",
  });
});

module.exports = app;
