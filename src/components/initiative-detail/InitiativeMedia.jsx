import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Maximize } from 'lucide-react';

const InitiativeMedia = ({ 
  photos, 
  videos, 
  galleryTitle, 
  title, 
  currentImageIndex, 
  setCurrentImageIndex, 
  currentVideoIndex, 
  setCurrentVideoIndex, 
  openLightbox 
}) => {

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };
  
  const handleNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const handlePrevVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
  };

  return (
    <div className="space-y-6">
      {/* Image Carousel */}
      {photos && photos.length > 0 && (
        <Card className="shadow-xl rounded-xl overflow-hidden bg-muted/30">
          <CardHeader>
              <CardTitle className="text-2xl text-primary">{galleryTitle || "Gallery"}</CardTitle>
          </CardHeader>
          <CardContent>
              <div className="relative group aspect-[16/10] w-full">
                <AnimatePresence initial={false} custom={currentImageIndex}>
                  <motion.img
                    key={currentImageIndex}
                    src={photos[currentImageIndex]}
                    alt={`${title} - Image ${currentImageIndex + 1}`}
                    className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
                    initial={{ opacity: 0, x: currentImageIndex > 0 ? 50 : (currentImageIndex < 0 ? -50 : 0) }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: currentImageIndex > 0 ? -50 : 50 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80'; }}
                  />
                </AnimatePresence>
                {photos.length > 1 && (
                  <>
                    <Button variant="outline" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/70 hover:bg-background text-foreground" onClick={handlePrevImage}>
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/70 hover:bg-background text-foreground" onClick={handleNextImage}>
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </>
                )}
                 <Button variant="ghost" size="icon" className="absolute top-2 right-2 rounded-full bg-black/30 hover:bg-black/50 text-white group-hover:opacity-100 opacity-0 transition-opacity" onClick={() => openLightbox(photos[currentImageIndex])}>
                    <Maximize className="h-5 w-5" />
                 </Button>
              </div>
              {photos.length > 1 && (
                <div className="flex justify-center mt-3 space-x-1.5">
                  {photos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-2 w-2 rounded-full transition-colors ${currentImageIndex === index ? 'bg-primary scale-125' : 'bg-muted-foreground/50 hover:bg-muted-foreground/70'}`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
          </CardContent>
        </Card>
      )}

      {/* Video Section */}
      {videos && videos.length > 0 && (
          <Card className="shadow-xl rounded-xl overflow-hidden bg-muted/30">
              <CardHeader>
                  <CardTitle className="text-2xl text-primary">{videos[currentVideoIndex]?.title || "Watch Our Work"}</CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="relative group aspect-video w-full max-w-3xl mx-auto"> {/* Increased max-width for larger video */}
                       <AnimatePresence initial={false} custom={currentVideoIndex}>
                          <motion.iframe
                              key={`${currentVideoIndex}-${videos[currentVideoIndex]?.url}`}
                              className="absolute inset-0 w-full h-full rounded-lg shadow-lg"
                              src={videos[currentVideoIndex]?.url}
                              title={videos[currentVideoIndex]?.title || "Initiative Video"}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.5 }}
                          />
                      </AnimatePresence>
                      {videos.length > 1 && (
                          <>
                          <Button variant="outline" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/70 hover:bg-background text-foreground" onClick={handlePrevVideo}>
                              <ChevronLeft className="h-5 w-5" />
                          </Button>
                          <Button variant="outline" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/70 hover:bg-background text-foreground" onClick={handleNextVideo}>
                              <ChevronRight className="h-5 w-5" />
                          </Button>
                          </>
                      )}
                  </div>
                  {videos.length > 1 && (
                  <div className="flex justify-center mt-3 space-x-1.5">
                      {videos.map((_, index) => (
                      <button
                          key={index}
                          onClick={() => setCurrentVideoIndex(index)}
                          className={`h-2 w-2 rounded-full transition-colors ${currentVideoIndex === index ? 'bg-primary scale-125' : 'bg-muted-foreground/50 hover:bg-muted-foreground/70'}`}
                          aria-label={`Go to video ${index + 1}`}
                      />
                      ))}
                  </div>
                  )}
              </CardContent>
          </Card>
      )}
    </div>
  );
};

export default InitiativeMedia;