import React from 'react';
import PageHeader from '@/components/shared/PageHeader';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, Target, TrendingUp, UserCircle, Heart, Sparkles, Brain, Users2, Zap, Sun, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const values = [
  { title: 'Empathy over Ego', icon: <Heart className="h-8 w-8 text-primary" />, description: 'We prioritize understanding and connection in all our actions.' },
  { title: 'Joy in Learning', icon: <Sparkles className="h-8 w-8 text-primary" />, description: 'Fostering curiosity and happiness through engaging educational experiences.' },
  { title: 'Community-led Action', icon: <Users2 className="h-8 w-8 text-primary" />, description: 'Empowering local communities to drive and sustain positive change.' },
  { title: 'Simplicity with Substance', icon: <Zap className="h-8 w-8 text-primary" />, description: 'Focusing on impactful solutions that are accessible and meaningful.' },
];

const milestones = [
  { date: 'June 2023', event: 'Founded with 3 sessions; the focus was on giving back through sharing your skill.', icon: <Heart className="text-primary" /> },
  { date: 'July 2023', event: 'Sessions expanded to underprivileged orphanages; volunteers steadily joined to share their talents.', icon: <Users className="text-primary" /> },
  { date: 'April 2024', event: 'Launched major initiatives: Let’s Summer and Let’s Elevate. Began long-term engagements with schools.', icon: <TrendingUp className="text-primary" /> },
  { date: 'July 2024', event: 'Launched Let’s Prepare with 80+ volunteers across 6 schools in Raipur.', icon: <Target className="text-primary" /> },
  { date: '2025 - Present', event: 'Currently impacting over 2000+ children through 5000+ sessions, supported by 100+ dedicated volunteers.', icon: <Heart className="text-primary animate-pulse" /> },
];

const teamMembers = [
  { name: 'Aakansha Shukla', role: 'Coordination Lead', bio: 'Active across all school sessions, core in Let’s Prepare. Ensures smooth execution and volunteer engagement.', imagePlaceholder: 'Professional headshot of Aakansha Shukla', avatarFallback: 'AS' },
  { name: 'Shubham Verma', role: 'Creative Educator', bio: 'Led numerous maths and science sessions, bringing innovation and fun to learning.', imagePlaceholder: 'Professional headshot of Shubham Verma', avatarFallback: 'SV' },
  { name: 'Prasun', role: 'Operational Planner', bio: 'Manages session logistics, school outreach, and ensures resources are effectively utilized.', imagePlaceholder: 'Professional headshot of Prasun', avatarFallback: 'P' },
  { name: 'Pooja Shrivastava', role: 'Core Teaching Volunteer', bio: 'An impactful presence in government school sessions, dedicated to student growth.', imagePlaceholder: 'Professional headshot of Pooja Shrivastava', avatarFallback: 'PS' },
];

const AboutUsPage = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <div className="container mx-auto px-4">
      <PageHeader title="About Let's Donate" subtitle="More than an NGO — a growing movement of empathy.">
        <Users className="h-16 w-16 text-primary mx-auto mt-4" />
      </PageHeader>

      <SectionWrapper id="who-we-are">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Who We Are</h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-4">
            Let’s Donate was born from a simple idea: giving connects us to our best selves. Started by a software engineer who experienced the joy of sharing during a personal high point, our foundation rests on the belief that every contribution—be it time, material, or money—nurtures lives and spreads kindness.
          </p>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            From just three sessions with friends in 2021, we’ve expanded to touch thousands of children through impactful, joyful, and educational experiences across cities, schools, and communities.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper id="mission-vision" className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
          <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-4">Our Mission</h3>
          <p className="text-muted-foreground leading-relaxed">
            To create a compassionate world by empowering people to give meaningfully—whether it’s time, resources, or knowledge—and enable equitable access to joy, learning, and opportunities.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
          <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-4">Our Vision</h3>
          <p className="text-muted-foreground leading-relaxed">
            A world where kindness is a norm, not a rarity. A world where children grow up not just with basic resources, but with hope, joy, and encouragement.
          </p>
        </motion.div>
      </SectionWrapper>

      <SectionWrapper id="our-values" className="bg-secondary/10 rounded-xl py-16 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 md:mb-16">Our Core Values</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.custom
              key={value.title}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
            >
              <Card className="h-full text-center p-6 bg-background rounded-xl shadow-soft hover:shadow-primary/10 transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex justify-center mb-4">{value.icon}</div>
                <CardTitle className="text-xl text-primary mb-2">{value.title}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">{value.description}</CardDescription>
              </Card>
            </motion.custom>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper id="timeline" className="bg-primary/5 rounded-xl py-16 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 md:mb-16">Our Journey & Milestones (2021–Present)</h2>
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
      
      <SectionWrapper id="founder-story">
        <Card className="max-w-3xl mx-auto p-6 sm:p-8 rounded-xl shadow-soft bg-background">
          <CardHeader className="text-center">
            <UserCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            <CardTitle className="text-2xl md:text-3xl text-primary">Meet The Founder</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <Avatar className="w-32 h-32 mx-auto mb-6 border-4 border-secondary shadow-md">
              <img  className="object-cover" alt="Founder Let's Donate" src="https://images.unsplash.com/photo-1652841190565-b96e0acbae17" />
              <AvatarFallback className="text-4xl bg-secondary text-secondary-foreground">LD</AvatarFallback>
            </Avatar>
            <blockquote className="text-lg italic text-muted-foreground mb-4">"Every time I walk into a session, I walk into a better version of myself."</blockquote>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Started as a personal practice of kindness during joyful moments, the founder’s intention was to share that feeling with others. A software engineer by profession, their empathy and leadership sparked a community-driven movement where technology, humanity, and joy meet.
            </p>
          </CardContent>
        </Card>
      </SectionWrapper>

      <SectionWrapper id="our-team" className="bg-secondary/10 rounded-xl py-16 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 md:mb-16">Our Pillars of Passion & Purpose</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
                <CardContent className="flex-grow p-0">
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