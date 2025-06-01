import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Users, MapPin, Heart, UserCheck, Send, Loader2, BookHeart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { supabase } from '@/lib/supabaseClient';

const MINIMUM_EVENTS_DISPLAY = 3; // For this page, maybe fewer placeholders are fine

const placeholderEventTemplate = {
  id: null,
  title: 'New Volunteering Opportunity Soon!',
  date: 'Date TBD',
  location: 'Location TBD',
  description: 'We are planning exciting new ways for you to contribute your time. Details will be posted here shortly!',
  category: 'Upcoming',
  spots: 0,
  imagePlaceholder: 'Group of diverse volunteers working together'
};

const generatePlaceholders = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    ...placeholderEventTemplate,
    id: `placeholder-event-${i}`,
    title: `Volunteering Placeholder ${i + 1}`,
  }));
};


const pastVolunteersTestimonials = [
  { name: 'Priya Sharma', testimonial: 'The tutoring program is so well-organized. Seeing the children grasp new concepts because of my help is incredibly fulfilling!', imagePlaceholder: 'Smiling female volunteer with a child', role: 'Education Volunteer', avatarFallback: 'PS' },
  { name: 'Amit Singh', testimonial: 'Participating in the cleanup drive was a fantastic way to give back to the community and meet like-minded people. Highly recommend!', imagePlaceholder: 'Male volunteer holding a bag of collected litter', role: 'Environmental Champion', avatarFallback: 'AS' },
  { name: 'Deepika Rao', testimonial: 'The joy on the kids\' faces during the art workshop was infectious! It’s amazing how art can bring so much happiness.', imagePlaceholder: 'Volunteer showing a child\'s artwork', role: 'Art Workshop Facilitator', avatarFallback: 'DR' },
];

