import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Prescription {
  patientName: string;
  diagnosis: string;
  medicineName: string;
  dosage: string;
  doctor: string;
}

interface AlternativeMedicineProps {
  prescription: Prescription | null;
}

interface Alternative {
  name: string;
  description: string;
}

export function AlternativeMedicine({ prescription }: AlternativeMedicineProps) {
  const [alternative, setAlternative] = useState<Alternative | null>(null);

  useEffect(() => {
    if (prescription) {
      // Simulate fetching alternative medicine (replace with your backend API call)
      setTimeout(() => {
        setAlternative({
          name: 'AlternaMed',
          description: 'A suitable alternative with similar effects and ingredients.',
        });
      }, 1000);
    }
  }, [prescription]);

  if (!prescription) {
    return <p>No prescription provided.</p>; // Informative fallback for missing props
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
