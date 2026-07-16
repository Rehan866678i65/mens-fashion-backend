// ✅ Load environment variables
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const createError = require("http-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

const app = express();

// ✅ CORS
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "https://starketfrontend.vercel.app",
      "http://localhost:5173",
      "http://localhost:5174"
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ limit: "10mb", extended: true }));


// ✅ Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// ✅ Routes
app.use("/category", require("./routes/Categor.routes"));
app.use("/product", require("./routes/Product.routes"));
app.use("/order", require("./routes/Order.routes"));
app.use("/Brands", require("./routes/Brands.routes"));
app.use("/Orderitem", require("./routes/Orderitem.routes"));
// app.use("/payment", require("./routes/payment.routes"));



// User Registion and login Routes

app.use("/user", require("./routes/user.Routes"));

app.use(express.json());

// ✅ Test routes
app.get("/", (req, res) => {
  res.send("✅ Backend API is running!");
});

app.get("/api/test", (req, res) => {
  res.json({ success: true });
});

// ✅ MongoDB + Server start
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB error:", err);
  })

// ✅ Error handling
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
});
module.exports = app;