import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { Users, Target, Heart, Eye, TrendingUp, BookOpen, Brain, Send, Mail, Users2, Sparkles, Zap } from 'lucide-react'; // Added Users2, Sparkles, Zap
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';


const teamMembers = [
  { 
    name: "Shubham Choudhary", 
    role: "Founder & Chief Everything Officer", 
    imagePlaceholder: "SC", 
    imageUrl: "https://dl.dropboxusercontent.com/scl/fi/vwjyanc56mt388rgi26gf/Shubham.jpg?rlkey=jk9g3voxi5mo22u5cvu6zj5kz", // Placeholder, replace with actual
    bio: "A software engineer with a heart for service, Shubham started Let’s Donate to make kindness more accessible and community action more powerful through empathy and technology." 
  },
  {
    name: "Aakansha Shukla", 
    role: "Chief Get-It-Done Officer", 
    imagePlaceholder: "AS", 
    imageUrl: "https://dl.dropboxusercontent.com/scl/fi/oodsoqhcr1esdqfpgftua/Aakansha.jpg?rlkey=2mpy8wpzvhsfpxfgqthd4bw1e&st=vxezgy3t&raw=1", // Placeholder, replace with actual
    bio: "Aakansha plays a key role in planning and executing on-ground initiatives. From coordinating sessions to supporting volunteers, she ensures every effort runs with care and consistency." 
  },
  {
    name: "Shubham Verma", 
    role: "Chief Behind-the-Scenes Officer", 
    imagePlaceholder: "SV", 
    imageUrl: "https://dl.dropboxusercontent.com/scl/fi/negqvnvf445w75zxw589p/shubham_verma.jpg?rlkey=sh9djv8du1pcnqe211h22nxag&st=zb9bfqm3&raw=1", // Placeholder, replace with actual
    bio: "Shubham works behind the scenes to keep everything running smoothly—overseeing logistics, refining operations, and offering support wherever it's needed most." 
  },
];

const milestones = [
  { date: 'June 2023', event: 'Founded with a weekend summer camp; the focus was on giving back through sharing our skills.', icon: <Heart className="text-primary" /> },
  { date: 'November 2023', event: "Launched Let's Donate Clarity—our first community partnership for weekly holistic brain development sessions.", icon: <Brain className="text-primary" /> },
  { date: 'April 2024', event: "Launched major initiatives: Let's Summer and Let's Elevate. Started weekday sessions at girls' orphanages to create deeper impact.", icon: <TrendingUp className="text-primary" /> },
  { date: 'July 2024', event: "Launched Let's Prepare with 80+ volunteers across 6 schools in Raipur. Began long-term engagements with government schools.", icon: <Target className="text-primary" /> },
  { date: '2025 – Present', event: "Currently impacting over 2,000+ children through 5,000+ sessions, supported by 300+ dedicated volunteers.", icon: <Heart className="text-primary animate-pulse" /> },
];


const values = [
  { title: 'Community-led Action', icon: <Users2 className="h-8 w-8 text-secondary" />, description: 'Empowering local communities to drive and sustain positive change.' },
  { title: 'Empathy over Ego', icon: <Heart className="h-8 w-8 text-secondary" />, description: 'We prioritize understanding and connection in all our actions.' },
  { title: 'Joy in Learning', icon: <Sparkles className="h-8 w-8 text-secondary" />, description: 'Fostering curiosity and happiness through engaging educational experiences.' },
  { title: 'Simplicity with Substance', icon: <Zap className="h-8 w-8 text-secondary" />, description: 'Focusing on impactful solutions that are accessible and meaningful.' },
];

