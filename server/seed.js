require('dotenv').config();
const mongoose = require('mongoose');
const Content = require('./models/Content');

const MONGODB_URI = process.env.MONGODB_URI;

const seedData = [
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
        {
          title: 'Corporate Shirting',
          description: 'Premium Toptex and Winnertex blends for executive professional wear.',
          image: 'https://res.cloudinary.com/detwuzqry/image/upload/v1775717711/stitcheerr_assets/xmcled7x5x7g8hlj0twj.png'
        },
        {
          title: 'Industrial Safety',
          description: 'High-tensile strength blended fabrics for heavy-duty industrial environments.',
          image: 'https://res.cloudinary.com/detwuzqry/image/upload/v1775717713/stitcheerr_assets/x3ttybp68co4x43w6bgm.png'
        },
        {
          title: 'Medical Scrubs',
          description: 'Antimicrobial and breathable fabrics for healthcare professionals.',
          image: 'https://res.cloudinary.com/detwuzqry/image/upload/v1775717712/stitcheerr_assets/rrqsqdcnsphsk63cb0fv.png'
        }
      ]
    }
  },
  {
    page: 'home',
    section: 'testimonials',
    data: {
      title: 'Trusted by Industry Leaders',
      items: [
        {
          text: 'Elite Fabrics has been our consistent supplier for 5 years. The quality and durability are unmatched.',
          initials: 'MK',
          name: 'Mustafa Khan',
          role: 'Procurement Head, City School'
        },
        {
          text: 'Their industrial fabrics meet all our safety standards. Truly a precision-driven textile partner.',
          initials: 'AS',
          name: 'Ahmed Sheikh',
          role: 'Operations Manager, Indus Ind.'
        }
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
  {
    page: 'global',
    section: 'images',
    data: {
      logo: 'https://res.cloudinary.com/detwuzqry/image/upload/e_make_transparent/v1775717220/stitcheerr_assets/logo.png'
    }
  }
];

async function seedDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB Atlas for seeding...');

    // Clear existing content to avoid duplicates (optional but recommended for fresh start)
    await Content.deleteMany({});
    console.log('Cleared existing content.');

    // Insert new data
    await Content.insertMany(seedData);
    console.log('Database successfully seeded with default content!');

    process.exit();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seedDB();
