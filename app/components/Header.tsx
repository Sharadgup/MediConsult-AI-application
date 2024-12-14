import React from 'react';
import { motion } from 'framer-motion';

interface HeaderProps {
  user: string | null; // Make it non-optional for consistency
  onLogout: () => void;
}

export function Header({ user, onLogout }: HeaderProps) {
  return (
    <motion.header
      className="bg-indigo-custom text-white py-4 shadow-md"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <motion.div
            className="w-10 h-10 mr-4 bg-white rounded-full flex items-center justify-center"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-custom" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </motion.div>
          <h1 className="text-2xl font-bold">MediConsult AI</h1>
        </div>
        {user && (
          <div className="flex items-center">
            <span className="mr-4">Welcome, {user}</span>
            <motion.button
              className="bg-white text-indigo-custom px-4 py-2 rounded-full font-semibold"
              onClick={onLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Logout
            </motion.button>
          </div>
        )}
      </div>
    </motion.header>
  );
}
