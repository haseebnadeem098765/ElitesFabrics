require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const compression = require('compression');

const Contact = require('./models/Contact');
const Quote = require('./models/Quote');
const Newsletter = require('./models/Newsletter');
const Admin = require('./models/Admin');
const Content = require('./models/Content');
const User = require('./models/User'); // Import User model
const auth = require('./middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


const app = express();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER || 'elitesfabrics@gmail.com',
    pass: process.env.EMAIL_PASS || 'vaxg bgzj bymb igru'
  }
});

const sendNotificationEmail = async (subject, htmlContent) => {
  try {
    const adminEmail = process.env.EMAIL_ADMIN || 'elitesfabrics@gmail.com';
    console.log(`[AUTH-DEBUG] Attempting to send Admin Notification: ${subject} to ${adminEmail}`);

    await transporter.sendMail({
      from: `"Stitcheerr Website" <${process.env.EMAIL_USER || 'elitesfabrics@gmail.com'}>`,
      to: adminEmail,
      subject: subject,
      html: htmlContent
    });
    console.log(`📧 [AUTH-DEBUG] Admin Notification Sent Successfully: ${subject}`);
  } catch (error) {
    console.error(`❌ [AUTH-DEBUG] Failed to send Admin Notification:`, error.message);
  }
};

// Ensure uploads directory exists
if (!fs.existsSync(path.join(__dirname, 'uploads'))) {
  fs.mkdirSync(path.join(__dirname, 'uploads'));
}

// Multer Config (Using memory storage for Cloudinary)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// Middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.use(express.json());
app.use(compression());
app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  maxAge: '1d',
  immutable: false
})); 

// Serve other static assets with long-term caching (if applicable)
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1y',
  etag: true
}));


// Database connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/elites-fabrics';
mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    // Ensure default admin exists
    try {
      const adminExists = await Admin.findOne();
      if (!adminExists) {
        const adminUser = process.env.ADMIN_USER || 'admin';
        const adminPass = process.env.ADMIN_PASS || 'admin123';
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(adminPass, salt);
        await new Admin({ username: adminUser, password: hashedPassword }).save();
        console.log(`Default Admin created -> Username: ${adminUser}, Password: [PROTECTED]`);
      }
    } catch (err) {
      console.error('Failed to initialize default admin', err);
    }
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Routes (Protected with auth)
app.post('/api/contact', auth, async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();

    const { fullName, companyName, emailAddress, phoneNumber, fabricInterest, requirements } = req.body;
    const html = `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2 style="color: #1e3a8a;">New Contact Inquiry</h2>
        
        <div style="background: #fdf2f8; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 5px solid #db2777;">
          <h3 style="margin-top:0; color: #9d174d;">Contact Details</h3>
          <p><strong>Full Name:</strong> ${fullName}</p>
          <p><strong>Email Address:</strong> ${emailAddress}</p>
          <p><strong>Phone Number:</strong> ${phoneNumber}</p>
          <p><strong>Company:</strong> ${companyName || 'N/A'}</p>
        </div>

        <div style="background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 5px solid #1e3a8a;">
          <h3 style="margin-top:0; color: #1e3a8a;">Inquiry Details</h3>
          <p><strong>Fabric Interest:</strong> ${fabricInterest || 'Not specified'}</p>
          <p><strong>Requirements:</strong><br/> ${requirements}</p>
        </div>

        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin-top: 20px;"/>
        <p style="font-size: 12px; color: #64748b;">This inquiry was sent automatically from your website contact form.</p>
      </div>
    `;
    await sendNotificationEmail(`New Contact: ${fullName} (${companyName || 'Individual'})`, html);

    res.status(201).json({ message: 'Contact inquiry submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to submit contact inquiry' });
  }
});

app.post('/api/quote', auth, async (req, res) => {
  try {
    const quote = new Quote(req.body);
    await quote.save();

    // Fetch full user details for the email
    const fullUser = await User.findById(req.user.id);
    const userName = fullUser ? fullUser.name : 'Unknown';
    const userEmail = fullUser ? fullUser.email : 'Unknown';
    const userPhone = fullUser ? fullUser.phone : 'Unknown';

    const { fabricCollection, specificColor, quantity, projectDetails } = req.body;
    const html = `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2 style="color: #1e3a8a;">New Bulk Quote Request</h2>
        
        <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="margin-top:0; color: #334155;">Customer Contact Details</h3>
          <p><strong>Name:</strong> ${userName}</p>
          <p><strong>Email:</strong> ${userEmail}</p>
          <p><strong>Phone Number:</strong> ${userPhone}</p>
        </div>

        <div style="background: #eff6ff; padding: 15px; border-radius: 8px;">
          <h3 style="margin-top:0; color: #1e40af;">Order Specifications</h3>
          <p><strong>Fabric Collection:</strong> ${fabricCollection || 'Not specified'}</p>
          <p><strong>Specific Color:</strong> ${specificColor || 'Not specified'}</p>
          <p><strong>Quantity Requirements:</strong> ${quantity} Meters</p>
          <p><strong>Project Details:</strong><br/> ${projectDetails}</p>
        </div>

        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin-top: 20px;"/>
        <p style="font-size: 12px; color: #64748b;">This request was submitted by a registered user from your website quote form.</p>
      </div>
    `;
    await sendNotificationEmail(`New Quote Request for ${fabricCollection || 'Fabric'} - From ${userName}`, html);

    res.status(201).json({ message: 'Quote request submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to submit quote request' });
  }
});

