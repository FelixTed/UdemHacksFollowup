const express = require('express');
const router = express.Router();
const { Medicine } = require('../schemas/schemas.js');

// Create a new medicine
router.post('/medicines', async (req, res) => {
    try {
        const medicine = new Medicine(req.body);
        await medicine.save();
        res.status(201).send(medicine);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all medicines
router.get('/medicines', async (req, res) => {
    try {
        const medicines = await Medicine.find();
        res.status(200).send(medicines);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a medicine by ID
router.get('/medicines/:id', async (req, res) => {
    try {
        const medicine = await Medicine.findById(req.params.id);
        if (!medicine) {
            return res.status(404).send();
        }
        res.status(200).send(medicine);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a medicine by ID
router.patch('/medicines/:id', async (req, res) => {
    try {
        const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!medicine) {
            return res.status(404).send();
        }
        res.status(200).send(medicine);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a medicine by ID
router.delete('/medicines/:id', async (req, res) => {
    try {
        const medicine = await Medicine.findByIdAndDelete(req.params.id);
        if (!medicine) {
            return res.status(404).send();
        }
        res.status(200).send(medicine);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;