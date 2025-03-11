const mongoose = require('mongoose');

// Medicine Schema
const medicineSchema = new mongoose.Schema({
    medicineName: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    frequency: { type: String, required: true },
    timeOfTheDay: { type: String },
    disclaimer: { type: String }
});

// Client Schema
const clientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    emailAddress: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    prescriptionList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' }],
    flags: { type: String }, // Store if someone skips prescription
    interactions: { type: String },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', default: null } // 0..1 relation with Doctor
});

// Doctor Schema
const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    clientsList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Client' }],
    email: { type: String, required: true, unique: true }
});


// Export models
const Medicine = mongoose.model('Medicine', medicineSchema);
const Client = mongoose.model('Client', clientSchema);
const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = { Medicine, Client, Doctor };
