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

/* ================= CORS (NODE 22 SAFE) ================= */
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://mini-e-commerce-c6xfu8dmi-azhars-projects-61cd967e.vercel.app",
  "https://mini-e-commerce-p4g0std0j-azhars-projects-61cd967e.vercel.app",
  "https://mini-e-commerce-dxoh.onrender.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("CORS not allowed"));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

/* ❌ VERY IMPORTANT
   DO NOT ADD:
   app.options("*", ...)
   router.options("*", ...)
*/

/* ================= ROUTES ================= */
app.use("/api/auth", authRoutes);

/* ================= ROOT ================= */
app.get("/", (req, res) => {
  res.json({ success: true, message: "Backend running 🚀" });
});

/* ================= ERROR ================= */
app.use(errorHandler);

module.exports = app;
