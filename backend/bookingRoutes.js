const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// @route   POST /api/bookings
// @desc    Create a new booking
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, phone, service, date, bookingFor, image } = req.body;

    const booking = new Booking({
      name,
      phone,
      service,
      date,
      bookingFor,
      image,
    });

    const savedBooking = await booking.save();
    res.status(201).json({
      success: true,
      data: savedBooking
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// @route   GET /api/bookings
// @desc    Get all bookings
// @access  Public (can be protected with auth)
router.get('/', async (req, res) => {
  try {
    const { service, search } = req.query;
    
    let query = {};
    
    // Filter by service
    if (service && service !== 'All') {
      query.service = service;
    }
    
    // Search by name or phone
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    const bookings = await Booking.find(query).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// @route   PUT /api/bookings/:id
// @desc    Update booking status
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// @route   DELETE /api/bookings/:id
// @desc    Delete a booking
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;