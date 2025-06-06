import React from 'react';
import { HeartHandshake as Handshake, Users, ExternalLink } from 'lucide-react';

export const otherNgoData = [
  {
    id: 'ngo-partner-1',
    name: 'Hope Foundation',
    focus: 'Child Education & Nutrition',
    description: "Hope Foundation works tirelessly to provide quality education and nutritious meals to underprivileged children in urban slums. They run after-school learning centers and community kitchens.",
    logoPlaceholder: '/images/ngos/hope-foundation-logo.png', // Replace with actual logo path
    websiteLink: '#', // Replace with actual website link
    volunteerLink: '#', // Replace with actual volunteer registration link
    icon: <Handshake className="h-10 w-10 text-primary" />,
    themeColor: 'bg-blue-500/10',
    imagePlaceholder: "Children smiling and learning at a Hope Foundation center",
    image: "https://images.unsplash.com/photo-1504159506828-3f03137910a7?auto=format&fit=crop&w=600&q=60", // Example image
    areaOfWork: "Education" // Added for consistency with filtering
  },
  {
    id: 'ngo-partner-2',
    name: 'Green Earth Initiative',
    focus: 'Environmental Conservation & Awareness',
    description: "Green Earth Initiative is dedicated to protecting local ecosystems through tree plantation drives, waste management projects, and environmental awareness campaigns in schools and colleges.",
    logoPlaceholder: '/images/ngos/green-earth-logo.png',
    websiteLink: '#',
    volunteerLink: '#',
    icon: <Users className="h-10 w-10 text-primary" />,
    themeColor: 'bg-green-500/10',
    imagePlaceholder: "Volunteers planting saplings for Green Earth Initiative",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=600&q=60",
    areaOfWork: "Environment"
  },
  {
    id: 'ngo-partner-3',
    name: 'ElderCare Connect',
    focus: 'Support for Senior Citizens',
    description: "ElderCare Connect provides companionship, healthcare assistance, and recreational activities for elderly individuals living alone or in old age homes. They aim to combat loneliness and ensure dignified aging.",
    logoPlaceholder: '/images/ngos/eldercare-logo.png',
    websiteLink: '#',
    volunteerLink: '#',
    icon: <ExternalLink className="h-10 w-10 text-primary" />,
    themeColor: 'bg-purple-500/10',
    imagePlaceholder: "A volunteer spending time with an elderly person at ElderCare Connect",
    image: "https://images.unsplash.com/photo-1576765608866-5b510406695c?auto=format&fit=crop&w=600&q=60",
    areaOfWork: "Healthcare"
  },
   {
    id: 'ngo-partner-4',
    name: 'Animal Welfare Squad',
    focus: 'Rescue & Rehabilitation of Stray Animals',
    description: "This squad is committed to rescuing injured and abandoned stray animals, providing them with medical care, shelter, and finding them loving forever homes. They also run sterilization drives.",
    logoPlaceholder: '/images/ngos/animal-welfare-logo.png',
    websiteLink: '#',
    volunteerLink: '#',
    icon: <Handshake className="h-10 w-10 text-primary" />,
    themeColor: 'bg-orange-500/10',
    imagePlaceholder: "A volunteer caring for a rescued dog at Animal Welfare Squad",
    image: "https://images.unsplash.com/photo-1597753010299-0df1ipc39f65?auto=format&fit=crop&w=600&q=60",
    areaOfWork: "Animal Welfare"
  }
];