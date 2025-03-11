const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const twilio = require('twilio');
require('dotenv').config();
const clientRoutes = require('./routes/clientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const medicineRoutes = require('./routes/medicineRoutes');
const { Client, Medicine } = require('./schemas/schemas');

const cors = require('cors')
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());
// Connect to MongoDB
mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Basic route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Use client routes
app.use('/api', clientRoutes);

// Use doctor routes
app.use('/api', doctorRoutes);

// Use medicine routes
app.use('/api', medicineRoutes);

// Twilio configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = new twilio(accountSid, authToken);

function formatPhoneNumber(phoneNumber) {
    // Remove all non-numeric characters
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    // Check if the phone number starts with the country code
    if (cleaned.startsWith('1')) {
        return '+' + cleaned;
    } else {
        return '+1' + cleaned; // Assuming the default country code is 1 (USA/Canada)
    }
}

// Cron job to send SMS reminders
// cron.schedule('* 7 * * *', async () => { 
//     try {
//         const clients = await Client.find().populate('prescriptionList');
        
//         for (const client of clients) {
//             for (const medicineId of client.prescriptionList) {
//                 // Customize the message as needed
//                 console.log(medicineId)
//                 const medicine = await Medicine.findById(medicineId);
//                 if (medicine) {
//                     const message = `Hello ${client.name}, it's time to take your medication: ${medicine.medicineName} (this ${medicine.timeOfTheDay}).`;
//                     await twilioClient.messages.create({
//                         body: message,
//                         from: formatPhoneNumber(process.env.TWILIO_PHONE_NUMBER),
//                         to: formatPhoneNumber(client.phoneNumber)
//                     });
//                     console.log(`Message sent to ${client.phoneNumber}`);
//                 }
//             }
//         }
//     } catch (error) {
//         console.error('Error sending SMS reminders:', error);
//     }
// });

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});