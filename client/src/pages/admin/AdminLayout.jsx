import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { isAdminAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAdminAuthenticated, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin/login');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Contacts', path: '/admin/contacts', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { name: 'Quotes', path: '/admin/quotes', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
    { name: 'Content CMS', path: '/admin/content', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition duration-200 ease-in-out z-30 w-64 bg-primary-dark text-white flex flex-col shadow-xl`}>
        <div className="p-6 border-b border-primary/50">
          <h1 className="text-2xl font-bold tracking-tight">Elites<span className="text-secondary">Admin</span></h1>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
                location.pathname === item.path
                  ? 'bg-secondary text-primary-dark font-semibold'
                  : 'text-gray-300 hover:bg-primary hover:text-white'
              }`}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-primary/50">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden w-full">
        <header className="bg-white shadow-sm px-4 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="mr-4 text-gray-500 hover:text-gray-700 focus:outline-none lg:hidden"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h2 className="text-xl font-semibold text-gray-800">
              {menuItems.find((m) => m.path === location.pathname)?.name || 'Admin Dashboard'}
            </h2>
          </div>
          <div className="flex items-center hidden sm:flex">
             <span className="text-sm text-gray-500 mr-2">Welcome, Admin</span>
             <div className="w-8 h-8 rounded-full bg-primary-dark text-white flex items-center justify-center font-bold">A</div>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
