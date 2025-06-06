import React from 'react';
import { HeartHandshake, Users, BookOpen, Leaf, ShieldHalf, Palette, Zap, Sparkles } from 'lucide-react';

const DEFAULT_NGO_GALLERY_IMAGE = "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80";

export const staticNgoData = [
  {
    id: 'static-ngo-5', 
    slug: 'sampoorna-foundation',
    name: 'Sampoorna Foundation',
    logo_url: '/images/ngos/sampoorna-logo-placeholder.png', 
    short_description: 'Giving wings to children through holistic education to bring impactful change in their lives.',
    full_description: "Sampoorna foundation is dedicated to convey the power of education for underprivileged children while creating an environment for holistic development through quality teaching and out-of-classroom activities. We believe in utilising our own knowledge and also encourage efforts from like minded individuals who share the same vision/goal.",
    mission: "To provide children with the necessary resources in order to create responsible and productive citizens of tomorrow.",
    work_area: 'Community Learning Centers',
    impact_highlights: [
      { text: "Organised 10+ developmental workshops for children." },
      { text: "Educated 75+ underprivileged students." },
      { text: "5+ active initiatives with more than 50 volunteers." },
      { text: "Programmes such as “send a child to school” which has helped sponsor the education of 12 children." }
    ],
    website_url: '#',
    instagram_handle: 'sampoornafoundation',
    tags: ['Education', 'Child Welfare', 'Skill Building', 'Extracurricular Activities', 'Learning'],
    icon: <BookOpen className="h-10 w-10 text-primary" />,
    photos: [
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1542744095-291d1f67b221?auto=format&fit=crop&w=800&q=60",
        DEFAULT_NGO_GALLERY_IMAGE
    ]
  },
  {
    id: 'static-ngo-6',
    slug: 'lucky-tails',
    name: 'Lucky Tails',
    logo_url: '/images/ngos/luckytails-logo-placeholder.png', 
    short_description: 'A small group of committed people working towards the welfare of stray animals.',
    full_description: "Lucky tails is a non-governmental organisation which is dedicated towards improving the life of stray animals. We believe that we can create a world where no one goes hungry, uncared for or unloved. Hence, people at Lucky tails work tirelessly to rescue, nurture and create a safe space for all our furry friends.",
    mission: "To rescue, rehabilitate and promote adoption of strays through compassion, consistent care and spreading awareness.",
    work_area: 'Local Community Shelters & Streets',
    impact_highlights: [
      { text: "Daily feeding drives." },
      { text: "70+ animals rescued." },
      { text: "Provides regular rehabilitation and medical care for those in need." },
      { text: "Frequent pet rescue and adoption campaigns." }
    ],
    website_url: '#',
    instagram_handle: 'luckytailsrescue',
    tags: ['Animal Rescue', 'Animal Rehabilitation', 'Animal Welfare', 'Adoption'],
    icon: <HeartHandshake className="h-10 w-10 text-primary" />,
    photos: [
        "https://images.unsplash.com/photo-1559247448-8c95936056f8?auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1548681528-6a5c45b66b42?auto=format&fit=crop&w=800&q=60",
        DEFAULT_NGO_GALLERY_IMAGE
    ]
  },
  {
    id: 'static-ngo-7',
    slug: 'sneh-community',
    name: 'Sneh',
    logo_url: '/images/ngos/sneh-logo-placeholder.png', 
    short_description: 'Learn. Yearn. Turn. Empowering underprivileged children through community action.',
    full_description: "Sneh is a community led by compassionate women working towards uplifting and empowering underprivileged children. Guided by our core motto “Learn. Yearn. Turn.”, we believe in the power of knowledge, empathy and action. At Sneh, we strive to nurture not just minds, but also hearts. Through education, mentorship and projects focused on equipping students with other skills, we intend to inspire children to create a brighter future.",
    mission: "Our mission is to empower dreams and support children in order to reach their full potential. We aim to educate while also facilitating out-of-textbook skills which contributes to the overall development of our little ones.",
    work_area: 'Community Centers & Schools',
    impact_highlights: [
      { text: "Multiple collaborations with local schools and community groups." },
      { text: "Rich network of dedicated volunteers contributing diverse skills." }
    ],
    website_url: '#',
    instagram_handle: 'snehcommunity',
    tags: ['Education', 'Volunteering', 'Child Welfare', 'Skill Development', 'Learning'],
    icon: <Sparkles className="h-10 w-10 text-primary" />,
    photos: [
        "https://images.unsplash.com/photo-1531482615713-2c65c24babc4?auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=60",
        DEFAULT_NGO_GALLERY_IMAGE
    ]
  }
];
