import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Prescription {
  patientName: string;
  diagnosis: string;
  medicineName: string;
  dosage: string;
  doctor: string;
}

interface Alternative {
  name: string;
  description: string;
}

interface AlternativeMedicineProps {
  prescription: Prescription | null;
}

export function AlternativeMedicine({ prescription }: AlternativeMedicineProps) {
  const [alternative, setAlternative] = useState<Alternative | null>(null);

  useEffect(() => {
    if (prescription) {
      // Simulate fetching alternative medicine. Replace with API call if needed
      setAlternative({
        name: 'AlternaMed',
        description: 'A suitable alternative with similar effects and ingredients.',
      });
    }
  }, [prescription]);

  if (!prescription) {
    return <p className="text-red-500">No prescription provided.</p>; // Show message if no prescription is available
  }

  return (
    <motion.div
      className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-indigo-800">Prescription Details</h2>
      {Object.entries(prescription).map(([key, value]) => (
        <p key={key} className="mb-2">
          <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
        </p>
      ))}
      {alternative && (
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-xl font-bold mb-2 text-indigo-700">Alternative Medicine</h3>
          <p><strong>Name:</strong> {alternative.name}</p>
          <p><strong>Description:</strong> {alternative.description}</p>
        </motion.div>
      )}
    </motion.div>
  );
}
