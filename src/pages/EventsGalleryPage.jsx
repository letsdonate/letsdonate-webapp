import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import SectionWrapper from '@/components/shared/SectionWrapper';
import EventCard from '@/components/shared/EventCard'; // Assuming this is a generic event card
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'; // Added CardFooter
import { Image, CalendarHeart, SlidersHorizontal, Loader2, Zap, Brain, Users, Sun, MessageSquare, BookOpen, Heart } from 'lucide-react'; // Added Heart
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';

const placeholderEventTemplate = {
  id: null, 
  title: 'Exciting Initiative Highlight Coming Soon!',
  description: 'Details about this impactful initiative will be shared shortly. Stay tuned for updates.',
  date: 'Ongoing / Varies',
  location: 'Multiple Locations',
  images: [],
  youtube_link: null,
  category: 'Initiative'
};

const generatePlaceholders = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    ...placeholderEventTemplate,
    id: `placeholder-initiative-${i}`,
    title: `Initiative Placeholder ${i + 1}`,
  }));
};

const MINIMUM_ITEMS_DISPLAY = 6;

const initiativesData = [
  {
    id: 'lets-donate-core',
    title: "Let's Donate (Core Initiative)",
    icon: <Heart className="h-10 w-10 text-primary" />,
    description: "Our regular, year-round engagements in underserved communities focusing on academic subjects, creative learning, and life skills. Donations aren't just monetary; give time, talent, books, or even a story.",
    details: [
      "Academic subjects: English, Mathematics, Science, Vedic Maths, Verbal Reasoning",
      "Creative learning: Storytelling, Motivation, Value education, Emotional awareness",
      "Life Skills: Communication, Financial Literacy, Curiosity-based exploration",
      "Venues: Government/community schools, children’s homes, slum learning centers"
    ],
    imagePlaceholder: "Diverse group of children engaged in a learning activity"
  },
  {
    id: 'lets-prepare',
    title: "Let's Prepare",
    icon: <BookOpen className="h-10 w-10 text-primary" />,
    description: "Our exam and academic readiness program launched in July 2024, targeting 8th-grade students in government schools for scholarship exams.",
    details: [
      "Target Group: 8th-grade students in government schools",
      "Activities: Concept-building, regular practice tests, doubt-clearing sessions",
      "Special Support: Helping students fill out scholarship and exam forms",
      "Impact: Boost in confidence, clarity, and ambition beyond marks"
    ],
    imagePlaceholder: "Students diligently preparing for an exam"
  },
  {
    id: 'lets-elevate',
    title: "Let's Elevate",
    icon: <Zap className="h-10 w-10 text-primary" />,
    description: "A mentorship and second-chance education initiative, especially for school dropouts and teenage girls, empowering them to dream again.",
    details: [
      "Focus: Empowering those who left school but still have the will to grow",
      "Skills: Personality development, confidence building, financial literacy",
      "Side-income skills: Mehndi art, home-based business ideas",
      "Motivation through success stories"
    ],
    imagePlaceholder: "Young individuals participating in a skill development workshop"
  },
  {
    id: 'lets-summer',
    title: "Let's Summer",
    icon: <Sun className="h-10 w-10 text-primary" />,
    description: "A 2-month summer camp (April–May) in orphanages, government schools, and special education schools, making learning fun.",
    details: [
      "Format: Daily or alternate-day sessions by guest teachers, artists, professionals",
      "Activities: Dance, Art, Theatre, Baking, Games, Mindfulness, Science, Maths, GK",
      "Outcome: Children discover joy, develop curiosity, and express themselves"
    ],
    imagePlaceholder: "Children enjoying a summer camp activity outdoors"
  },
  {
    id: 'lets-donate-clarity',
    title: "Let's Donate Clarity (Social Change Circle)",
    icon: <MessageSquare className="h-10 w-10 text-primary" />,
    description: "A collaborative initiative with ClickForClarity for brain development, expanded to monthly meetups for young adults to tackle societal issues.",
    details: [
      "Expanded Format: Monthly meetups for young adults and volunteers",
      "Process: Each group chooses a real societal issue (unemployment, addiction, etc.)",
      "Action: Participants brainstorm and take the first small step toward resolution",
      "Goal: Community-led change through empathy, conversation, and action"
    ],
    imagePlaceholder: "Group of young adults in a discussion circle"
  }
];


