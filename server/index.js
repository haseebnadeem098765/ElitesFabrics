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
      from: `"ElitesFabrics Website" <${process.env.EMAIL_USER || 'elitesfabrics@gmail.com'}>`,
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
  origin:process.env.CLIENT_URL, 
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
    // DON'T AWAIT: Send email in the background to avoid blocking the client response
    sendNotificationEmail(`New Contact: ${fullName} (${companyName || 'Individual'})`, html)
      .catch(err => console.error('Background Email Failed (Contact):', err.message));

    res.status(201).json({ message: 'Contact inquiry submitted successfully!' });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ error: 'Failed to submit contact inquiry' });
  }
});

app.post('/api/quote', auth, async (req, res) => {
  try {
    const { name, email, phone, organization, fabricType, quantity, message } = req.body;
    
    // Create new quote explicitly
    const quote = new Quote({
      name,
      email,
      phone,
      organization,
      fabricType,
      quantity,
      message
    });
    
    await quote.save();

    const html = `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2 style="color: #1e3a8a;">New Bulk Quote Request</h2>
        
        <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="margin-top:0; color: #334155;">Customer Contact Details</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone Number:</strong> ${phone}</p>
          <p><strong>Organization:</strong> ${organization || 'N/A'}</p>
        </div>

        <div style="background: #eff6ff; padding: 15px; border-radius: 8px;">
          <h3 style="margin-top:0; color: #1e40af;">Order Specifications</h3>
          <p><strong>Fabric Type:</strong> ${fabricType || 'Not specified'}</p>
          <p><strong>Quantity Requirements:</strong> ${quantity} Meters</p>
          <p><strong>Message / Project Details:</strong><br/> ${message || 'N/A'}</p>
        </div>

        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin-top: 20px;"/>
        <p style="font-size: 12px; color: #64748b;">This request was submitted from your website quote form.</p>
      </div>
    `;
    
    // DON'T AWAIT: Send email in the background to avoid blocking the client response
    sendNotificationEmail(`New Quote Request for ${fabricType || 'Fabric'} - From ${name}`, html)
      .catch(err => console.error('Background Email Failed (Quote):', err.message));

    res.status(201).json({ message: 'Quote request submitted successfully!' });
  } catch (error) {
    console.error('Quote submission error:', error);
    res.status(500).json({ error: `Failed to submit quote request (Ver 2.1): ${error.message}` });
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
  console.log('[DEBUG] Register POST received:', req.body);
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
      return res.status(500).json({ error: `Verification code failed to send. Please check your email and try again.` });
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
  console.log('[DEBUG] Login POST received:', req.body.email);
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid Email Or Password' });

    if (!user.isVerified) return res.status(403).json({ error: 'Please verify your email to login' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Incorrect Password' });

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
    let payload = null;

    try {
        // Primary attempt using the library
        const ticket = await googleClient.verifyIdToken({
          idToken: tokenId,
          audience: process.env.GOOGLE_CLIENT_ID,
        });
        payload = ticket.getPayload();
    } catch (libError) {
        console.warn('[AUTH] googleClient.verifyIdToken failed, falling back to fetch api:', libError.message);
        // Fallback: Using direct HTTP call which bypasses library bugs (Node 18 fetch)
        const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${tokenId}`);
        if (!response.ok) throw new Error('Token verification failed via HTTP fallback');
        payload = await response.json();
    }

    const { name, email, sub: googleId } = payload;
    
    if (!email) {
      return res.status(400).json({ error: 'Google account must have an email associated.' });
    }

    let user = await User.findOne({ $or: [{ googleId }, { email }] });
    if (!user) {
      user = new User({ name, email, googleId, isVerified: true });
      await user.save();
    } else if (!user.googleId || !user.isVerified) {
      user.googleId = googleId;
      user.isVerified = true; // Auto-verify email
      await user.save();
    }

    const jwtPayload = { user: { id: user.id, name: user.name } };
    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET || 'secret123', { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, phone: user.phone || '' } });
  } catch (error) {
    console.error('[AUTH DEBUG] Final Google login catch block:', error);
    res.status(500).json({ error: `Google login failed: ${error.message || 'Unknown error'}` });
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

app.post('/api/admin/seed-default', async (req, res) => {
  try {
    const seedData = [
      // Global Settings
      { 
        page: 'global', 
        section: 'config', 
        data: { 
          logo: 'https://res.cloudinary.com/detwuzqry/image/upload/v1775717220/stitcheerr_assets/logo.png',
          companyName: 'Elites Fabrics',
          tagline: 'Precision in Every Thread.',
          description: 'Premium textile manufacturers specializing in industrial-grade uniform fabrics since 2019. Precision in Every Thread.',
          phone: '03323804080',
          whatsapp: '923211660362',
          email: 'elitesfabrics@gmail.com',
          address: 'Shop #01 New Molijee Street Akhund Masjid Kharadar, Karachi',
          mapLink: 'https://maps.app.goo.gl/7Gpw3vkvGT4fpKXY7',
          facebook: '#',
          instagram: '#'
        } 
      },
      // Home Page Sections
      { 
        page: 'home', 
        section: 'hero', 
        data: { 
          title: 'Premium Uniform Fabric for Every Industry', 
          subtitle: 'High-quality, durable, and comfortable fabrics for schools, offices, hospitals, and industrial uniforms.', 
          image: 'https://res.cloudinary.com/detwuzqry/image/upload/v1775717707/stitcheerr_assets/bsywtsz1pgrpqo3vcxhm.png' 
        } 
      },
      { 
        page: 'home', 
        section: 'features', 
        data: { 
          title: 'Fabric Solutions', 
          subtitle: 'Industry Standards', 
          items: [
            { title: 'School & College Uniforms', description: 'High-durability, wrinkle-resistant fabrics designed for daily student attire. Ensures all-day comfort and professional look.', image: 'https://res.cloudinary.com/detwuzqry/image/upload/v1776588261/stitcheerr_assets/xptmbrbgmfj3xozpbhwu.jpg' },
            { title: 'Corporate Shirting', description: 'Premium Toptex and Winnertex blends for executive professional wear and boardroom elegance.', image: 'https://res.cloudinary.com/detwuzqry/image/upload/v1776588262/stitcheerr_assets/acj0i3umdqo3qlaqp94h.jpg' },
            { title: 'Hospitality & Hotel Fabrics', description: 'Breathable and stain-resistant fabrics for chefs, front-desk staff, and housekeeping teams.', image: 'https://res.cloudinary.com/detwuzqry/image/upload/v1776586858/stitcheerr_assets/r6sxvktceybqwkua4mxs.jpg' },
            { title: 'Industrial Safety', description: 'High-tensile strength blended fabrics for heavy-duty industrial and factory environments.', image: 'https://res.cloudinary.com/detwuzqry/image/upload/v1776588263/stitcheerr_assets/dn3nvegkp9tv6n3thv73.jpg' },
            { title: 'Medical Scrubs', description: 'Antimicrobial and breathable fabrics for healthcare professionals and hospital staff.', image: 'https://res.cloudinary.com/detwuzqry/image/upload/v1776588264/stitcheerr_assets/k6a6rkvbndb2vqn6rfcx.jpg' },
            { title: 'Security & Guards', description: 'Rugged and professional fabrics for private security, guards, and law enforcement uniforms.', image: 'https://res.cloudinary.com/detwuzqry/image/upload/v1776587152/stitcheerr_assets/ewgoqvnm2ce0navpana8.jpg' }
          ] 
        } 
      },
      { 
        page: 'home', 
        section: 'testimonials', 
        data: { 
          title: 'Trusted by Industry Leaders', 
          items: [
            { text: 'Elite Fabrics has been our consistent supplier for 5 years. The quality and durability are unmatched.', initials: 'MK', name: 'Mustafa Khan', role: 'Procurement Head, City School' }, 
            { text: 'Their industrial fabrics meet all our safety standards. Truly a precision-driven textile partner.', initials: 'AS', name: 'Ahmed Sheikh', role: 'Operations Manager, Indus Ind.' }
          ] 
        } 
      },
      { 
        page: 'home', 
        section: 'cta', 
        data: { 
          title: "Ready to Elevate Your Team's Appearance?", 
          subtitle: "Get custom fabric swatches and a comprehensive quote for your organization within 24 hours.", 
          buttonText: "Request a Free Quote Now" 
        } 
      },
      // About Us Page Sections
      {
        page: 'about',
        section: 'hero',
        data: {
          title: 'The Thread of Professionalism.',
          subtitle: 'Providing High-Quality Uniform Fabrics for Schools, Offices, Hospitals, and Industries.',
          image: 'https://res.cloudinary.com/detwuzqry/image/upload/f_auto,q_auto/v1775717717/stitcheerr_assets/htwrjssfunhn6skbntbr.png'
        }
      },
      {
        page: 'about',
        section: 'legacy',
        data: {
          title: 'Our Legacy as a Trusted Supplier',
          text1: 'At Elites Fabrics, we understand that uniform fabric is more than just raw material; it is the foundation of a professional\'s identity and shield. With decades of presence in the textile industry, we have honed our craft to specialize in durable, professional-quality fabrics.',
          text2: 'From the sterile corridors of modern hospitals to the dynamic floors of industrial plants, our fabrics are engineered for performance. We source the finest raw fibers to ensure every meter of cloth meets our stringent Industrial Weaver standards.',
          images: [
            'https://res.cloudinary.com/detwuzqry/image/upload/v1775717701/stitcheerr_assets/ummkbuur82ve49dywemi.png',
            'https://res.cloudinary.com/detwuzqry/image/upload/v1775717702/stitcheerr_assets/kjzwdnknnl50ssyuiadz.png',
            'https://res.cloudinary.com/detwuzqry/image/upload/v1775717703/stitcheerr_assets/pgmevhwgiyzgnd1sdfkr.png',
            'https://res.cloudinary.com/detwuzqry/image/upload/v1775717705/stitcheerr_assets/vyarn7qbdwul7gcp1rkj.png'
          ]
        }
      },
      {
        page: 'about',
        section: 'mission',
        data: {
          quote: '"Delivering high-quality fabrics at competitive prices through precision manufacturing and direct industrial partnerships."',
          tagline: 'Empowering professionals through textile excellence.'
        }
      },
      {
        page: 'about',
        section: 'sectors',
        data: {
          title: 'Sectors We Serve',
          subtitle: 'Engineered solutions for every professional environment.',
          items: [
            { title: 'Academic Institutions', icon: 'school', desc: 'Breathable, skin-friendly, and durable fabrics designed for the daily activity of students.', tags: ['Cotton-Rich', 'Anti-Pilling'] },
            { title: 'Healthcare & Hospitals', icon: 'medical_services', desc: 'Anti-microbial and bleach-resistant fabric rolls for scrubs and medical lab coats.', tags: ['Performance Badge', 'Sterile-Tech'] },
            { title: 'Corporate & Hotels', icon: 'business_center', desc: 'Premium finishes for professional suiting and uniform un-stitched fabrics.', tags: ['Executive', 'Breathable'] },
            { title: 'Heavy Industry', icon: 'precision_manufacturing', desc: 'High-visibility, fire-retardant, and ultra-durable weaves for industrial safety.', tags: ['Durable', 'Safe'], image: 'https://res.cloudinary.com/detwuzqry/image/upload/v1775717706/stitcheerr_assets/xhjtbbqzlneqqkl0xtfp.png' }
          ]
        }
      },
      // Our Fabrics Page Sections
      {
        page: 'fabrics',
        section: 'hero',
        data: {
          title: 'Precision in Every Thread',
          subtitle: 'Discover our curated collection of industrial and corporate fabrics, engineered for durability and professional excellence.'
        }
      },
      {
        page: 'fabrics',
        section: 'catalog',
        data: {
          items: [
            { id: 1, title: "Toptex / Winnertex", category: "Corporate", featured: true, description: "The gold standard for executive corporate shirting. A proprietary blend designed for crisp aesthetics and all-day comfort.", image: "https://res.cloudinary.com/detwuzqry/image/upload/v1775717711/stitcheerr_assets/xmcled7x5x7g8hlj0twj.png", colors: ["#1e3a8a", "#0f172a", "#f8fafc"] },
            { id: 2, title: "Nichiee Blend", category: "Uniforms", featured: false, description: "Optimized for high-stress professional uniforms. Wrinkle-resistant and highly durable 65% Poly / 35% Cotton blend.", image: "https://res.cloudinary.com/detwuzqry/image/upload/v1775717712/stitcheerr_assets/rrqsqdcnsphsk63cb0fv.png", colors: ["#334155", "#64748b"] },
            { id: 3, title: "Blended 18/2", category: "Industrial", featured: false, description: "Heavy-duty industrial grade material for factory and field wear. High tensile strength and abrasion resistant.", image: "https://res.cloudinary.com/detwuzqry/image/upload/v1775717713/stitcheerr_assets/x3ttybp68co4x43w6bgm.png", colors: ["#713f12", "#ca8a04"] },
            { id: 4, title: "KT Shirting", category: "Corporate", featured: true, description: "Ultra-breathable weave for warm climates. Ensures professional appearance without compromising comfort.", image: "https://res.cloudinary.com/detwuzqry/image/upload/v1775717715/stitcheerr_assets/vlg5f8r9k3vxwuhasb2z.png", colors: ["#ffffff", "#e0e7ff", "#bfdbfe"] },
            { id: 5, title: "Blended 36/2 Professional", category: "Uniforms", featured: true, description: "The preferred choice for corporate blazers and trousers. This 36/2 construction provides a substantial hand-feel with a refined drape.", image: "https://res.cloudinary.com/detwuzqry/image/upload/v1775717716/stitcheerr_assets/tmnjxzrkdkmfg7bskrqd.png", colors: ["#000000", "#1e293b"] }
          ]
        }
      },
      {
        page: 'fabrics',
        section: 'cta',
        data: {
          title: 'Need a Custom Fabric Solution?',
          subtitle: 'Our textile engineers can work with you to develop proprietary blends tailored to your organization\'s specific requirements.'
        }
      },
      // Contact Page Sections
      {
        page: 'contact',
        section: 'hero',
        data: {
          title: 'Let\'s Connect.',
          subtitle: 'Have a query about our fabric blends or need to request a bulk sample? Our team is ready to assist you.',
          image: 'https://res.cloudinary.com/detwuzqry/image/upload/v1775717220/stitcheerr_assets/logo.png'
        }
      },
      {
        page: 'contact',
        section: 'sidebar',
        data: {
          whatsappTitle: 'Direct WhatsApp',
          whatsappDesc: 'Chat with our fabric specialists for instant support and sample dispatch tracking.',
          items: [
            { icon: 'location_on', title: 'Head Office', details: 'Shop #01 New Molijee Street Akhund Masjid Kharadar, Karachi', link: 'https://maps.app.goo.gl/7Gpw3vkvGT4fpKXY7' },
            { icon: 'call', title: 'Call Us', details: '03323804080 (Sales) / 03211660362 (Support)', link: 'tel:03323804080' },
            { icon: 'mail', title: 'Email Us', details: 'elitesfabrics@gmail.com', link: 'mailto:elitesfabrics@gmail.com' }
          ]
        }
      },
      // Quotes Page Sections
      {
        page: 'quotes',
        section: 'hero',
        data: {
          title: 'Precision Fabric Solutions.',
          subtitle: 'Request a technical consultation and customized pricing for your high-volume textile requirements.',
          image: 'https://res.cloudinary.com/detwuzqry/image/upload/v1775717719/stitcheerr_assets/o93v3js5kb52n7wgvsqs.png'
        }
      },
      {
        page: 'quotes',
        section: 'why',
        data: {
          title: 'Why Partner with Us?',
          items: [
            { icon: 'verified', title: 'Industrial Grade Quality', desc: 'Every batch undergoes rigorous quality control for tensile strength and color fastness.' },
            { icon: 'local_shipping', title: 'Global Logistics', desc: 'Efficient supply chain management ensuring on-time delivery to your production facilities.' },
            { icon: 'precision_manufacturing', title: 'Custom Manufacturing', desc: 'Specialized blends and finishes tailored specifically to your organization\'s technical specs.' }
          ]
        }
      }
    ];

    await Content.deleteMany({});
    await Content.insertMany(seedData);
    
    // Clear the cache to ensure the next request gets fresh data
    contentCache = null;
    
    res.json({ message: 'Database seeded successfully with Uniforms!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
