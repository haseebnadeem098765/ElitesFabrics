import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContent } from './features/content/contentSlice';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';

// Public Pages
const Home = React.lazy(() => import('./pages/Home'));
const AboutUs = React.lazy(() => import('./pages/AboutUs'));
const OurFabrics = React.lazy(() => import('./pages/OurFabrics'));
const GetQuotes = React.lazy(() => import('./pages/GetQuotes'));
const ContactUs = React.lazy(() => import('./pages/ContactUs'));

// Admin Pages
const AdminLogin = React.lazy(() => import('./pages/admin/AdminLogin'));
const AdminLayout = React.lazy(() => import('./pages/admin/AdminLayout'));
const Dashboard = React.lazy(() => import('./pages/admin/Dashboard'));
const ManageContacts = React.lazy(() => import('./pages/admin/ManageContacts'));
const ManageQuotes = React.lazy(() => import('./pages/admin/ManageQuotes'));
const ManageContent = React.lazy(() => import('./pages/admin/ManageContent'));
const ManageNewsletters = React.lazy(() => import('./pages/admin/ManageNewsletters'));

const PublicLayout = () => (
  <div className="bg-surface text-on-background font-body min-h-screen flex flex-col overflow-x-hidden">
    <Navbar />
    <main className="flex-grow pt-20">
      <Outlet />
    </main>
    <Footer />
  </div>
);

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.content);
  const [showLoader, setShowLoader] = useState(true);
  const [isReady, setIsReady] = useState(false);


  useEffect(() => {
    dispatch(fetchContent());
  }, [dispatch]);

  // Keep loader visible for at least 0.5s and until loading is false
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setIsReady(true);
        // Remove from DOM after fade animation
        setTimeout(() => setShowLoader(false), 500);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  // Disable body scroll when loader is active
  useEffect(() => {
    if (showLoader) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [showLoader]);

  return (
    <>
      {showLoader && <Loader show={!isReady} />}
      <Router>
        <ScrollToTop />
      <React.Suspense fallback={<Loader show={true} />}>
        <Routes>
          {/* Admin Login (no layout layout) */}
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Admin Protected Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="contacts" element={<ManageContacts />} />
            <Route path="quotes" element={<ManageQuotes />} />
            <Route path="content" element={<ManageContent />} />
            <Route path="newsletters" element={<ManageNewsletters />} />
          </Route>
  
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="fabrics" element={<OurFabrics />} />
            <Route path="quotes" element={<GetQuotes />} />
            <Route path="contact" element={<ContactUs />} />
          </Route>
        </Routes>
      </React.Suspense>
    </Router>
      <WhatsAppButton />
    </>
  );
}

export default App;
