import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import SectionWrapper from '@/components/shared/SectionWrapper';
import AnimatedCounter from '@/components/shared/AnimatedCounter';
import { Clock, DollarSign, Gift, Users, BookOpen, Home, Eye, Send, BookHeart, CheckSquare, CalendarDays, Users2, HelpCircle, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { Checkbox } from "@/components/ui/checkbox";


const donationOptions = [
  { title: 'Donate Time', description: 'Volunteer your skills and become part of our mission.', icon: <Clock className="h-10 w-10 text-primary mb-4" />, link: '/donate/time', cta: 'Volunteer Now' },
  { title: 'Donate Material', description: 'Gift essentials like books, clothes, and toys.', icon: <Gift className="h-10 w-10 text-primary mb-4" />, link: '/donate/material', cta: 'Gift Items' },
  { title: 'Donate Money', description: 'Support our projects financially for direct impact.', icon: <DollarSign className="h-10 w-10 text-primary mb-4" />, link: '/donate/money', cta: 'Give Financially' },
];

const achievements = [
  { end: 14, suffix: '+', label: 'Institutes Served', icon: <Home className="h-10 w-10 text-secondary mx-auto mb-3" /> },
  { end: 5000, suffix: '+', label: 'Sessions Conducted', icon: <BookHeart className="h-10 w-10 text-secondary mx-auto mb-3" /> },
  { end: 2000, suffix: '+', label: 'People Impacted', icon: <Users className="h-10 w-10 text-secondary mx-auto mb-3" /> },
  { end: 300, suffix: '+', label: 'Volunteers Onboarded', icon: <UserPlus className="h-10 w-10 text-secondary mx-auto mb-3" /> },
];

const galleryImages = [
  { srcPlaceholder: "Joyful children learning in a classroom setting", alt: "Children learning with volunteers" },
  { srcPlaceholder: "Volunteers distributing supplies to a community", alt: "Volunteers distributing supplies" },
  { srcPlaceholder: "A group of happy volunteers posing together", alt: "Happy volunteers group photo" },
];

const areasOfInterestOptions = [
  { id: 'teaching', label: 'Teaching & Tutoring' },
  { id: 'admin', label: 'Administrative Support' },
  { id: 'photography', label: 'Photography & Videography' },
  { id: 'events', label: 'Event Management & Support' },
  { id: 'fundraising', label: 'Fundraising & Outreach' },
  { id: 'mentorship', label: 'Mentorship Programs' },
  { id: 'skills', label: 'Skill-based Workshops (Art, Music, etc.)' },
  { id: 'other', label: 'Other (Please specify)' },
];

const VolunteerFormSection = ({ formIdPrefix = "home" }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    city: '',
    age: '',
    areasOfInterest: [],
    availability: '',
    whyVolunteer: '',
    howHeard: '',
    otherAreaOfInterest: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (areaId) => {
    setFormData(prev => {
      const newAreas = prev.areasOfInterest.includes(areaId)
        ? prev.areasOfInterest.filter(area => area !== areaId)
        : [...prev.areasOfInterest, areaId];
      return { ...prev, areasOfInterest: newAreas };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!formData.fullName || !formData.email || !formData.phoneNumber || !formData.age) {
      toast({ title: "Incomplete Form", description: "Please fill in Full Name, Email, Phone Number, and Age.", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast({ title: "Invalid Email", description: "Please enter a valid email address.", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }
    if (isNaN(parseInt(formData.age)) || parseInt(formData.age) <= 0) {
        toast({ title: "Invalid Age", description: "Please enter a valid age.", variant: "destructive" });
        setIsSubmitting(false);
        return;
    }

    let finalAreasOfInterest = formData.areasOfInterest.join(', ');
    if (formData.areasOfInterest.includes('other') && formData.otherAreaOfInterest) {
      finalAreasOfInterest += `, Other: ${formData.otherAreaOfInterest}`;
    }
    
    const { data, error } = await supabase
      .from('volunteer_applications')
      .insert([{ 
        full_name: formData.fullName, 
        email: formData.email, 
        phone_number: formData.phoneNumber,
        city: formData.city,
        age: parseInt(formData.age),
        areas_of_interest: finalAreasOfInterest,
        availability: formData.availability,
        reason_to_volunteer: formData.whyVolunteer, // Ensure this matches DB column name
        how_they_heard: formData.howHeard,
      }]);

    setIsSubmitting(false);
    if (error) {
      toast({ title: "Application Error", description: error.message, variant: "destructive" });
    } else {
      toast({
        title: "Application Submitted! 🙌",
        description: `Thank you, ${formData.fullName}! We've received your volunteer application and will be in touch soon.`,
        className: "bg-primary text-primary-foreground",
        duration: 7000
      });
      setFormData({ fullName: '', email: '', phoneNumber: '', city: '', age: '', areasOfInterest: [], availability: '', whyVolunteer: '', howHeard: '', otherAreaOfInterest: '' });
    }
  };

  return (
    <SectionWrapper id={`${formIdPrefix}-volunteer-form`} className="bg-secondary/10 rounded-xl py-16 md:py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-4">Become a Volunteer Today</h2>
      <p className="text-center text-muted-foreground mb-12 md:mb-16 max-w-xl mx-auto">
        Join our passionate team and make a direct impact. Fill out the form below to get started!
      </p>
      <Card className="max-w-3xl mx-auto p-6 sm:p-8 rounded-xl shadow-soft bg-background">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <Label htmlFor={`${formIdPrefix}-fullName`} className="font-medium">Full Name <span className="text-destructive">*</span></Label>
              <Input id={`${formIdPrefix}-fullName`} name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="E.g., Priya Sharma" required className="mt-1 rounded-lg"/>
            </div>
            <div>
              <Label htmlFor={`${formIdPrefix}-email`} className="font-medium">Email Address <span className="text-destructive">*</span></Label>
              <Input id={`${formIdPrefix}-email`} name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="E.g., priya@example.com" required className="mt-1 rounded-lg"/>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <Label htmlFor={`${formIdPrefix}-phoneNumber`} className="font-medium">Phone Number <span className="text-destructive">*</span></Label>
              <Input id={`${formIdPrefix}-phoneNumber`} name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleInputChange} placeholder="E.g., 9876543210" required className="mt-1 rounded-lg"/>
            </div>
            <div>
              <Label htmlFor={`${formIdPrefix}-city`} className="font-medium">City</Label>
              <Input id={`${formIdPrefix}-city`} name="city" value={formData.city} onChange={handleInputChange} placeholder="E.g., Bangalore" className="mt-1 rounded-lg"/>
            </div>
          </div>
          <div>
            <Label htmlFor={`${formIdPrefix}-age`} className="font-medium">Age <span className="text-destructive">*</span></Label>
            <Input id={`${formIdPrefix}-age`} name="age" type="number" value={formData.age} onChange={handleInputChange} placeholder="E.g., 25" required className="mt-1 rounded-lg"/>
          </div>
          <div>
            <Label className="font-medium block mb-2">Area(s) of Interest</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2">
              {areasOfInterestOptions.map(option => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`${formIdPrefix}-area-${option.id}`} 
                    checked={formData.areasOfInterest.includes(option.id)}
                    onCheckedChange={() => handleCheckboxChange(option.id)}
                  />
                  <Label htmlFor={`${formIdPrefix}-area-${option.id}`} className="text-sm font-normal text-muted-foreground cursor-pointer">{option.label}</Label>
                </div>
              ))}
            </div>
            {formData.areasOfInterest.includes('other') && (
              <Input 
                name="otherAreaOfInterest" 
                value={formData.otherAreaOfInterest} 
                onChange={handleInputChange} 
                placeholder="Please specify other area" 
                className="mt-2 rounded-lg"
              />
            )}
          </div>
          <div>
            <Label htmlFor={`${formIdPrefix}-availability`} className="font-medium">Availability</Label>
            <Input id={`${formIdPrefix}-availability`} name="availability" value={formData.availability} onChange={handleInputChange} placeholder="E.g., Weekends, Weekday evenings" className="mt-1 rounded-lg"/>
          </div>
          <div>
            <Label htmlFor={`${formIdPrefix}-whyVolunteer`} className="font-medium">Why do you want to volunteer?</Label>
            <Textarea id={`${formIdPrefix}-whyVolunteer`} name="whyVolunteer" value={formData.whyVolunteer} onChange={handleInputChange} placeholder="Share your motivation (short text)" className="mt-1 rounded-lg" rows={3}/>
          </div>
          <div>
            <Label htmlFor={`${formIdPrefix}-howHeard`} className="font-medium">Where did you hear about us?</Label>
            <Input id={`${formIdPrefix}-howHeard`} name="howHeard" value={formData.howHeard} onChange={handleInputChange} placeholder="E.g., Social Media, Friend, Event" className="mt-1 rounded-lg"/>
          </div>
          <Button type="submit" size="lg" className="w-full rounded-lg bg-primary hover:bg-primary-soft text-primary-foreground py-3 text-base" disabled={isSubmitting}>
            <Send className="h-5 w-5 mr-2" /> {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </Button>
        </form>
      </Card>
    </SectionWrapper>
  );
};


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
      <SectionWrapper fullWidth className="!py-0 relative min-h-[70vh] md:min-h-[85vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover object-center"
            alt="Joyful volunteering moment with children smiling"
           src="https://images.unsplash.com/photo-1642420290986-c7a55bab708f" />
          <div className="absolute inset-0 teal-overlay-gradient z-10"></div>
        </div>
        <motion.div 
          className="relative z-20 container mx-auto px-4 py-10 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight shadow-text">
            Be the reason someone believes in <span className="text-secondary">kindness</span> again.
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light">
            Join Let's Donate and make a tangible difference in the lives of those who need it most.
          </p>
          <Button size="lg" asChild className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-xl px-10 py-3 text-lg font-semibold shadow-soft-hover transition-all duration-300 transform hover:scale-105">
            <Link to="/donate/time">Join as a Volunteer</Link>
          </Button>
        </motion.div>
      </SectionWrapper>

      <SectionWrapper id="about-intro">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Welcome to Let’s Donate</h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Let’s Donate is a movement to bring kindness back into the world — by donating time, money, or materials to those who need it most. We believe that every small act of generosity contributes to a wave of positive change.
          </p>
          <Button variant="outline" asChild className="border-primary text-primary hover:bg-primary/10 hover:text-primary rounded-lg">
            <Link to="/about-us">Discover Our Story</Link>
          </Button>
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
        <div className="grid md:grid-cols-3 gap-8">
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
               src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
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

      <VolunteerFormSection formIdPrefix="home" />
      
    </div>
  );
};

export default LandingPage;
export { VolunteerFormSection }; // Export for use in TimeDonationPage
