import React from 'react';
import PageHeader from '@/components/shared/PageHeader';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Target, TrendingUp, UserCircle, Heart, Sparkles, Brain, Users2, Zap, Sun, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const values = [
  { title: 'Community-led Action', icon: <Users2 className="h-8 w-8 text-primary" />, description: 'Empowering local communities to drive and sustain positive change.' },
  { title: 'Empathy over Ego', icon: <Heart className="h-8 w-8 text-primary" />, description: 'We prioritize understanding and connection in all our actions.' },
  { title: 'Joy in Learning', icon: <Sparkles className="h-8 w-8 text-primary" />, description: 'Fostering curiosity and happiness through engaging educational experiences.' },
  { title: 'Simplicity with Substance', icon: <Zap className="h-8 w-8 text-primary" />, description: 'Focusing on impactful solutions that are accessible and meaningful.' },
];

const milestones = [
  { date: 'June 2023', event: 'Founded with a weekend summer camp; the focus was on giving back through sharing our skills.', icon: <Heart className="text-primary" /> },
  { date: 'November 2023', event: "Launched Let's Donate Clarity—our first community partnership for weekly holistic brain development sessions.", icon: <Brain className="text-primary" /> },
  { date: 'April 2024', event: "Launched major initiatives: Let's Summer and Let's Elevate. Started weekday sessions at girls' orphanages to create deeper impact.", icon: <TrendingUp className="text-primary" /> },
  { date: 'July 2024', event: "Launched Let's Prepare with 80+ volunteers across 6 schools in Raipur. Began long-term engagements with government schools.", icon: <Target className="text-primary" /> },
  { date: '2025 – Present', event: "Currently impacting over 2,000+ children through 5,000+ sessions, supported by 300+ dedicated volunteers.", icon: <Heart className="text-primary animate-pulse" /> },
];

const teamMembers = [
  { name: 'Aakansha Shukla', role: 'Coordination Lead', bio: 'Active across all school sessions, core in Let&apos;s Prepare. Ensures smooth execution and volunteer engagement.', imagePlaceholder: 'Professional headshot of Aakansha Shukla', avatarFallback: 'AS' },
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
      <PageHeader title="About Let&apos;s Donate" subtitle="More than an NGO — a growing movement of empathy.">
        <Users className="h-16 w-16 text-primary mx-auto mt-4" />
      </PageHeader>

      <SectionWrapper id="who-we-are">
        <div className="space-y-6 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 text-center">Who We Are</h2>
          <div className="bg-card/50 rounded-lg p-8 shadow-soft border-l-4 border-primary">
            <p className="text-xl md:text-2xl text-primary/90 font-medium leading-relaxed mb-8">
              Let&apos;s Donate is a community-driven movement making learning joyful and accessible for underprivileged and special children.
            </p>
            
            <p className="text-lg md:text-xl text-primary/80 leading-relaxed mb-6">
              Founded in 2023 by a software engineer who discovered the joy of giving while teaching at an orphanage, we began with a few weekend sessions—and have since grown into a network of volunteers creating hands-on, fun learning experiences across schools, orphanages, and shelters.
            </p>
            
            <p className="text-lg md:text-xl text-primary/80 leading-relaxed italic border-t border-primary/20 pt-6">
              From art and science to storytelling and life skills, our sessions are easy to lead and exciting for kids—proving that anyone can teach, and everyone can give.
            </p>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="mission-vision" className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
          <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-4">Our Mission</h3>
          <p className="text-muted-foreground leading-relaxed">
            To build a more compassionate world by making it easy for anyone to give—whether it&apos;s time, skills, or resources—while creating joyful, inclusive learning experiences that help under-resourced children dream big, grow with confidence, and thrive.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
          <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-4">Our Vision</h3>
          <p className="text-muted-foreground leading-relaxed">
            A world where kindness is a norm, not a rarity. We envision a society where everyone feels empowered to help others—where giving is simple, and resources are used wisely to reach more lives. By enabling people to become changemakers in their own way, we strive to build a world filled with compassion, empathy, and collective growth.
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
      
      <SectionWrapper id="founder-story">
        <Card className="max-w-3xl mx-auto p-6 sm:p-8 rounded-xl shadow-soft bg-background">
          <CardHeader className="text-center">
            <UserCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            <CardTitle className="text-2xl md:text-3xl text-primary">Meet The Founder</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <Avatar className="w-32 h-32 mx-auto mb-6 border-4 border-primary shadow-md">
              <AvatarImage 
                src="https://dl.dropboxusercontent.com/scl/fi/vwjyanc56mt388rgi26gf/Shubham.jpg?rlkey=jk9g3voxi5mo22u5cvu6zj5kz" 
                alt="Shubham Choudhary - Founder of Let's Donate"
              />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-semibold text-primary mb-6">Shubham Choudhary</h3>
            <blockquote className="text-lg italic text-muted-foreground mb-4">"If doing good feels right, it should also be easy."</blockquote>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Started with a simple idea—to make acts of kindness more accessible for everyone—the founder&apos;s journey began with a desire to use his skills to help society. A software engineer by profession, his empathy and vision sparked a community-driven movement where generosity is made easy, and technology, humanity, and joy come together to create lasting change.
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