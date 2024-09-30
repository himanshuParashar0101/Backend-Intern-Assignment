require('dotenv').config();
const express = require('express');
const userRoutes = require('./src/routes/userRoutes');
const { connectDB } = require('./src/config/database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Database Connection
connectDB();

// User Routes
app.use('/api/users', userRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`User Service running on port ${PORT}`);
});
