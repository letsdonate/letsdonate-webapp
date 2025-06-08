import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import SectionWrapper from '@/components/shared/SectionWrapper';
import AnimatedCounter from '@/components/shared/AnimatedCounter';
import HeroCarousel from '@/components/landing/HeroCarousel';
import VolunteerFormSection from '@/components/landing/VolunteerFormSection';
import { Clock, Gift, Users, Home as HomeIcon, Eye, BookHeart, UserPlus, Cake } from 'lucide-react';
import { motion } from 'framer-motion';


const donationOptions = [
  { title: 'Donate Time', description: 'Volunteer your skills and become part of our mission.', icon: <Clock className="h-10 w-10 text-primary mb-4" />, link: '/donate/time', cta: 'Volunteer Now' },
  { title: 'Donate Material', description: 'Gift essentials like books, clothes, and toys.', icon: <Gift className="h-10 w-10 text-primary mb-4" />, link: '/donate/material', cta: 'Gift Items' },
  { title: 'Donate Money', description: 'Support our projects financially for direct impact.', icon: <span className="font-bold text-4xl text-primary mb-4">₹</span>, link: '/donate/money', cta: 'Give Financially' },
  { title: 'Celebrate With Us', description: 'Make your special occasions meaningful by giving back.', icon: <Cake className="h-10 w-10 text-primary mb-4" />, link: '/celebrate-birthday', cta: 'Celebrate & Donate' },
];

const achievements = [
  { end: 2000, suffix: '+', label: 'Children Impacted', icon: <Users className="h-10 w-10 text-secondary mx-auto mb-3" /> },
  { end: 300, suffix: '+', label: 'Volunteers Onboarded', icon: <UserPlus className="h-10 w-10 text-secondary mx-auto mb-3" /> },
  { end: 5000, suffix: '+', label: 'Sessions Conducted', icon: <BookHeart className="h-10 w-10 text-secondary mx-auto mb-3" /> },
  { end: 14, suffix: '+', label: 'Institutes Served', icon: <HomeIcon className="h-10 w-10 text-secondary mx-auto mb-3" /> },
];


const galleryImages = [
  { srcPlaceholder: "Joyful children learning in a classroom setting", alt: "Children learning with volunteers", actualSrc: "https://dl.dropboxusercontent.com/scl/fi/rhjqkah8yb572h5oylvwo/front_gallery.jpeg?rlkey=g50e4g1hvt4z1pc1w9dfpdbxu&st=g35i4sdp&raw=1" },
  { srcPlaceholder: "Volunteers distributing supplies to a community", alt: "Volunteers distributing supplies", actualSrc: "https://dl.dropboxusercontent.com/scl/fi/w2lzaygqdnmea0fjl19vf/event_front-1.jpg?rlkey=phxoggiri3acud8r7c725aizw&st=apqon7wz&raw=1" },
  { srcPlaceholder: "A group of happy volunteers posing together", alt: "Happy volunteers group photo", actualSrc: "https://dl.dropboxusercontent.com/scl/fi/o9g3vlxj4yjx3c4mx0mr7/front_gallery1.jpeg?rlkey=tm76dni7bmuyqxqg5waci0x4w&st=492rfs0j&raw=1" },
];

const LandingPage = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: "easeOut"
      },
    }),
  };

  return (
    <div className="space-y-16 md:space-y-24">
      <SectionWrapper fullWidth className="!pt-0">
        <HeroCarousel />
      </SectionWrapper>

      <SectionWrapper id="about-intro">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Welcome to Let’s Donate</h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Let’s Donate is a movement to bring kindness back into the world — by donating time, money, or materials to those who need it most. We believe that every small act of generosity contributes to a wave of positive change.
          </p>
          <Button variant="outline" asChild className="border-primary text-primary hover:bg-primary/10 hover:text-primary rounded-lg">
            <Link to="/about-us">Discover Our Story</Link>
          </Button>
          </motion.div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="achievements" className="bg-primary/5 rounded-xl py-16 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 md:mb-16">Our Impact So Far</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {achievements.map((ach, index) => (
            <motion.div 
              key={index} 
              className="flex flex-col items-center p-6 bg-background rounded-xl shadow-soft"
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
            >
              {ach.icon}
              <AnimatedCounter end={ach.end} duration={2.5} suffix={ach.suffix} />
              <p className="text-muted-foreground mt-2 text-center">{ach.label}</p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>
      
      <SectionWrapper id="how-to-help">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 md:mb-16">How Can You Help?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {donationOptions.map((option, index) => (
            <motion.custom
              key={option.title}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              className="h-full"
            >
              <Card className="text-center h-full flex flex-col bg-card rounded-xl shadow-soft hover:shadow-soft-hover transition-shadow duration-300 transform hover:-translate-y-1">
                <CardHeader className="items-center pt-8">
                  {option.icon}
                  <CardTitle className="text-2xl text-primary">{option.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-base text-muted-foreground">{option.description}</CardDescription>
                </CardContent>
                <CardFooter className="p-6 pb-8">
                  <Button asChild className="w-full rounded-lg bg-primary hover:bg-primary-soft text-primary-foreground">
                    <Link to={option.link}>{option.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.custom>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper id="gallery-preview" className="bg-secondary/10 rounded-xl py-16 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-4">Moments of Joy</h2>
        <p className="text-center text-muted-foreground mb-12 md:mb-16 max-w-xl mx-auto">
          Explore more photos and details about our work — check out our initiatives.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              className="rounded-xl overflow-hidden shadow-soft aspect-video group relative"
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
            >
              <img 
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                alt={image.alt}
                src={image.actualSrc} 
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80'; }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 hover:text-primary rounded-lg px-8 py-3 text-base">
            <Link to="/initiatives-events" className="flex items-center">
              <Eye className="h-5 w-5 mr-2" /> View Initiatives & Events
            </Link>
          </Button>
        </div>
      </SectionWrapper>

      <VolunteerFormSection formIdPrefix="home-landing" />
      
    </div>
  );
};

export default LandingPage;