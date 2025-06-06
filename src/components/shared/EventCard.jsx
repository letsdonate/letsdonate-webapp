import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, MapPin, Edit3, ArrowRight, Users, Info, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const EventCard = ({ event, index }) => {
  const { id, title, description, date, location, category, photos, type, status, registration_link, detailLink: propDetailLink } = event;
  
  const formattedDate = date ? new Date(date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
  }) : 'Date TBD';

  const thumbnailUrl = (photos && photos.length > 0 && photos[0])
    ? photos[0]
    : "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80";
  
  const getStatusBadgeClasses = (status) => {
    switch (status?.toLowerCase()) {
      case 'ongoing':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'to start':
      case 'upcoming': 
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'done':
      case 'past': 
        return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'future':
        return 'bg-teal-100 text-teal-800 border-teal-300';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    }
  };

  const finalDetailLink = propDetailLink || (type === 'initiative' 
    ? `/initiatives-events/${id}` 
    : `/events/${id}`);
  
  const finalRegistrationLink = registration_link || finalDetailLink; 

  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: (i) => ({
          opacity: 1, y: 0, scale: 1,
          transition: { delay: (i || 0) * 0.05, duration: 0.4, ease: "easeOut" },
        }),
      }}
      className="h-full flex flex-col" 
    >
      <Card className="flex flex-col flex-grow h-full rounded-xl shadow-soft hover:shadow-soft-hover transition-all duration-300 overflow-hidden transform hover:-translate-y-1 bg-card min-h-[400px]"> {/* Increased min-h */}
        <div className="relative w-full h-48 overflow-hidden group aspect-video"> 
          <img  
            src={thumbnailUrl} 
            alt={title || 'Card image'} 
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          <div className="absolute top-2 right-2 p-1.5 bg-primary/80 text-primary-foreground rounded-md text-xs font-semibold backdrop-blur-sm flex items-center">
            {type === 'initiative' ? (
                <Users className="h-4 w-4 mr-1.5" />
            ) : (
                <CalendarDays className="h-4 w-4 mr-1.5" />
            )}
            {type === 'initiative' ? 'Initiative' : 'Event'}
          </div>
          {status && (
            <Badge variant="outline" className={`absolute bottom-2 left-2 text-xs py-1 px-2.5 font-medium ${getStatusBadgeClasses(status)}`}>
              <Clock className="h-3.5 w-3.5 mr-1.5" /> {status}
            </Badge>
          )}
        </div>
        <CardHeader className="pt-4 pb-2 px-4">
          <CardTitle className="text-xl text-primary group-hover:text-primary-soft line-clamp-2">{title || (type === 'event' ? 'Event Title' : 'Initiative Title')}</CardTitle>
          {category && <Badge variant="secondary" className="mt-1 text-xs">{category}</Badge>}
        </CardHeader>
        <CardContent className="flex-grow pb-3 px-4 space-y-2">
          <p className="text-sm text-muted-foreground line-clamp-3">{description || 'Details coming soon.'}</p>
          {(type === 'event' || date || location) && (
            <div className="text-xs text-muted-foreground space-y-1">
              {date && (
                <div className="flex items-center">
                  <CalendarDays className="h-3.5 w-3.5 mr-1.5 text-secondary" />
                  <span>{formattedDate}</span>
                </div>
              )}
              {location && (
                <div className="flex items-center">
                  <MapPin className="h-3.5 w-3.5 mr-1.5 text-secondary" />
                  <span>{location}</span>
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="p-4 pt-0 flex flex-col sm:flex-row sm:justify-between items-stretch sm:items-center gap-2 mt-auto"> 
          {id && ( 
            <Button asChild variant="outline" size="sm" className="w-full sm:w-auto border-primary text-primary hover:bg-primary/10 hover:text-primary">
              <Link to={finalDetailLink}> 
                More Details <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          )}
          {type === 'event' && id && (status?.toLowerCase() === 'ongoing' || status?.toLowerCase() === 'future' || status?.toLowerCase() === 'upcoming' || status?.toLowerCase() === 'to start') && (
            <Button asChild variant="default" size="sm" className="w-full sm:w-auto">
              <Link to={`${finalRegistrationLink}#event-registration-form`}> 
                <Edit3 className="h-4 w-4 mr-1.5" /> Register Now
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default EventCard;
