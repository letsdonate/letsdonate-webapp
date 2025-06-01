import React, { useState, useEffect, useCallback } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Gift, BookOpen, Smile, BarChart3, QrCode, Loader2, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress'; // Re-added Progress

// Component for displaying individual impact items
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

// Component for displaying QR code and related info
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

// Main Page Component
const MoneyDonationPage = () => {
  const [donationInfo, setDonationInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Default/Placeholder data for "Where Money Goes"
  const defaultWhereMoneyGoes = [
    { category: 'Child Education Programs', percentage: 45, color: 'bg-primary' },
    { category: 'Food & Nutrition Support', percentage: 30, color: 'bg-secondary' },
    { category: 'Essential Items Distribution', percentage: 15, color: 'bg-accent' },
    { category: 'Operational & Admin Costs', percentage: 10, color: 'bg-muted-foreground/50' },
  ];
  const [whereMoneyGoesData, setWhereMoneyGoesData] = useState(defaultWhereMoneyGoes);


  const fetchDonationPageContent = useCallback(async () => {
    setLoading(true);
    // Fetch the first 'funds' type donation option. 
    // You might want a more specific way to identify the primary funds info if you have multiple.
    const { data, error } = await supabase
      .from('donation_options')
      .select('*')
      .eq('type', 'funds')
      .order('created_at', { ascending: false })
      .limit(1)
      .single(); // Expects a single row

    if (error && error.code !== 'PGRST116') { // PGRST116: Row not found (ok if no options yet)
      toast({ title: 'Error fetching donation info', description: error.message, variant: 'destructive' });
    } else {
      setDonationInfo(data);
      // If impact_info from DB contains 'where_money_goes' array, use it. Otherwise, use default.
      if (data && data.impact_info && Array.isArray(data.impact_info.where_money_goes)) {
        setWhereMoneyGoesData(data.impact_info.where_money_goes);
      } else {
        setWhereMoneyGoesData(defaultWhereMoneyGoes);
      }
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    fetchDonationPageContent();
  }, [fetchDonationPageContent]);

  const impactExamples = donationInfo?.impact_info?.examples || [
    { amount: 200, benefit: '5 notebooks for students', iconName: 'BookOpen' },
    { amount: 500, benefit: 'A nutritional meal kit for a family', iconName: 'Gift' },
    { amount: 1000, benefit: 'Educational toys pack for a learning center', iconName: 'Smile' },
  ];
  
  const iconMap = {
    BookOpen: <BookOpen className="h-8 w-8 text-primary" />,
    Gift: <Gift className="h-8 w-8 text-primary" />,
    Smile: <Smile className="h-8 w-8 text-primary" />,
  };


  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
        <p className="text-muted-foreground">Loading donation information...</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4">
      <PageHeader 
        title={donationInfo?.title || "Where Your Money Goes"}
        subtitle={donationInfo?.description || "Your financial contribution empowers us to continue our work and expand our reach. Every rupee makes a difference."}
      >
        <DollarSign className="h-16 w-16 text-primary mx-auto mt-4" />
      </PageHeader>

      {!donationInfo && !loading && (
        <SectionWrapper>
          <Card className="text-center py-12 shadow-soft bg-background">
            <CardHeader>
              <AlertTriangle className="mx-auto h-12 w-12 text-secondary mb-4" />
              <CardTitle className="text-2xl text-primary">Donation Information Not Available</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Information about fund donations is currently being updated. Please check back soon or contact us for details.
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Admins: Please add content for 'funds' type in the 'Manage Donations Info' panel.
              </p>
            </CardContent>
          </Card>
        </SectionWrapper>
      )}

      {donationInfo && (
        <>
          <SectionWrapper id="donation-impact">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 md:mb-16">
              See the Impact of Your Generosity
            </h2>
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {impactExamples.map((item, index) => (
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
                qrCodeUrl={donationInfo.qr_code_url} 
                contactInfo={donationInfo.contact_info}
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
                  We are committed to transparency. Here’s how contributions like yours are typically utilized:
                </p>
                <div className="space-y-3">
                  {whereMoneyGoesData.map((item, index) => (
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
                  Note: Percentages are indicative and may vary based on current needs and projects. Detailed financial reports are available upon request.
                </p>
              </motion.div>
            </div>
          </SectionWrapper>
        </>
      )}

      <SectionWrapper id="other-ways-to-help" className="text-center mt-16 md:mt-24">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">More Ways to Contribute</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          Beyond funds, your time and material donations are invaluable. Explore how you can help.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <motion.div initial={{ opacity: 0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay: 0.2 }}>
            <Card className="p-6 rounded-xl shadow-soft hover:shadow-soft-hover transition-shadow h-full">
              <CardHeader className="items-center">
                <Gift className="h-10 w-10 text-secondary mb-3" />
                <CardTitle className="text-xl text-primary">Donate Materials</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Books, clothes, toys, and other essentials can make a big difference.</p>
                <PageHeader.Button asChild variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">
                  <PageHeader.Link to="/donate/material">Learn More</PageHeader.Link>
                </PageHeader.Button>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay: 0.4 }}>
            <Card className="p-6 rounded-xl shadow-soft hover:shadow-soft-hover transition-shadow h-full">
              <CardHeader className="items-center">
                <Smile className="h-10 w-10 text-accent mb-3" />
                <CardTitle className="text-xl text-primary">Volunteer Your Time</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Join our events, share your skills, and directly impact lives.</p>
                <PageHeader.Button asChild variant="outline" className="border-accent text-accent hover:bg-accent/10">
                  <PageHeader.Link to="/donate/time">Become a Volunteer</PageHeader.Link>
                </PageHeader.Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default MoneyDonationPage;