
import React from 'react';
import { motion } from 'framer-motion';

const PageHeader = ({ title, subtitle, children }) => {
  return (
    <motion.div 
      className="py-12 md:py-16 text-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 rounded-lg mb-12 shadow-inner"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">{title}</h1>
        {subtitle && <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">{subtitle}</p>}
        {children}
      </div>
    </motion.div>
  );
};

export default PageHeader;
  