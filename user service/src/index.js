require('dotenv').config(); // This should be at the top of the file
console.log('Mongo URI:', process.env.MONGO_URI);
const express = require('express');
const userRoutes = require('./routes/userRoutes');  // Correct relative path
const { connectDB } = require('./config/database'); 

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
