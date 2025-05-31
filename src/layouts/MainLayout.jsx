
import React from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import FloatingDonateButton from '@/components/shared/FloatingDonateButton';
import { motion } from 'framer-motion';

const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="flex-grow container mx-auto px-4 py-8"
      >
        {children}
      </motion.main>
      <Footer />
      <FloatingDonateButton />
    </div>
  );
};

export default MainLayout;
  