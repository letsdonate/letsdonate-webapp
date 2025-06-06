import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const SectionWrapper = ({ children, className, id, fullWidth = false }) => {
  return (
    <motion.section
      id={id}
      className={cn('py-12 md:py-20', fullWidth ? '' : 'container mx-auto px-4', className)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.section>
  );
};

export default SectionWrapper;