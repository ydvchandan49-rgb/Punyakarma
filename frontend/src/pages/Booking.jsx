import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';

const services = [
  'Ganga Bath Haridwar',
  'Ganga Bath Rishikesh',
  'Gau Seva',
  'Booking Service',
];

const servicePrices = {
  'Ganga Bath Haridwar': 500,
  'Ganga Bath Rishikesh': 300,
  'Gau Seva': 500,
  'Booking Service': 100,
};

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    bookingFor: 'Self',
    image: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Convert uploaded image to Base64 String
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to load Razorpay SDK dynamically
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.service) return toast.error('Please select a service');
    
    setLoading(true);

    try {
      // 1. Load Razorpay script
      const res = await loadRazorpay();
      if (!res) {
        toast.error('Razorpay SDK failed to load. Check your connection.');
        return;
      }

      // 2. Create Order on Backend
      const amount = servicePrices[formData.service];
      const orderResult = await axios.post('http://localhost:5000/api/bookings/create-order', { amount });

      if (!orderResult || !orderResult.data) {
        toast.error('Server error. Could not create order.');
        return;
      }

      const { amount: orderAmount, id: order_id, currency } = orderResult.data;

      // 3. Initialize Razorpay window
      const options = {
        key: "YOUR_RAZORPAY_KEY_ID", // Replace this with your actual Key ID
        amount: orderAmount.toString(),
        currency: currency,
        name: "HolyBath",
        description: `Booking for ${formData.service}`,
        order_id: order_id,
        handler: async function (response) {
          // 4. Save booking on successful payment
          try {
            const finalData = { ...formData, amount: amount, paymentId: response.razorpay_payment_id };
            const bookingResponse = await axios.post('http://localhost:5000/api/bookings', finalData);
            
            if (bookingResponse.data.success) {
              toast.success('Payment & Booking successful!');
              setFormData({ name: '', phone: '', service: '', date: '', bookingFor: 'Self', image: '' });
            }
          } catch (err) {
            toast.error(err.response?.data?.error || 'Booking failed after payment!');
          }
        },
        prefill: { name: formData.name, contact: formData.phone },
        theme: { color: "#8B4513" },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on('payment.failed', function (response) {
        toast.error("Payment Failed! " + response.error.description);
      });
      paymentObject.open();

    } catch (error) {
      toast.error(error.response?.data?.error || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 py-12 mt-20">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="text-6xl mb-4">🕉️</div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Book Your Divine Experience
          </h1>
          <p className="text-xl text-gray-600">
            Fill in the details below and our team will contact you shortly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 outline-none"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 outline-none"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Service Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Service *
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 outline-none bg-white"
                >
                  <option value="">Choose a service</option>
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
                {formData.service && (
                  <div className="mt-2 text-green-700 text-sm font-bold bg-green-50 p-2.5 rounded-lg border border-green-200">
                    Amount to Pay: ₹{servicePrices[formData.service]}
                  </div>
                )}
              </div>

              {/* Date Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 outline-none"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Booking For Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Booking For *
                </label>
                <select
                  name="bookingFor"
                  value={formData.bookingFor}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 outline-none bg-white"
                >
                  <option value="Self">Self</option>
                  <option value="Someone Else">Someone Else</option>
                </select>
              </div>

              {/* Image Upload Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload Photo (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 outline-none bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-4 rounded-lg font-semibold text-lg shadow-lg hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </span>
              ) : (
                'Submit Booking'
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Service Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-4 gap-6 mt-12"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 shadow-md text-center"
            >
              <div className="text-2xl mb-2">
                {index === 0 ? '🌊' : index === 1 ? '🧘' : index === 2 ? '🐄' : '📅'}
              </div>
              <h3 className="font-semibold text-primary text-sm">{service}</h3>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Booking;