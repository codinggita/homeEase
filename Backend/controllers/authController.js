const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = require('../data/users');

// @desc    Register a user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { name, phone, email, password, userType } = req.body;

    // Check if user exists with the exact same role
    const userExists = users.find(u => u.email === email && u.userType === userType);

    if (userExists) {
      return res.status(400).json({ success: false, message: 'Email is already registered for this role' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = {
      id: Date.now().toString(),
      name,
      phone,
      email,
      password: hashedPassword,
      userType
    };

    users.push(newUser);

    // Create token for immediate login
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '30d'
    });

    res.status(201).json({
      success: true,
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        userType: newUser.userType
      }
    });
  } catch (error) {
    console.error('Error in register:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    // Admin bypass check
    if (email === 'admin@gmail.com' && password === '123456') {
       // Issue a special admin token
       const token = jwt.sign({ id: 'admin', role: 'admin' }, process.env.JWT_SECRET || 'secret', {
         expiresIn: '30d'
       });
       return res.status(200).json({
         success: true,
         token,
         user: { email: 'admin@gmail.com', userType: 'admin' }
       });
    }

    // Check if any account with this email exists
    const userWithEmail = users.filter(u => u.email === email);
    
    if (userWithEmail.length === 0) {
      return res.status(401).json({ success: false, message: 'Account not found. Please sign up first.' });
    }

    // Now find the specific one for this role
    const user = userWithEmail.find(u => u.userType === userType);

    if (!user) {
       // This means they have an account, but not for the selected role
       const existingRole = userWithEmail[0].userType;
       return res.status(401).json({ 
         success: false, 
         message: `Account type mismatch. You signed up as '${existingRole === 'want_to_help' ? 'I want to help' : 'I need help'}'. Please select the correct role.` 
       });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Incorrect password' });
    }

    // Create token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '30d'
    });

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        userType: user.userType
      }
    });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
