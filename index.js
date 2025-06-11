require('dotenv').config(); // Load environment variables

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

// Routes
const BrandRoutes = require('./routes/Brand.routes');
const ProductRoutes = require('./routes/Product.routes');
const SavedModelRoutes = require('./routes/SavedModel.routes');
const CategorylRoutes = require('./routes/Category.routes');
const AddArealRoutes = require('./routes/AddArea.routes');
const SupportPersonRoutes = require('./routes/SupportPerson.routes');
const TechnicalPersonRoutes = require('./routes/TechnicalPerson.routes');
const TicketPersonRoutes = require('./routes/Ticket.routes');
const RegisterRoutes = require('./routes/Register.routes');
const loginRoutes = require('./routes/Login.routes');
const protectedRoutes = require('./routes/protectedRoute');

const app = express();

// Enable CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use Routes
app.use('/brand', BrandRoutes);
app.use('/Product', ProductRoutes);
app.use('/SavedModel', SavedModelRoutes);
app.use('/Categoryl', CategorylRoutes);
app.use('/Areal', AddArealRoutes);
app.use('/SupportPerson', SupportPersonRoutes);
app.use('/TechnicalPerson', TechnicalPersonRoutes);
app.use('/Ticket', TicketPersonRoutes);
app.use('/Register', RegisterRoutes);
app.use('/api', loginRoutes);
app.use('/api', protectedRoutes);

// MongoDB connection and server start
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

// Catch 404
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.send({ error: err.message }); // You can use res.render if using EJS
});

module.exports = app;
