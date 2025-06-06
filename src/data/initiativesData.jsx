import { Activity, BookOpen, Brain, Briefcase, GraduationCap, FolderHeart as HandHeart, Leaf, Lightbulb, Mic, Palette, Presentation, Recycle, Rocket, School, Search, ShieldCheck, Smile, Sparkles, Sun, Users, Video, MessageCircle, Clock } from 'lucide-react';

export const staticInitiativesData = [
  {
    id: 'lets-summer',
    title: "Let's Summer",
    tagline: 'Engaging summer camps focused on holistic development and fun learning experiences for children.',
    icon: <Sun className="h-8 w-8 text-primary" />,
    category: 'Education & Skill Development',
    status: 'Ongoing', // Example: Ongoing
    shortDescription: "Our flagship summer program offering a blend of academics, arts, and life skills to children in Raipur, Chhattisgarh.",
    fullDescription: [
      "Let's Summer is an annual initiative designed to make summer holidays productive and enjoyable for underprivileged children. We focus on creating a vibrant learning environment where children can explore their interests, develop new skills, and build confidence.",
      "The program covers a wide range of activities including basic literacy and numeracy, creative arts (drawing, painting, craft), storytelling, sports, and essential life skills workshops. Our dedicated volunteers from Raipur, Chhattisgarh and beyond ensure personalized attention and a supportive atmosphere for every child.",
      "We collaborate with local schools and community centers in Raipur, Chhattisgarh to reach children who can benefit most from this program. The goal is to prevent summer learning loss and ignite a lifelong passion for learning."
    ],
    impactAreas: ['Holistic Child Development', 'Skill Enhancement', 'Community Engagement', 'Preventing Learning Loss'],
    targetAudience: 'Underprivileged children (Ages 6-14)',
    duration: '4-6 Weeks (Annually during summer vacations)',
    galleryTitle: 'Summer Camp Adventures',
    photos: [
      "https://dl.dropboxusercontent.com/scl/fi/1bdoxdf3btzwiiu7hr8pi/LETS_SUMMER_MAIN.jpg?rlkey=61ukkag7liy9qiot36qz7fp18&raw=1",
      "https://dl.dropboxusercontent.com/scl/fi/1bdoxdf3btzwiiu7hr8pi/LETS_SUMMER_MAIN.jpg?rlkey=61ukkag7liy9qiot36qz7fp18&raw=1",
      "https://dl.dropboxusercontent.com/scl/fi/1bdoxdf3btzwiiu7hr8pi/LETS_SUMMER_MAIN.jpg?rlkey=61ukkag7liy9qiot36qz7fp18&raw=1",
    ],
    videos: [{
      url: "https://www.youtube.com/embed/mro5NEfTWNw",
      title: "Let's Summer Highlights"
    }],
    howToContribute: [
      { type: 'Volunteer', description: 'Join us as a teaching volunteer or activity coordinator.', link: '/donate/time' },
      { type: 'Donate Materials', description: 'Provide stationery, art supplies, or sports equipment.', link: '/donate/material' },
      { type: 'Sponsor a Child', description: 'Cover the program cost for one or more children.', link: '/donate/money' }
    ],
    contact: {
      person: 'Summer Program Coordinator',
      email: 'summer@letsdonate.org',
      phone: '+91-9876543210 (Raipur Office)'
    },
    testimonials: [
      { quote: "My child learned so much and had a fantastic time at Let's Summer. Thank you!", author: 'Parent from Raipur, Chhattisgarh', location: 'Raipur' },
      { quote: "Volunteering for Let's Summer was an incredibly rewarding experience. Seeing the kids grow was amazing.", author: 'Volunteer', location: 'Raipur' }
    ],
    youtubeLink: "https://www.youtube.com/embed/mro5NEfTWNw",
  },
  {
    id: 'lets-elevate',
    title: "Let's Elevate",
    tagline: 'Empowering youth with essential career guidance, soft skills, and digital literacy for a brighter future.',
    icon: <GraduationCap className="h-8 w-8 text-primary" />,
    category: 'Youth Empowerment & Career Development',
    status: 'To Start', // Example: To Start
    shortDescription: "A comprehensive program designed to equip young adults in Raipur, Chhattisgarh with skills for employability and personal growth.",
    fullDescription: [
      "Let's Elevate focuses on bridging the gap between formal education and the demands of the modern workplace. We provide workshops on resume building, interview skills, communication, critical thinking, and digital literacy.",
      "The program also includes mentorship opportunities, connecting youth with professionals from various fields. Our aim is to empower them to make informed career choices and navigate their professional journeys successfully.",
      "Sessions are conducted in community centers and educational institutions across Raipur, Chhattisgarh, tailored to the specific needs of the participants."
    ],
    impactAreas: ['Employability Skills', 'Career Awareness', 'Digital Literacy', 'Personal Development'],
    targetAudience: 'Young adults (Ages 16-25)',
    duration: 'Ongoing workshops and mentorship programs',
    galleryTitle: 'Elevating Futures',
    photos: [
      "https://dl.dropboxusercontent.com/scl/fi/1bdoxdf3btzwiiu7hr8pi/LETS_SUMMER_MAIN.jpg?rlkey=61ukkag7liy9qiot36qz7fp18&raw=1",
    ],
    videos: [{
      url: "https://www.youtube.com/embed/mro5NEfTWNw",
      title: "Let's Elevate Success Story"
    }],
    howToContribute: [
      { type: 'Mentor', description: 'Share your professional experience and guide a young adult.', link: '/donate/time' },
      { type: 'Conduct Workshop', description: 'Volunteer to lead a session on your area of expertise.', link: '/donate/time' },
      { type: 'Sponsor Resources', description: 'Help us provide learning materials or access to online courses.', link: '/donate/money' }
    ],
    contact: {
      person: 'Youth Program Lead',
      email: 'elevate@letsdonate.org',
      phone: '+91-9876543211 (Raipur Office)'
    },
    testimonials: [
      { quote: "Let's Elevate helped me prepare for job interviews and boosted my confidence significantly.", author: 'Participant', location: 'Raipur' }
    ],
    youtubeLink: "https://www.youtube.com/embed/mro5NEfTWNw",
  },
  {
    id: 'lets-prepare',
    title: "Let's Prepare",
    tagline: 'Providing academic support and exam preparation resources to students from underserved communities.',
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    category: 'Education Support',
    status: 'Done', // Example: Done
    shortDescription: "Focused tutoring and mentorship to help students in Raipur, Chhattisgarh excel in their academics and crucial exams.",
    fullDescription: [
      "Let's Prepare aims to level the playing field for students lacking access to quality academic support. We offer free tutoring sessions for key subjects, focusing on conceptual clarity and problem-solving skills.",
      "Our volunteers also conduct workshops on effective study techniques, time management, and stress reduction during exams. We provide access to study materials and practice tests.",
      "This initiative primarily supports students in government schools and low-income communities in Raipur, Chhattisgarh, helping them achieve their academic potential."
    ],
    impactAreas: ['Academic Improvement', 'Exam Preparedness', 'Building Confidence', 'Educational Equity'],
    targetAudience: 'School students (Grades 8-12)',
    duration: 'Year-round academic support',
    galleryTitle: 'Preparing for Success',
    photos: [
      "https://dl.dropboxusercontent.com/scl/fi/1bdoxdf3btzwiiu7hr8pi/LETS_SUMMER_MAIN.jpg?rlkey=61ukkag7liy9qiot36qz7fp18&raw=1",
    ],
    videos: [{
      url: "https://www.youtube.com/embed/mro5NEfTWNw",
      title: "Let's Prepare Impact"
    }],
    howToContribute: [
      { type: 'Tutor', description: 'Volunteer to teach a subject you are proficient in.', link: '/donate/time' },
      { type: 'Donate Study Materials', description: 'Provide textbooks, reference guides, or stationery.', link: '/donate/material' },
      { type: 'Fund a Learning Center', description: 'Support the operational costs of our community study centers in Raipur.', link: '/donate/money' }
    ],
    contact: {
      person: 'Academic Support Head',
      email: 'prepare@letsdonate.org',
      phone: '+91-9876543212 (Raipur Office)'
    },
    testimonials: [
      { quote: "Thanks to Let's Prepare, I scored much better in my exams. The tutors were very helpful.", author: 'Student', location: 'Raipur' }
    ],
    youtubeLink: "https://www.youtube.com/embed/mro5NEfTWNw",
  },
  {
    id: 'lets-share-warmth',
    title: "Let's Share Warmth",
    tagline: 'Distributing essential winter wear and blankets to those in need during the cold season.',
    icon: <HandHeart className="h-8 w-8 text-primary" />,
    category: 'Humanitarian Aid',
    status: 'Future', // Example: Future
    shortDescription: "An annual drive in Raipur, Chhattisgarh to provide warmth and comfort to homeless and vulnerable individuals during winter.",
    fullDescription: [
      "Let's Share Warmth is a seasonal initiative focused on collecting and distributing new or gently used winter clothing, blankets, and other essentials to protect people from the harshness of winter.",
      "We organize collection drives across Raipur, Chhattisgarh and work with volunteers to sort, pack, and distribute these items to homeless shelters, street dwellers, and remote communities with limited access to resources.",
      "The goal is to ensure that no one in our community suffers due to lack of adequate winter protection."
    ],
    impactAreas: ['Winter Relief', 'Community Support', 'Health Protection', 'Basic Needs Fulfillment'],
    targetAudience: 'Homeless individuals, families in need, elderly',
    duration: 'October - January (Annually)',
    galleryTitle: 'Spreading Warmth',
    photos: [
      "https://dl.dropboxusercontent.com/scl/fi/1bdoxdf3btzwiiu7hr8pi/LETS_SUMMER_MAIN.jpg?rlkey=61ukkag7liy9qiot36qz7fp18&raw=1",
    ],
    videos: [{
      url: "https://www.youtube.com/embed/mro5NEfTWNw",
      title: "Let's Share Warmth Drive"
    }],
    howToContribute: [
      { type: 'Donate Warm Clothes', description: 'Contribute new or gently used blankets, sweaters, jackets, etc.', link: '/donate/material' },
      { type: 'Volunteer for Distribution', description: 'Help us in sorting and distributing the collected items.', link: '/donate/time' },
      { type: 'Organize a Collection Drive', description: 'Host a collection point in your society or workplace in Raipur.', link: '/contact-us' } 
    ],
    contact: {
      person: 'Winter Drive Coordinator',
      email: 'warmth@letsdonate.org',
      phone: '+91-9876543213 (Raipur Office)'
    },
    testimonials: [
      { quote: "Received a warm blanket during the coldest night. It meant the world to me.", author: 'Beneficiary', location: 'Raipur' }
    ],
    youtubeLink: "https://www.youtube.com/embed/mro5NEfTWNw",
  },
  {
    id: 'lets-nurture-nature',
    title: "Let's Nurture Nature",
    tagline: 'Promoting environmental consciousness through tree plantation drives and awareness campaigns.',
    icon: <Leaf className="h-8 w-8 text-primary" />,
    category: 'Environmental Conservation',
    status: 'Ongoing',
    shortDescription: "Engaging communities in Raipur, Chhattisgarh in tree planting, cleanliness drives, and promoting sustainable practices.",
    fullDescription: [
      "Let's Nurture Nature is dedicated to fostering a greener and healthier environment. We organize regular tree plantation drives in public spaces, schools, and barren lands across Raipur, Chhattisgarh.",
      "Beyond planting, we conduct awareness sessions on waste management, recycling, water conservation, and the importance of biodiversity. We aim to instill a sense of environmental responsibility in citizens of all ages.",
      "We collaborate with local authorities and environmental groups to maximize our impact and ensure the long-term survival of planted saplings."
    ],
    impactAreas: ['Afforestation', 'Environmental Awareness', 'Community Greening', 'Climate Action'],
    targetAudience: 'General public, students, communities',
    duration: 'Year-round activities',
    galleryTitle: 'Greening Our Planet',
    photos: [
      "https://dl.dropboxusercontent.com/scl/fi/1bdoxdf3btzwiiu7hr8pi/LETS_SUMMER_MAIN.jpg?rlkey=61ukkag7liy9qiot36qz7fp18&raw=1",
    ],
    videos: [{
      url: "https://www.youtube.com/embed/mro5NEfTWNw",
      title: "Tree Plantation Drive"
    }],
    howToContribute: [
      { type: 'Participate in Drives', description: 'Join our tree plantation or cleanliness drives.', link: '/donate/time' },
      { type: 'Donate Saplings', description: 'Contribute saplings or funds for purchasing them.', link: '/donate/material' },
      { type: 'Spread Awareness', description: 'Help us share information about sustainable practices in your community.', link: '/social-change-circle' }
    ],
    contact: {
      person: 'Environment Program Manager',
      email: 'nature@letsdonate.org',
      phone: '+91-9876543214 (Raipur Office)'
    },
    testimonials: [
      { quote: "Participating in the tree plantation drive was a great way to give back to nature. Proud to be part of it!", author: 'Volunteer', location: 'Raipur' }
    ],
    youtubeLink: "https://www.youtube.com/embed/mro5NEfTWNw",
  },
  {
    id: 'lets-talk-freely',
    title: "Let's Talk Freely",
    tagline: 'Creating safe spaces for open conversations on mental health and well-being.',
    icon: <MessageCircle className="h-8 w-8 text-primary" />,
    category: 'Mental Health Awareness',
    status: 'To Start',
    shortDescription: "Workshops and support groups in Raipur, Chhattisgarh to destigmatize mental health and promote emotional wellness.",
    fullDescription: [
      "Let's Talk Freely aims to break the silence surrounding mental health. We organize interactive workshops, awareness sessions, and peer support groups to foster open dialogue and provide basic mental health literacy.",
      "Our programs cover topics like stress management, emotional regulation, identifying signs of mental distress, and seeking help. We collaborate with mental health professionals to ensure accurate information and guidance.",
      "We are working to create a supportive community in Raipur, Chhattisgarh where individuals feel comfortable discussing their mental health challenges without fear of judgment."
    ],
    impactAreas: ['Mental Health Awareness', 'Destigmatization', 'Emotional Well-being', 'Peer Support'],
    targetAudience: 'Youth, adults, general community',
    duration: 'Regular workshops and support group meetings',
    galleryTitle: 'Conversations That Matter',
    photos: [
      "https://dl.dropboxusercontent.com/scl/fi/1bdoxdf3btzwiiu7hr8pi/LETS_SUMMER_MAIN.jpg?rlkey=61ukkag7liy9qiot36qz7fp18&raw=1",
    ],
    videos: [{
      url: "https://www.youtube.com/embed/mro5NEfTWNw",
      title: "Mental Health Awareness Session"
    }],
    howToContribute: [
      { type: 'Volunteer Facilitator', description: 'Help organize or facilitate support group meetings (training provided).', link: '/donate/time' },
      { type: 'Share Your Story', description: 'Contribute to destigmatizing mental health by sharing your experiences (optional, confidential).', link: '/contact-us' },
      { type: 'Support Resources', description: 'Help us create and distribute informational materials.', link: '/donate/money' }
    ],
    contact: {
      person: 'Mental Health Program Lead',
      email: 'talkfreely@letsdonate.org',
      phone: '+91-9876543215 (Raipur Office)'
    },
    testimonials: [
      { quote: "The support group provided a safe space for me to share my feelings. It's been incredibly helpful.", author: 'Participant', location: 'Raipur' }
    ],
    youtubeLink: "https://www.youtube.com/embed/mro5NEfTWNw",
  }
];

export const getInitiativeById = (id) => {
  return staticInitiativesData.find(initiative => initiative.id === id);
};