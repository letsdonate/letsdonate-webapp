import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, Lightbulb, Zap, MessageSquare, ExternalLink, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const SocialChangeCirclePage = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
    }),
  };

  const benefits = [
    { title: "Connect & Collaborate", description: "Meet passionate individuals, share ideas, and work together on impactful projects.", icon: <Users className="h-8 w-8 text-primary" /> },
    { title: "Stay Updated", description: "Get the latest news on our initiatives, events, and volunteer opportunities directly.", icon: <MessageSquare className="h-8 w-8 text-primary" /> },
    { title: "Share & Inspire", description: "Bring your unique ideas, lead discussions, or even spark new community initiatives.", icon: <Lightbulb className="h-8 w-8 text-primary" /> },
    { title: "Flexible Contribution", description: "Contribute when and how you can – every bit of your time, skill, or idea helps!", icon: <Zap className="h-8 w-8 text-primary" /> },
  ];

  const whatsappLink = "https://chat.whatsapp.com/EQWqZ94XiumCDWHdAqFsxN";

  return (
    <div className="container mx-auto px-4">
      <PageHeader 
        title="Join Our Social Change Circle!" 
        subtitle="A vibrant WhatsApp community for changemakers like you. Connect, collaborate, and contribute to a better tomorrow."
      >
         <Users className="h-16 w-16 text-primary mx-auto mt-4" />
      </PageHeader>

      <SectionWrapper id="about-scc">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Be Part of the Movement</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              The Let's Donate Social Change Circle is more than just a group; it's a dynamic hub where ideas meet action. Whether you want to volunteer, share expertise, stay informed, or launch your own micro-initiative, this is your space.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We believe that real change starts with community. Join us on WhatsApp to:
            </p>
            <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start"><CheckCircle className="h-5 w-5 mr-2 mt-1 text-secondary flex-shrink-0"/><span>Get real-time updates on our work and urgent needs.</span></li>
                <li className="flex items-start"><CheckCircle className="h-5 w-5 mr-2 mt-1 text-secondary flex-shrink-0"/><span>Discuss societal issues and brainstorm solutions.</span></li>
                <li className="flex items-start"><CheckCircle className="h-5 w-5 mr-2 mt-1 text-secondary flex-shrink-0"/><span>Explore opportunities to contribute your unique skills and time.</span></li>
                <li className="flex items-start"><CheckCircle className="h-5 w-5 mr-2 mt-1 text-secondary flex-shrink-0"/><span>Connect with a network of inspiring individuals.</span></li>
                <li className="flex items-start"><CheckCircle className="h-5 w-5 mr-2 mt-1 text-secondary flex-shrink-0"/><span>Lead or join micro-projects that make a difference.</span></li>
            </ul>
            <Button 
              size="lg" 
              asChild 
              className="rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 transition-opacity px-8 py-3 text-base font-semibold shadow-soft-hover"
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageSquare className="h-5 w-5 mr-2" /> Join on WhatsApp <ExternalLink className="h-4 w-4 ml-1.5 opacity-80"/>
              </a>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="mt-10 lg:mt-0"
          >
            <img  
              className="rounded-xl shadow-2xl w-full h-auto object-cover aspect-[4/3]" 
              alt="Diverse group of people connected via mobile phones and social media icons"
             src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80" />
          </motion.div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="scc-benefits" className="bg-primary/5 rounded-xl py-16 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 md:mb-16">Why Join the Circle?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.custom 
              key={benefit.title} 
              custom={index} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, amount: 0.3 }} 
              variants={cardVariants}
            >
              <Card className="p-6 rounded-xl shadow-soft h-full text-center bg-background">
                <div className="flex justify-center mb-4">{benefit.icon}</div>
                <CardTitle className="text-xl text-primary mb-2">{benefit.title}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">{benefit.description}</CardDescription>
              </Card>
            </motion.custom>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper id="final-cta" className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Ready to Make Waves?</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          Your ideas, energy, and passion can fuel real change. Click below and become an active part of the Let's Donate Social Change Circle today!
        </p>
        <Button 
          size="xl" 
          asChild 
          className="rounded-lg bg-secondary hover:bg-secondary/90 text-secondary-foreground px-12 py-4 text-lg font-semibold shadow-soft-hover transition-all duration-300 transform hover:scale-105"
        >
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            Join the WhatsApp Community <ArrowRight className="h-5 w-5 ml-2"/>
          </a>
        </Button>
      </SectionWrapper>
    </div>
  );
};

export default SocialChangeCirclePage;