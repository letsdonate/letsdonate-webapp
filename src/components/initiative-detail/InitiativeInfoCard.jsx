import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Users, CalendarDays, Target, Clock, Gift, UserPlus, Phone, Mail, Info } from 'lucide-react';

const InitiativeInfoCard = ({ initiative, showFullDescriptionInsteadOfTabs = false }) => {
  if (!initiative) return null;

  const getStatusBadgeClasses = (status) => {
    switch (status?.toLowerCase()) {
      case 'ongoing':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'to start':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'done':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'future':
        return 'bg-teal-100 text-teal-800 border-teal-300';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    }
  };

  const contributionIcons = {
    Volunteer: <UserPlus className="h-5 w-5 mr-2 text-primary" />,
    'Donate Materials': <Gift className="h-5 w-5 mr-2 text-primary" />,
    'Sponsor a Child': <span className="font-bold text-lg mr-2 text-secondary-foreground">₹</span>,
    Mentor: <UserPlus className="h-5 w-5 mr-2 text-primary" />,
    'Conduct Workshop': <UserPlus className="h-5 w-5 mr-2 text-primary" />,
    'Sponsor Resources': <span className="font-bold text-lg mr-2 text-secondary-foreground">₹</span>,
    Tutor: <UserPlus className="h-5 w-5 mr-2 text-primary" />,
    'Donate Study Materials': <Gift className="h-5 w-5 mr-2 text-primary" />,
    'Fund a Learning Center': <span className="font-bold text-lg mr-2 text-secondary-foreground">₹</span>,
    'Donate Warm Clothes': <Gift className="h-5 w-5 mr-2 text-primary" />,
    'Volunteer for Distribution': <UserPlus className="h-5 w-5 mr-2 text-primary" />,
    'Organize a Collection Drive': <UserPlus className="h-5 w-5 mr-2 text-primary" />,
    'Participate in Drives': <UserPlus className="h-5 w-5 mr-2 text-primary" />,
    'Donate Saplings': <Gift className="h-5 w-5 mr-2 text-primary" />,
    'Spread Awareness': <UserPlus className="h-5 w-5 mr-2 text-primary" />,
    'Volunteer Facilitator': <UserPlus className="h-5 w-5 mr-2 text-primary" />,
    'Share Your Story': <UserPlus className="h-5 w-5 mr-2 text-primary" />,
    'Support Resources': <span className="font-bold text-lg mr-2 text-secondary-foreground">₹</span>,
  };

  return (
    <Card className="sticky top-28 shadow-xl rounded-xl overflow-hidden bg-card border-border/50"> {/* Adjusted top for taller navbar */}
      <CardHeader className="bg-primary/5 p-6">
        <CardTitle className="text-2xl font-bold text-primary">{initiative.title}</CardTitle>
        {initiative.category && (
          <Badge variant="secondary" className="mt-2 text-sm py-1 px-3">{initiative.category}</Badge>
        )}
        {initiative.status && (
          <Badge variant="outline" className={`mt-2 text-sm py-1 px-3 font-medium ${getStatusBadgeClasses(initiative.status)}`}>
            <Clock className="h-4 w-4 mr-1.5" /> Status: {initiative.status}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        
        {showFullDescriptionInsteadOfTabs && initiative.fullDescription && initiative.fullDescription.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-2 flex items-center">
              <Info className="h-5 w-5 mr-2 text-secondary" />
              About {initiative.title}
            </h4>
            <div className="space-y-2 text-sm text-muted-foreground prose prose-sm max-w-none">
              {initiative.fullDescription.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        )}

        {!showFullDescriptionInsteadOfTabs && (
          <>
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-2 flex items-center">
                <Target className="h-5 w-5 mr-2 text-secondary" />
                Target Audience
              </h4>
              <p className="text-muted-foreground">{initiative.targetAudience}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-2 flex items-center">
                <CalendarDays className="h-5 w-5 mr-2 text-secondary" />
                Duration
              </h4>
              <p className="text-muted-foreground">{initiative.duration}</p>
            </div>
          </>
        )}
        
        {initiative.howToContribute && initiative.howToContribute.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-3">How You Can Help</h4>
            <div className="space-y-3">
              {initiative.howToContribute.map((item, index) => {
                let buttonVariant = "outline";
                let buttonTextColorClass = "text-primary";
                let buttonBorderClass = "border-primary/30";
                let buttonHoverBgClass = "hover:bg-primary/5";
                let iconColorClass = "text-primary";

                if (item.type.toLowerCase().includes('sponsor') || item.type.toLowerCase().includes('fund') || item.type.toLowerCase().includes('support resources')) {
                  buttonVariant = "secondary"; // Changed to secondary variant
                  buttonTextColorClass = "text-secondary-foreground"; 
                  buttonBorderClass = "border-secondary"; 
                  buttonHoverBgClass = "hover:bg-secondary/80"; 
                  iconColorClass = "text-secondary-foreground"; 
                }
                 let linkTarget = item.link || '/contact-us';
                 if (item.type === 'Volunteer' && item.link === '/donate/time') {
                   linkTarget = '/donate/time#time-donation-page-volunteer-form';
                 }

                return (
                  <Button key={index} asChild variant={buttonVariant} className={`w-full justify-start text-left h-auto py-3 ${buttonBorderClass} ${buttonHoverBgClass} ${buttonTextColorClass}`}>
                    <Link to={linkTarget}>
                      {React.cloneElement(contributionIcons[item.type] || <UserPlus className="h-5 w-5 mr-2" />, { className: `h-5 w-5 mr-2 ${iconColorClass}` })}
                      <div>
                        <span className={`font-medium`}>{item.type}</span>
                        <p className="text-xs text-muted-foreground whitespace-normal">{item.description}</p>
                      </div>
                    </Link>
                  </Button>
                );
              })}
            </div>
          </div>
        )}

        {initiative.contact && (
          <div className="border-t border-border/50 pt-6">
            <h4 className="text-lg font-semibold text-foreground mb-2">Contact Information</h4>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-secondary" />
                <strong>{initiative.contact.person}</strong>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-secondary" />
                <a href={`mailto:letsdonateofficial@gmail.com`} className="text-primary hover:underline">letsdonateofficial@gmail.com</a>
              </div>
              {initiative.contact.phone && (
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-secondary" />
                  <span>{initiative.contact.phone}</span>
                </div>
              )}
            </div>
             <Button asChild variant="outline" className="mt-4 w-full border-primary text-primary hover:bg-primary/10">
                <Link to="/about-us#contact-us-section">General Inquiries</Link> 
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InitiativeInfoCard;