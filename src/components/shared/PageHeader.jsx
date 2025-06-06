import React from 'react';
import { motion } from 'framer-motion';

const PageHeader = ({ title, subtitle, children, titleClassName = "text-4xl md:text-5xl font-bold text-primary", subtitleClassName = "text-base md:text-lg text-muted-foreground max-w-2xl mx-auto" }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="py-12 md:py-20 text-center bg-gradient-to-b from-background to-background/80 mb-8 md:mb-12 rounded-b-xl shadow-sm"
    >
      <div className="container mx-auto px-4">
        {children && <div className="mb-6">{children}</div>}
        {title && <h1 className={`${titleClassName} mb-4`}>{title}</h1>}
        {subtitle && <p className={`${subtitleClassName}`}>{subtitle}</p>}
      </div>
    </motion.div>
  );
};

export default PageHeader;