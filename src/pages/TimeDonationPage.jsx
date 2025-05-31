
import React, { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Users, MapPin, Clock, Award, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const upcomingEvents = [
  { id: 1, title: 'Weekend Tutoring Program', date: 'Every Saturday, 10 AM - 12 PM', location: 'Community Center, Koramangala', description: 'Help children with their studies in Maths and English. Your guidance can shape their future.', category: 'Education', spots: 5 },
  { id: 2, title: 'Storytelling Workshop for Kids', date: 'June 15, 2025, 2 PM - 4 PM', location: 'City Library, Indiranagar', description: 'Bring stories to life! Engage children with imaginative tales and creative activities.', category: 'Arts & Creativity', spots: 3 },
  { id: 3, title: 'Park Cleanup Drive', date: 'June 22, 2025, 8 AM - 10 AM', location: 'Cubbon Park', description: 'Join us in making our local park cleaner and greener for everyone to enjoy.', category: 'Environment', spots: 10 },
];

const recommendedEvents = [
  { title: 'Animal Shelter Volunteering', org: 'Hope Animal Shelter', details: 'Assist with animal care, feeding, and playtime. Contact them at hope@shelter.org.', link: '#' },
  { title: 'Elderly Care Companion', org: 'Silver Smiles Foundation', details: 'Spend time with seniors, engage in conversations, and assist with daily activities. Visit silversmiles.org/volunteer.', link: '#' },
];

const pastVolunteers = [
  { name: 'Sunita P.', testimonial: 'Volunteering at the tutoring program was an eye-opener. The kids are so eager to learn!', image: 'volunteer1', role: 'Tutor' },
  { name: 'Raj V.', testimonial: 'The park cleanup was tiring but so fulfilling. We made a visible difference!', image: 'volunteer2', role: 'Environmental Volunteer' },
  { name: 'Meera K.', testimonial: 'I loved the storytelling workshop. It\'s amazing how a simple story can light up a child\'s world.', image: 'volunteer3', role: 'Storyteller' },
];


const TimeDonationPage = () => {
  const { toast } = useToast();
  const [registrations, setRegistrations] = useLocalStorage('volunteerRegistrations', {});
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = (eventId) => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast({ title: "Incomplete Form", description: "Please fill in all fields.", variant: "destructive" });
      return;
    }
    setRegistrations(prev => ({
      ...prev,
      [eventId]: [...(prev[eventId] || []), { ...formData, date: new Date().toISOString() }]
    }));
    toast({ title: "Successfully Registered!", description: `Thank you for registering for ${upcomingEvents.find(e=>e.id === eventId)?.title}. We'll be in touch!` });
    setSelectedEvent(null); // Close dialog
    setFormData({ name: '', email: '', phone: '' }); // Reset form
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };
  
  return (
    <div>
      <PageHeader title="Donate Your Time" subtitle="Your time is a precious gift. Volunteer for our events and programs, or discover opportunities with other NGOs.">
        <Heart className="h-16 w-16 text-primary mx-auto mt-4" />
      </PageHeader>

      <SectionWrapper id="current-events">
        <h2 className="text-3xl font-bold text-center mb-12">Current Volunteering Opportunities</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event, index) => (
            <motion.custom key={event.id} custom={index} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={cardVariants}>
              <Card className="h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">{event.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">{event.category}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-2">
                  <p className="flex items-center text-sm"><Calendar className="h-4 w-4 mr-2 text-secondary" /> {event.date}</p>
                  <p className="flex items-center text-sm"><MapPin className="h-4 w-4 mr-2 text-secondary" /> {event.location}</p>
                  <p className="text-sm">{event.description}</p>
                  <p className="text-sm font-medium"><Users className="h-4 w-4 mr-2 inline text-secondary" /> {event.spots} spots available</p>
                </CardContent>
                <CardFooter>
                  <Dialog open={selectedEvent === event.id} onOpenChange={(isOpen) => !isOpen && setSelectedEvent(null)}>
                    <DialogTrigger asChild>
                      <Button className="w-full" onClick={() => setSelectedEvent(event.id)}>
                        <Clock className="h-4 w-4 mr-2" /> Register to Volunteer
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Register for: {event.title}</DialogTitle>
                        <DialogDescription>Fill in your details to volunteer. We're excited to have you!</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">Name</Label>
                          <Input id="name" name="name" value={formData.name} onChange={handleInputChange} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="email" className="text-right">Email</Label>
                          <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="phone" className="text-right">Phone</Label>
                          <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} className="col-span-3" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setSelectedEvent(null)}>Cancel</Button>
                        <Button type="submit" onClick={() => handleRegister(event.id)}>Submit Registration</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            </motion.custom>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper id="volunteer-impact" className="bg-primary/10 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-12">The Impact of Your Time</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {pastVolunteers.map((volunteer, index) => (
            <motion.div key={index} custom={index} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={cardVariants}>
              <Card className="p-6 shadow-md glassmorphism">
                <img  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-primary/50" alt={`Photo of ${volunteer.name}`} src="https://images.unsplash.com/photo-1542957057-debadce4ce81" />
                <p className="italic text-foreground/80 mb-2">"{volunteer.testimonial}"</p>
                <p className="font-semibold text-primary">{volunteer.name}</p>
                <p className="text-sm text-muted-foreground">{volunteer.role}</p>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Award className="h-12 w-12 text-accent mx-auto mb-4" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every hour you contribute helps us build stronger communities and bring smiles to many faces. Your dedication is invaluable. "Change begins with sharing."
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper id="other-ngo-events">
        <h2 className="text-3xl font-bold text-center mb-12">Explore More Opportunities</h2>
        <p className="text-center text-muted-foreground mb-8 max-w-xl mx-auto">
          We also highlight events from other wonderful NGOs. Expand your impact!
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {recommendedEvents.map((event, index) => (
            <motion.custom key={index} custom={index} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={cardVariants}>
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <CardDescription className="text-sm text-secondary font-semibold">{event.org}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{event.details}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild>
                    <a href={event.link} target="_blank" rel="noopener noreferrer">Learn More & Join</a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.custom>
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
};

export default TimeDonationPage;
  