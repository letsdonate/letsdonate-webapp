import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gift, BookOpen, Smile, QrCode, Loader2, Users, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';

const ImpactItem = ({ icon, amount, benefit, delay }) => (
  <motion.div
    className="flex flex-col items-center text-center p-4 bg-background rounded-lg shadow-soft"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: delay * 0.15, duration: 0.5 }}
  >
    {icon}
    <p className="text-xl font-semibold text-primary mt-2">₹{amount}</p>
    <p className="text-sm text-muted-foreground">{benefit}</p>
  </motion.div>
);

const QrCodeSection = ({ qrCodeUrl, contactInfo, delay }) => (
  <motion.div
    className="bg-background p-6 rounded-xl shadow-soft text-center"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: delay * 0.2, duration: 0.6 }}
  >
    <h3 className="text-2xl font-semibold text-primary mb-4 flex items-center justify-center">
      <QrCode className="h-7 w-7 mr-2" /> Donate via UPI
    </h3>
    <p className="text-sm text-muted-foreground mb-3">
      While we deeply appreciate financial support, we also highly encourage donating your valuable time to make a direct impact.
    </p>
    {qrCodeUrl ? (
      <img 
        src={qrCodeUrl} 
        alt="UPI QR Code for Let's Donate" 
        className="h-48 w-48 md:h-56 md:w-56 object-contain rounded-lg mx-auto mb-4 border-2 border-primary p-1 shadow-md"
      />
    ) : (
      <div className="h-48 w-48 md:h-56 md:w-56 bg-muted/50 flex items-center justify-center rounded-lg mx-auto mb-4 border-2 border-dashed border-primary/50">
        <p className="text-sm text-muted-foreground">QR Code Coming Soon</p>
      </div>
    )}
    {contactInfo && <p className="text-muted-foreground text-sm mt-2">{contactInfo}</p>}
    <p className="text-xs text-muted-foreground mt-3">Scan using any UPI app (Google Pay, PhonePe, Paytm, etc.)</p>
    <p className="text-xs text-muted-foreground/80 mt-4 max-w-md mx-auto">
      We are not a registered NGO, but we ensure your contribution is utilized in the best possible way. 
      Contact us on <a href="mailto:letsdonateofficial@gmail.com" className="text-primary hover:underline">letsdonateofficial@gmail.com</a> or <a href="tel:+918109710356" className="text-primary hover:underline">+91 8109710356</a> for any queries.
    </p>
  </motion.div>
);

