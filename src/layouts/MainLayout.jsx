import React from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import FloatingDonateButton from '@/components/shared/FloatingDonateButton';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const MainLayout = ({ children }) => {
  const location = useLocation();
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <motion.main
        key={location.pathname} 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="flex-grow pt-8 pb-16" 
      >
        {children}
      </motion.main>
      <Footer />
      <FloatingDonateButton />
    </div>
  );
};

export default MainLayout;