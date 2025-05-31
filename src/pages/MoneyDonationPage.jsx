
import React, { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { DollarSign, Gift, BookOpen, Smile, BarChart3, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

const donationTiers = [
  { amount: 200, impact: '5 notebooks for students', icon: <BookOpen className="h-8 w-8 text-primary" /> },
  { amount: 500, impact: 'A nutritional meal kit for a family', icon: <Gift className="h-8 w-8 text-primary" /> },
  { amount: 1000, impact: 'Educational toys for a learning center', icon: <Smile className="h-8 w-8 text-primary" /> },
  { amount: 0, impact: 'Your custom amount makes a difference!', icon: <DollarSign className="h-8 w-8 text-primary" /> },
];

const whereMoneyGoes = [
  { category: 'Child Education Programs', percentage: 40, color: 'bg-primary' },
  { category: 'Community Health Initiatives', percentage: 30, color: 'bg-secondary' },
  { category: 'Skill Development Workshops', percentage: 20, color: 'bg-accent' },
  { category: 'Operational Costs', percentage: 10, color: 'bg-muted-foreground' },
];

const MoneyDonationPage = () => {
  const [amount, setAmount] = useState('');
  const [selectedTier, setSelectedTier] = useState(null);
  const { toast } = useToast();

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || (/^\d+$/.test(value) && parseInt(value) >= 0)) {
      setAmount(value);
      setSelectedTier(null); // Deselect tier if typing custom amount
    }
  };

  const handleTierSelect = (tierAmount) => {
    if (tierAmount > 0) {
      setAmount(tierAmount.toString());
      setSelectedTier(tierAmount);
    } else { // Custom amount tier
      setAmount('');
      setSelectedTier(0);
    }
  };

  const handleDonate = () => {
    const numericAmount = parseInt(amount);
    if (!numericAmount || numericAmount <= 0) {
      toast({ title: "Invalid Amount", description: "Please enter a valid donation amount.", variant: "destructive" });
      return;
    }
    
    toast({
      title: "Stripe Integration Pending",
      description: (
        <div>
          <p className="mb-2">Awesome! You're ready to donate ₹{numericAmount}.</p>
          <p className="mb-2">To complete the payment setup with Stripe, the project owner needs to provide the Stripe Publishable API Key and Price ID.</p>
          <p>Once these are configured, this button will initiate the Stripe Checkout process.</p>
          <p className="mt-2 font-semibold">For now, this is a simulation.</p>
        </div>
      ),
      duration: 9000,
    });
    // In a real app, this would trigger Stripe checkout.
    // For now, we'll just show a toast message with guidance.
    // User will need to complete Stripe setup steps.
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.1, duration: 0.4, type: 'spring', stiffness: 100 },
    }),
  };

  return (
    <div>
      <PageHeader title="Donate Funds" subtitle="Your financial contribution empowers us to continue our work and expand our reach. Every rupee counts!">
        <DollarSign className="h-16 w-16 text-primary mx-auto mt-4" />
      </PageHeader>

      <SectionWrapper id="donation-form">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div initial={{ opacity:0, x: -50 }} animate={{ opacity:1, x: 0 }} transition={{ duration: 0.6 }}>
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Make a Secure Donation</CardTitle>
                <CardDescription>Choose a preset amount or enter your own.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {donationTiers.filter(t => t.amount > 0).map((tier, index) => (
                    <Button
                      key={index}
                      variant={selectedTier === tier.amount ? "default" : "outline"}
                      className="h-auto py-3 flex flex-col items-start text-left"
                      onClick={() => handleTierSelect(tier.amount)}
                    >
                      <span className="text-xl font-bold">₹{tier.amount}</span>
                      <span className="text-xs">{tier.impact}</span>
                    </Button>
                  ))}
                </div>
                
                <div>
                  <Label htmlFor="custom-amount" className="text-sm font-medium">Or Enter Custom Amount (₹)</Label>
                  <Input
                    id="custom-amount"
                    type="number"
                    placeholder="e.g., 750"
                    value={amount}
                    onChange={handleAmountChange}
                    className="mt-1 text-lg p-3"
                  />
                </div>
                
                <div className="p-4 bg-green-50 border border-green-200 rounded-md text-green-700">
                  <p className="font-semibold text-sm flex items-center">
                    <Info className="h-4 w-4 mr-2" /> Note on Stripe Integration
                  </p>
                  <p className="text-xs mt-1">
                    This is a demo. To enable real payments, please follow the Stripe setup guide:
                  </p>
                  <ol className="list-decimal list-inside text-xs mt-1 space-y-0.5">
                    <li>Create a <a href="https://dashboard.stripe.com/register" target="_blank" rel="noopener noreferrer" className="underline">Stripe account</a>.</li>
                    <li>Enable <a href="https://dashboard.stripe.com/settings/checkout" target="_blank" rel="noopener noreferrer" className="underline">Client-only Checkout</a>.</li>
                    <li>Create a product and get its <a href="https://dashboard.stripe.com/products" target="_blank" rel="noopener noreferrer" className="underline">Price ID</a>.</li>
                    <li>Get your <a href="https://dashboard.stripe.com/apikeys" target="_blank" rel="noopener noreferrer" className="underline">Publishable API key</a>.</li>
                    <li>Whitelist your domain for Live mode.</li>
                    <li>Provide the API key and Price ID to Horizons.</li>
                  </ol>
                </div>

              </CardContent>
              <CardFooter>
                <Button size="lg" className="w-full text-lg py-3" onClick={handleDonate}>
                  Donate ₹{amount || '0'} Securely
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity:0, x: 50 }} animate={{ opacity:1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <Card className="shadow-xl bg-muted/30">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center"><BarChart3 className="h-6 w-6 mr-2 text-secondary" />Where Your Money Goes</CardTitle>
                <CardDescription>We believe in transparency. Here's how your contributions are utilized.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {whereMoneyGoes.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{item.category}</span>
                      <span className="font-semibold text-foreground">{item.percentage}%</span>
                    </div>
                    <Progress value={item.percentage} className="h-3" indicatorClassName={item.color} />
                  </div>
                ))}
                <p className="text-sm text-muted-foreground mt-4">
                  Detailed financial reports are available upon request. We are committed to ensuring every donation is used effectively.
                </p>
              </CardContent>
              <CardFooter className="flex flex-col items-start space-y-2">
                <p className="text-lg font-semibold text-primary">"Give a little, help a lot."</p>
                <p className="text-sm">Your generosity fuels our mission and brings hope to many.</p>
                <div className="mt-4 w-full">
                  <h3 className="font-semibold mb-2 text-foreground">Other ways to pay:</h3>
                  <div className="flex items-center space-x-4 p-4 border rounded-md bg-background">
                    <img  className="h-16 w-16 object-contain" alt="UPI QR Code Placeholder" src="https://images.unsplash.com/photo-1595079676339-1534801ad6cf" />
                    <div>
                      <p className="font-medium">Scan to Pay with UPI</p>
                      <p className="text-xs text-muted-foreground">Use any UPI app like Google Pay, PhonePe, Paytm.</p>
                    </div>
                  </div>
                  <p className="text-xs text-center mt-2 text-muted-foreground">(QR Code and UPI details will be functional post-setup)</p>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="impact-stories" className="bg-secondary/10 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-12">Stories of Impact</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Empowering Young Minds", story: "With your donations, we provided 200 children with essential school supplies, enabling them to pursue their education with confidence.", image: "school-supplies-distribution", icon: <BookOpen/> },
            { title: "Nourishing Communities", story: "Last month, we distributed over 500 meal kits to families in need, ensuring they have access to nutritious food.", image: "meal-kit-distribution", icon: <Gift/> },
            { title: "Sparking Joy & Learning", story: "Our new learning center, equipped with educational toys funded by your support, is now a hub of creativity for local children.", image: "children-playing-learning-center", icon: <Smile/> },
          ].map((item, index) => (
            <motion.custom key={index} custom={index} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={cardVariants}>
              <Card className="h-full flex flex-col shadow-lg glassmorphism">
                <CardHeader>
                  <div className="text-primary mb-2 flex items-center justify-center text-3xl">{item.icon}</div>
                  <CardTitle className="text-xl text-center">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <img  className="w-full h-40 object-cover rounded-md mb-4" alt={item.title} src="https://images.unsplash.com/photo-1576976894811-7e65125a88ea" />
                  <p className="text-sm text-muted-foreground">{item.story}</p>
                </CardContent>
              </Card>
            </motion.custom>
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
};

export default MoneyDonationPage;
  