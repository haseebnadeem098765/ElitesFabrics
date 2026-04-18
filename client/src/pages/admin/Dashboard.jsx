import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAdminContacts } from '../../features/contacts/contactSlice';
import { fetchAdminQuotes } from '../../features/quotes/quoteSlice';
import { fetchAdminNewsletters } from '../../features/newsletter/newsletterSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.data);
  const quotes = useSelector((state) => state.quotes.data);
  const subscribers = useSelector((state) => state.newsletter.data);

  const stats = {
    contacts: contacts?.length || 0,
    quotes: quotes?.length || 0,
    subscribers: subscribers?.length || 0
  };

  useEffect(() => {
    dispatch(fetchAdminContacts());
    dispatch(fetchAdminQuotes());
    dispatch(fetchAdminNewsletters());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Contacts Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Contacts</p>
              <h3 className="text-3xl font-bold text-gray-800">{stats.contacts}</h3>
            </div>
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/admin/contacts" className="text-sm font-medium text-primary hover:text-primary-dark flex items-center">
              View all
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>

        {/* Quotes Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-secondary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Quote Requests</p>
              <h3 className="text-3xl font-bold text-gray-800">{stats.quotes}</h3>
            </div>
            <div className="p-3 rounded-full bg-secondary/20 text-secondary-dark">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/admin/quotes" className="text-sm font-medium text-secondary-dark hover:text-secondary flex items-center">
              View all
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>

        {/* Newsletter Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-emerald-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Newsletter Subs</p>
              <h3 className="text-3xl font-bold text-gray-800">{stats.subscribers}</h3>
            </div>
            <div className="p-3 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
              <span className="material-symbols-outlined text-2xl">mail</span>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/admin/newsletters" className="text-sm font-medium text-emerald-600 hover:text-emerald-700 font-bold flex items-center uppercase text-[10px] tracking-widest">
              Manage list
              <svg className="w-4 h-4 ml-1 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>

        {/* CMS Setup Info */}
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-gray-400">
           <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Content Manager</p>
              <h3 className="text-lg font-bold text-gray-800">Edit Website</h3>
            </div>
            <div className="p-3 rounded-full bg-gray-100 text-gray-500">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/admin/content" className="text-sm font-medium text-gray-500 hover:text-gray-700 flex items-center">
              Go to CMS
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-8 mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Welcome to Elites Fabrics Admin Panel</h2>
        <p className="text-gray-600 mb-4">
          From here you can view customer inquiries, requested quotes, and manage the dynamic content of your website.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
