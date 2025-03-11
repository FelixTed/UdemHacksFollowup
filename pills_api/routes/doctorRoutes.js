const express = require('express');
const router = express.Router();
const { Doctor } = require('../schemas/schemas.js');

// Create a new doctor
router.post('/doctors', async (req, res) => {
    try {
        const doctor = new Doctor(req.body);
        await doctor.save();
        res.status(201).send(doctor);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all doctors
router.get('/doctors', async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).send(doctors);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a doctor by ID
router.get('/doctors/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).send();
        }
        res.status(200).send(doctor);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a doctor by ID
router.patch('/doctors/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!doctor) {
            return res.status(404).send();
        }
        res.status(200).send(doctor);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a doctor by ID
router.delete('/doctors/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndDelete(req.params.id);
        if (!doctor) {
            return res.status(404).send();
        }
        res.status(200).send(doctor);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;