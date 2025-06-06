import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getInitiativeById } from '@/data/initiativesData';
import PageHeader from '@/components/shared/PageHeader';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import InitiativeMedia from '@/components/initiative-detail/InitiativeMedia';
import InitiativeInfoCard from '@/components/initiative-detail/InitiativeInfoCard';
import Lightbox from '@/components/initiative-detail/Lightbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { motion } from 'framer-motion';

const InitiativeDetailPage = () => {
  const { initiativeId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [initiative, setInitiative] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState('');

  useEffect(() => {
    const foundInitiative = getInitiativeById(initiativeId);
    if (foundInitiative) {
      const photos = (foundInitiative.photos && foundInitiative.photos.length > 0)
        ? foundInitiative.photos
        : ["https://images.unsplash.com/photo-1509099652299-50548aca6335?auto=format&fit=crop&w=1200&q=80"];
      
      const videos = (foundInitiative.videos && foundInitiative.videos.length > 0)
        ? foundInitiative.videos.map(video => ({
            ...video,
            url: video.url.includes('/embed/') ? video.url : `https://www.youtube.com/embed/${video.url.split('v=')[1]?.split('&')[0] || video.url.split('/').pop()}`
          }))
        : [{ url: "https://www.youtube.com/embed/mro5NEfTWNw", title: "Discover Our Work" }];
      
      let finalYoutubeLink = foundInitiative.youtubeLink;
      if (finalYoutubeLink && !finalYoutubeLink.includes('/embed/')) {
        finalYoutubeLink = `https://www.youtube.com/embed/${finalYoutubeLink.split('v=')[1]?.split('&')[0] || finalYoutubeLink.split('/').pop()}`;
      }

      let finalPhotos = [...photos];
      if (foundInitiative.id === 'lets-summer' && finalPhotos.length > 0 && finalPhotos.length < 3) {
        const firstImage = finalPhotos[0];
        while (finalPhotos.length < 3) {
          finalPhotos.push(firstImage);
        }
      } else if (finalPhotos.length === 0 ) {
        finalPhotos.push("https://images.unsplash.com/photo-1509099652299-50548aca6335?auto=format&fit=crop&w=1200&q=80");
      }
      
      setInitiative({ ...foundInitiative, photos: finalPhotos, videos, youtubeLink: finalYoutubeLink });
      setCurrentImageIndex(0); 
      setCurrentVideoIndex(0); 
    } else {
      toast({
        title: "Initiative Not Found",
        description: `The initiative with ID "${initiativeId}" could not be found. Redirecting...`,
        variant: "destructive",
        duration: 3000,
      });
      setTimeout(() => navigate('/initiatives-events', { replace: true }), 3000);
    }
  }, [initiativeId, navigate, toast]);

  const openLightbox = (imageSrc) => {
    setLightboxImage(imageSrc);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  if (!initiative) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-muted-foreground">Loading initiative details...</div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader 
        title={initiative.title}
        subtitle={initiative.tagline || initiative.shortDescription}
      >
        {initiative.icon && React.cloneElement(initiative.icon, { className: "h-16 w-16 text-primary mx-auto mt-4" })}
      </PageHeader>

      <SectionWrapper id="initiative-overview" className="mb-12">
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-3">
             <InitiativeMedia
              photos={initiative.photos}
              videos={initiative.videos}
              galleryTitle={initiative.galleryTitle}
              title={initiative.title}
              currentImageIndex={currentImageIndex}
              setCurrentImageIndex={setCurrentImageIndex}
              currentVideoIndex={currentVideoIndex}
              setCurrentVideoIndex={setCurrentVideoIndex}
              openLightbox={openLightbox}
            />
          </div>
          <div className="lg:col-span-2">
            {/* Pass showFullDescriptionInsteadOfTabs={true} to integrate description */}
            <InitiativeInfoCard initiative={initiative} showFullDescriptionInsteadOfTabs={true} />
          </div>
        </div>
      </SectionWrapper>

      {initiative.testimonials && initiative.testimonials.length > 0 && (
         <SectionWrapper id="testimonials" className="mb-12">
            <Card className="shadow-md rounded-xl bg-background">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Voices of Impact: {initiative.title}</CardTitle>
                <CardDescription>Hear from those who've experienced this initiative firsthand.</CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6">
                {initiative.testimonials.map((testimonial, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Card className="p-5 rounded-lg border border-border bg-card text-sm">
                      <blockquote className="italic text-muted-foreground">"{testimonial.quote}"</blockquote>
                      <p className="text-right font-semibold mt-2 text-foreground">- {testimonial.author}, <span className="text-xs text-muted-foreground">{testimonial.location}</span></p>
                    </Card>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
         </SectionWrapper>
      )}

      <Lightbox
        isOpen={lightboxOpen}
        imageSrc={lightboxImage}
        onClose={closeLightbox}
      />

      <div className="mt-12 text-center">
        <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
          <Link to="/initiatives-events">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to All Initiatives & Events
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default InitiativeDetailPage;