app.post('/api/newsletter', async (req, res) => {
  try {
    const newsletter = new Newsletter({ email: req.body.email });
    await newsletter.save();
    res.status(201).json({ message: 'Subscribed successfully!' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email already subscribed' });
    }
    console.error(error);
    res.status(500).json({ error: 'Failed to subscribe to newsletter' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// User Authentication Routes
app.post('/api/user/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    console.log(`[AUTH-DEBUG] Registration attempt for: ${email}`);

    // Basic validation
    if (!name || !email || !password || !phone) {
      console.log(`[AUTH-DEBUG] Validation failed: Missing fields`);
      return res.status(400).json({ error: 'Please provide name, email, phone, and password' });
    }

    // Check if user already exists in the real collection
    let user = await User.findOne({ 
        $or: [{ email }, { phone }] 
    });
    if (user) {
      const field = user.email === email ? 'Email' : 'Phone number';
      console.log(`[AUTH-DEBUG] User already exists: ${field}`);
      return res.status(400).json({ error: `${field} is already registered.` });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate Verification Code
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    console.log(`[AUTH-DEBUG] Generated OTP: ${otp}`);
    
    // Create a temporary token containing user info and code (expires in 15 mins)
    const registrationToken = jwt.sign(
        { name, email, phone, password: hashedPassword, otp },
        process.env.JWT_SECRET || 'secret123',
        { expiresIn: '15m' }
    );

    // Send email with auto-generated code
    const html = `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2 style="color: #1e3a8a;">Welcome to Elites Fabrics!</h2>
        <p>Dear ${name},</p>
        <p>Thank you for registering. Please verify your email using the OTP below:</p>
        <h1 style="color: #1e3a8a; font-size: 32px; letter-spacing: 5px;">${otp}</h1>
        <p>This code will expire in 15 minutes.</p>
        <hr/>
        <p style="font-size: 12px; color: #555;">If you did not request this, please ignore this email.</p>
      </div>
    `;

    console.log(`[AUTH-DEBUG] Attempting to send OTP email to recipient: ${email}`);
    try {
      const emailResult = await transporter.sendMail({
        from: `"Elites Fabrics" <${process.env.EMAIL_USER || 'elitesfabrics@gmail.com'}>`,
        to: email, 
        subject: `Your Registration OTP Code`,
        html: html
      });
      console.log(`[AUTH-DEBUG] Email sent successfully to ${email}! MessageID: ${emailResult.messageId}`);
    } catch (err) {
      console.error(`[AUTH-DEBUG] EMAIL SENDING FAILED for ${email}:`, err.message);
      return res.status(500).json({ error: `Failed to send verification code to ${email}. Please check your email and try again.` });
    }

    // Return the token to the frontend (it will be used during verification)
    console.log(`[AUTH-DEBUG] Registration step successful for: ${email}`);
    res.json({ 
        requiresVerification: true, 
        email, 
        registrationToken,
        message: 'Verification code sent to your email.' 
    });

  } catch (error) {
    console.error(`[AUTH-DEBUG] REGISTRATION CRITICAL ERROR:`, error);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

app.post('/api/user/verify-email', async (req, res) => {
  try {
    const { code, registrationToken } = req.body;
    if (!code || !registrationToken) {
        return res.status(400).json({ error: 'Verification code and token are required' });
    }

    // Verify the temporary registration token
    let decoded;
    try {
        decoded = jwt.verify(registrationToken, process.env.JWT_SECRET || 'secret123');
    } catch (err) {
        return res.status(400).json({ error: 'Verification session expired. Please register again.' });
    }

    const { name, email, phone, password, otp } = decoded;

    // Check if OTP matches
    if (otp !== code) {
      return res.status(400).json({ error: 'Invalid verification code' });
    }

    // Final check if user was created while verifying (rare race condition)
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    // NOW SAVE THE USER TO THE DATABASE
    const newUser = new User({
        name,
        email,
        phone,
        password,
        isVerified: true
    });
    await newUser.save();

    console.log(`[Verify] - User saved to DB: ${email}`);

    // Generate Login Token
    const payload = { user: { id: newUser.id, name: newUser.name } };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret123', { expiresIn: '7d' });
    
    res.json({ 
        token, 
        user: { id: newUser.id, name: newUser.name, email: newUser.email, phone: newUser.phone },
        message: 'Account verified and created successfully!' 
    });

  } catch (error) {
    console.error(`[Verify Error]`, error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/user/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    if (!user.isVerified) return res.status(403).json({ error: 'Please verify your email to login' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const payload = { user: { id: user.id, name: user.name } };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret123', { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, phone: user.phone } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/user/google-login', async (req, res) => {
  try {
    const { tokenId } = req.body;
    const ticket = await googleClient.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { name, email, sub: googleId } = ticket.getPayload();

    let user = await User.findOne({ $or: [{ googleId }, { email }] });
    if (!user) {
      user = new User({ name, email, googleId, isVerified: true });
      await user.save();
    } else if (!user.googleId || !user.isVerified) {
      user.googleId = googleId;
      user.isVerified = true; // Auto-verify email
      await user.save();
    }

    const payload = { user: { id: user.id, name: user.name } };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret123', { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, phone: user.phone } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Google login failed' });
  }
});

// Admin Authentication Routes
app.post('/api/admin/setup', async (req, res) => {
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
});

app.post('/api/admin/login', async (req, res) => {
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
});

// Admin File Upload Route (To Cloudinary)
app.post('/api/upload', auth, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Use Cloudinary to upload the buffer
  const uploadStream = cloudinary.uploader.upload_stream(
    { folder: 'stitcheerr_uploads' }, // Optional: separate folder
    (error, result) => {
      if (error) {
        console.error('Cloudinary upload error:', error);
        return res.status(500).json({ error: 'Failed to upload image to Cloudinary' });
      }
      res.json({ imageUrl: result.secure_url });
    }
  );

  uploadStream.end(req.file.buffer);
});


// Protected Admin Routes to view submissions
app.get('/api/admin/contacts', auth, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }).lean();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});
app.delete('/api/admin/contacts/:id', auth, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});

app.get('/api/admin/quotes', auth, async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 }).lean();
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quotes' });
  }
});
app.delete('/api/admin/quotes/:id', auth, async (req, res) => {
  try {
    await Quote.findByIdAndDelete(req.params.id);
    res.json({ message: 'Quote deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete quote' });
  }
});

app.get('/api/admin/newsletters', auth, async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ createdAt: -1 }).lean();
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subscribers' });
  }
});
app.delete('/api/admin/newsletters/:id', auth, async (req, res) => {
  try {
    await Newsletter.findByIdAndDelete(req.params.id);
    res.json({ message: 'Subscriber deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete subscriber' });
  }
});

