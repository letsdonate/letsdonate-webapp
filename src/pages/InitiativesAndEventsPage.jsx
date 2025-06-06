import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import PageHeader from '@/components/shared/PageHeader';
import SectionWrapper from '@/components/shared/SectionWrapper';
import EventCard from '@/components/shared/EventCard';
import InitiativeCard from '@/components/initiatives-events/InitiativeCard';
import FilterControls from '@/components/initiatives-events/FilterControls';
import PaginationControls from '@/components/initiatives-events/PaginationControls';
import TabNavigation from '@/components/initiatives-events/TabNavigation';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { staticInitiativesData } from '@/data/initiativesData';
import { Users, Sparkles, Loader2, AlertTriangle } from 'lucide-react';

const ITEMS_PER_PAGE = 6;
const DEFAULT_EVENT_IMAGE = "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80";
const DEFAULT_EVENT_VIDEO = "https://www.youtube.com/embed/mro5NEfTWNw";

export const placeholderEventsData = [ 
  {
    id: 'sample-ongoing-event', 
    title: "Ongoing: Raipur Tech Fair 2025",
    description: "Explore the latest in technology, attend workshops, and network with professionals. This week-long fair has something for everyone interested in tech innovation.",
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), 
    location: "Raipur International Tech Park, Raipur",
    category: "Technology",
    photos: ["https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"],
    youtube_link: DEFAULT_EVENT_VIDEO,
    type: 'event',
    status: 'Ongoing', 
    registration_link: '/events/sample-ongoing-event' 
  },
  {
    id: 'placeholder-event-future-leaders',
    title: "Future Leaders Summit",
    description: "A 3-day summit for aspiring young leaders featuring talks, panel discussions, and leadership workshops with renowned figures.",
    date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), 
    location: "Grand Convention Center, Raipur",
    category: "Leadership",
    photos: ["https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80"],
    youtube_link: DEFAULT_EVENT_VIDEO,
    type: 'event',
    status: 'Future',
    registration_link: '/events/placeholder-event-future-leaders'
  },
  {
    id: 'placeholder-event-past-meetup',
    title: "Let’s Connect – Educator & Volunteer Meetup",
    description: "A planning and bonding session where educators and volunteers aligned on upcoming summer activities and shared creative ideas to engage children.",
    date: new Date("2025-07-27T15:00:00").toISOString(),
    location: "Food Library, Civil Lines",
    category: "Team Meetup",
    photos: ["https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80"],
    youtube_link: DEFAULT_EVENT_VIDEO,
    type: 'event',
    status: 'Past',
    registration_link: '/events/placeholder-event-past-meetup'
  },
  {
    id: 'placeholder-event-past-annual',
    title: "Let’s Donate Annual Celebration",
    description: "Marking two years since our first session, this gathering celebrated milestones, memories, and the movement that’s growing stronger with every act of kindness.",
    date: new Date("2024-06-09T16:00:00").toISOString(),
    location: "Click For Clarity Community Space, Raipur",
    category: "Foundation Day Event",
    photos: ["https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80"],
    youtube_link: DEFAULT_EVENT_VIDEO,
    type: 'event',
    status: 'Done',
    registration_link: '/events/placeholder-event-past-annual'
  }
];


