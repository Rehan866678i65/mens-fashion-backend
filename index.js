// ✅ Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const app = express();

// ✅ Correctly load allowed origins
// const allowedOrigins = process.env.FRONTEND_URL
//   ? process.env.FRONTEND_URL.split(',').map(url => url.trim())
//   : [];

// const corsOptions = {
//   origin: function (origin, callback) {
//     // ✅ Allow if origin is in list OR origin is undefined (like in curl/Postman)
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       console.warn("❌ Blocked by CORS:", origin);
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// };

// // ✅ Use CORS
// app.use(cors(corsOptions));

// // ✅ Preflight support
// app.options("*", cors(corsOptions));

// // ✅ Log incoming requests
// app.use((req, res, next) => {
//   console.log("🌐 Request from:", req.headers.origin);
//   next();
// });
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:5173",
      // "http://localhost:5000"
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn("❌ CORS blocked:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Preflight at top
// ✅ यहां भी same corsOptions दो
 // Preflight


// ✅ Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Routes
app.use('/brand', require('./routes/Brand.routes'));
app.use('/Product', require('./routes/Product.routes'));
app.use('/SavedModel', require('./routes/SavedModel.routes'));
app.use('/Categoryl', require('./routes/Category.routes'));
app.use('/Areal', require('./routes/AddArea.routes'));
app.use('/SupportPerson', require('./routes/SupportPerson.routes'));
app.use('/TechnicalPerson', require('./routes/TechnicalPerson.routes'));
app.use('/Ticket', require('./routes/Ticket.routes'));
app.use('/Register', require('./routes/Register.routes'));
app.use('/Register2', require('./routes/Register2.routes'));
app.use('/api', require('./routes/Login.routes'));
app.use('/api', require('./routes/Login2.routes'));
app.use('/api', require('./routes/protectedRoute'));
app.use('/api/subscriptions', require('./routes/subscriptionRoutes'));

// ✅ Root route
app.get("/", (req, res) => {
  res.send("✅ Backend API is running!");
});
app.get("/api/test", (req, res) => {
  res.json({ message: "CORS and API working!" });
});

// ✅ MongoDB connect + Start server
const port = process.env.PORT || 5000;

const mongoDb = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('✅ Connected to MongoDB');
    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('❌ MongoDB error:', error);
    process.exit(1);
  }
};

mongoDb();

// ✅ 404 & error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

module.exports = app;
