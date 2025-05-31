import React from 'react';
import PageHeader from '@/components/shared/PageHeader';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, MessageSquare, Zap, Lightbulb, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const SocialChangeCirclePage = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
    }),
  };

  const features = [
    { title: "Collaborate", description: "Connect with like-minded individuals passionate about social good.", icon: <Users className="h-8 w-8 text-primary" /> },
    { title: "Share Ideas", description: "A safe space to brainstorm and develop innovative solutions.", icon: <Lightbulb className="h-8 w-8 text-primary" /> },
    { title: "Take Action", description: "Move from discussion to tangible, small-scale projects.", icon: <Zap className="h-8 w-8 text-primary" /> },
  ];

  return (
    <div className="container mx-auto px-4">
      <PageHeader title="Social Change Circle" subtitle="Join our community initiative to discuss real societal issues and collaborate on actionable solutions.">
         <MessageSquare className="h-16 w-16 text-primary mx-auto mt-4" />
      </PageHeader>

      <SectionWrapper id="about-circle">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">What is the Social Change Circle?</h2>
            <p className="text-lg text-muted-foreground mb-4">
              Social Change Circle is our initiative to bring people together to talk about real problems and find small, actionable ways to solve them. It’s a space to collaborate, share ideas, and take the first step toward change — together.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              We believe that collective wisdom and grassroots efforts can lead to significant positive shifts in our communities. This circle, in collaboration with <strong className="text-secondary">ClickForClarity</strong>, aims to foster that spirit.
            </p>
            <Button 
              size="lg" 
              asChild 
              className="rounded-lg bg-primary hover:bg-primary-soft text-primary-foreground px-8 py-3 text-base"
              onClick={() => window.open('https://chat.whatsapp.com/YourGroupInviteLinkHere', '_blank')}
            >
              <a href="https://chat.whatsapp.com/YourGroupInviteLinkHere" target="_blank" rel="noopener noreferrer">
                <MessageSquare className="h-5 w-5 mr-2" /> Join Our WhatsApp Community <ExternalLink className="h-4 w-4 ml-1.5 opacity-80"/>
              </a>
            </Button>
            <p className="text-xs text-muted-foreground mt-3">(Note: Replace 'YourGroupInviteLinkHere' with your actual WhatsApp group link.)</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-10 lg:mt-0"
          >
            <img  
              className="rounded-xl shadow-soft w-full h-auto object-cover" 
              alt="Diverse group of people collaborating and discussing ideas"
             src="https://images.unsplash.com/photo-1702467852657-26c7a1d9fceb" />
          </motion.div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="circle-features" className="bg-primary/5 rounded-xl py-16 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 md:mb-16">What You Can Do in the Circle</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.custom 
              key={feature.title} 
              custom={index} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, amount: 0.3 }} 
              variants={cardVariants}
            >
              <Card className="p-6 rounded-xl shadow-soft h-full text-center bg-background">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <CardTitle className="text-xl text-primary mb-2">{feature.title}</CardTitle>
                <CardContent className="p-0">
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.custom>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper id="get-involved-cta" className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Ready to Co-create Change?</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          Your voice, ideas, and passion are welcome. Join the Social Change Circle and be part of something meaningful.
        </p>
        <Button 
          size="lg" 
          asChild 
          className="rounded-lg bg-secondary hover:bg-secondary/90 text-secondary-foreground px-10 py-3 text-lg font-semibold shadow-soft-hover transition-all duration-300 transform hover:scale-105"
          onClick={() => window.open('https://chat.whatsapp.com/YourGroupInviteLinkHere', '_blank')}
        >
          <a href="https://chat.whatsapp.com/YourGroupInviteLinkHere" target="_blank" rel="noopener noreferrer">
            Join the Conversation <ExternalLink className="h-5 w-5 ml-2 opacity-80"/>
          </a>
        </Button>
      </SectionWrapper>
    </div>
  );
};

export default SocialChangeCirclePage;