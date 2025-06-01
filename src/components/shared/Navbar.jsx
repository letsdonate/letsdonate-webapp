import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Users, Info, Image, MessageCircle, ChevronDown, Clock, Gift, DollarSign, Home as HomeIcon, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mainNavLinksBeforeDonate = [
  { to: '/', label: 'Home', icon: <HomeIcon className="h-5 w-5 mr-2 md:hidden" /> },
];

// Updated mainNavLinksAfterDonate to reflect merged page
const mainNavLinksAfterDonate = [
  { to: '/about-us', label: 'About Us', icon: <Info className="h-5 w-5 mr-2 md:hidden" /> },
  { to: '/initiatives-events', label: 'Initiatives & Events', icon: <Sparkles className="h-5 w-5 mr-2 md:hidden" /> }, // Updated Link
  { to: '/social-change-circle', label: 'Social Circle', icon: <Users className="h-5 w-5 mr-2 md:hidden" /> },
];

const donateSubLinks = [
  { to: '/donate/time', label: 'Donate Time', icon: <Clock className="h-5 w-5 mr-2" /> },
  { to: '/donate/material', label: 'Donate Material', icon: <Gift className="h-5 w-5 mr-2" /> },
  { to: '/donate/money', label: 'Donate Money', icon: <DollarSign className="h-5 w-5 mr-2" /> },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const activeLinkClass = "text-primary font-semibold border-b-2 border-primary";
  const inactiveLinkClass = "text-foreground/80 hover:text-primary transition-colors duration-300";
  
  const mobileMenuVariants = {
    closed: { opacity: 0, x: "-100%" },
    open: { opacity: 1, x: "0%" },
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-soft">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo-icon.svg" alt="Let's Donate Logo Icon" className="h-8 w-8" />
          <span className="text-xl font-bold">
            <span className="text-foreground/70 font-medium">Let’s</span> <span className="text-primary font-bold">Donate</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {mainNavLinksBeforeDonate.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `${isActive ? activeLinkClass : inactiveLinkClass} text-sm font-medium py-1`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className={`${inactiveLinkClass} text-sm font-medium flex items-center py-1`}>
                Donate <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 shadow-soft">
              {donateSubLinks.map((subLink) => (
                <DropdownMenuItem key={subLink.to} asChild>
                  <Link to={subLink.to} className="flex items-center w-full">
                    {subLink.icon}
                    {subLink.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {mainNavLinksAfterDonate.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `${isActive ? activeLinkClass : inactiveLinkClass} text-sm font-medium py-1`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-2">
          <Button asChild className="rounded-lg bg-primary hover:bg-primary-soft text-primary-foreground shadow-soft-hover">
            <Link to="/donate/time">Volunteer</Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-primary">
            {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
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
            className="fixed inset-0 z-40 bg-background p-4 md:hidden"
            style={{ top: '80px' }} 
          >
            <nav className="flex flex-col space-y-1 mt-4">
              {mainNavLinksBeforeDonate.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={toggleMenu}
                  className={({ isActive }) =>
                    `${isActive ? 'text-primary bg-primary/10 font-semibold' : 'text-foreground/80 hover:bg-muted/50'} py-3 px-3 rounded-md text-base flex items-center transition-colors duration-200`
                  }
                >
                  {link.icon}
                  {link.label}
                </NavLink>
              ))}
              <div className="py-2 px-3">
                <p className="text-sm font-semibold text-primary mb-1">Donate</p>
                {donateSubLinks.map((subLink) => (
                  <NavLink
                    key={subLink.to}
                    to={subLink.to}
                    onClick={toggleMenu}
                    className={({ isActive }) =>
                      `${isActive ? 'text-primary bg-primary/10 font-semibold' : 'text-foreground/80 hover:bg-muted/50'} py-3 px-3 rounded-md text-base flex items-center transition-colors duration-200 ml-2`
                    }
                  >
                    {subLink.icon}
                    {subLink.label}
                  </NavLink>
                ))}
              </div>
              {mainNavLinksAfterDonate.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={toggleMenu}
                  className={({ isActive }) =>
                    `${isActive ? 'text-primary bg-primary/10 font-semibold' : 'text-foreground/80 hover:bg-muted/50'} py-3 px-3 rounded-md text-base flex items-center transition-colors duration-200`
                  }
                >
                  {link.icon}
                  {link.label}
                </NavLink>
              ))}
              <Button asChild className="w-full mt-6 rounded-lg text-base py-3 bg-primary text-primary-foreground" onClick={toggleMenu}>
                <Link to="/donate/time">Volunteer</Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;