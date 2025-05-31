import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react'; // Changed from Gift to Heart for a warmer feel
import { motion } from 'framer-motion';

const FloatingDonateButton = () => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5, type: 'spring', stiffness: 120 }}
      className="fixed bottom-8 right-8 z-50" // Increased spacing from edge
    >
      <Button 
        asChild 
        size="lg" 
        className="rounded-full shadow-soft-hover bg-primary hover:bg-primary-soft text-primary-foreground h-14 w-14 p-0 md:h-auto md:w-auto md:px-6 md:py-3"
      >
        <Link to="/donate/money" className="flex items-center justify-center">
          <Heart className="h-6 w-6 md:mr-2 fill-current" /> {/* Fill current for solid heart */}
          <span className="hidden md:inline">Donate Now</span>
        </Link>
      </Button>
    </motion.div>
  );
};

export default FloatingDonateButton;