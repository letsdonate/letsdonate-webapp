import React, { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import SectionWrapper from '@/components/shared/SectionWrapper';
import EventCard from '@/components/shared/EventCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Image, CalendarHeart, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

const placeholderEvents = [
  {
    id: 1,
    title: 'Annual Children\'s Art Fair',
    description: 'A vibrant showcase of creativity where young artists display their masterpieces. Includes workshops and fun activities.',
    date: 'August 10, 2025',
    location: 'Community Park Central',
    photos: [
      'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
      'https://images.unsplash.com/photo-1505241478339-95c962445331?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
      'https://images.unsplash.com/photo-1600814069046-aa6dbf3aad49?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
    ],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 
    category: 'Art & Drama'
  },
  {
    id: 2,
    title: 'Math Whiz Challenge 2025',
    description: 'An exciting competition for students to test their mathematical skills and problem-solving abilities.',
    date: 'September 5, 2025',
    location: 'City Convention Hall',
    photos: [
      'https://images.unsplash.com/photo-1596495577881-e603dde67643?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
      'https://images.unsplash.com/photo-1509062522106-8aae40290970?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
    ],
    videoUrl: null,
    category: 'Maths'
  },
  {
    id: 3,
    title: 'Storytellers\' Conclave',
    description: 'A magical event where professional storytellers enchant audiences of all ages with captivating tales.',
    date: 'October 12, 2025',
    location: 'Grand Library Auditorium',
    photos: ['https://images.unsplash.com/photo-1519791883288-dc8bd696e667?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600'],
    videoUrl: 'https://www.youtube.com/watch?v=VIDEO_ID_STORY',
    category: 'Storytelling'
  },
  {
    id: 4,
    title: 'Young Scientists Expo',
    description: 'Innovative science projects by budding scientists. Interactive exhibits and live demonstrations.',
    date: 'November 15-16, 2025',
    location: 'Science & Technology Museum',
    photos: [
      'https://images.unsplash.com/photo-1574610758891-5b809b6e6e2e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
      'https://images.unsplash.com/photo-1606092195730-0d126839afd8?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
      'https://images.unsplash.com/photo-1554475020-62isf7b768da?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
    ],
    videoUrl: null,
    category: 'Science'
  },
  {
    id: 5,
    title: 'Community Sports Day',
    description: 'A day of fun-filled sports activities for families and children, promoting health and teamwork.',
    date: 'December 1, 2025',
    location: 'City Sports Ground',
    photos: ['https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600'],
    videoUrl: 'https://www.youtube.com/watch?v=VIDEO_ID_SPORTS',
    category: 'Sports'
  },
  {
    id: 6,
    title: 'Winter Cheer Distribution Drive',
    description: 'Volunteers come together to distribute warm clothes, blankets, and essentials to those in need.',
    date: 'December 20, 2025',
    location: 'Multiple City Shelters',
    photos: [
        'https://images.unsplash.com/photo-1608206756236-de7a408e1963?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
        'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600'
    ],
    videoUrl: null,
    category: 'Community Service'
  }
];

const categories = ['All', ...new Set(placeholderEvents.map(event => event.category))];

const EventsGalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredEvents = selectedCategory === 'All' 
    ? placeholderEvents 
    : placeholderEvents.filter(event => event.category === selectedCategory);

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: i * 0.07, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <div className="container mx-auto px-4">
      <PageHeader title="Events & Gallery" subtitle="Relive the moments of joy, learning, and community spirit from our diverse events.">
        <Image className="h-16 w-16 text-primary mx-auto mt-4" />
      </PageHeader>

      <SectionWrapper id="event-filters" className="!py-0 mb-10 md:mb-12">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-4 sm:mb-0">Browse Our Events</h2>
          <div className="relative">
            <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-2.5 rounded-lg border border-input bg-background text-sm focus:ring-primary focus:border-primary shadow-sm"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </SectionWrapper>
      
      {filteredEvents.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredEvents.map((event, index) => (
            <motion.custom
              key={event.id}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <EventCard event={event} />
            </motion.custom>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <CalendarHeart className="h-20 w-20 text-primary/50 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-primary mb-2">No Events Found</h3>
          <p className="text-muted-foreground">
            It seems there are no events matching "{selectedCategory}". Try a different category!
          </p>
        </div>
      )}

      <SectionWrapper id="upcoming-events-cta" className="text-center mt-16 md:mt-24 bg-primary/5 rounded-xl py-12 md:py-16">
        <CalendarHeart className="h-12 w-12 text-secondary mx-auto mb-6" />
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Stay Tuned for More!</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          We're always planning new and exciting events. Follow us on social media or subscribe to our newsletter to get the latest updates.
        </p>
        <Button size="lg" asChild className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-lg px-8 py-3 text-base">
          <a href="#footer-newsletter">Subscribe Now</a>
        </Button>
      </SectionWrapper>
    </div>
  );
};

export default EventsGalleryPage;