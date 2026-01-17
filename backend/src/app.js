const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middlewares/errorMiddleware");

const app = express();

/* ================= BODY ================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= SECURITY ================= */
app.use(helmet());

/* ================= CORS (FINAL FIX) ================= */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",

      // ✅ VERCEL FRONTEND (CURRENT)
      "https://mini-e-commerce-1f1ikbrrl-azhars-projects-61cd967e.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

/* 🔥 PRE-FLIGHT MUST BE BEFORE ROUTES */
app.options("*", cors());

/* ================= ROUTES ================= */
app.use("/api/auth", authRoutes);

/* ================= ROOT ================= */
app.get("/", (req, res) => {
  res.json({ success: true, message: "Backend running 🚀" });
});

/* ================= ERROR ================= */
app.use(errorHandler);

module.exports = app;
