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

/* ================= CORS (FIXED) ================= */
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://mini-e-commerce-c6xfu8dmi-azhars-projects-61cd967e.vercel.app",
  "https://mini-e-commerce-p4g0std0j-azhars-projects-61cd967e.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow postman / server to server
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* 🔥 VERY IMPORTANT — PRE-FLIGHT */
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
