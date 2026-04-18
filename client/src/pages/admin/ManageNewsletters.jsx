import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminNewsletters, deleteAdminNewsletter } from '../../features/newsletter/newsletterSlice';

const ManageNewsletters = () => {
  const dispatch = useDispatch();
  const { data: subscribers, adminLoading: loading, adminError: error } = useSelector((state) => state.newsletter);

  useEffect(() => {
    dispatch(fetchAdminNewsletters());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to remove this subscriber?")) return;
    dispatch(deleteAdminNewsletter(id));
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading subscribers...</div>;
  if (error) return <div className="p-8 text-center text-red-500 font-bold">Error: {error}</div>;

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Newsletter Subscribers</h2>
          <p className="text-sm text-gray-500">Manage your list of email subscribers for marketing and updates.</p>
        </div>
        <div className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-bold text-sm">
          {subscribers.length} Total
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Joined</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {subscribers.length === 0 ? (
              <tr><td colSpan="4" className="px-6 py-8 text-center text-gray-400 italic">No subscribers yet.</td></tr>
            ) : subscribers.map((sub) => (
              <tr key={sub._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(sub.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {sub.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">Active</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => handleDelete(sub._id)} 
                    className="text-red-500 hover:text-red-700 transition-colors font-bold uppercase text-[10px] tracking-widest"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageNewsletters;
