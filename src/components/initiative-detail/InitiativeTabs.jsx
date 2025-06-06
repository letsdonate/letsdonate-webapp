import React from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ExternalLink, Users, Info, Phone, FolderHeart as HandHeart, Gift, ArrowRight } from 'lucide-react';
import { staticInitiativesData } from '@/data/initiativesData';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 }
  })
};

const InitiativeTabs = ({ initiative }) => {

  const getContributionIcon = (type) => {
    if (type.toLowerCase().includes('volunteer') || type.toLowerCase().includes('mentor') || type.toLowerCase().includes('tutor') || type.toLowerCase().includes('facilitator')) {
      return <Users className="h-5 w-5 mr-2 text-primary" />;
    }
    if (type.toLowerCase().includes('donate material') || type.toLowerCase().includes('donate warm clothes') || type.toLowerCase().includes('donate saplings') || type.toLowerCase().includes('donate study materials')) {
      return <Gift className="h-5 w-5 mr-2 text-primary" />;
    }
    if (type.toLowerCase().includes('sponsor') || type.toLowerCase().includes('fund') || type.toLowerCase().includes('support resources')) {
      return <span className="font-bold text-lg mr-2 text-primary">₹</span>;
    }
    return <Info className="h-5 w-5 mr-2 text-primary" />;
  };


  return (
    <Tabs defaultValue="contribute" className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2 bg-muted p-1 rounded-lg mb-6">
        <TabsTrigger value="contribute" className="text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">How to Contribute</TabsTrigger>
        <TabsTrigger value="contact" className="text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Contact Us</TabsTrigger>
        {initiative.testimonials && initiative.testimonials.length > 0 && (
          <TabsTrigger value="testimonials" className="text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Testimonials</TabsTrigger>
        )}
        <TabsTrigger value="related" className="text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">More Initiatives</TabsTrigger>
      </TabsList>

      <TabsContent value="contribute">
        <Card className="shadow-md rounded-xl bg-background">
          <CardHeader>
            <CardTitle className="text-xl text-primary flex items-center">
              <HandHeart className="h-6 w-6 mr-2 text-secondary" />
              Get Involved
            </CardTitle>
            <CardDescription>Your support can make a significant difference. Here’s how you can contribute:</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initiative.howToContribute && initiative.howToContribute.map((item, index) => (
              <motion.custom key={index} custom={index} initial="hidden" animate="visible" variants={cardVariants}>
                <Card className="h-full flex flex-col justify-between p-5 rounded-lg border border-border hover:shadow-lg transition-shadow bg-card">
                  <div>
                    <div className="flex items-center mb-2">
                      {getContributionIcon(item.type)}
                      <h4 className="font-semibold text-md text-foreground">{item.type}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{item.description}</p>
                  </div>
                  {item.link && (
                    <Button asChild size="sm" variant="outline" className="w-full mt-auto text-xs border-primary text-primary hover:bg-primary/10">
                      <Link to={item.link} className="flex items-center justify-center">
                        Learn More <ExternalLink className="h-3 w-3 ml-1.5" />
                      </Link>
                    </Button>
                  )}
                </Card>
              </motion.custom>
            ))}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="contact">
        <Card className="shadow-md rounded-xl bg-background">
          <CardHeader>
            <CardTitle className="text-xl text-primary flex items-center">
              <Phone className="h-6 w-6 mr-2 text-secondary" />
              Contact Information
            </CardTitle>
            <CardDescription>Reach out for more details or specific queries about {initiative.title}.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p><strong className="font-semibold text-foreground">Contact Person:</strong> <span className="text-muted-foreground">{initiative.contact?.person || 'N/A'}</span></p>
            <p><strong className="font-semibold text-foreground">Email:</strong> <a href={`mailto:${initiative.contact?.email}`} className="text-primary hover:underline">{initiative.contact?.email || 'N/A'}</a></p>
            <p><strong className="font-semibold text-foreground">Phone:</strong> <span className="text-muted-foreground">{initiative.contact?.phone || 'N/A'}</span></p>
            <Button asChild variant="default" className="mt-4">
                <Link to="/about-us#contact-us-section">General Inquiries</Link> 
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
      
      {initiative.testimonials && initiative.testimonials.length > 0 && (
        <TabsContent value="testimonials">
          <Card className="shadow-md rounded-xl bg-background">
            <CardHeader>
              <CardTitle className="text-xl text-primary">Voices of Impact</CardTitle>
              <CardDescription>Hear from those who've experienced our work firsthand.</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              {initiative.testimonials.map((testimonial, index) => (
                <motion.custom key={index} custom={index} initial="hidden" animate="visible" variants={cardVariants}>
                  <Card className="p-5 rounded-lg border border-border bg-card text-sm">
                    <blockquote className="italic text-muted-foreground">"{testimonial.quote}"</blockquote>
                    <p className="text-right font-semibold mt-2 text-foreground">- {testimonial.author}, <span className="text-xs text-muted-foreground">{testimonial.location}</span></p>
                  </Card>
                </motion.custom>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      )}

      <TabsContent value="related">
        <Card className="shadow-md rounded-xl bg-background">
          <CardHeader>
              <CardTitle className="text-xl text-primary">Explore Other Initiatives</CardTitle>
              <CardDescription>Discover more ways we are making a difference.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {staticInitiativesData.filter(i => i.id !== initiative.id).slice(0,3).map((relatedInitiative) => (
              <Link 
                key={relatedInitiative.id} 
                to={`/initiatives-events/${relatedInitiative.id}`}
                className="block p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors group"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-md text-primary group-hover:underline">{relatedInitiative.title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-1">{relatedInitiative.shortDescription}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-primary opacity-70 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            ))}
          </CardContent>
          <CardContent className="text-center mt-6">
               <Button asChild variant="default">
                  <Link to="/initiatives-events">View All Initiatives & Events</Link>
              </Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default InitiativeTabs;