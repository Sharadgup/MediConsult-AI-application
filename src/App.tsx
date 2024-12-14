import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PrescriptionForm } from './components/PrescriptionForm';
import { AlternativeMedicine } from './components/AlternativeMedicine';
import { Dashboard } from './components/Dashboard';

export default function App() {
  const [activeTab, setActiveTab] = useState('prescribe');
  const [prescription, setPrescription] = useState(null);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.h1 
          className="text-4xl font-bold text-center mb-8 text-indigo-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Medicine Consulting and Solutions
        </motion.h1>
        <div className="flex justify-center mb-8">
          <motion.button
            className={`mx-2 px-6 py-2 rounded-full text-lg font-semibold transition-colors duration-200 ${
              activeTab === 'prescribe' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600 hover:bg-indigo-100'
            }`}
            onClick={() => setActiveTab('prescribe')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Prescribe
          </motion.button>
          <motion.button
            className={`mx-2 px-6 py-2 rounded-full text-lg font-semibold transition-colors duration-200 ${
              activeTab === 'dashboard' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600 hover:bg-indigo-100'
            }`}
            onClick={() => setActiveTab('dashboard')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Dashboard
          </motion.button>
        </div>
        <AnimatePresence mode="wait">
          {activeTab === 'prescribe' ? (
            <motion.div
              key="prescribe"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 gap-8"
            >
              <PrescriptionForm setPrescription={setPrescription} />
              <AlternativeMedicine prescription={prescription} />
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
            >
              <Dashboard />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

