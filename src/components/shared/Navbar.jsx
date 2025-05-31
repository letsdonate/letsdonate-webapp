
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { HeartHandshake, Menu, X, Gift, Clock, DollarSign, Users, Info, Image, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { to: '/', label: 'Home', icon: <HeartHandshake className="h-5 w-5 mr-2" /> },
  { to: '/donate/time', label: 'Donate Time', icon: <Clock className="h-5 w-5 mr-2" /> },
  { to: '/donate/money', label: 'Donate Money', icon: <DollarSign className="h-5 w-5 mr-2" /> },
  { to: '/donate/material', label: 'Donate Material', icon: <Gift className="h-5 w-5 mr-2" /> },
  { to: '/about-us', label: 'About Us', icon: <Info className="h-5 w-5 mr-2" /> },
  { to: '/events-gallery', label: 'Events & Gallery', icon: <Image className="h-5 w-5 mr-2" /> },
  { to: '/social-change-circle', label: 'Social Circle', icon: <Users className="h-5 w-5 mr-2" /> },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const activeLinkClass = "text-primary font-semibold border-b-2 border-primary";
  const inactiveLinkClass = "text-foreground/80 hover:text-primary transition-colors";

  const mobileMenuVariants = {
    closed: { opacity: 0, x: "-100%" },
    open: { opacity: 1, x: "0%" },
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <HeartHandshake className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold gradient-text">Let's Donate</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `${isActive ? activeLinkClass : inactiveLinkClass} text-sm font-medium flex items-center`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-2">
          <Button asChild variant="outline">
            <Link to="/donate/money">Quick Donate</Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-30 bg-background p-4 md:hidden"
            style={{ top: '80px' }} 
          >
            <nav className="flex flex-col space-y-4 mt-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={toggleMenu}
                  className={({ isActive }) =>
                    `${isActive ? activeLinkClass : inactiveLinkClass} py-2 text-lg flex items-center`
                  }
                >
                  {link.icon}
                  {link.label}
                </NavLink>
              ))}
              <Button asChild className="w-full mt-4" onClick={toggleMenu}>
                <Link to="/donate/money">Quick Donate</Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
  