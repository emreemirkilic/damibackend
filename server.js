const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// ROUTES
app.use('/api/auth',       require('./routes/auth'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/questions',  require('./routes/questions'));
app.use('/api/responses',  require('./routes/responses'));

// ROOT (health check)
app.get("/", (req, res) => {
  res.send("API WORKING");
});

// 🔐 ENV
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI tanımlı değil");
  process.exit(1);
}

// 👤 Admin seed
const seedAdmin = async () => {
  const Admin = require('./models/Admin');
  const bcrypt = require('bcryptjs');

  const count = await Admin.countDocuments();
  if (count === 0) {
    const hashed = await bcrypt.hash('admin123', 10);
    await Admin.create({ username: 'admin', password: hashed });
    console.log('✅ Default admin created → username: admin | password: admin123');
  }
};

// 🚀 START SERVER
const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected');

    await seedAdmin();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`✅ Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};

startServer();