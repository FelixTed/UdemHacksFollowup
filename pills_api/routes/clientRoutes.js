const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Client } = require('../schemas/schemas.js');

// Create a new client
router.post('/clients', async (req, res) => {
    try {
        const client = new Client(req.body);
        await client.save();
        res.status(201).send(client);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Login route
router.post('/clients/login', async (req, res) => {
    try {
        const { emailAddress, password } = req.body;
        const client = await Client.findOne({ emailAddress });
        console.log(client)
        console.log(password)
        if (!client) {
            return res.status(404).send({ error: 'Invalid login credentials' });
        }
        let isMatch
        if (password === client.password){
            isMatch = true
        }
        else{isMatch = false}
        console.log(client.password)
        if (!isMatch) {
            return res.status(404).send({ error: 'Invalid login credentials' });
        }
        res.status(200).send(client);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get all clients
router.get('/clients', async (req, res) => {
    try {
        const clients = await Client.find();
        res.status(200).send(clients);
    } catch (error) {
        res.status(500).send(error);
    }
});





// Get a client by ID
router.get('/clients/:id', async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) {
            return res.status(404).send();
        }
        res.status(200).send(client);
    } catch (error) {
        res.status(500).send(error);
    }
});



// Update a client by ID
router.patch('/clients/:id', async (req, res) => {
    try {
        const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!client) {
            return res.status(404).send();
        }
        res.status(200).send(client);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a client by ID
router.delete('/clients/:id', async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.id);
        if (!client) {
            return res.status(404).send();
        }
        res.status(200).send(client);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;