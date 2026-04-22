const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://haseebnadeem098765:ElitesFabrics0909123450909@cluster0.eqhxhyn.mongodb.net/ElitesFabric?appName=Cluster0';

const contentSchema = new mongoose.Schema({
  page: String,
  section: String,
  data: mongoose.Schema.Types.Mixed
});

const Content = mongoose.model('Content', contentSchema);

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
            { id: 3, title: "18/20 Double", category: "Industrial", featured: false, description: "Heavy-duty industrial grade material for factory and field wear. High tensile strength and abrasion resistant.", image: "https://res.cloudinary.com/detwuzqry/image/upload/v1775717713/stitcheerr_assets/x3ttybp68co4x43w6bgm.png", colors: ["#713f12", "#ca8a04"] },
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

async function sync() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB Atlas');

    await Content.deleteMany({});
    console.log('Cleared existing content');

    await Content.insertMany(seedData);
    console.log('Seeded new CMS content');

    mongoose.disconnect();
    console.log('Done.');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

sync();
