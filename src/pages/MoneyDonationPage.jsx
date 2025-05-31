import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { DollarSign, Gift, BookOpen, Smile, BarChart3, Info, Phone, QrCode, ShieldCheck, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const donationTiers = [
  { amount: 200, impact: '5 notebooks for students', icon: <BookOpen className="h-6 w-6 text-primary" /> },
  { amount: 500, impact: 'A nutritional meal kit', icon: <Gift className="h-6 w-6 text-primary" /> },
  { amount: 1000, impact: 'Educational toys pack', icon: <Smile className="h-6 w-6 text-primary" /> },
];

const whereMoneyGoes = [
  { category: 'Child Education Programs', percentage: 45, color: 'bg-primary' },
  { category: 'Food & Nutrition Support', percentage: 30, color: 'bg-secondary' },
  { category: 'Essential Items Distribution', percentage: 15, color: 'bg-accent' },
  { category: 'Operational & Admin Costs', percentage: 10, color: 'bg-muted-foreground/50' },
];

const RAZORPAY_KEY_ID = 'YOUR_RAZORPAY_KEY_ID'; // Placeholder

const MoneyDonationPage = () => {
  const [moneyDonations, setMoneyDonations] = useLocalStorage('moneyDonationSubmissions', []);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    amount: '',
    paymentMethod: 'stripe', 
    message: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'amount' && value !== '' && (!/^\d*$/.test(value) || parseInt(value) < 0)) {
      return; 
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTierSelect = (tierAmount) => {
    setFormData(prev => ({ ...prev, amount: tierAmount.toString() }));
  };

  const processRazorpayPayment = (numericAmount) => {
    if (RAZORPAY_KEY_ID === 'YOUR_RAZORPAY_KEY_ID') {
      toast({
        title: "Razorpay Misconfiguration",
        description: (
          <div className="text-sm">
            <p className="mb-2">Razorpay Key ID is not configured. Real payments cannot be processed.</p>
            <p>Project owner needs to replace 'YOUR_RAZORPAY_KEY_ID' with a valid key.</p>
            <p className="font-semibold mt-2">This is currently a simulation.</p>
          </div>
        ),
        variant: "destructive",
        duration: 9000,
      });
      // Simulate successful donation for UI
      const newDonation = { ...formData, amount: numericAmount, paymentMethod: 'razorpay', paymentStatus: 'Simulated Success - Razorpay Misconfigured', submissionDate: new Date().toISOString() };
      setMoneyDonations(prev => [...prev, newDonation]);
      console.log("Money Donation Data (Razorpay Simulated - Misconfigured):", newDonation);
      return;
    }
    
    const options = {
      key: RAZORPAY_KEY_ID, 
      amount: numericAmount * 100, // Amount in paise
      currency: "INR",
      name: "Let's Donate",
      description: "Donation for a cause",
      image: "/logo-icon.svg", // Your logo
      handler: function (response) {
        // This function is called on successful payment
        toast({
          title: "Payment Successful! 💖",
          description: `Thank you, ${formData.name}! Your donation of ₹${numericAmount} via Razorpay was successful. Payment ID: ${response.razorpay_payment_id}`,
          className: "bg-primary text-primary-foreground",
          duration: 9000,
        });
        const newDonation = { ...formData, amount: numericAmount, paymentMethod: 'razorpay', paymentId: response.razorpay_payment_id, paymentStatus: 'Success', submissionDate: new Date().toISOString() };
        setMoneyDonations(prev => [...prev, newDonation]);
        console.log("Money Donation Data (Razorpay Success):", newDonation);
        setFormData({ name: '', email: '', phone: '', amount: '', paymentMethod: 'stripe', message: '' });
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
      },
      notes: {
        address: "Let's Donate Office"
      },
      theme: {
        color: "#008080" // Teal color
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', function (response){
      toast({
        title: "Payment Failed",
        description: `Your Razorpay payment failed. Reason: ${response.error.description}. Please try again or use another method.`,
        variant: "destructive",
        duration: 9000,
      });
      console.error("Razorpay Payment Failed:", response.error);
      const newDonation = { ...formData, amount: numericAmount, paymentMethod: 'razorpay', paymentStatus: 'Failed', error: response.error, submissionDate: new Date().toISOString() };
      setMoneyDonations(prev => [...prev, newDonation]);
    });
    rzp.open();
  };

  const handleDonate = (e) => {
    e.preventDefault();
    const numericAmount = parseInt(formData.amount);
    if (!formData.name || !formData.email || !numericAmount || numericAmount <= 0) {
      toast({ title: "Invalid Details", description: "Please enter your name, email, and a valid donation amount.", variant: "destructive" });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast({ title: "Invalid Email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }

    if (formData.paymentMethod === 'razorpay') {
      processRazorpayPayment(numericAmount);
    } else if (formData.paymentMethod === 'stripe') {
      toast({
        title: "Stripe Integration Pending",
        description: (
          <div className="text-sm">
            <p className="mb-2">Thank you, {formData.name}! You're about to donate ₹{numericAmount} via Stripe.</p>
            <p className="mb-2">To complete real payments, Stripe must be fully configured.</p>
            <p className="font-semibold">This is currently a simulation.</p>
          </div>
        ),
        className: "bg-primary text-primary-foreground",
        duration: 9000,
      });
      const newDonation = { ...formData, amount: numericAmount, paymentStatus: 'Simulated Success - Stripe', submissionDate: new Date().toISOString() };
      setMoneyDonations(prev => [...prev, newDonation]);
      console.log("Money Donation Data (Stripe Simulated):", newDonation);
      // setFormData({ name: '', email: '', phone: '', amount: '', paymentMethod: 'stripe', message: '' }); // Reset if you want
    } else {
      // For UPI/QR or Bank Transfer (no actual payment processing here, just recording intent)
      toast({
        title: "Donation Intent Recorded",
        description: `Thank you, ${formData.name}! Your intent to donate ₹${numericAmount} via ${formData.paymentMethod} is noted. Please follow the instructions shown for this payment method.`,
        className: "bg-primary text-primary-foreground",
        duration: 9000,
      });
      const newDonation = { ...formData, amount: numericAmount, paymentStatus: 'Pending - Manual Payment', submissionDate: new Date().toISOString() };
      setMoneyDonations(prev => [...prev, newDonation]);
      console.log("Money Donation Data (Manual):", newDonation);
    }
     // Simulate sending email to admin (console log for now)
    console.log("New Money Donation Submission (Simulated Email to Admin):", { ...formData, amount: numericAmount, submissionDate: new Date().toISOString() });
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <div className="container mx-auto px-4">
      <PageHeader title="Donate Funds Securely" subtitle="Your financial contribution empowers us to continue our work and expand our reach. Every rupee makes a difference.">
        <DollarSign className="h-16 w-16 text-primary mx-auto mt-4" />
      </PageHeader>

      <SectionWrapper id="donation-form">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity:0, x: -50 }} 
            animate={{ opacity:1, x: 0 }} 
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Card className="rounded-xl shadow-soft bg-background p-2 sm:p-4">
              <CardHeader>
                <CardTitle className="text-2xl lg:text-3xl text-primary">Make Your Contribution</CardTitle>
                <CardDescription className="text-muted-foreground">Choose an amount or enter your own.</CardDescription>
              </CardHeader>
              <form onSubmit={handleDonate}>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {donationTiers.map((tier, index) => (
                      <Button
                        key={index}
                        type="button"
                        variant={formData.amount === tier.amount.toString() ? "default" : "outline"}
                        className="h-auto py-3 flex flex-col items-center justify-center rounded-lg text-center border-primary/50 hover:bg-primary/10"
                        onClick={() => handleTierSelect(tier.amount)}
                      >
                        {React.cloneElement(tier.icon, {className: "h-7 w-7 mb-1.5"})}
                        <span className="text-lg font-semibold">₹{tier.amount}</span>
                        <span className="text-xs text-muted-foreground mt-0.5">{tier.impact}</span>
                      </Button>
                    ))}
                  </div>
                  
                  <div>
                    <Label htmlFor="name" className="font-medium">Your Name <span className="text-destructive">*</span></Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="E.g., Ananya Sharma" required className="mt-1 rounded-lg p-3"/>
                  </div>
                   <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email" className="font-medium">Email Address <span className="text-destructive">*</span></Label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="E.g., ananya@example.com" required className="mt-1 rounded-lg p-3"/>
                    </div>
                    <div>
                      <Label htmlFor="phone" className="font-medium">Phone Number (Optional for UPI/Bank)</Label>
                      <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="E.g., 9876543210" className="mt-1 rounded-lg p-3"/>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="amount" className="font-medium">Donation Amount (₹) <span className="text-destructive">*</span></Label>
                    <Input id="amount" name="amount" type="text" inputMode="numeric" pattern="[0-9]*" value={formData.amount} onChange={handleInputChange} placeholder="Enter custom amount or select above" required className="mt-1 rounded-lg p-3 text-lg"/>
                  </div>

                  <div>
                    <Label htmlFor="paymentMethod" className="font-medium">Preferred Payment Method</Label>
                     <select 
                        id="paymentMethod" 
                        name="paymentMethod" 
                        value={formData.paymentMethod} 
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-lg border-input bg-background p-3 text-sm focus:ring-primary focus:border-primary"
                      >
                        <option value="razorpay">Online Payment (Razorpay - Simulated)</option>
                        <option value="stripe">Online Payment (Stripe - Simulated)</option>
                        <option value="upi_qr">UPI / QR Code (Details Below)</option>
                        <option value="bank_transfer">Bank Transfer (Details Below)</option>
                      </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="font-medium">Message (Optional)</Label>
                    <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder="Your words of encouragement" className="mt-1 rounded-lg" rows={2}/>
                  </div>
                  
                  {(formData.paymentMethod === 'stripe' || formData.paymentMethod === 'razorpay') && (
                    <div className="p-3 bg-sky-50 border border-sky-200 rounded-md text-sky-700 text-xs">
                      <p className="font-semibold flex items-center"><Info className="h-4 w-4 mr-1.5 shrink-0" /> Payment Gateway Note</p>
                      <p className="mt-1">
                        Online payments via {formData.paymentMethod === 'stripe' ? 'Stripe' : 'Razorpay'} are currently simulated. For real transactions, the gateway must be fully configured by the project owner. 
                        {formData.paymentMethod === 'razorpay' && RAZORPAY_KEY_ID === 'YOUR_RAZORPAY_KEY_ID' && <span className="font-bold text-destructive-foreground bg-destructive px-1 rounded"> Razorpay Key ID is missing.</span>}
                      </p>
                       <p className="mt-1">Refer to <a href={formData.paymentMethod === 'stripe' ? "https://docs.stripe.com/payments/checkout/client" : "https://razorpay.com/docs/payment-gateway/web-integration/standard/"} target="_blank" rel="noopener noreferrer" className="underline">official documentation <ExternalLink className="inline h-3 w-3"/></a> for setup.</p>
                    </div>
                  )}

                </CardContent>
                <CardFooter className="p-6">
                  <Button type="submit" size="lg" className="w-full rounded-lg bg-primary hover:bg-primary-soft text-primary-foreground text-lg py-3">
                    <ShieldCheck className="h-5 w-5 mr-2" /> Donate ₹{formData.amount || '0'} Securely
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </motion.div>

          <motion.div 
            className="lg:col-span-2 space-y-8"
            initial={{ opacity:0, x: 50 }} 
            animate={{ opacity:1, x: 0 }} 
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            <Card className="rounded-xl shadow-soft bg-background">
              <CardHeader>
                <CardTitle className="text-xl lg:text-2xl flex items-center text-primary"><BarChart3 className="h-6 w-6 mr-2" />Transparency Promise</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground mb-4">
                  “All donations are used transparently to support education, food, and essential items for underprivileged children.”
                </p>
                {whereMoneyGoes.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium text-foreground">{item.category}</span>
                      <span className="font-semibold text-primary">{item.percentage}%</span>
                    </div>
                    <Progress value={item.percentage} className="h-2.5 rounded-full" indicatorClassName={item.color} />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-soft bg-background">
              <CardHeader>
                <CardTitle className="text-xl lg:text-2xl flex items-center text-primary"><QrCode className="h-6 w-6 mr-2" />Other Ways to Pay</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 p-4 border border-border/50 rounded-lg bg-muted/30">
                  <img  className="h-20 w-20 object-contain rounded-md" alt="UPI QR Code for Let's Donate" src="https://images.unsplash.com/photo-1595079676339-1534801ad6cf" />
                  <div>
                    <p className="font-semibold text-foreground">Scan to Pay with UPI</p>
                    <p className="text-xs text-muted-foreground">Use any UPI app (Google Pay, PhonePe, Paytm, etc.)</p>
                    <p className="text-xs text-primary mt-1">UPI ID: <span className="font-mono">letsdonate@exampleupi</span></p>
                  </div>
                </div>
                 <div className="text-sm text-muted-foreground">
                  <p className="font-semibold text-foreground mb-1">Bank Transfer Details:</p>
                  <p>Account Name: Let's Donate Foundation</p>
                  <p>Account Number: 123456789012</p>
                  <p>IFSC Code: ABCD0001234</p>
                  <p>Bank: Kindness Bank, Empathy Branch</p>
                </div>
                <p className="text-xs text-muted-foreground flex items-center"><Phone className="h-3.5 w-3.5 mr-1.5 shrink-0"/>For personal assistance, call us at: <a href="tel:+919876543210" className="text-primary hover:underline ml-1">+91 987 654 3210</a>.</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="impact-stories" className="bg-primary/5 rounded-xl py-16 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 md:mb-16">Stories of Your Impact</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Fueling Futures", story: "Your donations provided 200+ children with school kits, opening doors to brighter futures.", imagePlaceholder: "Smiling child holding new school books", icon: <BookOpen className="h-8 w-8 text-primary"/> },
            { title: "Nourishing Hope", story: "Over 500 families received essential meal kits last month, thanks to your generous support.", imagePlaceholder: "Volunteer handing a meal kit to a grateful person", icon: <Gift className="h-8 w-8 text-primary"/> },
            { title: "Sparking Smiles", story: "Our new play-and-learn center, funded by you, is now a haven of joy and creativity for local kids.", imagePlaceholder: "Children playing with educational toys in a colorful room", icon: <Smile className="h-8 w-8 text-primary"/> },
          ].map((item, index) => (
            <motion.custom 
              key={index} 
              custom={index} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, amount: 0.2 }} 
              variants={cardVariants}
              className="h-full"
            >
              <Card className="h-full flex flex-col rounded-xl shadow-soft hover:shadow-soft-hover transition-all duration-300 transform hover:-translate-y-1 overflow-hidden bg-background">
                <div className="aspect-video overflow-hidden">
                  <img  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={item.title} src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                </div>
                <CardHeader className="items-center pt-6">
                  {item.icon}
                  <CardTitle className="text-xl lg:text-2xl text-primary mt-2">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow text-center">
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