const Contact = require('../models/Contact');
const Quote = require('../models/Quote');
const Newsletter = require('../models/Newsletter');
const nodemailer = require('nodemailer');

// =======================
// 🔹 TRANSPORTER
// =======================
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// =======================
// 🔹 EMAIL SENDER
// =======================
const sendNotificationEmail = async (subject, html) => {
  try {
    const adminEmail = process.env.EMAIL_ADMIN || 'elitesfabrics@gmail.com';
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('❌ Email credentials missing (EMAIL_USER or EMAIL_PASS)');
      return;
    }

    await transporter.sendMail({
      from: `"Website Form" <${process.env.EMAIL_USER}>`,
      to: adminEmail,
      subject,
      html,
    });

    console.log('📧 Email sent to admin:', subject);

  } catch (error) {
    console.error('❌ Email Error:', error.message);
  }
};

// =======================
// 🔹 CONTACT FORM
// =======================
exports.submitContact = async (req, res) => {
  try {
    // 🔹 Save in DB
    const contact = new Contact(req.body);
    await contact.save();

    // 🔹 Logged-in user email (if JWT middleware used)
    const userEmail = req.user?.email || 'Not Logged In';

    // 🔹 Destructure frontend fields (NO CHANGE REQUIRED)
    const {
      fullName,
      companyName,
      emailAddress,
      phoneNumber,
      fabricInterest,
      requirements,
    } = req.body;

    // 🔹 Email HTML
    const html = `
      <div style="font-family: Arial; padding: 20px;">
        <h2 style="color:#1e3a8a;">New Contact Inquiry</h2>

        <p><b>Name:</b> ${fullName || 'N/A'}</p>
        <p><b>Company:</b> ${companyName || 'N/A'}</p>

        <p><b>Form Email:</b> ${emailAddress || 'N/A'}</p>
        <p><b>Logged-in User Email:</b> ${userEmail}</p>

        <p><b>Phone:</b> ${phoneNumber || 'N/A'}</p>
        <p><b>Fabric Interest:</b> ${fabricInterest || 'N/A'}</p>
        <p><b>Requirements:</b><br/> ${requirements || 'N/A'}</p>

        <hr/>
        <small>This email was sent from website contact form</small>
      </div>
    `;

    // 🔹 Send Email
    await sendNotificationEmail(
      `New Contact Inquiry - ${fullName || 'User'}`,
      html
    );

    res.status(201).json({
      success: true,
      message: 'Contact submitted successfully',
    });

  } catch (error) {
    console.error('Contact Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact',
    });
  }
};

// =======================
// 🔹 QUOTE FORM
// =======================
exports.submitQuote = async (req, res) => {
  try {
    const quote = new Quote(req.body);
    await quote.save();

    const {
      fabricCollection,
      specificColor,
      quantity,
      projectDetails,
    } = req.body;

    const html = `
      <div style="font-family: Arial; padding: 20px;">
        <h2>New Quote Request</h2>

        <p><b>Fabric Collection:</b> ${fabricCollection || 'N/A'}</p>
        <p><b>Color:</b> ${specificColor || 'N/A'}</p>
        <p><b>Quantity:</b> ${quantity || 'N/A'} meters</p>
        <p><b>Details:</b> ${projectDetails || 'N/A'}</p>

        <hr/>
        <small>Sent from website quote form</small>
      </div>
    `;

    await sendNotificationEmail(
      `New Quote Request - ${fabricCollection || 'Fabric'}`,
      html
    );

    res.status(201).json({
      success: true,
      message: 'Quote submitted successfully',
    });

  } catch (error) {
    console.error('Quote Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit quote',
    });
  }
};

// =======================
// 🔹 NEWSLETTER
// =======================
exports.submitNewsletter = async (req, res) => {
  try {
    const newsletter = new Newsletter({ email: req.body.email });
    await newsletter.save();

    res.status(201).json({
      success: true,
      message: 'Subscribed successfully',
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already subscribed',
      });
    }

    console.error('Newsletter Error:', error);
    res.status(500).json({
      success: false,
      message: 'Subscription failed',
    });
  }
};