const AboutUsPage = () => {
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!contactForm.name || !contactForm.email || !contactForm.subject || !contactForm.message) {
      toast({ title: "Incomplete Form", description: "Please fill all fields.", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(contactForm.email)) {
      toast({ title: "Invalid Email", description: "Please enter a valid email address.", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }

    const { error } = await supabase
      .from('contact_inquiries')
      .insert([{ 
        name: contactForm.name, 
        email: contactForm.email, 
        subject: contactForm.subject, 
        message: contactForm.message 
      }]);

    if (error) {
      toast({ title: "Submission Error", description: error.message, variant: "destructive" });
    } else {
      toast({
        title: "Message Sent! 📬",
        description: "Thank you for reaching out. We'll get back to you soon!",
        className: "bg-primary text-primary-foreground",
      });
      setContactForm({ name: '', email: '', subject: '', message: '' });
    }
    setIsSubmitting(false);
  };


  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <div className="container mx-auto px-4">
      <PageHeader 
        title="About Let's Donate"
        subtitle="Discover our journey, mission, and the passionate team driving change in Raipur, Chhattisgarh and beyond."
      >
        <BookOpen className="h-16 w-16 text-primary mx-auto mt-4" />
      </PageHeader>

      <SectionWrapper id="our-story">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Who We Are</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Let's Donate is a community-driven movement making learning joyful and accessible for underprivileged and special children. Founded in 2023 by a software engineer who discovered the joy of giving while teaching at an orphanage, we began with a few weekend sessions—and have since grown into a network of volunteers creating hands-on, fun learning experiences across schools, orphanages, and shelters.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From art and science to storytelling and life skills, our sessions are easy to lead and exciting for kids—proving that anyone can teach, and everyone can give.
            </p>
            <Button asChild size="lg" className="mt-4">
              <Link to="/initiatives-events">Explore Our Work</Link>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img  
              alt="Group of diverse volunteers smiling and working together"
              className="rounded-xl shadow-2xl w-full h-auto object-cover aspect-video"
             src="https://dl.dropboxusercontent.com/scl/fi/6ed8jlr4rcqghio1d3dea/who_we_are.jpg?rlkey=anwjpxutayxsjtosbiff5kbgf&st=d4dsv7ir&raw=1" />
          </motion.div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="mission-vision" className="bg-primary/5 rounded-xl py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-semibold text-primary flex items-center">
              <Target className="h-8 w-8 mr-3 text-secondary flex-shrink-0" /> Our Mission
            </h3>
            <p className="text-muted-foreground text-lg">
              To build a more compassionate world by making it easy for anyone to give—whether it's time, skills, or resources—while creating joyful, inclusive learning experiences that help under-resourced children dream big, grow with confidence, and thrive.
            </p>
          </motion.div>
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay:0.1 }}
          >
            <h3 className="text-2xl font-semibold text-primary flex items-center">
              <Eye className="h-8 w-8 mr-3 text-secondary flex-shrink-0" /> Our Vision
            </h3>
            <p className="text-muted-foreground text-lg">
              A world where kindness is a norm, not a rarity. We envision a society where everyone feels empowered to help others—where giving is simple, and resources are used wisely to reach more lives. By enabling people to become changemakers in their own way, we strive to build a world filled with compassion, empathy, and collective growth.
            </p>
          </motion.div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="our-values">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 md:mb-16">Our Core Values</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.custom
              key={value.title}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              className="h-full"
            >
              <Card className="text-center p-6 bg-background rounded-xl shadow-soft h-full">
                <div className="flex justify-center mb-4">{value.icon}</div>
                <CardTitle className="text-xl text-primary mb-2">{value.title}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">{value.description}</CardDescription>
              </Card>
            </motion.custom>
          ))}
        </div>
      </SectionWrapper>
      
      <SectionWrapper id="timeline" className="bg-primary/5 rounded-xl py-16 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 md:mb-16">Our Journey & Milestones (2023–Present)</h2>
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-primary/20 rounded-full transform -translate-x-1/2"></div>
          {milestones.map((milestone, index) => (
            <motion.div 
              key={index} 
              className="mb-10 flex items-center w-full"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left order-2'}`}>
                <p className="font-bold text-primary text-xl">{milestone.date}</p>
                <p className="text-muted-foreground text-sm md:text-base">{milestone.event}</p>
              </div>
              <div className="relative z-10 order-1">
                <div className="w-10 h-10 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-soft">
                  {React.cloneElement(milestone.icon, { size: 20 })}
                </div>
              </div>
              <div className={`w-1/2 ${index % 2 === 0 ? 'pl-8' : 'pr-8 order-0'}`}></div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper id="team">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 md:mb-16">Meet Our Core Team</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {teamMembers.map((member, index) => (
            <motion.custom
              key={member.name}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              className="h-full"
            >
              <Card className="text-center p-6 rounded-xl shadow-soft hover:shadow-soft-hover transition-shadow duration-300 transform hover:-translate-y-1 bg-card h-full">
                <Avatar className="w-28 h-28 mx-auto mb-4 border-4 border-primary/20">
                  <AvatarImage src={member.imageUrl} alt={member.name} />
                  <AvatarFallback className="bg-secondary text-secondary-foreground text-3xl">{member.imagePlaceholder}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl text-primary">{member.name}</CardTitle>
                <p className="text-sm text-secondary font-medium mb-2">{member.role}</p>
                <CardDescription className="text-xs text-muted-foreground">{member.bio}</CardDescription>
              </Card>
            </motion.custom>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 transition-opacity">
            <Link to="/donate/time#time-donation-page-volunteer-form">Join Our Volunteer Team</Link>
          </Button>
        </div>
      </SectionWrapper>

      <SectionWrapper id="contact-us-section" className="bg-card rounded-xl py-16 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 md:mb-16">Get In Touch</h2>
        <Card className="max-w-2xl mx-auto p-6 sm:p-8 rounded-xl shadow-soft bg-background">
          <form onSubmit={handleContactSubmit} className="space-y-6">
            <div>
              <Label htmlFor="contact-name" className="font-medium">Your Name <span className="text-destructive">*</span></Label>
              <Input id="contact-name" name="name" value={contactForm.name} onChange={handleContactChange} placeholder="E.g., Priya Kumari" required className="mt-1 rounded-lg"/>
            </div>
            <div>
              <Label htmlFor="contact-email" className="font-medium">Email Address <span className="text-destructive">*</span></Label>
              <Input id="contact-email" name="email" type="email" value={contactForm.email} onChange={handleContactChange} placeholder="E.g., priya@example.com" required className="mt-1 rounded-lg"/>
            </div>
            <div>
              <Label htmlFor="contact-subject" className="font-medium">Subject <span className="text-destructive">*</span></Label>
              <Input id="contact-subject" name="subject" value={contactForm.subject} onChange={handleContactChange} placeholder="E.g., Inquiry about volunteering" required className="mt-1 rounded-lg"/>
            </div>
            <div>
              <Label htmlFor="contact-message" className="font-medium">Your Message <span className="text-destructive">*</span></Label>
              <Textarea id="contact-message" name="message" value={contactForm.message} onChange={handleContactChange} placeholder="Write your message here..." required className="mt-1 rounded-lg" rows={4}/>
            </div>
            <Button type="submit" size="lg" className="w-full rounded-lg bg-primary hover:bg-primary-soft text-primary-foreground py-3 text-base" disabled={isSubmitting}>
              {isSubmitting ? <Send className="h-5 w-5 mr-2 animate-pulse" /> : <Send className="h-5 w-5 mr-2" />}
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-6">
            Alternatively, you can email us directly at <a href="mailto:letsdonateofficial@gmail.com" className="text-primary hover:underline">letsdonateofficial@gmail.com</a> or join our <Link to="/social-change-circle" className="text-primary hover:underline">Social Change Circle</Link>. We're also reachable at <a href="tel:+918109710356" className="text-primary hover:underline">+91 8109710356</a>.
          </p>
        </Card>
      </SectionWrapper>

    </div>
  );
};

export default AboutUsPage;