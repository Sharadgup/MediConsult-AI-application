import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Define type for form data
interface PrescriptionFormData {
  patientName: string;
  diagnosis: string;
  medicineName: string;
  dosage: string;
  doctor: string;
}

// Define props type for the component
interface PrescriptionFormProps {
  setPrescription: (data: PrescriptionFormData) => void;
}

export function PrescriptionForm({ setPrescription }: PrescriptionFormProps) {
  const [formData, setFormData] = useState<PrescriptionFormData>({
    patientName: '',
    diagnosis: '',
    medicineName: '',
    dosage: '',
    doctor: '',
  });

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPrescription(formData); // Pass form data to parent
    console.log('Form submitted:', formData); // Debug log
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4"
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-indigo-600">Prescription Form</h2>
      {Object.entries(formData).map(([key, value]) => (
        <div key={key} className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor={key}
          >
            {key
              .split(/(?=[A-Z])/)
              .join(' ')
              .replace(/^./, (str) => str.toUpperCase())}
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-600"
            id={key}
            type="text"
            name={key}
            value={value}
            onChange={handleChange}
            required
          />
        </div>
      ))}
      <div className="flex items-center justify-between">
        <motion.button
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit Prescription
        </motion.button>
      </div>
    </motion.form>
  );
}