const MoneyDonationPage = () => {
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const defaultImpactInfo = {
    examples: [
      { amount: 200, benefit: 'Provide 5 high-quality notebooks for eager students.', iconName: 'BookOpen' },
      { amount: 500, benefit: 'Sponsor a nutritious meal kit for a family in need.', iconName: 'Gift' },
      { amount: 1000, benefit: 'Gift an educational toy pack to a learning center, sparking joy and curiosity.', iconName: 'Smile' },
      { amount: 2500, benefit: 'Support a child’s basic educational expenses for a month.', iconName: 'Rupee'},
    ]
  };

  const fallbackPageContent = { 
    title: "Where Your Money Goes", 
    description: "Your financial contribution empowers us to continue our vital work and expand our reach. Every rupee makes a significant difference in the lives we touch.", 
    impact_info: defaultImpactInfo, 
    qr_code_url: "https://storage.googleapis.com/hostinger-horizons-assets-prod/024023c4-ed43-42c4-98a8-13e531a971a7/4981ba572bd02005b48385ceb0e64a88.png",
    contact_info: "UPI ID: shubham150796-2@okaxis" 
  };

  const fetchDonationPageContent = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('donation_options')
        .select('*')
        .eq('type', 'funds')
        .order('created_at', { ascending: false })
        .limit(1)
        .single(); 

      if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found, which is fine
        throw error;
      }
      
      if (data) {
        setPageContent({
          ...data,
          impact_info: data.impact_info || defaultImpactInfo,
          qr_code_url: data.qr_code_url || fallbackPageContent.qr_code_url,
          contact_info: data.contact_info || fallbackPageContent.contact_info,
        });
      } else {
        setPageContent(fallbackPageContent);
      }
    } catch (error) {
      toast({ title: 'Error fetching donation info', description: error.message, variant: 'destructive' });
      setPageContent(fallbackPageContent);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchDonationPageContent();
  }, [fetchDonationPageContent]);
  
  const iconMap = {
    BookOpen: <BookOpen className="h-8 w-8 text-primary" />,
    Gift: <Gift className="h-8 w-8 text-primary" />,
    Smile: <Smile className="h-8 w-8 text-primary" />,
    Rupee: <span className="font-bold text-3xl text-primary">₹</span>,
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
        <p className="text-muted-foreground">Loading donation information...</p>
      </div>
    );
  }
  
  const currentTitle = pageContent?.title || fallbackPageContent.title;
  const currentDescription = pageContent?.description || fallbackPageContent.description;
  const currentImpactInfo = pageContent?.impact_info || fallbackPageContent.impact_info;
  const currentImpactExamples = currentImpactInfo?.examples || defaultImpactInfo.examples;
  const currentQrCodeUrl = pageContent?.qr_code_url || fallbackPageContent.qr_code_url;
  const currentContactInfo = pageContent?.contact_info || fallbackPageContent.contact_info;


  return (
    <div className="container mx-auto px-4">
      <PageHeader 
        title={currentTitle}
        subtitle={currentDescription}
      >
        <span className="font-bold text-6xl text-primary mx-auto mt-4">₹</span>
      </PageHeader>

      <SectionWrapper id="donation-impact">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-6">
          See the Impact of Your Generosity
        </h2>
        <p className="text-center text-muted-foreground mb-12 md:mb-16 max-w-2xl mx-auto">
          Your donation directly translates into meaningful change. Here are a few examples of how your contribution can help:
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {currentImpactExamples.map((item, index) => (
            <ImpactItem 
              key={index} 
              icon={iconMap[item.iconName] || <span className="font-bold text-3xl text-primary">₹</span>} 
              amount={item.amount} 
              benefit={item.benefit}
              delay={index}
            />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper id="payment-methods" className="bg-primary/5 rounded-xl py-16 md:py-20">
        <QrCodeSection 
          qrCodeUrl={currentQrCodeUrl} 
          contactInfo={currentContactInfo}
          delay={0}
        />
      </SectionWrapper>
      
      <SectionWrapper id="other-ways-to-help" className="text-center mt-16 md:mt-24">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">More Ways to Contribute</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          Beyond funds, your time and material donations are invaluable. Explore how you can help create a bigger impact.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, y:20 }} 
            whileInView={{ opacity:1, y:0 }} 
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 rounded-xl shadow-soft hover:shadow-soft-hover transition-shadow h-full flex flex-col items-center bg-card">
              <CardHeader className="items-center text-center">
                <Gift className="h-12 w-12 text-secondary mb-4" />
                <CardTitle className="text-2xl text-primary">Donate Materials</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow text-center">
                <p className="text-muted-foreground mb-6">Books, clothes, toys, and other essentials can make a big difference in someone's life.</p>
              </CardContent>
              <Button asChild variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 mt-auto w-full sm:w-auto">
                <Link to="/donate/material">Learn About Material Donations</Link>
              </Button>
            </Card>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y:20 }} 
            whileInView={{ opacity:1, y:0 }} 
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6 rounded-xl shadow-soft hover:shadow-soft-hover transition-shadow h-full flex flex-col items-center bg-card">
              <CardHeader className="items-center text-center">
                <Users className="h-12 w-12 text-accent mb-4" />
                <CardTitle className="text-2xl text-primary">Volunteer Your Time</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow text-center">
                <p className="text-muted-foreground mb-6">Join our events, share your skills, and directly impact lives through your presence and effort.</p>
              </CardContent>
              <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent/10 mt-auto w-full sm:w-auto">
                <Link to="/donate/time">Become a Volunteer</Link>
              </Button>
            </Card>
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default MoneyDonationPage;