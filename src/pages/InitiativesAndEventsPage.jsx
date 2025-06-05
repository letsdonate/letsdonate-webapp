import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import SectionWrapper from '@/components/shared/SectionWrapper';
import EventCard from '@/components/shared/EventCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Image, CalendarHeart, SlidersHorizontal, Loader2, Sparkles, ListFilter, AlertTriangle, Briefcase, Clock, CheckCircle } from 'lucide-react'; // Removed Handshake, ExternalLink
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { staticInitiativesData } from '@/data/initiativesData';
// Removed import for otherNgoData as this section is moved to NgoNetworkPage

const placeholderEventTemplate = {
  id: null, 
  title: 'Exciting Event - Stay Tuned!',
  description: 'Details about this event will be shared soon. We are working hard to bring you more opportunities to connect and contribute.',
  date: 'To Be Announced',
  location: 'To Be Confirmed',
  photos: ['/images/events/placeholder/event_placeholder_1.jpg'],
  youtube_link: null,
  category: 'General',
  type: 'event',
  status: 'future' // future, ongoing, past
};

const generatePlaceholders = (count, existingIds, status = 'future') => {
  const placeholders = [];
  for (let i = 0; i < count; i++) {
    let placeholderId = `placeholder-${status}-event-${i}`;
    let k = 0;
    while (existingIds.has(placeholderId)) {
      k++;
      placeholderId = `placeholder-${status}-event-${i}-${k}`;
    }
    placeholders.push({
      ...placeholderEventTemplate,
      id: placeholderId,
      title: `${status.charAt(0).toUpperCase() + status.slice(1)} Event Placeholder ${i + 1}`,
      photos: [`/images/events/placeholder/event_placeholder_${(i%3)+1}.jpg`],
      youtube_link: i % 2 === 0 ? "https://www.youtube.com/embed/VIDEO_ID_PLACEHOLDER" : null,
      status: status,
    });
    existingIds.add(placeholderId);
  }
  return placeholders;
};

const MINIMUM_EVENTS_PER_SECTION = 2; 

