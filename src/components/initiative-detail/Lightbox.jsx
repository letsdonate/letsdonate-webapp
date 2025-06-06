import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const Lightbox = ({ isOpen, imageSrc, onClose }) => { // Changed props to isOpen, imageSrc, onClose
  if (!isOpen || !imageSrc) return null; // Check isOpen as well

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.img
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        src={imageSrc}
        alt="Lightbox view"
        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()} 
      />
      <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full" onClick={onClose}>
        <X className="h-6 w-6" />
      </Button>
    </motion.div>
  );
};

export default Lightbox;