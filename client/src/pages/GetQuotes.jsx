import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitQuote } from '../features/quotes/quoteSlice';
import SEO from '../components/SEO';
import AuthModal from '../components/AuthModal';

const GetQuotes = () => {
  const content = useSelector((state) => state.content.data);
  const quotesHero = content?.quotes?.hero || {};
  const quotesWhy = content?.quotes?.why || {};

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    fabricType: '',
    quantity: '',
    message: ''
  });

  const dispatch = useDispatch();
  const { loading, error, successMessage } = useSelector((state) => state.quotes);
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
    dispatch(submitQuote({ formData }));
  };

  return (
    <>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <SEO 
        title="Get a Bulk Quote - Custom Fabric Solutions" 
        description="Request a customized quote for your organization's uniform needs. Fast turnarounds and competitive industrial pricing."
        keywords="bulk fabric quote, uniform manufacturing pakistan, textile pricing"
      />
      <section className="relative h-[614px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img alt="Hero Background" className="w-full h-full object-cover" src={quotesHero.image || "https://res.cloudinary.com/detwuzqry/image/upload/v1775717719/stitcheerr_assets/o93v3js5kb52n7wgvsqs.png"} />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-container/40"></div>
        </div>
        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-extrabold font-headline text-on-primary mb-6 leading-tight">
              {quotesHero.title || "Precision Fabric Solutions."}
            </h1>
            <p className="text-xl text-primary-fixed opacity-90 font-light max-w-xl">
              {quotesHero.subtitle || "Request a technical consultation and customized pricing for your high-volume textile requirements."}
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-headline font-bold text-on-surface">{quotesWhy.title || "Why Partner with Us?"}</h2>
              <div className="w-16 h-1 bg-tertiary"></div>
            </div>
            
            <div className="space-y-8">
              {(quotesWhy.items || [
                { icon: 'verified', title: 'Industrial Grade Quality', desc: 'Every batch undergoes rigorous quality control for tensile strength and color fastness.' },
                { icon: 'local_shipping', title: 'Global Logistics', desc: 'Efficient supply chain management ensuring on-time delivery to your production facilities.' },
                { icon: 'precision_manufacturing', title: 'Custom Manufacturing', desc: 'Specialized blends and finishes tailored specifically to your organization\'s technical specs.' }
              ]).map((item, idx) => (
                <div key={idx} className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary">{item.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                    <p className="text-on-surface-variant text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-surface-container-low rounded-3xl p-8 md:p-12 shadow-sm border border-outline-variant/10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface-variant px-1">Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-surface-container-lowest border-0 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary transition-all" placeholder="John Doe"/>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface-variant px-1">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-surface-container-lowest border-0 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary transition-all" placeholder="john@company.com"/>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface-variant px-1">Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full bg-surface-container-lowest border-0 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary transition-all" placeholder="+92 300 1234567"/>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface-variant px-1">Organization</label>
                    <input type="text" name="organization" value={formData.organization} onChange={handleChange} required className="w-full bg-surface-container-lowest border-0 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary transition-all" placeholder="Company Name"/>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface-variant px-1">Fabric Category</label>
                    <select name="fabricType" value={formData.fabricType} onChange={handleChange} required className="w-full bg-surface-container-lowest border-0 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary transition-all">
                      <option value="">Select a category</option>
                      <option value="Toptex / Winnertex">Toptex / Winnertex</option>
                      <option value="Nichiee Blend">Nichiee Blend</option>
                      <option value="Hospitality Elite">Hospitality Elite</option>
                      <option value="Industrial Strength">Industrial Strength</option>
                      <option value="Medical Tech">Medical Tech</option>
                      <option value="Security Rugged">Security Rugged</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface-variant px-1">Est. Quantity (Meters)</label>
                    <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required className="w-full bg-surface-container-lowest border-0 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary transition-all" placeholder="e.g. 500"/>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-on-surface-variant px-1">Additional Requirements</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} rows="4" className="w-full bg-surface-container-lowest border-0 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary transition-all" placeholder="Tell us about your specific needs..."></textarea>
                </div>
                
                <button type="submit" disabled={loading} className="w-full bg-primary text-on-primary font-bold py-5 rounded-xl shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all active:scale-95 disabled:opacity-70">
                  {loading ? 'Processing...' : 'Submit Quote Request'}
                </button>
                
                {successMessage && <p className="text-green-600 font-bold text-center mt-4 bg-green-50 py-3 rounded-lg border border-green-100">{successMessage}</p>}
                {error && <p className="text-red-500 font-bold text-center mt-4 bg-red-50 py-3 rounded-lg border border-red-100">{error}</p>}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GetQuotes;
