import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminContacts, deleteAdminContact } from '../../features/contacts/contactSlice';

const ManageContacts = () => {
  const dispatch = useDispatch();
  const { data: contacts, adminLoading: loading, adminError: error } = useSelector((state) => state.contacts);

  useEffect(() => {
    dispatch(fetchAdminContacts());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    dispatch(deleteAdminContact(id));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Contact Us Submissions</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email & Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requirements</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contacts.length === 0 ? (
              <tr><td colSpan="5" className="px-6 py-4 text-center text-gray-500">No submissions found.</td></tr>
            ) : contacts.map((contact) => (
              <tr key={contact._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(contact.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {contact.fullName}
                  {contact.companyName && <span className="block text-xs font-normal text-gray-500">{contact.companyName}</span>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {contact.emailAddress} <br/> {contact.phoneNumber}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={contact.requirements}>
                  <strong className="block text-xs text-gray-700">{contact.fabricInterest}</strong>
                  {contact.requirements}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleDelete(contact._id)} className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageContacts;
