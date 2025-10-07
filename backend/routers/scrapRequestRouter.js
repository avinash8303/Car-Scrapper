const express = require('express');
const router = express.Router();
const ScrapRequest = require('../models/scrapRequestModel');
const User = require('../models/userModel');
const Car = require('../models/carModel');
const { default: authenticate } = require('../middlewares/auth');

router.post('/', authenticate, async (req, res) => {
    try {
        console.log(req.body);
        const user = req.user;
        const { car, reason } = req.body;

        if (!user || !car || !reason) {
            return res.status(400).json({ message: 'User, car, and reason are required.' });
        }

        const userExists = await User.findById(user);
        const carExists = await Car.findById(car);
        const carScrapExists = await ScrapRequest.findOne({ car });

        if (!userExists || !carExists) {
            return res.status(404).json({ message: 'User or Car not found.' });
        }

        const newRequest = new ScrapRequest({
            user,
            car,
            reason
        });

        const savedRequest = await newRequest.save();
        res.status(201).json(savedRequest);

    } catch (error) {
        console.error('Error creating scrap request:', error);
        res.status(500).json({ message: 'Server error while creating scrap request.' });
    }
});

router.get('/', async (req, res) => {
    try {
        const requests = await ScrapRequest.find()
            .populate('user', 'name email')
            .populate('car', 'brand model regNumber');

        res.status(200).json(requests);
    } catch (error) {
        console.error('Error fetching scrap requests:', error);
        res.status(500).json({ message: 'Server error while fetching scrap requests.' });
    }
});

router.get('/user', authenticate, async (req, res) => {
    try {
        const requests = await ScrapRequest.find({ user: req.user._id })
            .populate('car', 'brand model year image');

        if (!requests) {
            return res.status(404).json({ message: 'No scrap requests found for this user.' });
        }

        res.status(200).json(requests);
    } catch (error) {
        console.error('Error fetching user scrap requests:', error);
        res.status(500).json({ message: 'Server error while fetching user scrap requests.' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status, notes } = req.body;

        const allowedStatuses = ['Pending', 'Approved', 'Rejected'];
        if (status && !allowedStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status value.' });
        }

        const updateData = { ...req.body };

        if (status) {
            updateData.processedAt = new Date();
        }

        const updatedRequest = await ScrapRequest.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        ).populate('user', 'name email').populate('car');

        if (!updatedRequest) {
            return res.status(404).json({ message: 'Scrap request not found.' });
        }

        res.status(200).json(updatedRequest);

    } catch (error) {
        console.error('Error updating scrap request:', error);
        res.status(500).json({ message: 'Server error while updating scrap request.' });
    }
});

router.put('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const allowedStatuses = ['Pending', 'Approved', 'Rejected'];
    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value.' });
    }

    const updateData = { ...req.body };
    if (status) updateData.processedAt = new Date();

    // ✅ store vendor who approved it
    if (status === 'Approved') {
      updateData.approvedBy = req.user._id;
    }

    const updatedRequest = await ScrapRequest.findByIdAndUpdate(id, updateData, { new: true })
      .populate('user', 'name email')
      .populate('car', 'brand model year image')
      .populate('approvedBy', 'name email'); // 👈 include vendor info

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Scrap request not found.' });
    }

    res.status(200).json(updatedRequest);
  } catch (error) {
    console.error('Error updating scrap request:', error);
    res.status(500).json({ message: 'Server error while updating scrap request.' });
  }
});


router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRequest = await ScrapRequest.findByIdAndDelete(id);

        if (!deletedRequest) {
            return res.status(404).json({ message: 'Scrap request not found.' });
        }

        res.status(200).json({ message: 'Scrap request successfully deleted.' });
    } catch (error) {
        console.error('Error deleting scrap request:', error);
        res.status(500).json({ message: 'Server error while deleting scrap request.' });
    }
});

module.exports = router;