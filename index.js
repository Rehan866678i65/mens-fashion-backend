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


// ✅ MongoDB Connection
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.DATABASE_URL);

    isConnected = true;

    console.log("✅ MongoDB Connected");

  } catch (error) {
    console.log("❌ MongoDB Error:", error.message);
    throw error;
  }
};


// ✅ DB connect middleware (sirf ek baar)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.message
    });
  }
});


// ✅ CORS
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "https://mens-fashion-frontend-henna.vercel.app",
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


// ✅ Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(logger("dev"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


// ✅ Routes
app.use("/category", require("./routes/Categor.routes"));
app.use("/product", require("./routes/Product.routes"));
app.use("/order", require("./routes/Order.routes"));
app.use("/Brands", require("./routes/Brands.routes"));
app.use("/Orderitem", require("./routes/Orderitem.routes"));


// ✅ User Routes
app.use("/user", require("./routes/user.Routes"));


// ✅ Test routes
app.get("/", (req, res) => {
  res.send("✅ Backend API is running!");
});

app.get("/api/test", (req, res) => {
  res.json({
    success: true
  });
});


// ✅ Local server only
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}


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