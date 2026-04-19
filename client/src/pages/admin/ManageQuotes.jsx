import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminQuotes, deleteAdminQuote } from '../../features/quotes/quoteSlice';

const ManageQuotes = () => {
  const dispatch = useDispatch();
  const { data: quotes, adminLoading: loading, adminError: error } = useSelector((state) => state.quotes);

  useEffect(() => {
    dispatch(fetchAdminQuotes());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this quote request?")) return;
    dispatch(deleteAdminQuote(id));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Quote Requests</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Info</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fabric & Qty</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Details</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {quotes.length === 0 ? (
              <tr><td colSpan="5" className="px-6 py-4 text-center text-gray-500">No requests found.</td></tr>
            ) : quotes.map((quote) => (
              <tr key={quote._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(quote.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="font-bold">{quote.name}</div>
                  <div className="text-gray-500 text-xs">{quote.email}</div>
                  <div className="text-gray-500 text-xs">{quote.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="block font-medium text-gray-900">{quote.fabricType}</span>
                  <span className="block text-xs">Qty: {quote.quantity}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={quote.message}>{quote.message || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                   <button onClick={() => handleDelete(quote._id)} className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageQuotes;
