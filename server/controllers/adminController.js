const Admin = require('../models/Admin');
const Contact = require('../models/Contact');
const Quote = require('../models/Quote');
const Newsletter = require('../models/Newsletter');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.setupAdmin = async (req, res) => {
  try {
    const adminExists = await Admin.findOne();
    if (adminExists) {
      return res.status(400).json({ error: 'Admin already exists' });
    }
    const { username, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const admin = new Admin({ username, password: hashedPassword });
    await admin.save();
    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const payload = { admin: { id: admin.id } };
    const JWT_SECRET = process.env.JWT_SECRET || 'secret123';
    
    jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete contact' });
  }
};

exports.getQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quotes' });
  }
};

exports.deleteQuote = async (req, res) => {
  try {
    await Quote.findByIdAndDelete(req.params.id);
    res.json({ message: 'Quote deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete quote' });
  }
};

exports.getNewsletters = async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ createdAt: -1 });
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subscribers' });
  }
};
