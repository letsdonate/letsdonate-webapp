import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Globe, Instagram, Mail, Phone, MapPin, Users, Target, Sparkles, Loader2, AlertTriangle, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { staticNgoData } from '@/data/staticNgoData'; // Fallback data

const NgoProfilePage = () => {
  const { slug } = useParams();
  const [ngo, setNgo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchNgoData = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('ngo_profiles')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
      toast({ title: 'Error Fetching NGO Profile', description: error.message, variant: 'destructive' });
      // Try finding in static data as fallback
      const staticMatch = staticNgoData.find(n => n.slug === slug);
      setNgo(staticMatch || null);
    } else if (data) {
      setNgo(data);
    } else {
      // No data from DB, try static
      const staticMatch = staticNgoData.find(n => n.slug === slug);
      setNgo(staticMatch || null);
      if (!staticMatch) {
        toast({ title: 'NGO Not Found', description: 'The requested NGO profile could not be found.', variant: 'default' });
      }
    }
    setLoading(false);
  }, [slug, toast]);

  useEffect(() => {
    fetchNgoData();
  }, [fetchNgoData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ngo || !ngo.id) {
        toast({ title: "Error", description: "NGO profile ID is missing.", variant: "destructive" });
        return;
    }
    if (!formData.name || !formData.email) {
      toast({ title: "Incomplete Form", description: "Please fill in your Name and Email.", variant: "destructive" });
      return;
    }
    if (!/\S+@\S+\.\S+$/.test(formData.email)) {
      toast({ title: "Invalid Email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    
    const { error } = await supabase
      .from('ngo_interest_requests')
      .insert([{ 
        ngo_profile_id: ngo.id,
        name: formData.name, 
        email: formData.email, 
        city: formData.city,
        phone: formData.phone,
        message: formData.message
      }]);

    setIsSubmitting(false);
    if (error) {
      toast({ title: "Submission Error", description: error.message, variant: "destructive" });
    } else {
      toast({
        title: "Message Sent! 👍",
        description: `Thank you, ${formData.name}! Your message has been forwarded to ${ngo.name}.`,
        className: "bg-primary text-primary-foreground",
        duration: 7000
      });
      setFormData({ name: '', email: '', city: '', phone: '', message: '' });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
        <p className="text-muted-foreground">Loading NGO profile...</p>
      </div>
    );
  }

  if (!ngo) {
    return <Navigate to="/ngo-network" replace />; // Or a specific 404 for NGOs
  }

  return (
    <div className="container mx-auto px-4">
      <PageHeader title={ngo.name} subtitle={ngo.short_description || "Making a difference in our community."}>
        <img 
          src={ngo.logo_url || '/images/ngos/default-ngo-logo.png'} 
          alt={`${ngo.name} logo`} 
          className="h-20 w-20 object-contain rounded-full mx-auto mt-4 border-2 border-primary p-1 shadow-md"
        />
      </PageHeader>

      <SectionWrapper className="!pt-0">
        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div 
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
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

          <motion.div 
            className="lg:col-span-1 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="shadow-xl bg-card">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Connect & Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {ngo.website_url && (
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

            <Card className="shadow-xl bg-card">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Contact {ngo.name}</CardTitle>
                <CardDescription>Interested in volunteering or have a query? Reach out directly.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="profile-contact-name">Your Name <span className="text-destructive">*</span></Label>
                    <Input id="profile-contact-name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Full Name" required className="mt-1"/>
                  </div>
                  <div>
                    <Label htmlFor="profile-contact-email">Your Email <span className="text-destructive">*</span></Label>
                    <Input id="profile-contact-email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Email Address" required className="mt-1"/>
                  </div>
                  <div>
                    <Label htmlFor="profile-contact-city">City (Optional)</Label>
                    <Input id="profile-contact-city" name="city" value={formData.city} onChange={handleInputChange} placeholder="Your City" className="mt-1"/>
                  </div>
                  <div>
                    <Label htmlFor="profile-contact-phone">Phone (Optional)</Label>
                    <Input id="profile-contact-phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="Phone Number" className="mt-1"/>
                  </div>
                  <div>
                    <Label htmlFor="profile-contact-message">Message (Optional)</Label>
                    <Textarea id="profile-contact-message" name="message" value={formData.message} onChange={handleInputChange} placeholder="Your message or query..." className="mt-1" rows={3}/>
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary-soft" disabled={isSubmitting}>
                    <Send className="mr-2 h-4 w-4"/> {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </SectionWrapper>

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