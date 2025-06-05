import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import SectionWrapper from '@/components/shared/SectionWrapper';
import EventCard from '@/components/shared/EventCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Clock, CalendarDays, Users, Sparkles, Loader2, AlertTriangle, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { VolunteerFormSection } from '@/pages/LandingPage'; // Import the shared form

const placeholderEventTemplate = {
  id: null, 
  title: 'Upcoming Volunteer Opportunity!',
  description: 'Details about this exciting volunteer event will be shared soon. Get ready to make a difference!',
  date: 'To Be Announced',
  location: 'To Be Confirmed',
  photos: ['/images/events/placeholder/event_placeholder_1.jpg'],
  youtube_link: null,
  category: 'Volunteering',
  type: 'event'
};

const generatePlaceholders = (count, existingIds) => {
  const placeholders = [];
  for (let i = 0; i < count; i++) {
    let placeholderId = `placeholder-volunteer-event-${i}`;
    let k = 0;
    while (existingIds.has(placeholderId)) {
      k++;
      placeholderId = `placeholder-volunteer-event-${i}-${k}`;
    }
    placeholders.push({
      ...placeholderEventTemplate,
      id: placeholderId,
      title: `Volunteer Event Placeholder ${i + 1}`,
      photos: [`/images/events/placeholder/event_placeholder_${(i%3)+1}.jpg`],
    });
    existingIds.add(placeholderId);
  }
  return placeholders;
};

const MINIMUM_EVENTS_DISPLAY = 3;

const TimeDonationPage = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const { toast } = useToast();

  const fetchUpcomingEvents = useCallback(async () => {
    setLoadingEvents(true);
    const today = new Date().toISOString();
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .or(`date.gte.${today},date.is.null`) // Fetch events from today onwards or with no date (TBD)
      .order('date', { ascending: true, nullsFirst: false }) // TBD events might appear after dated ones
      .limit(MINIMUM_EVENTS_DISPLAY * 2); // Fetch a bit more to filter if needed

    if (error) {
      toast({ title: 'Error Fetching Upcoming Events', description: error.message, variant: 'destructive' });
      setUpcomingEvents([]);
    } else {
      setUpcomingEvents(data.map(event => ({ ...event, type: 'event' })));
    }
    setLoadingEvents(false);
  }, [toast]);

  useEffect(() => {
    fetchUpcomingEvents();
  }, [fetchUpcomingEvents]);

  let eventsToDisplay = [...upcomingEvents];
  const existingEventIds = new Set(upcomingEvents.map(e => e.id));
  
  if (eventsToDisplay.length < MINIMUM_EVENTS_DISPLAY) {
    const placeholdersNeeded = MINIMUM_EVENTS_DISPLAY - eventsToDisplay.length;
    eventsToDisplay.push(...generatePlaceholders(placeholdersNeeded, existingEventIds));
  }
  eventsToDisplay = eventsToDisplay.slice(0, MINIMUM_EVENTS_DISPLAY); // Ensure only MINIMUM_EVENTS_DISPLAY are shown

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <div className="container mx-auto px-4">
      <PageHeader 
        title="Volunteer Your Time" 
        subtitle="Your time and skills are invaluable. Join us in creating meaningful impact and spreading joy."
      >
        <Clock className="h-16 w-16 text-primary mx-auto mt-4" />
      </PageHeader>

      <SectionWrapper id="why-volunteer">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-6">Why Volunteer With Us?</h2>
        <p className="text-center text-muted-foreground mb-12 md:mb-16 max-w-2xl mx-auto">
          Volunteering with Let's Donate is more than just giving time; it's about connecting, learning, and growing together. Be part of a passionate community dedicated to making a real difference.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Direct Impact', description: 'Witness firsthand the positive change your efforts bring to individuals and communities.', icon: <HeartHandshake className="h-10 w-10 text-secondary" /> },
            { title: 'Skill Development', description: 'Enhance your existing skills and learn new ones in a supportive environment.', icon: <Sparkles className="h-10 w-10 text-secondary" /> },
            { title: 'Community Connection', description: 'Meet like-minded individuals and build lasting relationships.', icon: <Users className="h-10 w-10 text-secondary" /> },
          ].map((item, index) => (
            <motion.custom key={item.title} custom={index} initial="hidden" animate="visible" variants={cardVariants}>
              <Card className="text-center p-6 bg-background rounded-xl shadow-soft h-full">
                <div className="flex justify-center mb-4">{item.icon}</div>
                <CardTitle className="text-xl text-primary mb-2">{item.title}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">{item.description}</CardDescription>
              </Card>
            </motion.custom>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper id="upcoming-opportunities" className="bg-primary/5 rounded-xl py-16 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 md:mb-16">Upcoming Volunteer Opportunities</h2>
        {loadingEvents && (
          <div className="text-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading upcoming events...</p>
          </div>
        )}
        {!loadingEvents && eventsToDisplay.length === 0 && (
           <div className="text-center py-12">
            <AlertTriangle className="h-16 w-16 text-primary/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No upcoming volunteer opportunities right now. Please fill the form below to get notified!</p>
          </div>
        )}
        {!loadingEvents && eventsToDisplay.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {eventsToDisplay.map((event, index) => (
              <motion.custom key={event.id || `event-${index}`} custom={index} initial="hidden" animate="visible" variants={cardVariants}>
                <EventCard event={event} />
              </motion.custom>
            ))}
          </div>
        )}
        <div className="text-center mt-12">
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
                <Link to="/initiatives-events">View All Events & Initiatives</Link>
            </Button>
        </div>
      </SectionWrapper>
      
      <VolunteerFormSection formIdPrefix="time" />

    </div>
  );
};

export default TimeDonationPage;