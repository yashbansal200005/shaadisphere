import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';



// REGISTER
const registerUser = async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email or phone already in use.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({ email, phone, password: hashedPassword });
    await newUser.save();
     const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ success: true,token, message: 'User registered successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// LOGIN
const loginUser = async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;
    // console.log('JWT_SECRET from env during Login:', process.env.JWT_SECRET);
    // Find user by email or phone
    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }]
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials.' });
    }

  
     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });


    res.json({
      success: true,
      message: 'Login successful.',
      token,
      user: {
        id: user._id,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

export { registerUser, loginUser };
