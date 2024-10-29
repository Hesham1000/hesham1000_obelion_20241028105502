```javascript
const express = require('express');
const router = express.Router();
const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize
const sequelize = new Sequelize('tsetApp', 'root', 'root', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
});

// Define User model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'users',
  timestamps: false
});

// Register route
router.post('/register', async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (!username || !email || !password || password !== confirmPassword) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  try {
    await sequelize.authenticate();
    const user = await User.create({ username, email, password });
    res.status(201).json({ message: 'Registration successful', user });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    await sequelize.authenticate();
    const user = await User.findOne({ where: { email, password } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
```