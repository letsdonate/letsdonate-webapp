import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CalendarDays, MapPin, Info, Edit3, Clock, ChevronLeft, HelpCircle, ListChecks, Send } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';
import Lightbox from '@/components/initiative-detail/Lightbox';
import InitiativeMedia from '@/components/initiative-detail/InitiativeMedia';
import EventCard from '@/components/shared/EventCard';

const DEFAULT_EVENT_IMAGE = "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80";
const DEFAULT_EVENT_VIDEO = "https://www.youtube.com/embed/mro5NEfTWNw";

const EventDetailPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [event, setEvent] = useState(null);
  const [relatedEvents, setRelatedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registrationForm, setRegistrationForm] = useState({ name: '', email: '', phone: '' });
  const [isSubmittingRegistration, setIsSubmittingRegistration] = useState(false);
  const [activeTab, setActiveTab] = useState("about");
  const [formErrors, setFormErrors] = useState({});

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState('');

  const fetchEventDetails = useCallback(async () => {
    setLoading(true);
    let data, error;
    const isPlaceholderId = eventId.startsWith('placeholder-') || eventId === 'sample-ongoing-event';

    if (isPlaceholderId) {
      const placeholderModule = await import('@/pages/InitiativesAndEventsPage.jsx');
      const placeholderData = placeholderModule.placeholderEventsData;
      data = placeholderData.find(e => e.id === eventId);
      if (!data) error = { message: 'Placeholder event not found.' };
    } else {
      ({ data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId)
        .single());
    }

    if (error || !data) {
      toast({ title: 'Error fetching event', description: error?.message || 'Event not found.', variant: 'destructive' });
      navigate('/initiatives-events', { replace: true });
      setLoading(false);
      return;
    }
    
    const photos = (data.photos && data.photos.length > 0) ? data.photos : [DEFAULT_EVENT_IMAGE];
    const videos = data.youtube_link ? [{ url: data.youtube_link.includes('/embed/') ? data.youtube_link : `https://www.youtube.com/embed/${data.youtube_link.split('v=')[1]?.split('&')[0] || data.youtube_link.split('/').pop()}`, title: "Event Video" }] : (data.videos || [{url: DEFAULT_EVENT_VIDEO, title: "Event Video"}]);
    setEvent({...data, photos, videos});

    if (data.category && !isPlaceholderId) { 
      const { data: relatedData, error: relatedError } = await supabase
        .from('events')
        .select('*')
        .eq('category', data.category)
        .neq('id', eventId) 
        .order('date', { ascending: true })
        .limit(3);
      if (!relatedError && relatedData) {
        setRelatedEvents(relatedData.map(e => ({
            ...e, type: 'event', photos: e.images && e.images.length > 0 ? e.images : [DEFAULT_EVENT_IMAGE],
            youtube_link: e.youtube_link || DEFAULT_EVENT_VIDEO, status: e.status || 'Upcoming'
        })));
      }
    } else if (isPlaceholderId) {
        const placeholderModule = await import('@/pages/InitiativesAndEventsPage.jsx');
        const allPlaceholders = placeholderModule.placeholderEventsData;
        setRelatedEvents(allPlaceholders.filter(p => p.id !== eventId).slice(0,2));
    }
    setLoading(false);
  }, [eventId, navigate, toast]);

  useEffect(() => {
    fetchEventDetails();
  }, [fetchEventDetails]);

  useEffect(() => {
    if (location.hash === '#event-registration-form' && !loading && event) {
      setActiveTab("register");
      // Ensure the tab content is rendered before scrolling
      requestAnimationFrame(() => {
        setTimeout(() => { // Additional delay for complex DOM updates
          const element = document.getElementById('event-registration-form-section');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 150);
      });
    }
  }, [location.hash, loading, event]);


  const validateRegField = (name, value) => {
    let error = '';
    if (name === "email" && value && !/^\S+@\S+\.\S+$/.test(value)) {
      error = "Invalid email address.";
    }
    if (name === "phone") {
      if (value && !/^\d+$/.test(value)) {
        error = "Phone number must contain only digits.";
      } else if (value && value.length !== 10) {
        error = "Phone number must be 10 digits.";
      }
    }
    setFormErrors(prev => ({ ...prev, [name]: error }));
    return error === '';
  };

  const handleRegistrationChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    if (name === "phone") {
      processedValue = value.replace(/\D/g, '');
      if (processedValue.length > 10) processedValue = processedValue.slice(0, 10);
    }
    setRegistrationForm(prev => ({ ...prev, [name]: processedValue }));
    if (formErrors[name]) {
        validateRegField(name, processedValue);
    }
  };

  const handleRegistrationBlur = (e) => {
    const { name, value } = e.target;
    validateRegField(name, value);
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();

    const currentErrors = {};
    let formIsValid = true;

    if (!registrationForm.name) { currentErrors.name = "Full name is required."; formIsValid = false; }
    if (!registrationForm.email) { currentErrors.email = "Email is required."; formIsValid = false; }
    else if (!/^\S+@\S+\.\S+$/.test(registrationForm.email)) { currentErrors.email = "Invalid email address."; formIsValid = false; }
    
    if (!registrationForm.phone) { currentErrors.phone = "Phone number is required."; formIsValid = false; }
    else if (!/^\d{10}$/.test(registrationForm.phone)) { currentErrors.phone = "Phone number must be 10 digits."; formIsValid = false; }
    
    setFormErrors(currentErrors);

    if (!formIsValid) {
        toast({ title: "Validation Error", description: "Please correct the errors in the form.", variant: "destructive" });
        return;
    }

    setIsSubmittingRegistration(true);

    const { error: dbError } = await supabase
      .from('event_registrations')
      .insert([{ 
        event_id: event.id, 
        name: registrationForm.name, 
        email: registrationForm.email, 
        phone: registrationForm.phone 
      }]);

    if (dbError) {
      toast({ title: "Registration Error", description: dbError.message, variant: "destructive" });
    } else {
      toast({
        title: "Registered Successfully! 🎉",
        description: `Thank you, ${registrationForm.name}! You're registered for ${event.title}.`,
        className: "bg-primary text-primary-foreground",
      });
      setRegistrationForm({ name: '', email: '', phone: '' });
      setFormErrors({});
    }
    setIsSubmittingRegistration(false);
  };

  const openLightbox = (imageSrc) => { setLightboxImage(imageSrc); setLightboxOpen(true); };
  const closeLightbox = () => { setLightboxOpen(false); };
  
  const getStatusBadgeClasses = (status) => {
    switch (status?.toLowerCase()) {
      case 'ongoing': return 'bg-green-100 text-green-800 border-green-300';
      case 'upcoming': case 'to start': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'past': case 'done': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'future': return 'bg-teal-100 text-teal-800 border-teal-300';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen text-xl text-muted-foreground">Loading event details...</div>;
  if (!event) return <div className="flex justify-center items-center h-screen text-xl text-muted-foreground">Event not found.</div>;
  
  const formattedDate = event.date ? new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Date TBD';

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title={event.title} subtitle="Join us for this exciting event!">
        <CalendarDays className="h-16 w-16 text-primary mx-auto mt-4" />
      </PageHeader>

      <SectionWrapper id="event-main-content" className="mb-12">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <InitiativeMedia
              photos={event.photos || [DEFAULT_EVENT_IMAGE]} videos={event.videos || []} galleryTitle="Event Gallery"
              title={event.title} currentImageIndex={currentImageIndex} setCurrentImageIndex={setCurrentImageIndex}
              currentVideoIndex={currentVideoIndex} setCurrentVideoIndex={setCurrentVideoIndex} openLightbox={openLightbox}
            />
          </div>
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-xl rounded-xl overflow-hidden bg-card border-border/50">
              <CardHeader className="bg-primary/5 p-6">
                <CardTitle className="text-2xl font-bold text-primary">{event.title}</CardTitle>
                {event.category && (<Badge variant="secondary" className="mt-2 text-sm py-1 px-3">{event.category}</Badge>)}
                {event.status && (<Badge variant="outline" className={`mt-2 text-sm py-1 px-3 font-medium ${getStatusBadgeClasses(event.status)}`}><Clock className="h-4 w-4 mr-1.5" /> Status: {event.status}</Badge>)}
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div><h4 className="text-md font-semibold text-foreground mb-1 flex items-center"><CalendarDays className="h-5 w-5 mr-2 text-secondary" />Date & Time</h4><p className="text-muted-foreground">{formattedDate}</p></div>
                <div><h4 className="text-md font-semibold text-foreground mb-1 flex items-center"><MapPin className="h-5 w-5 mr-2 text-secondary" />Location</h4><p className="text-muted-foreground">{event.location || 'To be announced'}</p></div>
                {event.registration_link && event.registration_link.startsWith('http') ? (
                  <Button asChild size="lg" className="w-full mt-6 bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 transition-opacity">
                    <a href={event.registration_link} target="_blank" rel="noopener noreferrer"><Edit3 className="h-5 w-5 mr-2" /> Register (External)</a>
                  </Button>
                ) : (
                  <Button onClick={() => { setActiveTab("register"); navigate(`#event-registration-form`); }} size="lg" className="w-full mt-6 bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 transition-opacity">
                    <Edit3 className="h-5 w-5 mr-2" /> Register Here
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </SectionWrapper>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-12">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2 bg-muted p-1 rounded-lg mb-6">
          <TabsTrigger value="about" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><Info className="inline h-4 w-4 mr-1.5"/>About</TabsTrigger>
          <TabsTrigger value="register" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><Edit3 className="inline h-4 w-4 mr-1.5"/>Register</TabsTrigger>
          <TabsTrigger value="contact" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><HelpCircle className="inline h-4 w-4 mr-1.5"/>Contact</TabsTrigger>
          {relatedEvents.length > 0 && <TabsTrigger value="related" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><ListChecks className="inline h-4 w-4 mr-1.5"/>Related</TabsTrigger>}
        </TabsList>
        <TabsContent value="about">
          <Card className="shadow-md rounded-xl"><CardHeader><CardTitle className="text-xl text-primary">About The Event</CardTitle></CardHeader>
            <CardContent className="text-muted-foreground prose prose-lg max-w-none"><p>{event.description || "More details about this event will be available soon. Stay tuned!"}</p></CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="register" id="event-registration-form-section">
          <Card className="shadow-md rounded-xl"><CardHeader><CardTitle className="text-xl text-primary">Register for {event.title}</CardTitle><CardDescription>Fill out the form below to secure your spot.</CardDescription></CardHeader>
            <CardContent>
              <form onSubmit={handleRegistrationSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="reg-name">Full Name <span className="text-destructive">*</span></Label>
                  <Input id="reg-name" name="name" value={registrationForm.name} onChange={handleRegistrationChange} placeholder="Your Full Name" required className={`mt-1 ${formErrors.name ? 'border-destructive' : ''}`}/>
                  {formErrors.name && <p className="text-xs text-destructive mt-1">{formErrors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="reg-email">Email Address <span className="text-destructive">*</span></Label>
                  <Input id="reg-email" name="email" type="email" value={registrationForm.email} onChange={handleRegistrationChange} onBlur={handleRegistrationBlur} placeholder="your.email@example.com" required className={`mt-1 ${formErrors.email ? 'border-destructive' : ''}`}/>
                  {formErrors.email && <p className="text-xs text-destructive mt-1">{formErrors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="reg-phone">Phone Number <span className="text-destructive">*</span></Label>
                  <Input id="reg-phone" name="phone" type="tel" value={registrationForm.phone} onChange={handleRegistrationChange} onBlur={handleRegistrationBlur} placeholder="Your 10-digit Phone Number" required maxLength="10" className={`mt-1 ${formErrors.phone ? 'border-destructive' : ''}`}/>
                  {formErrors.phone && <p className="text-xs text-destructive mt-1">{formErrors.phone}</p>}
                </div>
                <Button type="submit" size="lg" className="w-full" disabled={isSubmittingRegistration}><Send className="h-5 w-5 mr-2"/>{isSubmittingRegistration ? 'Submitting...' : 'Confirm Registration'}</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="contact">
          <Card className="shadow-md rounded-xl"><CardHeader><CardTitle className="text-xl text-primary">Event Organizer Contact</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
              {event.contact_person && <p><strong>Contact Person:</strong> {event.contact_person}</p>}
              {event.contact_email && <p><strong>Email:</strong> <a href={`mailto:${event.contact_email}`} className="text-primary hover:underline">{event.contact_email}</a></p>}
              {!event.contact_person && !event.contact_email && <p>Contact information not available. For general inquiries, please <Link to="/about-us#contact-us-section" className="text-primary hover:underline">contact us</Link>.</p>}
            </CardContent>
          </Card>
        </TabsContent>
        {relatedEvents.length > 0 && (
          <TabsContent value="related">
            <Card className="shadow-md rounded-xl"><CardHeader><CardTitle className="text-xl text-primary">Related Events & Opportunities</CardTitle></CardHeader>
              <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedEvents.map((relEvent, index) => (<EventCard key={relEvent.id || `rel-event-${index}`} event={relEvent} index={index} />))}
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>

      <Lightbox isOpen={lightboxOpen} imageSrc={lightboxImage} onClose={closeLightbox} />
      <div className="mt-12 text-center">
        <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
          <Link to="/initiatives-events"><ChevronLeft className="h-4 w-4 mr-2" />Back to All Initiatives & Events</Link>
        </Button>
      </div>
    </div>
  );
};

export default EventDetailPage;