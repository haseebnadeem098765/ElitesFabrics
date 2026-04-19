import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import AuthModal from './AuthModal';
import PopupModal from './PopupModal';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [successPopup, setSuccessPopup] = useState({ isOpen: false, message: '' });
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  const { isUserAuthenticated, user } = useSelector((state) => state.auth);
  const content = useSelector((state) => state.content.data);

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    const baseClass = "transition-colors font-medium";
    
    if (isActive) {
      return `${baseClass} text-blue-700 dark:text-blue-400 border-b-2 border-primary pb-1`;
    }
    return `${baseClass} text-slate-600 hover:text-primary`;
  };

  const getMobileLinkClass = (path) => {
     const isActive = location.pathname === path;
     const baseClass = "block py-3 px-4 font-medium transition-colors border-l-4";
     if (isActive) {
         return `${baseClass} text-primary bg-primary/5 border-primary`;
     }
     return `${baseClass} text-slate-600 border-transparent hover:bg-slate-50 hover:text-primary`;
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm border-b border-outline-variant/10">
        <div className="flex justify-between items-center px-2 md:px-8 py-2 md:py-3 max-w-full mx-auto">
          <Link to="/" className="flex items-center min-w-0 mr-1 sm:mr-4 shrink-1">
            <img
              alt="Elite Fabrics Logo"
              className="h-10 sm:h-12 md:h-16 w-auto object-contain mix-blend-multiply"
              src={content?.global?.images?.logo || "https://res.cloudinary.com/detwuzqry/image/upload/v1775717220/stitcheerr_assets/logo.png"}
            />
          </Link>

          {/* Mobile Buttons + Hamburger Row */}
          <div className="flex lg:hidden items-center gap-1 sm:gap-2 shrink-0">
             <a href="tel:03323804080" className="px-1.5 sm:px-2 py-1.5 text-[10px] sm:text-xs text-primary font-bold bg-primary/10 rounded-md whitespace-nowrap">Call</a>
             {isUserAuthenticated ? (
                 <button onClick={() => dispatch(logout())} className="px-1.5 sm:px-2 py-1.5 text-[10px] sm:text-xs text-red-500 font-bold bg-red-50 rounded-md whitespace-nowrap">Logout</button>
             ) : (
                 <button onClick={() => setIsAuthModalOpen(true)} className="px-2 sm:px-3 py-1.5 text-[10px] sm:text-xs bg-primary text-white font-bold rounded-md shadow-sm whitespace-nowrap">Login</button>
             )}
             <a href="https://wa.me/03211660362" className="px-2 sm:px-3 py-1.5 bg-[#25D366] text-white text-[10px] sm:text-xs font-bold rounded-md shadow-sm whitespace-nowrap">WhatsApp</a>
             
             <button 
                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                 className="text-slate-600 focus:outline-none p-1 bg-slate-100 rounded-md ml-0.5 sm:ml-1 shrink-0"
              >
                  <span className="material-symbols-outlined text-lg sm:text-xl leading-none block">
                      {isMobileMenuOpen ? 'close' : 'menu'}
                  </span>
             </button>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            <Link to="/" className={getLinkClass('/')}>Home</Link>
            <Link to="/about" className={getLinkClass('/about')}>About Us</Link>
            <Link to="/fabrics" className={getLinkClass('/fabrics')}>Our Fabrics</Link>
            <Link to="/quotes" className={getLinkClass('/quotes')}>Get Quotes</Link>
            <Link to="/contact" className={getLinkClass('/contact')}>Contact Us</Link>
          </div>
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:03323804080" className="px-5 py-2 text-primary font-semibold hover:bg-primary/5 transition-all rounded-lg">03323804080</a>
            
            {isUserAuthenticated ? (
              <div className="flex items-center gap-4 border-l border-slate-200 dark:border-slate-700 ml-4 pl-4">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{user?.name}</span>
                  <button onClick={() => dispatch(logout())} className="text-[10px] text-red-500 font-bold uppercase tracking-widest hover:underline">Logout</button>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-primary font-bold">
                  {user?.name?.charAt(0)}
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="px-6 py-2 bg-primary text-white font-bold rounded-lg shadow-md hover:bg-primary/90 transition-all active:scale-95"
              >
                Login
              </button>
            )}
            
            <a href="https://wa.me/03211660362" className="px-5 py-2 bg-[#25D366] text-white font-semibold rounded-lg shadow-md active:scale-95 transition-all">WhatsApp</a>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
            <div className="lg:hidden bg-white shadow-xl absolute w-full left-0 flex flex-col pt-2 border-b border-outline-variant/10">
                <Link onClick={() => setIsMobileMenuOpen(false)} to="/" className={getMobileLinkClass('/')}>Home</Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} to="/about" className={getMobileLinkClass('/about')}>About Us</Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} to="/fabrics" className={getMobileLinkClass('/fabrics')}>Our Fabrics</Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} to="/quotes" className={getMobileLinkClass('/quotes')}>Get Quotes</Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} to="/contact" className={getMobileLinkClass('/contact')}>Contact Us</Link>
                <div className="flex flex-col gap-3 p-6 mt-2 border-t border-slate-100 bg-slate-50">
                  {isUserAuthenticated && (
                    <div className="flex items-center gap-4 mb-4 p-4 bg-white rounded-xl shadow-sm">
                      <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-primary font-bold text-xl">
                        {user?.name?.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-slate-900">{user?.name}</p>
                        <button onClick={() => { dispatch(logout()); setIsMobileMenuOpen(false); }} className="text-xs text-red-500 font-bold uppercase tracking-widest">Logout</button>
                      </div>
                    </div>
                  )}
                  {!isUserAuthenticated && (
                    <button 
                      onClick={() => { setIsAuthModalOpen(true); setIsMobileMenuOpen(false); }}
                      className="w-full text-center px-4 py-3 bg-primary text-white font-bold rounded-lg shadow-md mb-2"
                    >
                      Login / Register
                    </button>
                  )}
                  <a href="tel:03323804080" className="w-full text-center px-4 py-1.5 text-primary border-2 border-primary font-semibold hover:bg-primary/5 transition-all rounded-lg">Call: 03323804080</a>
                  <a href="https://wa.me/03211660362" className="w-full text-center px-5 py-3 bg-[#25D366] text-white font-semibold rounded-lg shadow-md active:scale-95 transition-all">WhatsApp Us</a>
                </div>
            </div>
        )}
      </nav>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={() => {
          setSuccessPopup({ 
            isOpen: true, 
            message: 'You have successfully logged in/verified your account.' 
          });
        }}
      />

      <PopupModal
        isOpen={successPopup.isOpen}
        type="success"
        message={successPopup.message}
        onClose={() => {
          setSuccessPopup({ ...successPopup, isOpen: false });
          navigate('/');
        }}
      />
    </>
  );
}