const InitiativesAndEventsPage = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState([]);
  const [initiatives, setInitiatives] = useState(staticInitiativesData.map(init => ({ ...init, type: 'initiative' })));
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("all"); 

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      
      let combinedEvents = [...placeholderEventsData]; 

      if (data && data.length > 0) {
        const dbEvents = data.map(event => ({
          ...event,
          type: 'event',
          photos: event.images && event.images.length > 0 ? event.images : [DEFAULT_EVENT_IMAGE],
          youtube_link: event.youtube_link || DEFAULT_EVENT_VIDEO,
          status: event.status || 'Future', 
          registration_link: event.registration_link || `/events/${event.id}`
        }));
        combinedEvents = dbEvents.concat(
          placeholderEventsData.filter(pEvent => !dbEvents.some(dbEvent => dbEvent.id === pEvent.id))
        );
      }
      setEvents(combinedEvents);
    } catch (error) {
      toast({ title: "Error fetching events", description: error.message, variant: "destructive" });
      setEvents(placeholderEventsData); 
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const itemsToDisplay = useMemo(() => {
    let sourceItems = [];
    if (activeTab === "all") {
      sourceItems = [...initiatives, ...events];
    } else if (activeTab === "initiatives") {
      sourceItems = initiatives;
    } else if (activeTab === "events") {
      sourceItems = events;
    }
    
    return sourceItems.filter(item => {
      const title = item.title || item.name || '';
      const description = item.description || item.shortDescription || '';
      const category = item.category || item.areaOfWork || '';

      const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || category.toLowerCase() === categoryFilter.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [activeTab, events, initiatives, searchTerm, categoryFilter]);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return itemsToDisplay.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [itemsToDisplay, currentPage]);

  const totalPages = Math.ceil(itemsToDisplay.length / ITEMS_PER_PAGE);

  const currentCategories = useMemo(() => {
    let categoriesSource = [];
    if (activeTab === "events") categoriesSource = events.map(e => e.category);
    else if (activeTab === "initiatives") categoriesSource = initiatives.map(i => i.category);
    else { 
      categoriesSource = [
        ...initiatives.map(i => i.category),
        ...events.map(e => e.category)
      ];
    }
    const uniqueCategories = new Set(categoriesSource.filter(Boolean));
    return ['all', ...Array.from(uniqueCategories)];
  }, [activeTab, events, initiatives]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      const filtersSection = document.getElementById('filters-section');
      if (filtersSection) {
        window.scrollTo({
          top: filtersSection.offsetTop - 80, 
          behavior: 'smooth'
        });
      }
    }
  };
  
  const handleTabChange = (value) => {
    setActiveTab(value);
    setCurrentPage(1);
    setCategoryFilter('all');
    setSearchTerm('');
  };

  const showNoResultsMessage = !loading && paginatedItems.length === 0;

  return (
    <div className="container mx-auto px-4">
      <PageHeader 
        title="Our Initiatives & Events"
        subtitle="Explore the diverse ways we're making a difference, from ongoing initiatives to impactful events and collaborations. Find where you can connect!"
      >
        <Sparkles className="h-16 w-16 text-primary mx-auto mt-4" />
      </PageHeader>

      <SectionWrapper id="filters-section">
        <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
        <FilterControls 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          currentCategories={currentCategories}
          activeTab={activeTab}
          setCurrentPage={setCurrentPage}
        />
          
        {loading && (
          <div className="text-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading content...</p>
          </div>
        )}

        {showNoResultsMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 bg-card rounded-xl shadow-soft"
          >
            <AlertTriangle className="h-16 w-16 text-primary/30 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-primary mb-2">No Results Found</h3>
            <p className="text-muted-foreground">
              We couldn't find any {activeTab === "all" ? "items" : activeTab} matching your criteria. Try adjusting your search or filters.
            </p>
            {activeTab === 'events' && events.length === 0 && (
              <Button asChild variant="link" className="mt-4 text-primary">
                <Link to="/about-us#contact-us-section">Suggest an Event</Link>
              </Button>
            )}
          </motion.div>
        )}

        {!loading && paginatedItems.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 min-h-[400px] sm:min-h-[300px]">
              {paginatedItems.map((item, index) => {
                if (item.type === 'initiative') {
                  return <InitiativeCard key={item.id || `init-${index}`} initiative={item} index={index} />;
                } else if (item.type === 'event') {
                  return <EventCard key={item.id || `event-${index}`} event={item} index={index} />;
                }
                return null;
              })}
            </div>
            <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </>
        )}
      </SectionWrapper>

      <SectionWrapper id="call-to-action" className="bg-gradient-to-br from-primary to-primary-soft text-primary-foreground rounded-xl py-16 md:py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Users className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-lg md:text-xl mb-10 max-w-xl mx-auto opacity-90">
            Your contribution, big or small, helps us continue our work and expand our reach. Join us today!
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button asChild size="lg" variant="default" className="bg-background hover:bg-background/90 text-primary rounded-lg px-8 py-3 text-base">
              <Link to="/donate/time#time-donation-page-volunteer-form">Volunteer With Us</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-lg px-8 py-3 text-base">
              <Link to="/donate/money">Support Financially</Link>
            </Button>
          </div>
        </motion.div>
      </SectionWrapper>
    </div>
  );
};

export default InitiativesAndEventsPage;