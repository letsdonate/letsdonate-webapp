import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageSquare as SocialIcon } from 'lucide-react'; // Changed icon
import { motion } from 'framer-motion';

const FloatingDonateButton = () => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 120 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Button 
        asChild 
        size="lg" 
        className="rounded-full shadow-xl bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 text-primary-foreground pl-5 pr-6 py-6 group"
      >
        <Link to="/social-change-circle"> {/* Changed link */}
          <SocialIcon className="h-5 w-5 mr-2.5 transition-transform duration-300 group-hover:scale-110" />
          <span className="font-semibold">Join Us Now</span> {/* Changed text */}
        </Link>
      </Button>
    </motion.div>
  );
};

export default FloatingDonateButton;