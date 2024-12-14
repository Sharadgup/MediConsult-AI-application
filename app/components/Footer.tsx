import React from 'react';
import { motion } from 'framer-motion';

export function Footer() {
  return (
    <motion.footer
      className="bg-indigo-custom text-white py-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 text-center">
        <p>&copy; 2023 MediConsult AI. All rights reserved.</p>
      </div>
    </motion.footer>
  );
}
