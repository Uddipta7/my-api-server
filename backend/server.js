const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.MONGO_URI;

mongoose.connect(DB_URL)
  .then(() => console.log('✅ MongoDB Connected to Atlas'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

app.use('/api/items', require('./routes/itemRoutes'));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
