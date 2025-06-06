import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import SectionWrapper from '@/components/shared/SectionWrapper';
import EventCard from '@/components/shared/EventCard'; 
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Clock, CalendarDays, Users, Sparkles, Loader2, AlertTriangle, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';
import VolunteerFormSection from '@/components/landing/VolunteerFormSection';
import { staticInitiativesData } from '@/data/initiativesData';

const DEFAULT_EVENT_IMAGE = "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80";
const DEFAULT_EVENT_VIDEO = "https://www.youtube.com/embed/mro5NEfTWNw";

const TimeDonationPage = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const location = useLocation(); 

  const fetchOpportunities = useCallback(async () => {
    setLoading(true);
    try {
      const today = new Date().toISOString();
      const { data: eventsData, error: eventsError } = await supabase
        .from('events')
        .select('*')
        .or(`date.gte.${today},date.is.null`) 
        .order('date', { ascending: true, nullsFirst: false });

      if (eventsError) {
        throw eventsError;
      }
      
      const fetchedEvents = eventsData.map(event => ({
        ...event,
        type: 'event',
        photos: event.images && event.images.length > 0 ? event.images : [DEFAULT_EVENT_IMAGE],
        youtube_link: event.youtube_link || DEFAULT_EVENT_VIDEO,
        status: event.status || 'Future' 
      }));

      const activeInitiatives = staticInitiativesData
        .filter(init => init.status === 'Ongoing' || init.status === 'Future')
        .map(init => ({
          id: init.id,
          title: init.title,
          description: init.shortDescription,
          date: null, 
          location: 'Raipur, Chhattisgarh (Multiple Locations)', 
          category: init.category,
          photos: (init.photos && init.photos.length > 0) ? init.photos : [DEFAULT_EVENT_IMAGE],
          youtube_link: init.youtubeLink || DEFAULT_EVENT_VIDEO,
          type: 'initiative',
          status: init.status,
          detailLink: `/initiatives-events/${init.id}`
        }));

      let combinedOpportunities = [...fetchedEvents, ...activeInitiatives];
      
      combinedOpportunities.sort((a, b) => {
        const statusOrder = { 'Ongoing': 1, 'Future': 2 };
        const statusA = statusOrder[a.status] || 3;
        const statusB = statusOrder[b.status] || 3;
        if (statusA !== statusB) return statusA - statusB;
        if (a.date && b.date) return new Date(a.date) - new Date(b.date);
        if (a.date) return -1; 
        if (b.date) return 1;
        return a.title.localeCompare(b.title);
      });
      
      setOpportunities(combinedOpportunities);

    } catch (error) {
      toast({ title: 'Error Fetching Opportunities', description: error.message, variant: 'destructive' });
      setOpportunities([]);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchOpportunities();
  }, [fetchOpportunities]);

  useEffect(() => {
    if (location.hash === '#time-donation-page-volunteer-form') {
      const element = document.getElementById('time-donation-page-volunteer-form');
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);


  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  };

  const renderOpportunityCard = (item, index) => {
    const cardData = {
      id: item.id,
      title: item.title,
      description: item.description,
      date: item.date,
      location: item.location,
      category: item.category,
      photos: item.photos,
      youtube_link: item.youtube_link,
      type: item.type, 
      status: item.status,
    };

    const detailLink = item.type === 'initiative' ? `/initiatives-events/${item.id}` : `/events/${item.id}`;

    return (
      <motion.custom key={item.id || `item-${index}`} custom={index} initial="hidden" animate="visible" variants={cardVariants}>
        <EventCard event={{...cardData, detailLink: detailLink}} />
      </motion.custom>
    );
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
        {loading && (
          <div className="text-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading upcoming opportunities...</p>
          </div>
        )}
        {!loading && opportunities.length === 0 && (
           <div className="text-center py-12">
            <AlertTriangle className="h-16 w-16 text-primary/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No upcoming volunteer opportunities right now. Please fill the form below to get notified!</p>
          </div>
        )}
        {!loading && opportunities.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {opportunities.slice(0, 6).map((item, index) => renderOpportunityCard(item, index))}
          </div>
        )}
        {!loading && opportunities.length > 0 && (
            <div className="text-center mt-12">
                <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
                    <Link to="/initiatives-events">View All Events & Initiatives</Link>
                </Button>
            </div>
        )}
      </SectionWrapper>
      
      <VolunteerFormSection formIdPrefix="time-donation-page" />

    </div>
  );
};

export default TimeDonationPage;
