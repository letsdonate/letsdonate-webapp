import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HeartHandshake as Handshake, Users, ExternalLink, Loader2, AlertTriangle, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'; // Added Label import
import { staticNgoData } from '@/data/staticNgoData'; // Fallback data

const NgoNetworkPage = () => {
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const { toast } = useToast();

  const fetchNgos = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('ngo_profiles')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      toast({ title: 'Error Fetching NGOs', description: error.message, variant: 'destructive' });
      setNgos(staticNgoData); // Use static data as fallback
    } else {
      setNgos(data.length > 0 ? data : staticNgoData); // Use static if DB is empty
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    fetchNgos();
  }, [fetchNgos]);

  const allTags = [...new Set(ngos.flatMap(ngo => ngo.tags || []))];

  const handleTagToggle = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const filteredNgos = ngos.filter(ngo => {
    const matchesSearchTerm = ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              (ngo.short_description && ngo.short_description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                              (ngo.work_area && ngo.work_area.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTags = selectedTags.length === 0 || (ngo.tags && selectedTags.every(tag => ngo.tags.includes(tag)));
    return matchesSearchTerm && matchesTags;
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

  return (
    <div className="container mx-auto px-4">
      <PageHeader 
        title="NGO Network" 
        subtitle="Discover and connect with other organizations making a difference in our community and beyond."
      >
        <Handshake className="h-16 w-16 text-primary mx-auto mt-4" />
      </PageHeader>

      <SectionWrapper id="ngo-filters" className="!py-8">
        <div className="grid md:grid-cols-2 gap-6 mb-8 items-end">
          <div>
            <Label htmlFor="search-ngo" className="text-sm font-medium text-muted-foreground">Search NGOs</Label>
            <div className="relative mt-1">
              <Input 
                id="search-ngo"
                type="text"
                placeholder="Search by name, description, area..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-lg"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium text-muted-foreground block mb-1">Filter by Tags</Label>
            {allTags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <Button 
                    key={tag} 
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleTagToggle(tag)}
                    className="rounded-full text-xs"
                  >
                    {tag}
                  </Button>
                ))}
                {selectedTags.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={() => setSelectedTags([])} className="text-xs text-destructive hover:text-destructive">Clear Filters</Button>
                )}
              </div>
            ) : <p className="text-sm text-muted-foreground">No tags available for filtering.</p>}
          </div>
        </div>
      </SectionWrapper>

      {loading && (
        <div className="text-center py-12">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading NGO profiles...</p>
        </div>
      )}

      {!loading && filteredNgos.length === 0 && (
        <SectionWrapper>
          <div className="text-center py-12">
            <AlertTriangle className="h-16 w-16 text-primary/30 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-primary mb-2">No NGOs Found</h3>
            <p className="text-muted-foreground">
              No NGOs match your current search or filter criteria. Try adjusting your search or check back later.
            </p>
          </div>
        </SectionWrapper>
      )}

      {!loading && filteredNgos.length > 0 && (
        <SectionWrapper id="ngo-listing" className="!pt-0">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredNgos.map((ngo, index) => (
              <motion.custom
                key={ngo.id || ngo.slug}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className="h-full"
              >
                <Card className="rounded-xl shadow-soft hover:shadow-soft-hover transition-shadow duration-300 overflow-hidden flex flex-col h-full bg-card">
                  <CardHeader className="p-5 md:p-6 items-center text-center">
                    <img 
                      src={ngo.logo_url || '/images/ngos/default-ngo-logo.png'} 
                      alt={`${ngo.name} logo`} 
                      className="h-20 w-20 object-contain rounded-full mx-auto mb-4 border-2 border-primary/20 p-1"
                    />
                    <CardTitle className="text-xl md:text-2xl text-primary font-heading">{ngo.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 md:p-6 flex-grow">
                    <CardDescription className="text-sm text-foreground/80 mb-3 leading-relaxed line-clamp-3">
                      {ngo.short_description || 'More details coming soon.'}
                    </CardDescription>
                    {ngo.tags && ngo.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {ngo.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="p-5 md:p-6 border-t border-border/40">
                    <Button variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary rounded-lg" asChild>
                      <Link to={`/ngo-network/${ngo.slug}`}>View Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.custom>
            ))}
          </div>
        </SectionWrapper>
      )}
    </div>
  );
};

export default NgoNetworkPage;