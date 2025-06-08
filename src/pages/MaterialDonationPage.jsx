import React, { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea'; 
import { Gift, BookOpen, Shirt, ToyBrick, MapPin, CheckCircle, Apple, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';

const neededMaterialsEvents = [
  {
    id: 1,
    title: "Let's Prepare – Exam Readiness Drive",
    location: 'Government Schools Across Raipur',
    imagePlaceholder: 'https://dl.dropboxusercontent.com/scl/fi/m89bvxo8vhacobg4wjr1g/6dcbb986-4f5b-4635-b21a-47d12e53fc83.JPG?rlkey=xctzaie44z1scw02fywud8uxl&raw=1',
    requirements: [
      { item: 'Books for 8th Class Scholarship Exam', icon: <BookOpen className="h-5 w-5 text-primary" /> },
      { item: 'Notebooks & Xerox Material', icon: <BookOpen className="h-5 w-5 text-primary" /> },
      { item: 'Gifts for Exam Toppers', icon: <Gift className="h-5 w-5 text-primary" /> },
    ]
  },
  {
    id: 2,
    title: "Let's Read – Reading & Support Drive",
    location: 'Orphanages and Government Schools in Raipur',
    imagePlaceholder: 'https://dl.dropboxusercontent.com/scl/fi/kmojn9i9atz39hptvpev2/IMG_3447-min.jpg?rlkey=5alnupqbgh1v92ubv43xpp8xd&st=mdylnzpb&raw=1',
    requirements: [
      { item: 'Story Books (Hindi & English)', icon: <BookOpen className="h-5 w-5 text-primary" /> },
      { item: 'Stationery (Pens, Pencils, Crayons)', icon: <BookOpen className="h-5 w-5 text-primary" /> },
      { item: 'Snacks & Meals for Children', icon: <Apple className="h-5 w-5 text-primary" /> },
      { item: 'Support for Regular Classes', icon: <UserCheck className="h-5 w-5 text-primary" /> },
    ]
  }
];

const dropOffLocations = [
  { name: "Ekta Nagar Drop-off", address: "Ekta Nagar, Raipur, Chhattisgarh", hours: "Sun, 11 AM - 2 PM" },
  { name: "Sadar Bazar Drop-off", address: "Sadar Bazar, Raipur, Chhattisgarh", hours: "Sun, 11 AM - 2 PM" },
];


const MaterialDonationPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    items: '',
    preferredLocation: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!formData.name || !formData.email || !formData.items || !formData.phone) {
      toast({ title: "Incomplete Form", description: "Please fill in your name, email, phone, and items to donate.", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }
     if (!/\S+@\S+\.\S+$/.test(formData.email)) {
      toast({ title: "Invalid Email", description: "Please enter a valid email address.", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }
    if (!/^\d{10,}$/.test(formData.phone.replace(/\s+/g, ''))) {
      toast({ title: "Invalid Phone Number", description: "Please enter a valid 10-digit phone number.", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }
    
    const { data, error } = await supabase
      .from('material_donations')
      .insert([
        { 
          name: formData.name, 
          email: formData.email, 
          phone: formData.phone,
          items: formData.items,
          preferred_location: formData.preferredLocation,
          message: formData.message
        }
      ]);
    
    setIsSubmitting(false);
    if (error) {
      toast({ title: "Submission Error", description: error.message, variant: "destructive" });
    } else {
      toast({
        title: "Contribution Noted! 🌟",
        description: `Thank you, ${formData.name}! We've received your material donation details. We'll contact you shortly regarding drop-off/pickup.`,
        className: "bg-primary text-primary-foreground",
        duration: 7000,
      });
      setFormData({ name: '', email: '', phone: '', items: '', preferredLocation: '', message: '' }); 
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <div className="container mx-auto px-4">
      <PageHeader title="Donate Materials" subtitle="Your gently used or new items can bring immense joy and utility to those in need.">
         <Gift className="h-16 w-16 text-primary mx-auto mt-4" />
      </PageHeader>

      <SectionWrapper id="needed-materials">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 md:mb-16">Current Material Needs</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {neededMaterialsEvents.map((event, index) => (
            <div 
              key={event.id} 
              className="h-full animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card className="h-full flex flex-col rounded-xl shadow-soft hover:shadow-soft-hover transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img  
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    alt={event.title} 
                    src={event.imagePlaceholder} 
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1595872018818-97555653a011"; }}
                  />
                </div>
                <CardHeader className="pt-6">
                  <CardTitle className="text-xl lg:text-2xl text-primary">{event.title}</CardTitle>
                  <CardDescription className="text-sm text-secondary font-semibold flex items-center">
                    <MapPin className="h-4 w-4 mr-1.5"/>{event.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-2">
                  <p className="text-sm font-medium text-foreground mb-1">We need:</p>
                  <ul className="space-y-1.5">
                    {event.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground">
                        {React.cloneElement(req.icon, {className: "h-5 w-5 mr-2 text-primary/80 shrink-0"})}
                        {req.item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="p-6">
                   <Button className="w-full rounded-lg bg-primary hover:bg-primary-soft text-primary-foreground" onClick={() => document.getElementById('contribution-form')?.scrollIntoView({ behavior: 'smooth' })}>
                    Contribute to this Drive
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper id="contribution-form" className="bg-primary/5 rounded-xl py-16 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 md:mb-16">Offer Your Material Donation</h2>
        <Card className="max-w-2xl mx-auto p-6 sm:p-8 rounded-xl shadow-soft bg-background">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="font-medium">Your Name <span className="text-destructive">*</span></Label>
              <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="E.g., Rohan Mehta" required className="mt-1 rounded-lg"/>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="email" className="font-medium">Email Address <span className="text-destructive">*</span></Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="E.g., rohan@example.com" required className="mt-1 rounded-lg"/>
              </div>
              <div>
                <Label htmlFor="phone" className="font-medium">Phone Number <span className="text-destructive">*</span></Label>
                <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="E.g., 9876543210" required className="mt-1 rounded-lg"/>
              </div>
            </div>
            <div>
              <Label htmlFor="items" className="font-medium">Items you wish to donate <span className="text-destructive">*</span></Label>
              <Textarea id="items" name="items" value={formData.items} onChange={handleInputChange} placeholder="E.g., 10 notebooks, 5 sweaters (kids size M), story books" required className="mt-1 rounded-lg" rows={3}/>
            </div>
            <div>
              <Label htmlFor="preferredLocation" className="font-medium">Preferred Drop-off Location (Optional)</Label>
              <select 
                id="preferredLocation" 
                name="preferredLocation" 
                value={formData.preferredLocation} 
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-lg border-input bg-background p-2.5 text-sm focus:ring-primary focus:border-primary"
              >
                <option value="">Select a location (or we'll contact you)</option>
                {dropOffLocations.map(loc => <option key={loc.name} value={loc.name}>{loc.name} ({loc.hours})</option>)}
                <option value="request_pickup">Request Pickup (if available)</option>
              </select>
            </div>
            <div>
              <Label htmlFor="message" className="font-medium">Additional Message (Optional)</Label>
              <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder="Any specific details or questions?" className="mt-1 rounded-lg" rows={2}/>
            </div>
            <Button type="submit" size="lg" className="w-full rounded-lg bg-primary hover:bg-primary-soft text-primary-foreground py-3 text-base" disabled={isSubmitting}>
              <CheckCircle className="h-5 w-5 mr-2" /> {isSubmitting ? 'Submitting...' : 'Submit Donation Details'}
            </Button>
          </form>
        </Card>
      </SectionWrapper>

      <SectionWrapper id="drop-off-info">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 md:mb-16">Drop-off Locations</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {dropOffLocations.map((loc, index) => (
            <div 
              key={loc.name} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card className="p-6 rounded-xl shadow-soft bg-background">
                <CardTitle className="text-xl text-primary mb-2 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-secondary"/>{loc.name}
                </CardTitle>
                <p className="text-muted-foreground text-sm">{loc.address}</p>
                <p className="text-muted-foreground text-sm mt-1"><strong>Hours:</strong> {loc.hours}</p>
              </Card>
            </div>
          ))}
        </div>
        <p className="text-center text-muted-foreground mt-8 text-sm">
          For large donations or if you need to arrange a pickup, please mention it in the form above or contact us at <a href="mailto:letsdonateofficial@gmail.com" className="text-primary hover:underline">letsdonateofficial@gmail.com</a>.
        </p>
      </SectionWrapper>
    </div>
  );
};

export default MaterialDonationPage;