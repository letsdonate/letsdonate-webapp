import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, MapPin, PlayCircle, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EventCard = ({ event }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (event.photos?.length || 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + (event.photos?.length || 1)) % (event.photos?.length || 1));
  };

  const slideVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <Card className="rounded-xl shadow-soft hover:shadow-soft-hover transition-shadow duration-300 overflow-hidden flex flex-col h-full bg-card">
      <CardHeader className="p-5 md:p-6">
        <CardTitle className="text-2xl text-primary font-heading">{event.title}</CardTitle>
        <div className="flex items-center text-xs text-muted-foreground space-x-3 mt-1">
          <span className="flex items-center"><CalendarDays className="h-3.5 w-3.5 mr-1.5 text-secondary" /> {event.date}</span>
          <span className="flex items-center"><MapPin className="h-3.5 w-3.5 mr-1.5 text-secondary" /> {event.location}</span>
        </div>
      </CardHeader>
      
      <CardContent className="p-5 md:p-6 flex-grow">
        <CardDescription className="text-sm text-foreground/80 mb-4 leading-relaxed">{event.description}</CardDescription>
        
        {event.photos && event.photos.length > 0 && (
          <div className="relative aspect-video rounded-lg overflow-hidden mb-4 shadow-inner">
            <AnimatePresence initial={false} custom={currentImageIndex}>
              <motion.img
                key={currentImageIndex}
                src={event.photos[currentImageIndex]}
                alt={`${event.title} - photo ${currentImageIndex + 1}`}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={slideVariants}
                transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            {event.photos.length > 1 && (
              <>
                <Button variant="ghost" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full h-8 w-8" onClick={prevImage}>
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full h-8 w-8" onClick={nextImage}>
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </>
            )}
            <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-md">
              {currentImageIndex + 1} / {event.photos.length}
            </div>
          </div>
        )}
        
        {(!event.photos || event.photos.length === 0) && (
          <div className="relative aspect-video rounded-lg overflow-hidden mb-4 shadow-inner bg-muted/50 flex flex-col items-center justify-center">
            <ImageIcon className="h-12 w-12 text-muted-foreground/50 mb-2" />
            <p className="text-sm text-muted-foreground">Event Photos Coming Soon</p>
          </div>
        )}

        {event.videoUrl && (
          <div className="aspect-video rounded-lg overflow-hidden shadow-inner">
            <iframe
              width="100%"
              height="100%"
              src={event.videoUrl.replace("watch?v=", "embed/")}
              title={`${event.title} video highlights`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="border-0"
            ></iframe>
          </div>
        )}
        {!event.videoUrl && (
           <div className="aspect-video rounded-lg overflow-hidden shadow-inner bg-muted/50 flex flex-col items-center justify-center">
            <PlayCircle className="h-12 w-12 text-muted-foreground/50 mb-2" />
            <p className="text-sm text-muted-foreground">Event Video Coming Soon</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-5 md:p-6 border-t border-border/40">
        <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10 hover:text-primary rounded-lg">
          Learn More
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;