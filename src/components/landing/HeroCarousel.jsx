import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const defaultHeroSlidesData = [
  {
    titlePart1: "Be the reason someone believes in",
    titleHighlight: "kindness",
    titlePart2: "again.",
    subtitle: "Join Let's Donate and make a tangible difference in the lives of those who need it most.",
    buttonText: "Join as a Volunteer",
    buttonLink: "/donate/time",
    imageSrc: "https://dl.dropboxusercontent.com/scl/fi/nu0xt3pnx8con0yqs8w1m/join_us_carousel.jpg?rlkey=ny4eomy73r7candsacpotgjvw&st=ukh81ynh&raw=1"
  },
  {
    titlePart1: "Make your special day",
    titleHighlight: "meaningful",
    titlePart2: ".",
    subtitle: "Celebrate your birthday by supporting a cause close to your heart. Spread joy with Let's Donate.",
    buttonText: "Celebrate With Us",
    buttonLink: "/celebrate-birthday",
    imageSrc: "https://dl.dropboxusercontent.com/scl/fi/rk6qr6lcnzycoguzp1fxc/birthday_carousel.jpg?rlkey=abhkzi3yyrye9elfuchl7drjb&st=dfzxn3ia&dl=0" 
  },
  {
    titlePart1: "Every",
    titleHighlight: "contribution",
    titlePart2: "counts.",
    subtitle: "Your financial support empowers our projects and helps us reach more communities in need.",
    buttonText: "Donate Funds",
    buttonLink: "/donate/money",
    imageSrc: "https://dl.dropboxusercontent.com/scl/fi/vrhwd4vsx1ieykwokmrcu/Carousel_1.jpg?rlkey=6u6rv3u7jf9snsdou8j0ehc6a&raw=1" 
  },
  {
    titlePart1: "Share your",
    titleHighlight: "resources",
    titlePart2: ".",
    subtitle: "Donate materials like books, clothes, or toys and directly impact someone's life.",
    buttonText: "Gift Items",
    buttonLink: "/donate/material",
    imageSrc: "https://dl.dropboxusercontent.com/scl/fi/ryb8k2f2m0j2mxrloqnpg/share_carousel.jpeg?rlkey=bbgl3bvs1987t65s5swairgqy&st=yntjr2cx&raw=1" 
  },
];

const HeroCarousel = ({ slides = defaultHeroSlidesData }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideIntervalRef = useRef(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    slideIntervalRef.current = setInterval(nextSlide, 7000);
    return () => clearInterval(slideIntervalRef.current);
  }, [slides.length]);

  const handleManualNavigation = () => {
    clearInterval(slideIntervalRef.current);
    slideIntervalRef.current = setInterval(nextSlide, 10000);
  };
  
  const slideContentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: "easeIn" } }
  };

  return (
    <div className="!py-0 relative min-h-[70vh] md:min-h-[85vh] flex items-center justify-center text-center overflow-hidden">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 z-0"
        >
          <img 
            className="w-full h-full object-cover object-center"
            alt={slides[currentSlide].titleHighlight}
            src={slides[currentSlide].imageSrc} 
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1920&q=80'; }} // Fallback image
          />
          <div className="absolute inset-0 teal-overlay-gradient z-10"></div>
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 container mx-auto px-4 py-10 text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content_${currentSlide}`}
            variants={slideContentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight shadow-text">
              {slides[currentSlide].titlePart1}{' '}
              <span className="text-secondary">{slides[currentSlide].titleHighlight}</span>{' '}
              {slides[currentSlide].titlePart2}
            </h1>
            <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light">
              {slides[currentSlide].subtitle}
            </p>
            <Button 
              size="lg" 
              asChild 
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-xl px-10 py-3 text-lg font-semibold shadow-soft-hover transition-all duration-300 transform hover:scale-105"
            >
              <Link to={slides[currentSlide].buttonLink}>{slides[currentSlide].buttonText}</Link>
            </Button>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <button 
        onClick={() => { prevSlide(); handleManualNavigation(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} />
      </button>
      <button 
        onClick={() => { nextSlide(); handleManualNavigation(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight size={28} />
      </button>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => { setCurrentSlide(index); handleManualNavigation(); }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-secondary scale-125' : 'bg-white/50 hover:bg-white/80'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;