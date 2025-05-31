import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AnimatedCounter = ({ end, duration = 2, suffix = '', prefix = '' }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 }
      });
      let start = 0;
      const incrementTime = (duration * 1000) / end;
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) {
          clearInterval(timer);
        }
      }, incrementTime);
      return () => clearInterval(timer);
    }
  }, [inView, end, duration, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      className="text-center"
    >
      <span className="text-4xl md:text-5xl font-bold text-primary">
        {prefix}{count}{suffix}
      </span>
    </motion.div>
  );
};

export default AnimatedCounter;