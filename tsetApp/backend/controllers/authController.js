```javascript
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Ensure correct import of User model

exports.register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords must match' });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });
    
    const token = jwt.sign({ userId: user.id }, 'your_jwt_secret_key', { expiresIn: '1h' });
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while registering the user' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    const token = jwt.sign({ userId: user.id }, 'your_jwt_secret_key', { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while trying to login' });
  }
};
```