const TimeDonationPage = () => {
  const { toast } = useToast();
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  
  const [eventRegFormData, setEventRegFormData] = useState({ name: '', email: '', phone: '' });
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [generalVolunteerFormData, setGeneralVolunteerFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    city: '',
    areaOfInterest: '', // New field
    reasonToVolunteer: ''
  });

  const fetchUpcomingEvents = useCallback(async () => {
    setLoadingEvents(true);
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .gte('date', new Date().toISOString()) // Only future or ongoing events
      .order('date', { ascending: true })
      .limit(6); // Limit to a reasonable number for this page

    if (error) {
      toast({ title: 'Error fetching upcoming events', description: error.message, variant: 'destructive' });
      setUpcomingEvents(generatePlaceholders(MINIMUM_EVENTS_DISPLAY));
    } else {
      if (data.length < MINIMUM_EVENTS_DISPLAY) {
        const placeholdersNeeded = MINIMUM_EVENTS_DISPLAY - data.length;
        setUpcomingEvents([...data, ...generatePlaceholders(placeholdersNeeded)]);
      } else {
        setUpcomingEvents(data);
      }
    }
    setLoadingEvents(false);
  }, [toast]);

  useEffect(() => {
    fetchUpcomingEvents();
  }, [fetchUpcomingEvents]);


  const handleEventRegInputChange = (e) => {
    const { name, value } = e.target;
    setEventRegFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEventRegister = async (eventId) => {
    if (!eventRegFormData.name || !eventRegFormData.email || !eventRegFormData.phone) {
      toast({ title: "Incomplete Form", description: "Please fill in all fields to register for the event.", variant: "destructive" });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(eventRegFormData.email)) {
      toast({ title: "Invalid Email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }

    const currentEvent = upcomingEvents.find(e => e.id === eventId);
    const { data, error } = await supabase
      .from('event_volunteer_registrations')
      .insert([{ 
        event_id: eventId.toString(), 
        event_title: currentEvent?.title,
        name: eventRegFormData.name, 
        email: eventRegFormData.email, 
        phone: eventRegFormData.phone 
      }]);

    if (error) {
      toast({ title: "Registration Error", description: error.message, variant: "destructive" });
    } else {
      toast({ 
        title: "Event Registration Successful! 🎉", 
        description: `Thank you, ${eventRegFormData.name}, for registering for ${currentEvent?.title}. We'll contact you soon!`,
        className: "bg-primary text-primary-foreground"
      });
      setSelectedEvent(null); 
      setEventRegFormData({ name: '', email: '', phone: '' }); 
    }
  };

  const handleGeneralVolunteerInputChange = (e) => {
    const { name, value } = e.target;
    setGeneralVolunteerFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGeneralVolunteerSubmit = async (e) => {
    e.preventDefault();
    if (!generalVolunteerFormData.fullName || !generalVolunteerFormData.email || !generalVolunteerFormData.phoneNumber) {
      toast({ title: "Incomplete Form", description: "Please fill in Full Name, Email, and Phone Number.", variant: "destructive" });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(generalVolunteerFormData.email)) {
      toast({ title: "Invalid Email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    
    const { data, error } = await supabase
      .from('volunteer_applications')
      .insert([{ 
        full_name: generalVolunteerFormData.fullName, 
        email: generalVolunteerFormData.email, 
        phone_number: generalVolunteerFormData.phoneNumber,
        city: generalVolunteerFormData.city,
        area_of_interest: generalVolunteerFormData.areaOfInterest,
        reason_to_volunteer: generalVolunteerFormData.reasonToVolunteer
      }]);

    if (error) {
      toast({ title: "Application Error", description: error.message, variant: "destructive" });
    } else {
      toast({
        title: "Application Submitted! 🙌",
        description: `Thank you, ${generalVolunteerFormData.fullName}! We've received your volunteer application and will be in touch soon.`,
        className: "bg-primary text-primary-foreground",
        duration: 7000
      });
      setGeneralVolunteerFormData({ fullName: '', email: '', phoneNumber: '', city: '', areaOfInterest: '', reasonToVolunteer: '' });
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  };
  
  return (
    <div className="container mx-auto px-4">
      <PageHeader title="Donate Your Time" subtitle="Your time is a precious gift. Volunteer for our events or join our general volunteer pool to make a lasting impact.">
        <Heart className="h-16 w-16 text-primary mx-auto mt-4 animate-pulse" />
      </PageHeader>

      <SectionWrapper id="current-events">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 md:mb-16">Upcoming Volunteering Events</h2>
        {loadingEvents ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <span className="ml-3 text-muted-foreground">Loading upcoming events...</span>
          </div>
        ) : upcomingEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.custom 
                key={event.id || `event-${index}`} 
                custom={index} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true, amount: 0.2 }} 
                variants={cardVariants}
                className="h-full"
              >
                <Card className="h-full flex flex-col rounded-xl shadow-soft hover:shadow-soft-hover transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                  <div className="aspect-video overflow-hidden bg-muted">
                    <img  
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      alt={event.title} 
                      src={event.images && event.images.length > 0 ? event.images[0] : `https://images.unsplash.com/photo-1595872018818-97555653a011?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600&h=300&fit=crop&auto=format&description=${encodeURIComponent(event.imagePlaceholder || event.title)}`} 
                    />
                  </div>
                  <CardHeader className="pt-6">
                    <CardTitle className="text-xl lg:text-2xl text-primary">{event.title}</CardTitle>
                    <CardDescription className="text-sm text-secondary font-semibold">{event.category}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-3">
                    <p className="flex items-center text-sm text-muted-foreground"><Calendar className="h-4 w-4 mr-2 text-primary/70" /> {event.date && event.id ? new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : event.date}</p>
                    <p className="flex items-center text-sm text-muted-foreground"><MapPin className="h-4 w-4 mr-2 text-primary/70" /> {event.location}</p>
                    <p className="text-sm text-muted-foreground line-clamp-3">{event.description}</p>
                    {event.id && <p className="text-sm font-medium text-primary"><Users className="h-4 w-4 mr-2 inline" /> {event.spots || 'Limited'} spots available</p>}
                  </CardContent>
                  {event.id && ( // Only show register button for real events
                    <CardFooter className="p-6">
                      <Dialog open={selectedEvent === event.id} onOpenChange={(isOpen) => !isOpen && setSelectedEvent(null)}>
                        <DialogTrigger asChild>
                          <Button className="w-full rounded-lg bg-primary hover:bg-primary-soft text-primary-foreground" onClick={() => setSelectedEvent(event.id)}>
                            <UserCheck className="h-5 w-5 mr-2" /> Register for Event
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md rounded-xl shadow-soft">
                          <DialogHeader className="mb-4">
                            <DialogTitle className="text-2xl text-primary">Register for: {event.title}</DialogTitle>
                            <DialogDescription className="text-muted-foreground">Fill in your details. We're excited to have you on board!</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-2">
                            <div className="space-y-1">
                              <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                              <Input id="name" name="name" value={eventRegFormData.name} onChange={handleEventRegInputChange} className="rounded-lg" placeholder="E.g., Priya Sharma" required />
                            </div>
                            <div className="space-y-1">
                              <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                              <Input id="email" name="email" type="email" value={eventRegFormData.email} onChange={handleEventRegInputChange} className="rounded-lg" placeholder="E.g., priya@example.com" required />
                            </div>
                            <div className="space-y-1">
                              <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                              <Input id="phone" name="phone" type="tel" value={eventRegFormData.phone} onChange={handleEventRegInputChange} className="rounded-lg" placeholder="E.g., 9876543210" required />
                            </div>
                          </div>
                          <DialogFooter className="mt-6">
                            <Button type="button" variant="outline" className="rounded-lg" onClick={() => setSelectedEvent(null)}>Cancel</Button>
                            <Button type="submit" className="rounded-lg bg-primary hover:bg-primary-soft text-primary-foreground" onClick={() => handleEventRegister(event.id)}>Submit Registration</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  )}
                </Card>
              </motion.custom>
            ))}
          </div>
        ) : (
           <Card className="text-center py-10 shadow-soft">
             <CardHeader>
                <Calendar className="mx-auto h-10 w-10 text-secondary mb-3" />
                <CardTitle className="text-xl">No Upcoming Events</CardTitle>
             </CardHeader>
             <CardContent>
                <CardDescription>Check back soon for new volunteering opportunities, or fill out the general volunteer form below!</CardDescription>
             </CardContent>
          </Card>
        )}
      </SectionWrapper>

      <SectionWrapper id="become-a-volunteer" className="bg-secondary/10 rounded-xl py-16 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-4">Become a Volunteer Today</h2>
        <p className="text-center text-muted-foreground mb-12 md:mb-16 max-w-xl mx-auto">
          Can't commit to a specific event right now? No problem! Fill out our general volunteer form, and we'll reach out when opportunities matching your interests arise.
        </p>
        <Card className="max-w-2xl mx-auto p-6 sm:p-8 rounded-xl shadow-soft bg-background">
          <form onSubmit={handleGeneralVolunteerSubmit} className="space-y-6">
            <div>
              <Label htmlFor="fullName" className="font-medium">Full Name <span className="text-destructive">*</span></Label>
              <Input id="fullName" name="fullName" value={generalVolunteerFormData.fullName} onChange={handleGeneralVolunteerInputChange} placeholder="E.g., Arjun Kumar" required className="mt-1 rounded-lg"/>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="email" className="font-medium">Email Address <span className="text-destructive">*</span></Label>
                <Input id="email" name="email" type="email" value={generalVolunteerFormData.email} onChange={handleGeneralVolunteerInputChange} placeholder="E.g., arjun@example.com" required className="mt-1 rounded-lg"/>
              </div>
              <div>
                <Label htmlFor="phoneNumber" className="font-medium">Phone Number <span className="text-destructive">*</span></Label>
                <Input id="phoneNumber" name="phoneNumber" type="tel" value={generalVolunteerFormData.phoneNumber} onChange={handleGeneralVolunteerInputChange} placeholder="E.g., 9876543210" required className="mt-1 rounded-lg"/>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="city" className="font-medium">City (Optional)</Label>
                <Input id="city" name="city" value={generalVolunteerFormData.city} onChange={handleGeneralVolunteerInputChange} placeholder="E.g., Bangalore" className="mt-1 rounded-lg"/>
              </div>
              <div>
                <Label htmlFor="areaOfInterest" className="font-medium">Area of Interest (Optional)</Label>
                <Input id="areaOfInterest" name="areaOfInterest" value={generalVolunteerFormData.areaOfInterest} onChange={handleGeneralVolunteerInputChange} placeholder="E.g., Teaching, Event Management" className="mt-1 rounded-lg"/>
              </div>
            </div>
            <div>
              <Label htmlFor="reasonToVolunteer" className="font-medium">Why do you want to volunteer? (Optional)</Label>
              <Textarea id="reasonToVolunteer" name="reasonToVolunteer" value={generalVolunteerFormData.reasonToVolunteer} onChange={handleGeneralVolunteerInputChange} placeholder="Share your motivation or interests..." className="mt-1 rounded-lg" rows={4}/>
            </div>
            <Button type="submit" size="lg" className="w-full rounded-lg bg-primary hover:bg-primary-soft text-primary-foreground py-3 text-base">
              <Send className="h-5 w-5 mr-2" /> Submit Volunteer Application
            </Button>
          </form>
        </Card>
      </SectionWrapper>

      <SectionWrapper id="volunteer-impact-testimonials" className="bg-primary/5 rounded-xl py-16 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 md:mb-16">Impact of Your Time: Volunteer Voices</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {pastVolunteersTestimonials.map((volunteer, index) => (
            <motion.div 
              key={index} 
              custom={index} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, amount: 0.2 }} 
              variants={cardVariants}
            >
              <Card className="p-6 rounded-xl shadow-soft h-full flex flex-col items-center text-center bg-background">
                <Avatar className="w-24 h-24 mb-4 border-4 border-secondary">
                  <img  className="object-cover" alt={`Photo of ${volunteer.name}`} src="https://images.unsplash.com/photo-1542957057-debadce4ce81" />
                  <AvatarFallback className="text-2xl bg-secondary text-secondary-foreground">{volunteer.avatarFallback}</AvatarFallback>
                </Avatar>
                <p className="italic text-muted-foreground mb-3 text-sm">"{volunteer.testimonial}"</p>
                <p className="font-semibold text-primary">{volunteer.name}</p>
                <p className="text-xs text-muted-foreground">{volunteer.role}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
};

export default TimeDonationPage;