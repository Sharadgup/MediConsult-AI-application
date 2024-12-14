import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Medicine Schema
const medicineSchema = new mongoose.Schema({
  name: String,
  formula: String,
  uses: [String],
});

const Medicine = mongoose.model('Medicine', medicineSchema);

// Prescription Schema
const prescriptionSchema = new mongoose.Schema({
  patientName: String,
  diagnosis: String,
  medicines: [{
    name: String,
    dosage: String,
  }],
  doctor: String,
  date: { type: Date, default: Date.now },
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

// Routes
app.post('/api/prescribe', async (req, res) => {
  try {
    const prescription = new Prescription(req.body);
    await prescription.save();
    res.status(201).json(prescription);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post('/api/find-alternative', async (req, res) => {
  try {
    const { medicineName } = req.body;
    const medicine = await Medicine.findOne({ name: medicineName });

    if (!medicine) {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that suggests alternative medicines based on their formula and uses."
          },
          {
            role: "user",
            content: `Suggest an alternative for ${medicineName} based on its common uses and formula.`
          }
        ],
      });

      res.json({ alternative: response.choices[0].message.content });
    } else {
      const alternatives = await Medicine.find({
        formula: medicine.formula,
        name: { $ne: medicine.name }
      });

      res.json({ alternatives });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