const EventsGalleryPage = () => {
  const [eventsAndInitiatives, setEventsAndInitiatives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { toast } = useToast();

  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data: dbEvents, error: dbError } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: false });

    let combinedData = [];

    if (dbError) {
      toast({ title: 'Error fetching database events', description: dbError.message, variant: 'destructive' });
      combinedData = [...initiativesData.map(init => ({...init, type: 'initiative'})), ...generatePlaceholders(MINIMUM_ITEMS_DISPLAY - initiativesData.length > 0 ? MINIMUM_ITEMS_DISPLAY - initiativesData.length : 0)];
    } else {
      const formattedDbEvents = dbEvents.map(event => ({...event, type: 'event'}));
      combinedData = [...formattedDbEvents, ...initiativesData.map(init => ({...init, type: 'initiative'}))];
      
      if (combinedData.length < MINIMUM_ITEMS_DISPLAY) {
        const placeholdersNeeded = MINIMUM_ITEMS_DISPLAY - combinedData.length;
        combinedData.push(...generatePlaceholders(placeholdersNeeded));
      }
    }
    // Sort: initiatives first, then events by date
    combinedData.sort((a, b) => {
        if (a.type === 'initiative' && b.type !== 'initiative') return -1;
        if (a.type !== 'initiative' && b.type === 'initiative') return 1;
        if (a.type === 'event' && b.type === 'event') {
            if (!a.date && b.date) return 1; // Placeholders (no date) after dated events
            if (a.date && !b.date) return -1;
            if (!a.date && !b.date) return 0;
            return new Date(b.date) - new Date(a.date); // newest events first
        }
        return 0; // keep initiatives order or if types are same but not event
    });

    setEventsAndInitiatives(combinedData);
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  const categories = ['All', 'Events', 'Initiatives', ...new Set(eventsAndInitiatives.filter(item => item.type === 'event' && item.category).map(event => event.category))];

  const filteredItems = selectedCategory === 'All' 
    ? eventsAndInitiatives
    : eventsAndInitiatives.filter(item => {
        if (selectedCategory === 'Events') return item.type === 'event';
        if (selectedCategory === 'Initiatives') return item.type === 'initiative';
        return item.category === selectedCategory && item.type === 'event';
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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
        <p className="text-muted-foreground">Loading moments that matter...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <PageHeader title="Moments That Matter" subtitle="Our impact speaks visually. Explore our events and ongoing initiatives.">
        <Image className="h-16 w-16 text-primary mx-auto mt-4" />
      </PageHeader>

      <SectionWrapper id="content-filters" className="!py-0 mb-10 md:mb-12">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-4 sm:mb-0">Browse Our Work</h2>
          <div className="relative">
            <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-2.5 rounded-lg border border-input bg-background text-sm focus:ring-primary focus:border-primary shadow-sm"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category || 'Uncategorized'}</option>
              ))}
            </select>
          </div>
        </div>
      </SectionWrapper>
      
      {filteredItems.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredItems.map((item, index) => (
            <motion.custom
              key={item.id || `item-${index}`}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              {item.type === 'initiative' ? (
                <Card className="rounded-xl shadow-soft hover:shadow-soft-hover transition-shadow duration-300 overflow-hidden flex flex-col h-full bg-card">
                  <CardHeader className="p-5 md:p-6 items-center text-center">
                    {item.icon}
                    <CardTitle className="text-2xl text-primary font-heading mt-3">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 md:p-6 flex-grow">
                    <CardDescription className="text-sm text-foreground/80 mb-4 leading-relaxed">{item.description}</CardDescription>
                    <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground">
                        {item.details?.map((detail, idx) => <li key={idx}>{detail}</li>)}
                    </ul>
                  </CardContent>
                  <CardFooter className="p-5 md:p-6 border-t border-border/40">
                    <Button variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary rounded-lg" asChild>
                        <Link to={`/initiatives/${item.id}`}>Learn More</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <EventCard event={item} /> // Regular event card for 'event' type
              )}
            </motion.custom>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <CalendarHeart className="h-20 w-20 text-primary/50 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-primary mb-2">No Content Found</h3>
          <p className="text-muted-foreground">
            It seems there's no content matching "{selectedCategory}". Try a different filter or check back soon!
          </p>
        </div>
      )}

      <SectionWrapper id="cta-section" className="text-center mt-16 md:mt-24 bg-primary/5 rounded-xl py-12 md:py-16">
        <CalendarHeart className="h-12 w-12 text-secondary mx-auto mb-6" />
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Get Involved!</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          Inspired by our work? Join us in making a difference. Volunteer your time, donate, or spread the word.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild className="bg-primary hover:bg-primary-soft text-primary-foreground rounded-lg px-8 py-3 text-base">
                <Link to="/donate/time">Volunteer With Us</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-lg px-8 py-3 text-base">
                <Link to="/donate/money">Support Financially</Link>
            </Button>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default EventsGalleryPage;