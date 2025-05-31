
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import SectionWrapper from '@/components/shared/SectionWrapper';
import PageHeader from '@/components/shared/PageHeader';
import { Clock, DollarSign, Gift, Users, PlayCircle, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const donationOptions = [
  { title: 'Donate Time', description: 'Volunteer your skills and time for our causes.', icon: <Clock className="h-12 w-12 text-primary mb-4" />, link: '/donate/time', cta: 'Volunteer Now' },
  { title: 'Donate Money', description: 'Support our projects financially and make a direct impact.', icon: <DollarSign className="h-12 w-12 text-primary mb-4" />, link: '/donate/money', cta: 'Give Financially' },
  { title: 'Donate Material', description: 'Contribute essential goods like books, clothes, and toys.', icon: <Gift className="h-12 w-12 text-primary mb-4" />, link: '/donate/material', cta: 'Gift Items' },
];

const testimonials = [
  { quote: "Volunteering with Let's Donate has been an incredibly rewarding experience. Seeing the smiles on the children's faces is priceless.", author: "Aisha K.", role: "Volunteer Teacher", avatarText: "AK" },
  { quote: "The transparency in how donations are used is commendable. I know my contribution is making a real difference.", author: "Rohan S.", role: "Donor", avatarText: "RS" },
  { quote: "Let's Donate creates such a positive environment. It's more than an NGO; it's a community.", author: "Priya M.", role: "Event Participant", avatarText: "PM" },
];

const LandingPage = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
  };

  return (
    <div className="space-y-12 md:space-y-20">
      <PageHeader title="Small actions. Big change." subtitle="Join Let's Donate in spreading compassion and driving positive change. Your contribution, big or small, makes a world of difference.">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button size="lg" asChild className="mt-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground">
            <Link to="/donate/money">Get Involved Now</Link>
          </Button>
        </motion.div>
      </PageHeader>

      <SectionWrapper id="donation-options">
        <h2 className="text-3xl font-bold text-center mb-12">How You Can Help</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {donationOptions.map((option, index) => (
            <motion.custom
              key={option.title}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              className="h-full"
            >
              <Card className="text-center h-full flex flex-col transform hover:scale-105 transition-transform duration-300 shadow-xl hover:shadow-2xl border-2 border-transparent hover:border-primary">
                <CardHeader>
                  <div className="mx-auto">{option.icon}</div>
                  <CardTitle className="text-2xl">{option.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-base">{option.description}</CardDescription>
                </CardContent>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link to={option.link}>{option.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.custom>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper id="about-intro" className="bg-secondary/10 rounded-lg">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">Our Story of Compassion</h2>
            <p className="text-lg mb-4">
              Let's Donate is a volunteer-led initiative that started with a few sessions among friends and has now touched thousands of children's lives. We believe that sharing—whether time, resources, or care—brings joy and meaning to life.
            </p>
            <p className="text-lg mb-6">
              Our mission is to foster a culture of empathy and create lasting positive change in our communities.
            </p>
            <Button asChild variant="secondary">
              <Link to="/about-us">Learn More About Us</Link>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative aspect-video rounded-lg overflow-hidden shadow-lg group cursor-pointer"
            onClick={() => alert("Video playback functionality to be implemented.")}
          >
            <img   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Founder of Let's Donate speaking" src="https://images.unsplash.com/photo-1593656213525-10f3061fd98c" />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <PlayCircle className="h-20 w-20 text-white/80 group-hover:text-white transition-colors" />
            </div>
            <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/70 to-transparent w-full">
              <p className="text-white text-lg font-semibold">Message from Our Founder</p>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>
      
      <SectionWrapper id="impact-preview">
        <h2 className="text-3xl font-bold text-center mb-12">Making a Difference, Together</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div custom={0} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <Card className="bg-gradient-to-br from-primary/20 to-accent/20 p-6 text-center shadow-lg">
              <Users className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-primary mb-2">5000+</h3>
              <p className="text-lg font-semibold text-foreground">Lives Touched</p>
              <p className="text-sm text-muted-foreground">Through various programs and initiatives.</p>
            </Card>
          </motion.div>
          <motion.div custom={1} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <Card className="bg-gradient-to-br from-secondary/20 to-blue-300/20 p-6 text-center shadow-lg">
              <Clock className="h-16 w-16 text-secondary mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-secondary mb-2">10,000+</h3>
              <p className="text-lg font-semibold text-foreground">Volunteer Hours</p>
              <p className="text-sm text-muted-foreground">Dedicated by our passionate volunteers.</p>
            </Card>
          </motion.div>
          <motion.div custom={2} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-400/20 p-6 text-center shadow-lg">
              <Gift className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-yellow-600 mb-2">20,000+</h3>
              <p className="text-lg font-semibold text-foreground">Items Donated</p>
              <p className="text-sm text-muted-foreground">Including books, clothes, and essentials.</p>
            </Card>
          </motion.div>
        </div>
        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link to="/events-gallery">See Our Gallery</Link>
          </Button>
        </div>
      </SectionWrapper>

      <SectionWrapper id="testimonials" className="bg-muted/30 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-12">Voices of Our Community</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.custom
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
            >
              <Card className="h-full flex flex-col shadow-lg glassmorphism">
                <CardContent className="pt-6 flex-grow">
                  <MessageSquare className="h-8 w-8 text-primary mb-4 opacity-50" />
                  <p className="italic text-foreground/90 mb-4">"{testimonial.quote}"</p>
                </CardContent>
                <CardFooter className="flex items-center space-x-3 border-t pt-4 mt-auto">
                  <Avatar>
                    <AvatarImage src={`https://source.unsplash.com/random/100x100/?person,${index+3}`} alt={testimonial.author} />
                    <AvatarFallback>{testimonial.avatarText}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardFooter>
              </Card>
            </motion.custom>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper id="call-to-action" className="text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
          "Be the reason someone believes in kindness again." Your journey of compassion starts here.
        </p>
        <div className="space-x-4">
          <Button size="lg" asChild>
            <Link to="/donate/money">Donate Now</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/donate/time">Become a Volunteer</Link>
          </Button>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default LandingPage;
  