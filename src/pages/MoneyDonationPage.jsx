import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, Gift, BookOpen, Smile, BarChart3, QrCode, Loader2, AlertTriangle, FolderHeart as HandHeart } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';

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
  </motion.div>
);

const MoneyDonationPage = () => {
  const [donationInfo, setDonationInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const defaultImpactInfo = {
    examples: [
      { amount: 200, benefit: 'Provide 5 high-quality notebooks for eager students.', iconName: 'BookOpen' },
      { amount: 500, benefit: 'Sponsor a nutritious meal kit for a family in need.', iconName: 'Gift' },
      { amount: 1000, benefit: 'Gift an educational toy pack to a learning center, sparking joy and curiosity.', iconName: 'Smile' },
      { amount: 2500, benefit: 'Support a child’s basic educational expenses for a month.', iconName: 'DollarSign'},
    ],
    where_money_goes: [
      { category: 'Child Education Programs', percentage: 45, color: 'bg-primary' },
      { category: 'Food & Nutrition Support', percentage: 30, color: 'bg-secondary' },
      { category: 'Essential Items Distribution', percentage: 15, color: 'bg-accent' },
      { category: 'Operational & Admin Costs', percentage: 10, color: 'bg-muted-foreground/50' },
    ]
  };

  const fetchDonationPageContent = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('donation_options')
      .select('*')
      .eq('type', 'funds')
      .order('created_at', { ascending: false })
      .limit(1)
      .single(); 

    if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found, which is not an error for .single()
      toast({ title: 'Error fetching donation info', description: error.message, variant: 'destructive' });
      setDonationInfo({ title: "Where Your Money Goes", description: "Your financial contribution empowers us to continue our vital work and expand our reach. Every rupee makes a significant difference in the lives we touch.", impact_info: defaultImpactInfo, qr_code_url: '/images/placeholder-qr.png', contact_info: "For other donation methods, please contact us." });
    } else if (data) {
      setDonationInfo({
        ...data,
        impact_info: data.impact_info || defaultImpactInfo, // Ensure impact_info is not null
      });
    } else {
      // No data found, use defaults
      setDonationInfo({ title: "Where Your Money Goes", description: "Your financial contribution empowers us to continue our vital work and expand our reach. Every rupee makes a significant difference in the lives we touch.", impact_info: defaultImpactInfo, qr_code_url: '/images/placeholder-qr.png', contact_info: "For other donation methods, please contact us." });
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    fetchDonationPageContent();
  }, [fetchDonationPageContent]);
  
  const iconMap = {
    BookOpen: <BookOpen className="h-8 w-8 text-primary" />,
    Gift: <Gift className="h-8 w-8 text-primary" />,
    Smile: <Smile className="h-8 w-8 text-primary" />,
    DollarSign: <DollarSign className="h-8 w-8 text-primary" />,
    HandHeart: <HandHeart className="h-8 w-8 text-primary" />,
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
        <p className="text-muted-foreground">Loading donation information...</p>
      </div>
    );
  }
  
  const currentImpactInfo = donationInfo?.impact_info || defaultImpactInfo;
  const currentWhereMoneyGoes = currentImpactInfo.where_money_goes || defaultImpactInfo.where_money_goes;
  const currentImpactExamples = currentImpactInfo.examples || defaultImpactInfo.examples;

  return (
    <div className="container mx-auto px-4">
      <PageHeader 
        title={donationInfo?.title || "Where Your Money Goes"}
        subtitle={donationInfo?.description || "Your financial contribution empowers us to continue our vital work and expand our reach. Every rupee makes a significant difference in the lives we touch."}
      >
        <DollarSign className="h-16 w-16 text-primary mx-auto mt-4" />
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
              icon={iconMap[item.iconName] || <DollarSign className="h-8 w-8 text-primary" />} 
              amount={item.amount} 
              benefit={item.benefit}
              delay={index}
            />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper id="payment-methods" className="bg-primary/5 rounded-xl py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <QrCodeSection 
            qrCodeUrl={donationInfo?.qr_code_url || '/images/placeholder-qr.png'} 
            contactInfo={donationInfo?.contact_info || "For other donation methods, please contact us."}
            delay={0}
          />
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold text-primary flex items-center">
              <BarChart3 className="h-7 w-7 mr-2" /> Transparency Promise
            </h3>
            <p className="text-muted-foreground">
              We are committed to transparency and ensuring your donation is used effectively. Here’s an indicative breakdown of how contributions are typically utilized:
            </p>
            <div className="space-y-3">
              {currentWhereMoneyGoes.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-foreground">{item.category}</span>
                    <span className="font-semibold text-primary">{item.percentage}%</span>
                  </div>
                  <Progress value={item.percentage} className="h-3 rounded-full" indicatorClassName={item.color} />
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Note: Percentages are indicative and may vary based on current needs and specific projects. Detailed financial reports are available upon request for full transparency.
            </p>
          </motion.div>
        </div>
      </SectionWrapper>
      
      <SectionWrapper id="other-ways-to-help" className="text-center mt-16 md:mt-24">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">More Ways to Contribute</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          Beyond funds, your time and material donations are invaluable. Explore how you can help create a bigger impact.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <motion.div initial={{ opacity: 0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay: 0.2 }} className="flex-1">
            <Card className="p-6 rounded-xl shadow-soft hover:shadow-soft-hover transition-shadow h-full flex flex-col">
              <CardHeader className="items-center">
                <Gift className="h-10 w-10 text-secondary mb-3" />
                <CardTitle className="text-xl text-primary">Donate Materials</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground mb-4">Books, clothes, toys, and other essentials can make a big difference in someone's life.</p>
              </CardContent>
              <Button asChild variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 mt-auto">
                <Link to="/donate/material">Learn More</Link>
              </Button>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay: 0.4 }} className="flex-1">
            <Card className="p-6 rounded-xl shadow-soft hover:shadow-soft-hover transition-shadow h-full flex flex-col">
              <CardHeader className="items-center">
                <Smile className="h-10 w-10 text-accent mb-3" />
                <CardTitle className="text-xl text-primary">Volunteer Your Time</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground mb-4">Join our events, share your skills, and directly impact lives through your presence and effort.</p>
              </CardContent>
              <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent/10 mt-auto">
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