import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterService, setFilterService] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const services = ['All', 'Ganga Bath Haridwar', 'Ganga Bath Rishikesh', 'Gau Seva', 'Booking Service'];
  const statuses = ['Pending', 'Confirmed', 'Completed'];

  // Fetch bookings
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (filterService !== 'All') params.append('service', filterService);

      const response = await axios.get(`http://localhost:5000/api/bookings?${params.toString()}`);
      setBookings(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchBookings();
    }
  }, [isLoggedIn, searchTerm, filterService]);

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.username === 'admin' && credentials.password === '1234') {
      setIsLoggedIn(true);
      toast.success('Login successful!');
    } else {
      toast.error('Invalid credentials');
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await axios.delete(`http://localhost:5000/api/bookings/${id}`);
        toast.success('Booking deleted successfully!');
        fetchBookings();
      } catch (error) {
        toast.error('Failed to delete booking');
      }
    }
  };

  // Handle status update
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/bookings/${id}`, { status: newStatus });
      toast.success('Status updated successfully!');
      fetchBookings();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Name', 'Phone', 'Service', 'Date', 'Booking For', 'Status', 'Created At'];
    const csvContent = [
      headers.join(','),
      ...bookings.map(booking => [
        booking.name,
        booking.phone,
        booking.service,
        new Date(booking.date).toLocaleDateString(),
        booking.bookingFor || 'Self',
        booking.status,
        new Date(booking.createdAt).toLocaleDateString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'bookings.csv';
    link.click();
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = bookings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(bookings.length / itemsPerPage);

  // Login Form
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 flex items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🔐</div>
            <h1 className="text-3xl font-bold text-primary">Admin Login</h1>
            <p className="text-gray-600 mt-2">Enter your credentials to access the dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                placeholder="Enter username"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 outline-none"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold shadow-lg hover:bg-primary/90 transition-all duration-300"
            >
              Login
            </motion.button>
          </form>

          <div className="mt-6 p-4 bg-amber-50 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              Demo credentials: <strong>admin</strong> / <strong>1234</strong>
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-primary text-white p-6">
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🕉️</div>
          <h2 className="text-2xl font-bold">HolyBath</h2>
          <p className="text-sm opacity-75">Admin Dashboard</p>
        </div>
        <nav className="space-y-2">
          <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
            <span>📋</span>
            <span>Bookings</span>
          </div>
        </nav>
        <button
          onClick={() => setIsLoggedIn(false)}
          className="mt-8 w-full bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-colors"
        >
          🚪 Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Bookings Management</h1>
              <p className="text-gray-600">Manage all your bookings here</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={exportToCSV}
              className="bg-accent text-gray-800 px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-accent/90 transition-all"
            >
              📥 Export CSV
            </motion.button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <input
                  type="text"
                  placeholder="Search by name or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>
              <select
                value={filterService}
                onChange={(e) => setFilterService(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:border-primary outline-none"
              >
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Bookings Table */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <svg className="animate-spin h-12 w-12 text-primary" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th className="px-6 py-4 text-left">Name</th>
                      <th className="px-6 py-4 text-left">Phone</th>
                      <th className="px-6 py-4 text-left">Service</th>
                      <th className="px-6 py-4 text-left">Date</th>
                      <th className="px-6 py-4 text-left">Booking For</th>
                      <th className="px-6 py-4 text-left">Photo</th>
                      <th className="px-6 py-4 text-left">Status</th>
                      <th className="px-6 py-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {currentBookings.map((booking, index) => (
                        <motion.tr
                          key={booking._id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                        >
                          <td className="px-6 py-4 font-medium">{booking.name}</td>
                          <td className="px-6 py-4">{booking.phone}</td>
                          <td className="px-6 py-4">{booking.service}</td>
                          <td className="px-6 py-4">{new Date(booking.date).toLocaleDateString()}</td>
                          <td className="px-6 py-4">
                            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">{booking.bookingFor || 'Self'}</span>
                          </td>
                          <td className="px-6 py-4">
                            {booking.image ? (
                              <div className="flex items-center gap-3">
                                <img src={booking.image} alt="User" className="w-10 h-10 rounded-full object-cover border-2 border-primary/20" />
                                <a href={booking.image} download={`photo-${booking.name.replace(/\s+/g, '-')}.jpg`} className="text-blue-500 hover:text-blue-700 bg-blue-50 p-2 rounded-full transition-colors" title="Download Image">
                                  📥
                                </a>
                              </div>
                            ) : (
                              <span className="text-gray-400 text-sm italic">No image</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={booking.status}
                              onChange={(e) => handleStatusUpdate(booking._id, e.target.value)}
                              className={`px-3 py-1 rounded-full text-sm font-semibold outline-none cursor-pointer
                                ${booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                                ${booking.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' : ''}
                                ${booking.status === 'Completed' ? 'bg-green-100 text-green-800' : ''}
                              `}
                            >
                              {statuses.map((status) => (
                                <option key={status} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleDelete(booking._id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              🗑️
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {bookings.length > 0 && (
              <div className="flex justify-between items-center px-6 py-4 border-t">
                <p className="text-gray-600">
                  Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, bookings.length)} of {bookings.length} entries
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-primary text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-primary text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;