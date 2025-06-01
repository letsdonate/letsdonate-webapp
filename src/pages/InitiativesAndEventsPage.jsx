import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import SectionWrapper from '@/components/shared/SectionWrapper';
import EventCard from '@/components/shared/EventCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Image, CalendarHeart, SlidersHorizontal, Loader2, Sparkles, ListFilter, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { staticInitiativesData } from '@/data/initiativesData';

const placeholderEventTemplate = {
  id: null, 
  title: 'Upcoming Event - Stay Tuned!',
  description: 'Details about this exciting event will be shared soon. We are working hard to bring you more opportunities to connect and contribute.',
  date: 'To Be Announced',
  location: 'To Be Confirmed',
  photos: ['/images/events/placeholder/event_placeholder_1.jpg'], // Generic placeholder image
  youtube_link: null, // Default to null
  category: 'General',
  type: 'event'
};

const generatePlaceholders = (count, existingIds) => {
  const placeholders = [];
  for (let i = 0; i < count; i++) {
    let placeholderId = `placeholder-event-${i}`;
    let k = 0;
    while (existingIds.has(placeholderId)) {
      k++;
      placeholderId = `placeholder-event-${i}-${k}`;
    }
    placeholders.push({
      ...placeholderEventTemplate,
      id: placeholderId,
      title: `Exciting Event Placeholder ${i + 1}`,
      photos: [`/images/events/placeholder/event_placeholder_${(i%3)+1}.jpg`], // Cycle through a few placeholders
      youtube_link: i % 2 === 0 ? "https://www.youtube.com/embed/VIDEO_ID_PLACEHOLDER" : null,
    });
    existingIds.add(placeholderId);
  }
  return placeholders;
};


const MINIMUM_EVENTS_DISPLAY = 6;

const InitiativesAndEventsPage = () => {
  const [dbEvents, setDbEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('All');
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
      setDbEvents(data.map(event => ({ ...event, type: 'event' })));
    }
    setLoadingEvents(false);
  }, [toast]);

  useEffect(() => {
    fetchDbEvents();
  }, [fetchDbEvents]);

  const initiativesToDisplay = staticInitiativesData.map(init => ({ ...init, type: 'initiative' }));
  
  let eventsToDisplay = [...dbEvents];
  const existingEventIds = new Set(dbEvents.map(e => e.id));
  
  if (eventsToDisplay.length < MINIMUM_EVENTS_DISPLAY) {
    const placeholdersNeeded = MINIMUM_EVENTS_DISPLAY - eventsToDisplay.length;
    eventsToDisplay.push(...generatePlaceholders(placeholdersNeeded, existingEventIds));
  }
  
  const allItems = [...initiativesToDisplay, ...eventsToDisplay];
  
  const filters = ['All', 'Initiatives', 'Events', ...new Set(allItems.filter(item => item.type === 'event' && item.category).map(event => event.category))];

  const filteredItems = selectedFilter === 'All' 
    ? allItems
    : allItems.filter(item => {
        if (selectedFilter === 'Initiatives') return item.type === 'initiative';
        if (selectedFilter === 'Events') return item.type === 'event';
        return item.category === selectedFilter && item.type === 'event';
      });

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: i * 0.07, duration: 0.5, ease: "easeOut" },
    }),
  };

  const InitiativeCard = ({ initiative, index }) => (
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
          <CardTitle className="text-xl md:text-2xl text-primary font-heading mt-2">{initiative.title}</CardTitle>
        </CardHeader>
        <CardContent className="p-5 md:p-6 flex-grow">
          <CardDescription className="text-sm text-foreground/80 mb-3 leading-relaxed">{initiative.subtitle || initiative.description.substring(0, 100) + '...'}</CardDescription>
          {initiative.photos && initiative.photos.length > 0 && (
             <img  
                src={initiative.photos[0]} 
                alt={`${initiative.title} preview`} 
                className="w-full h-40 object-cover rounded-md mb-3" 
              src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
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


  return (
    <div className="container mx-auto px-4">
      <PageHeader title="Our Initiatives & Events" subtitle="Discover the heart of Let's Donate. Explore our ongoing programs and impactful events that bring change.">
        <Sparkles className="h-16 w-16 text-primary mx-auto mt-4" />
      </PageHeader>

      <SectionWrapper id="filter-section" className="!py-0 mb-8 md:mb-10">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-4 sm:mb-0">Explore Our Work</h2>
          <div className="relative">
            <ListFilter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <select 
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="pl-10 pr-8 py-2.5 rounded-lg border border-input bg-background text-sm focus:ring-primary focus:border-primary shadow-sm"
            >
              {filters.map(filter => (
                <option key={filter} value={filter}>{filter || 'Uncategorized'}</option>
              ))}
            </select>
          </div>
        </div>
      </SectionWrapper>
      
      {loadingEvents && selectedFilter !== 'Initiatives' && (
        <div className="text-center py-12">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading awesome events...</p>
        </div>
      )}

      {filteredItems.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredItems.map((item, index) => 
            item.type === 'initiative' 
            ? <InitiativeCard initiative={item} index={index} key={item.id || `init-${index}`} />
            : <motion.custom key={item.id || `event-${index}`} custom={index} initial="hidden" animate="visible" variants={cardVariants}><EventCard event={item} /></motion.custom>
          )}
        </div>
      ) : (
        !loadingEvents && (
          <div className="text-center py-12">
            <AlertTriangle className="h-20 w-20 text-primary/30 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-primary mb-2">Nothing Found Here (Yet!)</h3>
            <p className="text-muted-foreground">
              It seems there's no content matching "{selectedFilter}". Try a different filter or check back soon for new updates!
            </p>
          </div>
        )
      )}

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