
const express = require('express');
const router = express.Router();
const Model = require('../models/carModel');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { default: authenticate } = require('../middlewares/auth');
// Add car: expects all data including image URL in JSON body
router.post('/add', authenticate, async (req, res) => {
    console.log(req.user);

    req.body.owner = req.user._id;
    console.log(req.body);
    try {
        const { brand, model, chassisNumber, regNumber, year, image, owner } = req.body;
        const car = new Model({
            brand,
            model,
            chassisNumber,
            regNumber: regNumber || 'unknown',
            year,
            image,
            owner
        });
        const result = await car.save();
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/getall', (req, res) => {
    Model.find().populate('owner')
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/getbyid/:id', (req, res) => {
    Model.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/getbyregnum/:regNumber', (req, res) => {
    Model.find({ regNumber: req.params.regNumber })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(result);
        });
});

router.get('/user', authenticate, (req, res) => {
    Model.find({ owner: req.user._id })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(result);
        });
});

router.delete('/delete/:id', (req, res) => {
    Model.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/update/:id', (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;