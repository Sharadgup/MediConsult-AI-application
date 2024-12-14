// Mark this file as a client component
'use client';
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PrescriptionForm } from "@/components/PrescriptionForm.1";
import { AlternativeMedicine } from "@/components/AlternativeMedicine";
import { Dashboard } from "@/components/Dashboard";
import { Login } from "../components/Login";
import { Register } from "../components/Register";
import { AIChat } from "../components/AIChat";
import { AppProps, Prescription } from './App';

export default function App({ }: AppProps) {
    const [activeTab, setActiveTab] = useState<string>('prescribe');
    const [prescription, setPrescription] = useState<Prescription | null>(null);
    const [user, setUser] = useState<string | null>(null);
    const [showRegister, setShowRegister] = useState(false);

    function handleLogin(username: string) {
        setUser(username);
    }

    const handleLogout = () => {
        setUser(null);
    };

    const handleRegister = () => {
        setShowRegister(false);
    };

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col bg-gradient-custom">
                <Header />
                <main className="flex-grow container mx-auto px-4 py-8">
                    <motion.h1
                        className="text-4xl font-bold text-center mb-8 text-indigo-custom"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Welcome to MediConsult AI
                    </motion.h1>
                    <div className="max-w-md mx-auto">
                        {showRegister ? (
                            <Register onRegister={handleRegister} />
                        ) : (
                            <Login onLogin={handleLogin} />
                        )}
                        <p className="text-center mt-4">
                            {showRegister ? (
                                <>
                                    Already have an account?{' '}
                                    <button
                                        className="text-indigo-custom hover:underline"
                                        onClick={() => setShowRegister(false)}
                                    >
                                        Sign in
                                    </button>
                                </>
                            ) : (
                                <>
                                    Don't have an account?{' '}
                                    <button
                                        className="text-indigo-custom hover:underline"
                                        onClick={() => setShowRegister(true)}
                                    >
                                        Register
                                    </button>
                                </>
                            )}
                        </p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-custom">
            {/* Use 'user' here instead of 'User' */}
            {<Header user={user} onLogout={handleLogout} />}
            <main className="flex-grow container mx-auto px-4 py-8">
                <motion.h1
                    className="text-4xl font-bold text-center mb-8 text-indigo-custom"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Medicine Consulting and Solutions
                </motion.h1>
                <div className="flex justify-center mb-8">
                    <motion.button
                        className={`mx-2 px-6 py-2 rounded-full text-lg font-semibold transition-colors duration-200 ${activeTab === 'prescribe' ? 'bg-indigo-custom text-white' : 'bg-white text-indigo-custom hover:bg-indigo-100'}`}
                        onClick={() => setActiveTab('prescribe')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Prescribe
                    </motion.button>
                    <motion.button
                        className={`mx-2 px-6 py-2 rounded-full text-lg font-semibold transition-colors duration-200 ${activeTab === 'dashboard' ? 'bg-indigo-custom text-white' : 'bg-white text-indigo-custom hover:bg-indigo-100'}`}
                        onClick={() => setActiveTab('dashboard')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Dashboard
                    </motion.button>
                    <motion.button
                        className={`mx-2 px-6 py-2 rounded-full text-lg font-semibold transition-colors duration-200 ${activeTab === 'chat' ? 'bg-indigo-custom text-white' : 'bg-white text-indigo-custom hover:bg-indigo-100'}`}
                        onClick={() => setActiveTab('chat')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        AI Chat
                    </motion.button>
                </div>
                <AnimatePresence mode="wait">
                    {activeTab === 'prescribe' && (
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
                    )}
                    {activeTab === 'dashboard' && (
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
                    {activeTab === 'chat' && (
                        <motion.div
                            key="chat"
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 100 }}
                            transition={{ duration: 0.3 }}
                        >
                            <AIChat />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
            <Footer />
        </div>
    );
}
