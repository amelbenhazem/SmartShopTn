const User = require('../models/User');
const { generateToken } = require('../utils/jwt');
const { validationResult } = require('express-validator');

exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'client',
    });

    const token = generateToken(user._id);

    res.status(201).json({
      message: 'Inscription réussie',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user and include password
    const user = await User.findOne({ email }).select('+password');

    // Debug logs
    if (process.env.NODE_ENV === 'development') {
      console.log('🔐 Login attempt:', { email, userFound: !!user });
    }

    if (!user) {
      if (process.env.NODE_ENV === 'development') {
        console.log('❌ User not found:', email);
      }
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const isPasswordValid = await user.comparePassword(password);
    
    if (process.env.NODE_ENV === 'development') {
      console.log('🔑 Password check:', { isValid: isPasswordValid });
    }

    if (!isPasswordValid) {
      if (process.env.NODE_ENV === 'development') {
        console.log('❌ Invalid password for user:', email);
      }
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const token = generateToken(user._id);

    res.json({
      message: 'Connexion réussie',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


