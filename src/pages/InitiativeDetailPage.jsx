import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, PlayCircle, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { staticInitiativesData } from '@/data/initiativesData';

const InitiativeDetailPage = () => {
  const { initiativeId } = useParams();
  const initiative = staticInitiativesData.find(i => i.id === initiativeId);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  if (!initiative) {
    return <Navigate to="/404" replace />;
  }

  const photos = initiative.photos || [];
  const videoUrl = initiative.youtubeLink;

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (photos.length || 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + (photos.length || 1)) % (photos.length || 1));
  };
  
  const slideVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  };

  return (
    <div className="container mx-auto px-4">
      <PageHeader title={initiative.title} subtitle={initiative.subtitle || "Detailed view of our impactful initiative."}>
        {initiative.icon ? React.cloneElement(initiative.icon, { className: "h-16 w-16 text-primary mx-auto mt-4" }) : null}
      </PageHeader>

      <SectionWrapper className={`!pt-0 ${initiative.themeColor || 'bg-card/50'} rounded-xl`}>
        <Card className="shadow-xl overflow-hidden bg-background">
          <CardContent className="p-6 md:p-8">
            <motion.div 
              initial={{ opacity:0 }} 
              animate={{ opacity:1 }} 
              transition={{ delay: 0.2, duration: 0.8}}
              className="mb-8"
            >
              <CardTitle className="text-3xl md:text-4xl text-primary font-heading mb-4">{initiative.title}</CardTitle>
              <CardDescription className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {initiative.description}
              </CardDescription>
            </motion.div>

            {photos && photos.length > 0 && (
              <div className="relative aspect-video rounded-lg overflow-hidden mb-6 shadow-lg">
                <AnimatePresence initial={false} custom={currentImageIndex}>
                  <motion.div
                    key={currentImageIndex}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={slideVariants}
                    transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img 
                      src={photos[currentImageIndex]}
                      alt={`${initiative.title} - photo ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                     src="https://images.unsplash.com/photo-1644566858654-1534e217d046" />
                  </motion.div>
                </AnimatePresence>
                {photos.length > 1 && (
                  <>
                    <Button variant="ghost" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full h-10 w-10" onClick={prevImage}>
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full h-10 w-10" onClick={nextImage}>
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </>
                )}
                <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1.5 rounded-full">
                  {currentImageIndex + 1} / {photos.length}
                </div>
              </div>
            )}
            {(!photos || photos.length === 0) && (
              <div className="relative aspect-video rounded-lg overflow-hidden mb-6 shadow-inner bg-muted/50 flex flex-col items-center justify-center">
                <ImageIcon className="h-16 w-16 text-muted-foreground/40 mb-2" />
                <p className="text-muted-foreground">Photos for this initiative are coming soon!</p>
              </div>
            )}

            {videoUrl && (
              <div className="aspect-video rounded-lg overflow-hidden shadow-lg mb-8">
                <iframe
                  width="100%"
                  height="100%"
                  src={videoUrl.includes("embed") ? videoUrl : videoUrl.replace("watch?v=", "embed/")}
                  title={`${initiative.title} video highlights`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="border-0"
                ></iframe>
              </div>
            )}
             {!videoUrl && photos && photos.length > 0 && ( // Show video placeholder only if there are photos but no video
                <div className="aspect-video rounded-lg overflow-hidden shadow-inner bg-muted/50 flex flex-col items-center justify-center mb-8">
                    <PlayCircle className="h-16 w-16 text-muted-foreground/40 mb-2" />
                    <p className="text-muted-foreground">Video coming soon!</p>
                </div>
            )}


            <div className="space-y-8">
              {initiative.sections.map((section, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="p-4 rounded-lg bg-card/50 border border-border/50"
                >
                  <h3 className="text-xl md:text-2xl font-semibold text-primary mb-3 flex items-center">
                    {section.icon ? React.cloneElement(section.icon, { className: "mr-3 h-7 w-7" }) : null}
                    {section.title}
                  </h3>
                  <ul className="list-none space-y-1.5 text-muted-foreground pl-1">
                    {section.content.map((item, idx) => (
                      <li key={idx} className="leading-relaxed flex items-start">
                        <span className="text-primary mr-2 mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </SectionWrapper>

      <SectionWrapper className="text-center py-10">
        <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10 hover:text-primary rounded-lg">
          <Link to="/initiatives-events" className="flex items-center">
            <ArrowLeft className="h-5 w-5 mr-2" /> Back to All Initiatives & Events
          </Link>
        </Button>
      </SectionWrapper>
    </div>
  );
};

export default InitiativeDetailPage;