import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Globe, Instagram, MapPin, Target, Sparkles, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { staticNgoData } from '@/data/staticNgoData';
import Lightbox from '@/components/initiative-detail/Lightbox'; 
import NgoPhotoCarousel from '@/components/ngo-profile/NgoPhotoCarousel';
import NgoVolunteerForm from '@/components/ngo-profile/NgoVolunteerForm';

const DEFAULT_NGO_LOGO = "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&w=300&q=60";
const DEFAULT_NGO_GALLERY_IMAGE = "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80";

const NgoProfilePage = () => {
  const { slug } = useParams();
  const [ngo, setNgo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState('');

  const openLightbox = (imageSrc) => { setLightboxImage(imageSrc); setLightboxOpen(true); };
  const closeLightbox = () => { setLightboxOpen(false); };

  const fetchNgoData = useCallback(async () => {
    setLoading(true);
    let foundNgo = null;
    
    const { data: dbData, error: dbError } = await supabase
      .from('ngo_profiles')
      .select('*')
      .eq('slug', slug)
      .single();

    if (dbData) {
      foundNgo = {...dbData, logo_url: dbData.logo_url || DEFAULT_NGO_LOGO, photos: dbData.photos || [DEFAULT_NGO_GALLERY_IMAGE]};
    } else {
      const staticMatch = staticNgoData.find(n => n.slug === slug);
      if (staticMatch) {
        foundNgo = {...staticMatch, logo_url: staticMatch.logo_url || DEFAULT_NGO_LOGO, photos: staticMatch.photos || [DEFAULT_NGO_GALLERY_IMAGE]};
      } else if (dbError && dbError.code !== 'PGRST116') { 
        toast({ title: 'Error Fetching NGO Profile', description: dbError.message, variant: 'destructive' });
      }
    }
    
    if (!foundNgo && !dbError?.message.includes("JSON object requested, multiple (or no) rows returned")) { // Avoid toast if it's just "no rows"
        toast({ title: 'NGO Not Found', description: 'The requested NGO profile could not be found.', variant: 'default' });
    }
    setNgo(foundNgo);
    setLoading(false);
  }, [slug, toast]);

  useEffect(() => {
    fetchNgoData();
  }, [fetchNgoData]);


  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
        <p className="text-muted-foreground">Loading NGO profile...</p>
      </div>
    );
  }

  if (!ngo) {
    return <Navigate to="/ngo-network" replace />;
  }

  return (
    <div className="container mx-auto px-4">
      <PageHeader title={ngo.name} subtitle={ngo.short_description || "Making a difference in our community."}>
        <img 
          src={ngo.logo_url} 
          alt={`${ngo.name} logo`} 
          className="h-20 w-20 object-contain rounded-full mx-auto mt-4 border-2 border-primary p-1 shadow-md"
          onError={(e) => { e.target.src = DEFAULT_NGO_LOGO; }}
        />
      </PageHeader>

      <SectionWrapper className="!pt-0">
        <div className="grid lg:grid-cols-3 gap-8 items-start"> {/* Added items-start for alignment */}
          <motion.div 
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <NgoPhotoCarousel photos={ngo.photos} ngoName={ngo.name} openLightbox={openLightbox} />

            <Card className="shadow-xl bg-card">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">About {ngo.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{ngo.full_description || 'Detailed description coming soon.'}</p>
              </CardContent>
            </Card>

            {ngo.mission && (
              <Card className="shadow-xl bg-card">
                <CardHeader>
                  <CardTitle className="text-xl text-primary flex items-center"><Target className="mr-2 h-5 w-5"/>Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{ngo.mission}</p>
                </CardContent>
              </Card>
            )}

            {ngo.impact_highlights && ngo.impact_highlights.length > 0 && (
              <Card className="shadow-xl bg-card">
                <CardHeader>
                  <CardTitle className="text-xl text-primary flex items-center"><Sparkles className="mr-2 h-5 w-5"/>Impact Highlights</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {ngo.impact_highlights.map((highlight, index) => (
                      <li key={index}>{typeof highlight === 'string' ? highlight : highlight.text}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </motion.div>

          {/* Sticky Column Wrapper */}
          <div className="lg:col-span-1">
            <motion.div 
              className="sticky top-24 space-y-6" // This div will be sticky
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="shadow-xl bg-card">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Connect & Support</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {ngo.website_url && ngo.website_url !== '#' && (
                    <Button asChild variant="outline" className="w-full">
                      <a href={ngo.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        <Globe className="mr-2 h-4 w-4"/> Visit Website
                      </a>
                    </Button>
                  )}
                  {ngo.instagram_handle && (
                    <Button asChild variant="outline" className="w-full">
                      <a href={`https://instagram.com/${ngo.instagram_handle}`} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        <Instagram className="mr-2 h-4 w-4"/> Follow on Instagram
                      </a>
                    </Button>
                  )}
                  {ngo.work_area && (
                    <p className="text-sm text-muted-foreground flex items-center"><MapPin className="mr-2 h-4 w-4 text-secondary"/>Works in: {ngo.work_area}</p>
                  )}
                  {ngo.tags && ngo.tags.length > 0 && (
                    <div className="pt-2">
                      <p className="text-sm font-medium text-muted-foreground mb-1.5">Focus Areas:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {ngo.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              <NgoVolunteerForm ngo={ngo} />
            </motion.div>
          </div>
        </div>
      </SectionWrapper>
      
      <Lightbox isOpen={lightboxOpen} imageSrc={lightboxImage} onClose={closeLightbox} />

      <SectionWrapper className="text-center py-10">
        <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
          <Link to="/ngo-network" className="flex items-center">
            <ArrowLeft className="h-5 w-5 mr-2" /> Back to NGO Network
          </Link>
        </Button>
      </SectionWrapper>
    </div>
  );
};

export default NgoProfilePage;