// Content CMS Cache
let contentCache = null;
let lastCacheUpdate = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Content CMS Routes
// GET dynamic content (Public)
app.get('/api/content', async (req, res) => {
  try {
    const now = Date.now();
    if (contentCache && (now - lastCacheUpdate < CACHE_DURATION)) {
      return res.json(contentCache);
    }

    const content = await Content.find().lean();
    // Format into a friendly dictionary: { page: { section: data } }
    const formattedContent = {};
    content.forEach(item => {
      if (!formattedContent[item.page]) {
        formattedContent[item.page] = {};
      }
      formattedContent[item.page][item.section] = item.data;
    });

    contentCache = formattedContent;
    lastCacheUpdate = now;
    res.json(formattedContent);
  } catch (error) {
    console.error('Fetch content error:', error);
    res.status(500).json({ error: 'Failed to fetch content', details: error.message });
  }
});

// POST/Update dynamic content (Protected)
app.post('/api/content', auth, async (req, res) => {
  try {
    const { page, section, data } = req.body;
    let content = await Content.findOne({ page, section });
    
    if (content) {
      content.data = data;
      await content.save();
    } else {
      content = new Content({ page, section, data });
      await content.save();
    }
    
    // Invalidate cache on update
    contentCache = null;
    
    res.json({ message: 'Content updated successfully', content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update content' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// ==========================================
// 🚀 KEEP-ALIVE LOGIC (For Render Free Tier)
// ==========================================
const SERVER_URL = process.env.SERVER_URL;
if (SERVER_URL) {
  setInterval(() => {
    fetch(`${SERVER_URL}/api/health`)
      .then(() => console.log('Ping successful: Server is awake!'))
      .catch(err => console.error('Ping failed:', err.message));
  }, 14 * 60 * 1000); // Har 14 minute baad ping karega
}
