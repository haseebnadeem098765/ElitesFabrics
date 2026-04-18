import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { subscribeNewsletter, clearMessages } from '../features/newsletter/newsletterSlice';
import PopupModal from './PopupModal';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [popup, setPopup] = useState({ isOpen: false, type: '', message: '' });
  
  const dispatch = useDispatch();
  const { error, successMessage } = useSelector((state) => state.newsletter);
  const content = useSelector((state) => state.content.data);

  useEffect(() => {
    if (successMessage) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPopup({ isOpen: true, type: 'success', message: successMessage });
      setEmail('');
      dispatch(clearMessages());
    }
    if (error) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPopup({ isOpen: true, type: 'error', message: error });
      dispatch(clearMessages());
    }
  }, [successMessage, error, dispatch]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    dispatch(subscribeNewsletter(email));
  };

  return (
    <footer className="w-full pt-16 pb-8 bg-slate-50 dark:bg-slate-950 border-t border-slate-200">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <img
              alt="Elite Fabrics Logo"
              className="h-20 w-auto object-contain mix-blend-multiply"
              src={content?.global?.images?.logo || "https://res.cloudinary.com/detwuzqry/image/upload/v1775717220/stitcheerr_assets/logo.png"}
            />
          </div>
          <p className="text-sm text-slate-500 font-body leading-relaxed">
            Premium textile manufacturers specializing in industrial-grade uniform fabrics since 2019. Precision in Every Thread.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-all">
              <span className="material-symbols-outlined text-sm">public</span>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-all">
              <span className="material-symbols-outlined text-sm">share</span>
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-headline font-bold text-on-surface">Company</h4>
          <nav className="flex flex-col gap-3">
            <Link to="/" className="text-slate-500 hover:text-[#2E75B6] text-sm hover:underline decoration-[#2E75B6] underline-offset-4 transition-all">Home</Link>
            <Link to="/about" className="text-slate-500 hover:text-[#2E75B6] text-sm hover:underline decoration-[#2E75B6] underline-offset-4 transition-all">About Us</Link>
            <Link to="/fabrics" className="text-slate-500 hover:text-[#2E75B6] text-sm hover:underline decoration-[#2E75B6] underline-offset-4 transition-all">Our Fabrics</Link>
          </nav>
        </div>

        <div className="space-y-4">
          <h4 className="font-headline font-bold text-on-surface">Resources</h4>
          <nav className="flex flex-col gap-3">
            <Link to="/quotes" className="text-slate-500 hover:text-[#2E75B6] text-sm hover:underline decoration-[#2E75B6] underline-offset-4 transition-all">Get Quotes</Link>
            <Link to="/contact" className="text-slate-500 hover:text-[#2E75B6] text-sm hover:underline decoration-[#2E75B6] underline-offset-4 transition-all">Contact Us</Link>
            <a href="#" className="text-slate-500 hover:text-[#2E75B6] text-sm hover:underline decoration-[#2E75B6] underline-offset-4 transition-all">Privacy Policy</a>
            <a href="#" className="text-slate-500 hover:text-[#2E75B6] text-sm hover:underline decoration-[#2E75B6] underline-offset-4 transition-all">Terms of Service</a>
          </nav>
        </div>

        <div className="space-y-4">
          <h4 className="font-headline font-bold text-on-surface">Newsletter</h4>
          <p className="text-sm text-slate-500">Get updates on new fabric technology.</p>
          <form className="flex" onSubmit={handleSubscribe}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="bg-white border text-black border-slate-200 px-4 py-2 rounded-l-lg w-full focus:outline-none focus:border-primary"
            />
            <button type="submit" className="bg-primary text-white px-4 py-2 rounded-r-lg hover:bg-opacity-90 transition-all">
              <span className="material-symbols-outlined">send</span>
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-16 pt-8 border-t border-slate-200 text-center flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-sm text-slate-500 font-body">© 2024 Elites Fabrics. Precision in Every Thread.</span>
        <div className="flex justify-center gap-6">
          <a href="#" className="text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined">public</span></a>
          <a href="mailto:elitesfabrics@gmail.com" className="text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined">mail</span></a>
          <a href="tel:03323804080" className="text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined">phone_in_talk</span></a>
        </div>
      </div>
      <PopupModal 
        isOpen={popup.isOpen} 
        type={popup.type} 
        message={popup.message} 
        onClose={() => setPopup({ ...popup, isOpen: false })} 
      />
    </footer>
  );
}
