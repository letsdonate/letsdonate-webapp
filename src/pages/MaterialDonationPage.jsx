import React, { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea'; 
import { Gift, BookOpen, Shirt, ToyBrick, MapPin, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const neededMaterialsEvents = [
  { 
    id: 1, 
    title: 'Back-to-School Drive', 
    location: 'North Bangalore Community Center', 
    imagePlaceholder: 'Colorful school supplies like notebooks and pencils',
    requirements: [
      { item: 'Notebooks (Unruled & Ruled)', icon: <BookOpen className="h-5 w-5 text-primary" /> },
      { item: 'Pencils & Pens', icon: <BookOpen className="h-5 w-5 text-primary" /> },
      { item: 'School Bags', icon: <Shirt className="h-5 w-5 text-primary" /> },
      { item: 'Geometry Boxes', icon: <BookOpen className="h-5 w-5 text-primary" /> },
    ]
  },
  { 
    id: 2, 
    title: 'Winter Warmth Collection', 
    location: 'City Shelter Outreach Program', 
    imagePlaceholder: 'Warm clothes like sweaters and blankets',
    requirements: [
      { item: 'Blankets (New or Gently Used)', icon: <Shirt className="h-5 w-5 text-primary" /> },
      { item: 'Sweaters & Jackets (All sizes)', icon: <Shirt className="h-5 w-5 text-primary" /> },
      { item: 'Socks & Caps', icon: <Shirt className="h-5 w-5 text-primary" /> },
    ]
  },
  { 
    id: 3, 
    title: 'Play & Learn Toy Drive', 
    location: 'Childrens\' Activity Center, Jayanagar', 
    imagePlaceholder: 'Educational toys and board games for children',
    requirements: [
      { item: 'Educational Toys (Ages 3-10)', icon: <ToyBrick className="h-5 w-5 text-primary" /> },
      { item: 'Story Books (English & Kannada)', icon: <BookOpen className="h-5 w-5 text-primary" /> },
      { item: 'Board Games', icon: <ToyBrick className="h-5 w-5 text-primary" /> },
    ]
  },
];

const dropOffLocations = [
  { name: 'Let\'s Donate HQ', address: '123 Kindness Lane, Koramangala, Bangalore', hours: 'Mon-Fri, 10 AM - 5 PM' },
  { name: 'South Bangalore Collection Point', address: '456 Charity Road, J.P. Nagar, Bangalore', hours: 'Sat, 11 AM - 3 PM' },
];

const MaterialDonationPage = () => {
  const { toast } = useToast();
  const [materialDonations, setMaterialDonations] = useLocalStorage('materialDonationSubmissions', []);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    items: '',
    preferredLocation: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.items) {
      toast({ title: "Incomplete Form", description: "Please fill in your name, email, and items to donate.", variant: "destructive" });
      return;
    }
     if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast({ title: "Invalid Email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    
    const newDonation = { ...formData, submissionDate: new Date().toISOString() };
    setMaterialDonations(prev => [...prev, newDonation]);

    toast({
      title: "Contribution Noted! 🌟",
      description: `Thank you, ${formData.name}! We've received your material donation details. We'll contact you shortly regarding drop-off/pickup.`,
      className: "bg-primary text-primary-foreground",
      duration: 7000,
    });
    // Simulate sending email to admin (console log for now)
    console.log("New Material Donation Submission (Simulated Email to Admin):", newDonation);

    setFormData({ name: '', email: '', phone: '', items: '', preferredLocation: '', message: '' }); // Reset form
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
            <motion.custom 
              key={event.id} 
              custom={index} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, amount: 0.2 }} 
              variants={cardVariants}
              className="h-full"
            >
              <Card className="h-full flex flex-col rounded-xl shadow-soft hover:shadow-soft-hover transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={event.title} src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
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
            </motion.custom>
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
                <Label htmlFor="phone" className="font-medium">Phone Number (Optional)</Label>
                <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="E.g., 9876543210" className="mt-1 rounded-lg"/>
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
            <Button type="submit" size="lg" className="w-full rounded-lg bg-primary hover:bg-primary-soft text-primary-foreground py-3 text-base">
              <CheckCircle className="h-5 w-5 mr-2" /> Submit Donation Details
            </Button>
          </form>
        </Card>
      </SectionWrapper>

      <SectionWrapper id="drop-off-info">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 md:mb-16">Drop-off Locations</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {dropOffLocations.map((loc, index) => (
            <motion.custom 
              key={loc.name} 
              custom={index} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, amount: 0.2 }} 
              variants={cardVariants}
            >
              <Card className="p-6 rounded-xl shadow-soft bg-background">
                <CardTitle className="text-xl text-primary mb-2 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-secondary"/>{loc.name}
                </CardTitle>
                <p className="text-muted-foreground text-sm">{loc.address}</p>
                <p className="text-muted-foreground text-sm mt-1"><strong>Hours:</strong> {loc.hours}</p>
              </Card>
            </motion.custom>
          ))}
        </div>
        <p className="text-center text-muted-foreground mt-8 text-sm">
          For large donations or if you need to arrange a pickup, please mention it in the form above or contact us at <a href="mailto:materials@letsdonate.org" className="text-primary hover:underline">materials@letsdonate.org</a>.
        </p>
      </SectionWrapper>
    </div>
  );
};

export default MaterialDonationPage;