const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date },
  gender: { type: String },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: String },
  bloodGroup: { type: String },
  emergencyContactName: { type: String },
  emergencyContactPhone: { type: String },
  medicalHistory: { type: String },
  allergies: { type: String },
  currentMedications: { type: String },
  insuranceProvider: { type: String },
  insurancePolicyNumber: { type: String },
  maritalStatus: { type: String },
  occupation: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);
