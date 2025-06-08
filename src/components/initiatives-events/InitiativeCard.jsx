import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Clock } from 'lucide-react';

const DEFAULT_INITIATIVE_IMAGE = "https://dl.dropboxusercontent.com/scl/fi/k31oatkta5p9vvy2n9ijd/lets_summer_1.jpg?rlkey=89pz3ge065w75n61d8lb9njz0&raw=1";

const InitiativeCard = ({ initiative, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: index * 0.1, duration: 0.5, ease: "easeOut" },
    },
  };

  const getStatusBadgeClasses = (status) => {
    switch (status?.toLowerCase()) {
      case 'ongoing':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'to start':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'done':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'future':
        return 'bg-teal-100 text-teal-800 border-teal-300'; // Changed for better visibility
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    }
  };

  return (
    <motion.div variants={cardVariants} initial="hidden" animate="visible" whileHover={{ y: -5 }} className="h-full">
      <Card className="flex flex-col h-full overflow-hidden rounded-xl shadow-soft hover:shadow-soft-hover transition-all duration-300 bg-card">
        <div className="relative w-full h-56 overflow-hidden group">
          <img  
            src={(initiative.photos && initiative.photos[0]) || DEFAULT_INITIATIVE_IMAGE} 
            alt={initiative.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => { e.target.src = DEFAULT_INITIATIVE_IMAGE; }}
          />
           <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
           <div className="absolute top-3 right-3 p-1.5 bg-primary/80 text-primary-foreground rounded-md text-xs font-semibold backdrop-blur-sm flex items-center">
            {initiative.icon && React.cloneElement(initiative.icon, {className: "h-4 w-4 mr-1.5"})}
             Initiative
           </div>
           {initiative.status && (
            <Badge variant="outline" className={`absolute bottom-3 left-3 text-xs py-1 px-2.5 font-medium ${getStatusBadgeClasses(initiative.status)}`}>
              <Clock className="h-3.5 w-3.5 mr-1.5" /> {initiative.status}
            </Badge>
          )}
        </div>
        <CardHeader className="p-5">
          <CardTitle className="text-xl font-semibold text-primary line-clamp-2">{initiative.title}</CardTitle>
          {initiative.category && <Badge variant="secondary" className="mt-2 py-1 px-2.5 text-xs">{initiative.category}</Badge>}
        </CardHeader>
        <CardContent className="p-5 pt-0 flex-grow">
          <CardDescription className="text-sm text-muted-foreground line-clamp-3">{initiative.shortDescription}</CardDescription>
        </CardContent>
        <CardFooter className="p-5 bg-card">
          <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary/10 rounded-lg">
            <Link to={`/initiatives-events/${initiative.id}`} className="flex items-center justify-center">
              Learn More <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default InitiativeCard;