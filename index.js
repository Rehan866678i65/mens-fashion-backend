require('dotenv').config(); // Load environment variables

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// ✅ Allowed origins from .env
const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(',').map(url => url.trim())
  : [];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn("❌ Blocked by CORS:", origin);
      callback(null, false); // Don't throw error, just block
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Preflight support

// ✅ Log incoming origin
app.use((req, res, next) => {
  console.log("🌐 Incoming request from origin:", req.headers.origin);
  next();
});

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
app.use('/api', require('./routes/Login.routes'));
app.use('/api', require('./routes/protectedRoute'));

// ✅ Root test route
app.get("/", (req, res) => {
  res.send("✅ Backend API is running!");
});

// ✅ Connect to MongoDB and start server
const port = process.env.PORT || 5000;

const mongoDb = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('✅ Connected to MongoDB');

    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

mongoDb();

// ✅ 404 handler
app.use((req, res, next) => {
  next(createError(404));
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

module.exports = app;