const InitiativesAndEventsPage = () => {
  const [dbEvents, setDbEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const { toast } = useToast();

  const fetchDbEvents = useCallback(async () => {
    setLoadingEvents(true);
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      toast({ title: 'Error Fetching Events', description: error.message, variant: 'destructive' });
      setDbEvents([]);
    } else {
      const now = new Date();
      const categorizedEvents = data.map(event => {
        const eventDate = new Date(event.date);
        let status = 'past';
        if (!event.date) status = 'future'; 
        else if (eventDate > now) status = 'future';
        else if (eventDate.toDateString() === now.toDateString()) status = 'ongoing';
        
        return { ...event, type: 'event', status };
      });
      setDbEvents(categorizedEvents);
    }
    setLoadingEvents(false);
  }, [toast]);

  useEffect(() => {
    fetchDbEvents();
  }, [fetchDbEvents]);

  const initiativesToDisplay = staticInitiativesData.map(init => ({ ...init, type: 'initiative' }));
  
  const ongoingEvents = dbEvents.filter(e => e.status === 'ongoing');
  const futureEvents = dbEvents.filter(e => e.status === 'future');
  const pastEvents = dbEvents.filter(e => e.status === 'past');

  const existingEventIds = new Set(dbEvents.map(e => e.id));

  const fillPlaceholders = (eventArray, status) => {
    if (eventArray.length < MINIMUM_EVENTS_PER_SECTION) {
      const placeholdersNeeded = MINIMUM_EVENTS_PER_SECTION - eventArray.length;
      return [...eventArray, ...generatePlaceholders(placeholdersNeeded, existingEventIds, status)];
    }
    return eventArray;
  };

  const displayOngoingEvents = fillPlaceholders(ongoingEvents, 'ongoing');
  const displayFutureEvents = fillPlaceholders(futureEvents, 'future');
  const displayPastEvents = fillPlaceholders(pastEvents, 'past');
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: i * 0.07, duration: 0.5, ease: "easeOut" },
    }),
  };

  const InitiativeCard = ({ initiative, index }) => ( // Removed isOtherNgo prop
     <motion.custom
      key={initiative.id}
      custom={index}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className="h-full"
    >
      <Card className={`rounded-xl shadow-soft hover:shadow-soft-hover transition-shadow duration-300 overflow-hidden flex flex-col h-full ${initiative.themeColor || 'bg-card'}`}>
        <CardHeader className="p-5 md:p-6 items-center text-center">
          {initiative.icon ? React.cloneElement(initiative.icon, {className: "h-10 w-10 text-primary mb-2"}) : <Sparkles className="h-10 w-10 text-primary mb-2" />}
          <CardTitle className="text-xl md:text-2xl text-primary font-heading mt-2">{initiative.name || initiative.title}</CardTitle>
        </CardHeader>
        <CardContent className="p-5 md:p-6 flex-grow">
          <CardDescription className="text-sm text-foreground/80 mb-3 leading-relaxed">{initiative.subtitle || initiative.description.substring(0, 120) + '...'}</CardDescription>
          {(initiative.photos && initiative.photos.length > 0) || initiative.logoPlaceholder ? (
             <img  
                src={initiative.photos ? initiative.photos[0] : initiative.logoPlaceholder} 
                alt={`${initiative.name || initiative.title} preview`} 
                className="w-full h-40 object-contain rounded-md mb-3 bg-muted/30 p-2" 
              />
          ) : (
            <div className="w-full h-40 bg-muted/30 rounded-md mb-3 flex items-center justify-center">
              <Image className="h-16 w-16 text-muted-foreground/40" />
            </div>
          )}
        </CardContent>
        <CardFooter className="p-5 md:p-6 border-t border-border/40">
          <Button variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary rounded-lg" asChild>
            <Link to={`/initiatives-events/${initiative.id}`}>Learn More</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.custom>
  );

  const renderEventSection = (title, events, icon) => (
    <SectionWrapper id={title.toLowerCase().replace(/\s+/g, '-')}>
      <div className="flex items-center mb-8 md:mb-12">
        {icon}
        <h2 className="text-2xl md:text-3xl font-semibold text-primary ml-3">{title}</h2>
      </div>
      {loadingEvents && (
        <div className="text-center py-12">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading events...</p>
        </div>
      )}
      {!loadingEvents && events.length === 0 && (
        <div className="text-center py-12">
          <AlertTriangle className="h-16 w-16 text-primary/30 mx-auto mb-4" />
          <p className="text-muted-foreground">No {title.toLowerCase()} to display currently. Check back soon!</p>
        </div>
      )}
      {!loadingEvents && events.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {events.map((event, index) => (
            <motion.custom key={event.id || `event-${index}`} custom={index} initial="hidden" animate="visible" variants={cardVariants}>
              <EventCard event={event} />
            </motion.custom>
          ))}
        </div>
      )}
    </SectionWrapper>
  );

  return (
    <div className="container mx-auto px-4">
      <PageHeader title="Our Initiatives & Events" subtitle="Discover the heart of Let's Donate. Explore our ongoing programs and impactful events that bring change.">
        <Sparkles className="h-16 w-16 text-primary mx-auto mt-4" />
      </PageHeader>

      <SectionWrapper id="initiatives-section">
        <div className="flex items-center mb-8 md:mb-12">
          <Briefcase className="h-8 w-8 text-primary" />
          <h2 className="text-2xl md:text-3xl font-semibold text-primary ml-3">Our Core Initiatives</h2>
        </div>
        {initiativesToDisplay.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {initiativesToDisplay.map((item, index) => 
              <InitiativeCard initiative={item} index={index} key={item.id || `init-${index}`} />
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <AlertTriangle className="h-16 w-16 text-primary/30 mx-auto mb-4" />
            <p className="text-muted-foreground">Initiative details are being updated. Please check back soon!</p>
          </div>
        )}
      </SectionWrapper>

      {renderEventSection("Ongoing Work", displayOngoingEvents, <Clock className="h-8 w-8 text-primary" />)}
      {renderEventSection("Future Work", displayFutureEvents, <CalendarHeart className="h-8 w-8 text-primary" />)}
      {renderEventSection("Past Work", displayPastEvents, <CheckCircle className="h-8 w-8 text-primary" />)}

      {/* Removed Other NGO Initiatives Section - it's now part of NgoNetworkPage */}

      <SectionWrapper id="get-involved-cta" className="text-center mt-16 md:mt-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5 rounded-xl py-12 md:py-16">
        <CalendarHeart className="h-12 w-12 text-primary mx-auto mb-6" />
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Ready to Make a Difference?</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          Every act of kindness creates a ripple. Join us in our mission to spread joy and empower communities.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild className="bg-primary hover:bg-primary-soft text-primary-foreground rounded-lg px-8 py-3 text-base shadow-soft-hover">
                <Link to="/donate/time">Become a Volunteer</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary rounded-lg px-8 py-3 text-base shadow-soft-hover" asChild>
                <Link to="/donate/money">Donate Funds</Link>
            </Button>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default InitiativesAndEventsPage;