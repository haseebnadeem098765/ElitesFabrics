import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitContactForm } from '../features/contacts/contactSlice';
import SEO from '../components/SEO';
import AuthModal from '../components/AuthModal';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        emailAddress: '',
        phoneNumber: '',
        requirements: ''
    });

    const dispatch = useDispatch();
    const { loading, error, successMessage } = useSelector((state) => state.contacts);
    const { isUserAuthenticated } = useSelector((state) => state.auth);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isUserAuthenticated) {
            setIsAuthModalOpen(true);
            return;
        }
        dispatch(submitContactForm({ formData }));
    };

    const contactInfo = [
        {
            icon: 'location_on',
            title: 'Head Office',
            details: 'Shop #01 New Molijee Street Akhund Masjid Kharadar, Karachi',
            link: 'https://maps.app.goo.gl/7Gpw3vkvGT4fpKXY7'
        },
        {
            icon: 'call',
            title: 'Call Us',
            details: '03323804080 (Sales) / 03211660362 (Support)',
            link: 'tel:03323804080'
        },
        {
            icon: 'mail',
            title: 'Email Us',
            details: 'elitesfabrics@gmail.com',
            link: 'mailto:elitesfabrics@gmail.com'
        }
    ];

    return (
        <div className="bg-surface">
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
            <SEO 
              title="Contact Us - Reach Elite Fabrics" 
              description="Get in touch with Elite Fabrics for inquiries, sample requests, or industrial partnerships. We're here to help."
              keywords="contact elite fabrics, uniform supplier contact, office address fabrics"
            />
            {/* Hero Section */}
            <section className="relative h-[614px] flex items-center overflow-hidden bg-surface-dim">
                <div className="absolute inset-0 z-0">
                    <img className="w-full h-full object-cover opacity-60" data-alt="Elite Fabrics Logo" src={"https://res.cloudinary.com/detwuzqry/image/upload/v1775717220/stitcheerr_assets/logo.png"}/>
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
                </div>
                <div className="container mx-auto px-8 relative z-10 overflow-hidden">
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold font-headline mb-4 break-words">Let&apos;s Connect.</h1>
                    <p className="text-lg sm:text-xl text-on-surface-variant max-w-full font-light break-words">Have a query about our fabric blends or need to request a bulk sample? Our team is ready to assist you.</p>
                </div>
            </section>

            <section className="py-24 px-8 -mt-20 relative z-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Contact Form */}
                        <div className="lg:col-span-7">
                            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-outline-variant/10">
                                <h2 className="text-3xl font-headline font-bold mb-8 text-primary">Send a Message</h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-500 px-1">Full Name</label>
                                            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className="w-full bg-surface-container-low border-0 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="John Doe"/>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-500 px-1">Email Address</label>
                                            <input type="email" name="emailAddress" value={formData.emailAddress} onChange={handleChange} required className="w-full bg-surface-container-low border-0 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="john@example.com"/>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-500 px-1">Phone Number</label>
                                        <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required className="w-full bg-surface-container-low border-0 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="+92 3XX XXXXXXX"/>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-500 px-1">How can we help?</label>
                                        <textarea name="requirements" value={formData.requirements} onChange={handleChange} required rows="5" className="w-full bg-surface-container-low border-0 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="Write your message here..."></textarea>
                                    </div>
                                    <button type="submit" disabled={loading} className="w-full bg-primary text-white font-bold py-5 rounded-xl shadow-xl shadow-primary/20 hover:translate-y-[-2px] transition-all active:scale-95 disabled:opacity-70">
                                        {loading ? 'Sending...' : 'Send Message'}
                                    </button>
                                    {successMessage && <p className="text-green-600 font-bold text-center mt-4 bg-green-50 py-3 rounded-lg border border-green-100">{successMessage}</p>}
                                    {error && <p className="text-red-500 font-bold text-center mt-4 bg-red-50 py-3 rounded-lg border border-red-100">{error}</p>}
                                </form>
                            </div>
                        </div>

                        {/* Contact Info Sidebar */}
                        <div className="lg:col-span-5 space-y-8">
                            {contactInfo.map((info, index) => (
                                <a key={index} href={info.link} target="_blank" rel="noopener noreferrer" className="block bg-surface-container-highest p-8 rounded-3xl border border-outline-variant/10 hover:bg-surface-container-high transition-all group">
                                    <div className="flex gap-6 items-start">
                                        <div className="w-14 h-14 rounded-2xl bg-primary text-on-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                            <span className="material-symbols-outlined text-3xl">{info.icon}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-xl mb-2">{info.title}</h4>
                                            <p className="text-on-surface-variant leading-relaxed">{info.details}</p>
                                        </div>
                                    </div>
                                </a>
                            ))}

                            <div className="bg-tertiary-container text-on-tertiary-container p-8 rounded-3xl overflow-hidden relative">
                                <div className="relative z-10">
                                    <h4 className="font-bold text-xl mb-4">Direct WhatsApp</h4>
                                    <p className="opacity-80 mb-6">Chat with our fabric specialists for instant support and sample dispatch tracking.</p>
                                    <a href="https://wa.me/923211660362" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-on-surface font-bold rounded-xl hover:shadow-lg transition-all">
                                        Start Chat
                                    </a>
                                </div>
                                <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-9xl opacity-10">chat</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Google Map Placeholder */}
            <section className="h-[400px] w-full bg-surface-container relative grayscale opacity-70">
                <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-on-surface-variant font-medium">Kharadar, Karachi - Head Office Location</p>
                </div>
                <iframe 
                  title="Elite Fabrics Location" 
                  src="https://maps.google.com/maps?q=Elites+Fabrics,+New+Molijee+Street,+Akhund+Masjid,+Kharadar,+Karachi&output=embed" 
                  className="w-full h-full border-0" 
                  allowFullScreen="" 
                  loading="lazy"
                ></iframe>
            </section>
        </div>
    );
};

export default ContactUs;
