
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Gift } from 'lucide-react';
import { motion } from 'framer-motion';

const FloatingDonateButton = () => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5, type: 'spring', stiffness: 120 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Button asChild size="lg" className="rounded-full shadow-xl bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground">
        <Link to="/donate/money" className="flex items-center">
          <Gift className="h-5 w-5 mr-2" />
          Donate Now
        </Link>
      </Button>
    </motion.div>
  );
};

export default FloatingDonateButton;
  