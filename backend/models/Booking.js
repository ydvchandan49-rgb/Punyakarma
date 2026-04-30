const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  phone: {
    type: String,
    required: [true, 'Please provide a phone number'],
    trim: true
  },
  service: {
    type: String,
    required: [true, 'Please select a service'],
    enum: ['Ganga Bath Haridwar', 'Ganga Bath Rishikesh', 'Gau Seva', 'Booking Service']
  },
  date: {
    type: Date,
    required: [true, 'Please provide a date']
  },
  bookingFor: {
    type: String,
    default: 'Self'
  },
  image: {
    type: String,
    default: ''
  },
  amount: {
    type: Number,
    default: 0
  },
  paymentId: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Completed'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', bookingSchema);