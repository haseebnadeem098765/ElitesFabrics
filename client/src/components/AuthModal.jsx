import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin, userRegister, verifyEmail, googleLogin, clearError } from '../features/auth/authSlice';
import { GoogleLogin } from '@react-oauth/google';

export default function AuthModal({ isOpen, onClose, onSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const [otp, setOtp] = useState('');
  
  const dispatch = useDispatch();
  const { loading, error, isUserAuthenticated, requiresVerification, registeredEmail, registrationToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isUserAuthenticated && isOpen) {
      onSuccess();
      onClose();
    }
  }, [isUserAuthenticated, isOpen, onSuccess, onClose]);

  useEffect(() => {
    if (isOpen) {
      setIsLogin(true); // Always default to login when opening
      dispatch(clearError());
    }
  }, [isOpen, dispatch]);

  const getTitle = () => {
    if (requiresVerification) return 'Verify Your Email';
    if (isLogin) return 'Welcome Back';
    return 'Welcome to Elites Fabrics';
  };

  const getSubtitle = () => {
    if (requiresVerification) return 'We sent a 6-digit code to your email. Enter it below to verify.';
    if (isLogin) return 'Login to continue with your request';
    return 'Create an account to manage your quotes and orders.';
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('[AuthModal] Submitting form. Mode:', isLogin ? 'Login' : 'Register', 'Data:', formData);
    if (isLogin) {
      dispatch(userLogin({ email: formData.email, password: formData.password }));
    } else {
      dispatch(userRegister(formData));
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    dispatch(verifyEmail({ registrationToken, code: otp }));
  };

  const handleGoogleSuccess = (credentialResponse) => {
    dispatch(googleLogin(credentialResponse.credential));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-headline font-extrabold text-slate-900 dark:text-white">
              {getTitle()}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              {getSubtitle()}
            </p>
          </div>

          {requiresVerification ? (
            <form onSubmit={handleVerify} className="space-y-4">
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-2 rounded-r-lg flex items-center gap-3 shadow-sm">
                  <span className="material-symbols-outlined text-red-500 text-xl">error</span>
                  <p className="text-red-700 text-sm font-bold">{error}</p>
                </div>
              )}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Verify Code</label>
                <input 
                  type="text" 
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg p-3 text-center tracking-widest font-bold text-2xl focus:ring-2 focus:ring-primary/50" 
                  placeholder="123456"
                  maxLength={6}
                  required
                />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-primary text-white font-bold py-3 rounded-lg shadow-lg hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-75"
              >
                {loading ? 'Verifying...' : 'Verify'}
              </button>
            </form>
          ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-4">

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-2 rounded-r-lg flex items-center gap-3 shadow-sm">
                <span className="material-symbols-outlined text-red-500 text-xl">error</span>
                <p className="text-red-700 text-sm font-bold">
                  {error === 'User already exists' ? 'Account already exists! Please click Login instead.' : error}
                </p>
              </div>
            )}

            {!isLogin && (
              <>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg p-3 focus:ring-2 focus:ring-primary/50" 
                    placeholder="John Doe"
                    required={!isLogin}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg p-3 focus:ring-2 focus:ring-primary/50" 
                    placeholder="+92 300 1234567"
                    required={!isLogin}
                  />
                </div>
              </>
            )}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Email Address</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg p-3 focus:ring-2 focus:ring-primary/50" 
                placeholder="john@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Password</label>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg p-3 focus:ring-2 focus:ring-primary/50" 
                placeholder="••••••••"
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary text-white font-bold py-3 rounded-lg shadow-lg hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-75"
            >
              {loading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-slate-900 px-2 text-slate-500">Or continue with</span>
            </div>
          </div>

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => console.log('Login Failed')}
              useOneTap
              theme="outline"
              size="large"
              width="100%"
            />
          </div>

          <div className="mt-8 text-center text-sm text-slate-500">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button 
              type="button"
              onClick={() => {
                  setIsLogin(!isLogin);
                  dispatch(clearError());
              }}
              className="text-primary font-bold hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </div>
          </>
          )}
        </div>
      </div>
    </div>
  );
}
