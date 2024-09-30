const User = require('../models/userModel');
const jwtService = require('../services/jwtService');

// Register User
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = new User({ name, email, password });
        await user.save();
        const token = jwtService.generateToken(user._id);
        res.status(201).json({ token, message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Registration failed' });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const token = jwtService.generateToken(user._id);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};

// Get User Profile
exports.getUserProfile = (req, res) => {
    res.json(req.user);
};
