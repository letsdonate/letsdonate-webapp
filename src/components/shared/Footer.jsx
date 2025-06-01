import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';

const Footer = () => {
  const { toast } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (newsletterEmail && /\S+@\S+\.\S+/.test(newsletterEmail)) {
      const { data, error } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ email: newsletterEmail }]);

      if (error) {
        if (error.code === '23505') { // Unique violation
            toast({
            title: "Already Subscribed!",
            description: "This email address is already on our newsletter list.",
            variant: "default",
            className: "bg-secondary text-secondary-foreground"
            });
        } else {
            toast({
            title: "Subscription Error",
            description: error.message,
            variant: "destructive",
            });
        }
      } else {
        toast({
          title: "Subscribed! 🎉",
          description: "Thanks for joining our newsletter. We'll keep you updated!",
          className: "bg-primary text-primary-foreground",
        });
        setNewsletterEmail(''); 
      }
    } else {
      toast({
        title: "Uh oh!",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
    }
  };

  return (
    <footer className="bg-card text-card-foreground py-12 border-t border-border/40" id="footer-newsletter">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <img src="/logo-icon.svg" alt="Let's Donate Logo Icon" className="h-8 w-8" />
              <span className="text-xl font-bold">
                <span className="text-foreground/70 font-medium">Let’s</span> <span className="text-primary font-bold">Donate</span>
              </span>
            </Link>
            <p className="text-sm mb-2 text-muted-foreground">"Be the reason someone believes in kindness again."</p>
            <p className="text-sm text-muted-foreground">Spreading compassion and driving positive change together.</p>
          </div>

          <div>
            <p className="font-semibold text-foreground mb-4 text-lg">Quick Links</p>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about-us" className="text-muted-foreground hover:text-primary transition-colors duration-300">About Us</Link></li>
              <li><Link to="/donate/time" className="text-muted-foreground hover:text-primary transition-colors duration-300">Volunteer</Link></li>
              <li><Link to="/donate/money" className="text-muted-foreground hover:text-primary transition-colors duration-300">Donate Funds</Link></li>
              <li><Link to="/events-gallery" className="text-muted-foreground hover:text-primary transition-colors duration-300">Our Impact</Link></li>
              <li><Link to="/policies" className="text-muted-foreground hover:text-primary transition-colors duration-300">Policies</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-foreground mb-4 text-lg">Contact Us</p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center text-muted-foreground"><Mail className="h-5 w-5 mr-3 text-primary" /> info@letsdonate.org</li>
              <li className="flex items-center text-muted-foreground"><Phone className="h-5 w-5 mr-3 text-primary" /> +91 987 654 3210</li>
              <li className="flex items-center text-muted-foreground"><MapPin className="h-5 w-5 mr-3 text-primary" /> Bangalore, India</li>
            </ul>
            <div className="flex space-x-4 mt-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-300"><Instagram size={22}/></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-300"><Facebook size={22}/></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-300"><Twitter size={22}/></a>
            </div>
          </div>

          <div>
            <p className="font-semibold text-foreground mb-4 text-lg">Stay Updated</p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div>
                <Label htmlFor="newsletter-email" className="sr-only">Email for newsletter</Label>
                <Input 
                  id="newsletter-email" 
                  type="email" 
                  placeholder="Your Email Address" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-background border-input focus:border-primary rounded-lg"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary-soft text-primary-foreground rounded-lg py-2.5">
                <Send className="h-4 w-4 mr-2" /> Subscribe
              </Button>
            </form>
            <p className="text-xs mt-3 text-muted-foreground">Get updates on our latest events and impact stories.</p>
          </div>
        </div>
        <div className="border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Let's Donate. All Rights Reserved. Crafted with <span className="text-primary">❤️</span> by Hostinger Horizons.</p>
          <p className="mt-1">"All photos and videos of Let's Donate events must be approved before being shared publicly."</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;