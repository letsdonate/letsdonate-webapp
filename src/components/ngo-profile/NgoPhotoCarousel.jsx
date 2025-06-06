import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Maximize } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DEFAULT_NGO_GALLERY_IMAGE = "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80";

const NgoPhotoCarousel = ({ photos, ngoName, openLightbox }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const galleryPhotos = photos && photos.length > 0 ? photos : [DEFAULT_NGO_GALLERY_IMAGE];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryPhotos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + galleryPhotos.length) % galleryPhotos.length);
  };

  if (!galleryPhotos || galleryPhotos.length === 0) return null;

  return (
    <Card className="shadow-xl bg-card">
      <CardHeader>
        <CardTitle className="text-xl text-primary">Photo Gallery</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative group aspect-[16/10] w-full">
          <AnimatePresence initial={false} custom={currentIndex}>
            <motion.img
              key={currentIndex}
              src={galleryPhotos[currentIndex]}
              alt={`${ngoName} - Image ${currentIndex + 1}`}
              className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
              initial={{ opacity: 0, x: currentIndex > 0 ? 50 : (currentIndex < 0 ? -50 : 0) }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: currentIndex > 0 ? -50 : 50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              onError={(e) => { e.target.src = DEFAULT_NGO_GALLERY_IMAGE; }}
            />
          </AnimatePresence>
          {galleryPhotos.length > 1 && (
            <>
              <Button variant="outline" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/70 hover:bg-background text-foreground" onClick={handlePrev}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/70 hover:bg-background text-foreground" onClick={handleNext}>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}
           <Button variant="ghost" size="icon" className="absolute top-2 right-2 rounded-full bg-black/30 hover:bg-black/50 text-white group-hover:opacity-100 opacity-0 transition-opacity" onClick={() => openLightbox(galleryPhotos[currentIndex])}>
              <Maximize className="h-5 w-5" />
           </Button>
        </div>
        {galleryPhotos.length > 1 && (
          <div className="flex justify-center mt-3 space-x-1.5">
            {galleryPhotos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 rounded-full transition-colors ${currentIndex === index ? 'bg-primary scale-125' : 'bg-muted-foreground/50 hover:bg-muted-foreground/70'}`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NgoPhotoCarousel;