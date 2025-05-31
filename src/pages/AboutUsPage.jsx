import React from 'react';
import PageHeader from '@/components/shared/PageHeader';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Target, TrendingUp, UserCircle, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const milestones = [
  { year: '2021', event: 'Genesis: A few friends, three small sessions, one big idea – sharing joy.', icon: <Heart className="text-primary" /> },
  { year: '2022', event: 'Growth: Expanded to 10+ institutions, 50+ dedicated volunteers joined the cause.', icon: <Users className="text-primary" /> },
  { year: '2023', event: 'Impact: Touched the lives of over 2000 children through diverse programs.', icon: <TrendingUp className="text-primary" /> },
  { year: '2024', event: 'Expansion: Launched "Social Change Circle" and material donation drives.', icon: <Target className="text-primary" /> },
  { year: 'Present', event: 'Continuing our mission to spread empathy and empower communities.', icon: <Heart className="text-primary animate-pulse" /> },
];

const teamMembers = [
  { name: 'Aanya Sharma', role: 'Founder & Lead Coordinator', bio: 'A software engineer dedicated to making a difference by fostering empathy in the world. Believes small acts of kindness can create big waves of change.', imagePlaceholder: 'Professional headshot of Aanya Sharma', avatarFallback: 'AS' },
  { name: 'Rohan Verma', role: 'Operations Head', bio: 'Manages event logistics and volunteer coordination. Passionate about creating seamless experiences for both volunteers and beneficiaries.', imagePlaceholder: 'Professional headshot of Rohan Verma', avatarFallback: 'RV' },
  { name: 'Priya Singh', role: 'Community Outreach Lead', bio: 'Connects Let\'s Donate with institutions and communities in need. A strong advocate for child welfare and education.', imagePlaceholder: 'Professional headshot of Priya Singh', avatarFallback: 'PS' },
];

const AboutUsPage = () => {
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
      <PageHeader title="Our Story of Compassion" subtitle="Discover the journey, mission, and the passionate team behind Let's Donate.">
        <Users className="h-16 w-16 text-primary mx-auto mt-4" />
      </PageHeader>

      <SectionWrapper id="our-mission">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Our Mission</h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Let’s Donate is a volunteer-driven initiative started by a group of friends who believed in the power of sharing joy. What began with just three sessions has now reached thousands of children across multiple institutions. With over 50 volunteers and countless smiles delivered, Let's Donate continues to spread empathy by enabling people to donate their time, material, or money. We aim to empower underprivileged children by creating fun, engaging, and educational experiences.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper id="timeline" className="bg-primary/5 rounded-xl py-16 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 md:mb-16">Our Journey & Milestones</h2>
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
                <p className="font-bold text-primary text-xl">{milestone.year}</p>
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
      
      <SectionWrapper id="founder-story">
        <Card className="max-w-3xl mx-auto p-6 sm:p-8 rounded-xl shadow-soft bg-background">
          <CardHeader className="text-center">
            <UserCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            <CardTitle className="text-2xl md:text-3xl text-primary">Meet Our Founder</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <Avatar className="w-32 h-32 mx-auto mb-6 border-4 border-secondary shadow-md">
              <img  className="object-cover" alt="Founder Aanya Sharma" src="https://images.unsplash.com/photo-1652841190565-b96e0acbae17" />
              <AvatarFallback className="text-4xl bg-secondary text-secondary-foreground">AS</AvatarFallback>
            </Avatar>
            <p className="text-lg text-muted-foreground mb-2">"A software engineer dedicated to making a difference by fostering empathy in the world."</p>
            <p className="text-muted-foreground text-sm">
              Aanya started Let's Donate with a simple belief: that everyone has something to give, and that collective small actions can lead to profound societal change. Her vision continues to inspire our volunteers and shape our initiatives.
            </p>
          </CardContent>
        </Card>
      </SectionWrapper>

      <SectionWrapper id="our-team" className="bg-secondary/10 rounded-xl py-16 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 md:mb-16">Our Core Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.custom 
              key={member.name} 
              custom={index} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, amount: 0.2 }} 
              variants={cardVariants}
            >
              <Card className="p-6 rounded-xl shadow-soft h-full flex flex-col items-center text-center bg-background">
                <Avatar className="w-24 h-24 mb-4 border-4 border-primary">
                  <img  className="object-cover" alt={`Photo of ${member.name}`} src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">{member.avatarFallback}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl text-primary mb-1">{member.name}</CardTitle>
                <p className="text-sm font-semibold text-secondary mb-2">{member.role}</p>
                <CardContent className="flex-grow">
                  <p className="text-xs text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            </motion.custom>
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
};

export default AboutUsPage;