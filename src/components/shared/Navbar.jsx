import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Users, Info, ChevronDown, Clock, Gift, Home as HomeIcon, Sparkles, Cake, HeartHandshake as Handshake, UserPlus, ChevronsUpDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

const mainNavLinksBeforeDonate = [
  { to: '/', label: 'Home', icon: <HomeIcon className="h-5 w-5 mr-2 md:hidden" /> },
];

const mainNavLinksAfterDonate = [
  { to: '/initiatives-events', label: 'Initiatives & Events', icon: <Sparkles className="h-5 w-5 mr-2 md:hidden" /> },
  { to: '/ngo-network', label: 'NGO Network', icon: <Handshake className="h-5 w-5 mr-2 md:hidden" /> },
  { to: '/social-change-circle', label: 'Social Circle', icon: <Users className="h-5 w-5 mr-2 md:hidden" /> },
  { to: '/about-us', label: 'About Us', icon: <Info className="h-5 w-5 mr-2 md:hidden" /> },
];

const donateSubLinks = [
  { to: '/donate/time', label: 'Donate Time', icon: <Clock className="h-5 w-5 mr-2" /> },
  { to: '/donate/material', label: 'Donate Material', icon: <Gift className="h-5 w-5 mr-2" /> },
  { to: '/donate/money', label: 'Donate Money', icon: <span className="font-bold text-lg mr-2.5 ml-0.5">₹</span> },
  { to: '/celebrate-birthday', label: 'Celebrate With Us', icon: <Cake className="h-5 w-5 mr-2" /> },
  { to: '/ngo-network#collaborate', label: 'Collaborate with Us', icon: <Handshake className="h-5 w-5 mr-2" /> },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isGetInvolvedOpen, setIsGetInvolvedOpen] = useState(false);
  const location = useLocation(); 
  const navigate = useNavigate(); 

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleGetInvolved = () => setIsGetInvolvedOpen(!isGetInvolvedOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  useEffect(() => {
    setIsOpen(false);
    setIsGetInvolvedOpen(false);
  }, [location.pathname]);

  const handleMobileVolunteerClick = () => {
    navigate('/donate/time#time-donation-page-volunteer-form');
    setIsOpen(false); 
  };


  const activeLinkClass = "text-primary font-semibold border-b-2 border-primary";
  const inactiveLinkClass = "text-foreground/80 hover:text-primary transition-colors duration-300";
  
  const mobileMenuVariants = {
    closed: { opacity: 0, x: "100%" },
    open: { opacity: 1, x: "0%" },
  };
  
  const subMenuVariants = {
    closed: { opacity: 0, height: 0, marginTop: 0, marginBottom: 0 },
    open: { opacity: 1, height: "auto", marginTop: "0.5rem", marginBottom: "0.5rem"},
  };


  return (
    <header className="sticky top-0 z-[60] w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-soft">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link to="/" className="flex items-center">
          <span 
            className="text-xl font-semibold text-primary" 
            style={{ fontFamily: "'Product Sans', 'Google Sans', Poppins, sans-serif" }}
          >
            Let's Donate.
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
                Get Involved <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 shadow-soft z-[65]"> 
              {donateSubLinks.map((subLink, index) => (
                <React.Fragment key={subLink.to}>
                  <DropdownMenuItem asChild>
                    <Link to={subLink.to} className="flex items-center w-full">
                      {subLink.icon}
                      {subLink.label}
                    </Link>
                  </DropdownMenuItem>
                  {index < donateSubLinks.length -1 && <DropdownMenuSeparator />} 
                </React.Fragment>
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
          <Button 
            asChild 
            className="rounded-lg bg-primary hover:bg-primary-soft text-primary-foreground shadow-soft-hover flex items-center"
          >
            <Link to="/donate/time#time-donation-page-volunteer-form">
              <UserPlus className="h-4 w-4 mr-2" /> Volunteer
            </Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-primary">
            {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
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
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="fixed inset-0 z-[70] bg-background/95 backdrop-blur-md p-4 md:hidden overflow-y-auto min-h-screen" 
            style={{ top: '0px', paddingTop: 'calc(5rem + 1rem)' }} 
          >
            <div className="flex justify-end mb-4"> 
                <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-primary">
                    <X className="h-8 w-8" />
                </Button>
            </div>
            <nav className="flex flex-col space-y-2 pb-24">
              {mainNavLinksBeforeDonate.map((link) => (
                <NavLink
                  key={`mobile-${link.to}`}
                  to={link.to}
                  onClick={toggleMenu}
                  className={({ isActive }) =>
                    `${isActive ? 'text-primary bg-primary/10 font-semibold' : 'text-foreground/80 hover:bg-muted/50'} py-4 px-4 rounded-lg text-xl flex items-center transition-colors duration-200`
                  }
                >
                  {link.icon && React.cloneElement(link.icon, { className: "h-6 w-6 mr-4"})}
                  {link.label}
                </NavLink>
              ))}
              
              <div className="py-2 px-0"> 
                <button 
                  onClick={toggleGetInvolved} 
                  className="w-full flex justify-between items-center py-4 px-4 rounded-lg text-xl text-primary font-semibold hover:bg-muted/50 transition-colors duration-200"
                >
                  <span className="flex items-center">
                    <ChevronsUpDown className="h-6 w-6 mr-4" /> 
                    Get Involved
                  </span>
                  <ChevronDown className={`h-6 w-6 transition-transform ${isGetInvolvedOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                {isGetInvolvedOpen && (
                  <motion.div
                    key="get-involved-submenu"
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={subMenuVariants}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="flex flex-col space-y-1 pl-4 overflow-hidden" 
                  >
                    {donateSubLinks.map((subLink) => (
                      <NavLink
                        key={`mobile-${subLink.to}`}
                        to={subLink.to}
                        onClick={toggleMenu}
                        className={({ isActive }) =>
                          `${isActive ? 'text-primary bg-primary/10 font-semibold' : 'text-foreground/80 hover:bg-muted/50'} py-4 px-4 rounded-lg text-lg flex items-center transition-colors duration-200` 
                        }
                      >
                        {subLink.icon && (typeof subLink.icon === 'string' ? 
                                          <span className="font-bold text-lg mr-4 w-6 text-center">{subLink.icon}</span> : 
                                          React.cloneElement(subLink.icon, { className: "h-5 w-5 mr-4"}))}
                        {subLink.label}
                      </NavLink>
                    ))}
                  </motion.div>
                )}
                </AnimatePresence>
              </div>

              {mainNavLinksAfterDonate.map((link) => (
                <NavLink
                  key={`mobile-${link.to}`}
                  to={link.to}
                  onClick={toggleMenu}
                  className={({ isActive }) =>
                    `${isActive ? 'text-primary bg-primary/10 font-semibold' : 'text-foreground/80 hover:bg-muted/50'} py-4 px-4 rounded-lg text-xl flex items-center transition-colors duration-200`
                  }
                >
                 {link.icon && React.cloneElement(link.icon, { className: "h-6 w-6 mr-4"})}
                  {link.label}
                </NavLink>
              ))}
               <Button 
                asChild={false} 
                onClick={handleMobileVolunteerClick}
                className="w-full mt-8 rounded-lg text-xl py-4 bg-primary text-primary-foreground flex items-center"
              >
                <UserPlus className="h-6 w-6 mr-3" /> Volunteer
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;