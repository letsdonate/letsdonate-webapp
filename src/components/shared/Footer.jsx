
import React from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const Footer = () => {
  const { toast } = useToast();
  const [email, setEmail] = useLocalStorage('newsletterEmail', '');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      // In a real app, you'd send this to a backend
      console.log('Newsletter subscription:', email);
      toast({
        title: "Subscribed! 🎉",
        description: "Thanks for joining our newsletter. We'll keep you updated!",
      });
      setEmail(''); 
    } else {
      toast({
        title: "Uh oh!",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
    }
  };

  return (
    <footer className="bg-muted/50 text-muted-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <HeartHandshake className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">Let's Donate</span>
            </Link>
            <p className="text-sm mb-2">"Small actions. Big change."</p>
            <p className="text-sm">Spreading compassion and driving positive change together.</p>
          </div>

          <div>
            <p className="font-semibold text-foreground mb-4">Quick Links</p>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about-us" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/donate/time" className="hover:text-primary transition-colors">Volunteer</Link></li>
              <li><Link to="/donate/money" className="hover:text-primary transition-colors">Donate Funds</Link></li>
              <li><Link to="/events-gallery" className="hover:text-primary transition-colors">Our Impact</Link></li>
              <li><Link to="/policies" className="hover:text-primary transition-colors">Policies</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-foreground mb-4">Contact Us</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center"><Mail className="h-4 w-4 mr-2 text-primary" /> info@letsdonate.org</li>
              <li className="flex items-center"><Phone className="h-4 w-4 mr-2 text-primary" /> +91 123 456 7890</li>
              <li className="flex items-center"><MapPin className="h-4 w-4 mr-2 text-primary" /> Bangalore, India</li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><Instagram /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><Facebook /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><Twitter /></a>
            </div>
          </div>

          <div>
            <p className="font-semibold text-foreground mb-4">Stay Updated</p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div>
                <Label htmlFor="newsletter-email" className="sr-only">Email for newsletter</Label>
                <Input 
                  id="newsletter-email" 
                  type="email" 
                  placeholder="Your Email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background"
                />
              </div>
              <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">Subscribe</Button>
            </form>
            <p className="text-xs mt-2">Get updates on our latest events and impact stories.</p>
          </div>
        </div>
        <div className="border-t pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Let's Donate. All Rights Reserved. Made with ❤️ by Hostinger Horizons.</p>
          <p className="mt-1">"All photos and videos of Let's Donate events must be approved before being shared publicly."</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
  