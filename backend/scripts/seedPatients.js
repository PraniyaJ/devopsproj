const mongoose = require('mongoose');
require('dotenv').config();

// Adjust the path if your Patient model is located elsewhere
const Patient = require('../src/models/Patient');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/helsedb';

const samplePatients = [
  {
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1980-05-15',
    gender: 'male',
    email: 'john.doe@example.com',
    phone: '555-1234'
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    dateOfBirth: '1990-09-30',
    gender: 'female',
    email: 'jane.smith@example.com',
    phone: '555-5678'
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB for seeding.');

    // Clear existing patients
    await Patient.deleteMany({});
    console.log('Cleared existing patients.');

    // Insert sample patients
    const created = await Patient.insertMany(samplePatients);
    console.log(`Inserted ${created.length} patients.`);
  } catch (err) {
    console.error('Seeding failed:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  }
}

seed();
