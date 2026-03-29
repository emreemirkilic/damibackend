const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth',       require('./routes/auth'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/questions',  require('./routes/questions'));
app.use('/api/responses',  require('./routes/responses'));

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
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    seedAdmin();
    app.listen(process.env.PORT || 5000, '0.0.0.0', () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));
