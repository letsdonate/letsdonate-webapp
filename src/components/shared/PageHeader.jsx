import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const PageHeader = ({ title, subtitle, children, className, fullWidth = false }) => {
  return (
    <motion.div 
      className={cn(
        "py-12 md:py-20 text-center mb-12 md:mb-16",
        !fullWidth && "rounded-xl shadow-soft", // Apply rounded and shadow only if not fullWidth
        fullWidth ? "bg-transparent" : "bg-gradient-to-br from-primary/5 via-background to-secondary/5", // Conditional background
        className
      )}
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className={cn(!fullWidth && "container mx-auto px-4")}>
        {title && <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">{title}</h1>}
        {subtitle && <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6">{subtitle}</p>}
        {children}
      </div>
    </motion.div>
  );
};

export default PageHeader;