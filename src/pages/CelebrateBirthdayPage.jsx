import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Assuming Select is created
import { Cake, Gift, Users, Sparkles, Send, Calendar as CalendarIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { staticInitiativesData } from '@/data/initiativesData'; // To populate initiative options

const CelebrateBirthdayPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthdayDate: '',
    preferredInitiativeId: '',
    guestCount: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, preferredInitiativeId: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name || !formData.email || !formData.birthdayDate || !formData.preferredInitiativeId) {
      toast({ title: "Incomplete Form", description: "Please fill in Name, Email, Birthday, and Preferred Initiative.", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast({ title: "Invalid Email", description: "Please enter a valid email address.", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }

    const { data, error } = await supabase
      .from('birthday_celebrations')
      .insert([{ 
        name: formData.name, 
        email: formData.email, 
        phone: formData.phone,
        birthday_date: formData.birthdayDate,
        preferred_initiative_id: formData.preferredInitiativeId,
        guest_count: formData.guestCount ? parseInt(formData.guestCount) : null,
        message: formData.message
      }]);

    setIsSubmitting(false);
    if (error) {
      toast({ title: "Submission Error", description: error.message, variant: "destructive" });
    } else {
      toast({
        title: "Request Submitted! 🎉",
        description: `Thank you, ${formData.name}! We've received your birthday celebration request. We'll be in touch soon to plan something special!`,
        className: "bg-primary text-primary-foreground",
        duration: 8000
      });
      setFormData({ name: '', email: '', phone: '', birthdayDate: '', preferredInitiativeId: '', guestCount: '', message: '' });
    }
  };

  const initiativeOptions = staticInitiativesData.map(init => ({
    value: init.id,
    label: init.title
  }));

  return (
    <div className="container mx-auto px-4">
      <PageHeader 
        title="Celebrate Your Birthday With Us!" 
        subtitle="Make your special day even more memorable by sharing joy and supporting a cause you care about."
      >
        <Cake className="h-16 w-16 text-primary mx-auto mt-4" />
      </PageHeader>

      <SectionWrapper id="celebrate-intro">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Let's Celebrate Initiative</h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-4">
            At Let's Donate, we believe that celebrations become more meaningful when they create a ripple of happiness. Our "Let's Celebrate" initiative allows you to dedicate your birthday, anniversary, or any special occasion to a cause.
          </p>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Instead of traditional gifts, you can encourage friends and family to contribute to one of our ongoing initiatives, or even organize a small volunteering activity with us. It's a wonderful way to multiply joy and make a lasting impact.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper id="how-it-works" className="bg-secondary/10 rounded-xl py-16 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 md:mb-16">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            { title: 'Tell Us Your Plan', description: 'Fill out the form below with your celebration details and how you\'d like to contribute.', icon: <Sparkles className="h-10 w-10 text-secondary" /> },
            { title: 'We Connect With You', description: 'Our team will reach out to discuss your ideas and help you choose the best way to support an initiative.', icon: <Users className="h-10 w-10 text-secondary" /> },
            { title: 'Spread Joy Together', description: 'Celebrate your special day by making a difference in the lives of others. We can help facilitate donations or a small group activity.', icon: <Gift className="h-10 w-10 text-secondary" /> },
          ].map((item, index) => (
            <motion.div 
              key={item.title} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
            >
              <Card className="p-6 bg-background rounded-xl shadow-soft h-full">
                <div className="flex justify-center mb-4">{item.icon}</div>
                <CardTitle className="text-xl text-primary mb-2">{item.title}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">{item.description}</CardDescription>
              </Card>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper id="celebration-form">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 md:mb-16">Plan Your Celebration With Us</h2>
        <Card className="max-w-2xl mx-auto p-6 sm:p-8 rounded-xl shadow-soft bg-background">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="celebrate-name" className="font-medium">Your Name <span className="text-destructive">*</span></Label>
              <Input id="celebrate-name" name="name" value={formData.name} onChange={handleInputChange} placeholder="E.g., Ananya Roy" required className="mt-1 rounded-lg"/>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="celebrate-email" className="font-medium">Email Address <span className="text-destructive">*</span></Label>
                <Input id="celebrate-email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="E.g., ananya@example.com" required className="mt-1 rounded-lg"/>
              </div>
              <div>
                <Label htmlFor="celebrate-phone" className="font-medium">Phone Number (Optional)</Label>
                <Input id="celebrate-phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="E.g., 9876543210" className="mt-1 rounded-lg"/>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="celebrate-birthdayDate" className="font-medium">Your Birthday / Special Date <span className="text-destructive">*</span></Label>
                <div className="relative">
                    <Input id="celebrate-birthdayDate" name="birthdayDate" type="date" value={formData.birthdayDate} onChange={handleInputChange} required className="mt-1 rounded-lg pr-8"/>
                    <CalendarIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none mt-0.5" />
                </div>
              </div>
              <div>
                <Label htmlFor="celebrate-guestCount" className="font-medium">Approx. Number of Guests (Optional)</Label>
                <Input id="celebrate-guestCount" name="guestCount" type="number" value={formData.guestCount} onChange={handleInputChange} placeholder="E.g., 20" className="mt-1 rounded-lg"/>
              </div>
            </div>
            <div>
              <Label htmlFor="celebrate-preferredInitiativeId" className="font-medium">Preferred Initiative to Support <span className="text-destructive">*</span></Label>
              <Select onValueChange={handleSelectChange} value={formData.preferredInitiativeId} name="preferredInitiativeId">
                <SelectTrigger className="w-full mt-1 rounded-lg">
                  <SelectValue placeholder="Select an initiative" />
                </SelectTrigger>
                <SelectContent>
                  {initiativeOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="celebrate-message" className="font-medium">Your Ideas or Message (Optional)</Label>
              <Textarea id="celebrate-message" name="message" value={formData.message} onChange={handleInputChange} placeholder="Tell us a bit about how you'd like to celebrate and contribute..." className="mt-1 rounded-lg" rows={3}/>
            </div>
            <Button type="submit" size="lg" className="w-full rounded-lg bg-primary hover:bg-primary-soft text-primary-foreground py-3 text-base" disabled={isSubmitting}>
              <Send className="h-5 w-5 mr-2" /> {isSubmitting ? 'Submitting...' : 'Send Celebration Request'}
            </Button>
          </form>
        </Card>
      </SectionWrapper>
    </div>
  );
};

export default CelebrateBirthdayPage;