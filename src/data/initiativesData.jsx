import { Activity, BookOpen, Brain, Briefcase, GraduationCap, FolderHeart as HandHeart, Leaf, Lightbulb, Mic, Palette, Presentation, Recycle, Rocket, School, Search, ShieldCheck, Smile, Sparkles, Sun, Users, Video, MessageCircle, Clock } from 'lucide-react';

export const staticInitiativesData = [
  {
    id: 'lets-summer',
    title: "Let's Summer",
    tagline: 'Engaging summer camps focused on skill development and fun learning experiences for children.',
    icon: <Sun className="h-8 w-8 text-primary" />,
    category: 'Education & Skill Development',
    status: 'Ongoing', // Example: Ongoing
    shortDescription: "A summer camp experience for children without access to enrichment programs—filled with joy, learning, and growth across Raipur.",
    fullDescription: [
      "Let's Summer is an annual initiative designed to offer joyful, enriching summer experiences to children from underserved communities. It transforms school vacations into an opportunity for growth, creativity, and confidence-building.",
      "Through a variety of hands-on sessions, the program introduces children to new skills such as art and craft, self-defense, mehndi, hairstyling, storytelling, and more. These activities not only engage them creatively but also promote essential life skills like communication and self-expression.",
      "The initiative takes place across multiple schools and community centers in Raipur, ensuring that children who often lack access to structured enrichment programs can participate in a safe, supportive environment.",
      "Let's Summer is powered by passionate volunteers who dedicate their time and energy to teaching and mentoring. Their commitment helps create a memorable and meaningful summer experience that leaves a lasting impact on every child involved."
    ], 
    impactAreas: ['Holistic Child Development', 'Skill Enhancement', 'Community Engagement', 'Creative Expression'],
    targetAudience: 'Under resourced children (Ages 6-18)',
    duration: '2 Months (Annually during summer vacations)',
    galleryTitle: 'Summer Camp Adventures',
    photos: [
      "https://dl.dropboxusercontent.com/scl/fi/k31oatkta5p9vvy2n9ijd/lets_summer_1.jpg?rlkey=89pz3ge065w75n61d8lb9njz0&st=nxj0w8fy&raw=1",
      "https://dl.dropboxusercontent.com/scl/fi/ryfax7o6qrquqnybrwju1/lets_summer_4.jpg?rlkey=zccxsgsa9a3l7agsqx15vcnmo&st=37zoxe7x&raw=1",
      "https://dl.dropboxusercontent.com/scl/fi/g7vbo77nes9edinnzghbx/lets_summer_3.jpg?rlkey=d9l7fkszytmtal77sgpyxl6tk&st=f34xb837&raw=1",
      "https://dl.dropboxusercontent.com/scl/fi/okq7kk63k67n2p6phu14t/lets_summer_2.jpg?rlkey=pifv2lh84si13mg7mdr6j4ms6&st=60pndvf5&raw=1"
    ],
    videos: [{
      url: "https://www.youtube.com/embed/fqrEVYoWXVA",
      title: "Let's Connect"
    }],
    howToContribute: [
      { type: 'Volunteer', description: 'Join us as a teaching volunteer or activity coordinator.', link: '/donate/time' },
      { type: 'Donate Materials', description: 'Provide stationery, art supplies, or sports equipment.', link: '/donate/material' },
      { type: 'Sponsor a Child', description: 'Cover the program cost for one or more children.', link: '/donate/money' }
    ],
    contact: {
      person: 'Lets Donate Team',
      email: 'letsdonateofficial@gmail.com',
      phone: '+91-8109710356'
    },
    testimonials: [
      { quote: "My child learned so much and had a fantastic time at Let's Summer. Thank you!", author: 'Parent from Raipur, Chhattisgarh', location: 'Raipur' },
      { quote: "Volunteering for Let's Summer was an incredibly rewarding experience. Seeing the kids grow was amazing.", author: 'Volunteer', location: 'Raipur' }
    ],
    youtubeLink: "https://www.youtube.com/embed/fqrEVYoWXVA",
  },
  // {
  //   id: 'lets-elevate',
  //   title: "Let's Elevate",
  //   tagline: 'Empowering youth with essential career guidance, soft skills, and digital literacy for a brighter future.',
  //   icon: <GraduationCap className="h-8 w-8 text-primary" />,
  //   category: 'Youth Empowerment & Career Development',
  //   status: 'To Start', // Example: To Start
  //   shortDescription: "A comprehensive program designed to equip young adults in Raipur, Chhattisgarh with skills for employability and personal growth.",
  //   fullDescription: [
  //     "Let's Elevate focuses on bridging the gap between formal education and the demands of the modern workplace. We provide workshops on resume building, interview skills, communication, critical thinking, and digital literacy.",
  //     "The program also includes mentorship opportunities, connecting youth with professionals from various fields. Our aim is to empower them to make informed career choices and navigate their professional journeys successfully.",
  //     "Sessions are conducted in community centers and educational institutions across Raipur, Chhattisgarh, tailored to the specific needs of the participants."
  //   ],
  //   impactAreas: ['Employability Skills', 'Career Awareness', 'Digital Literacy', 'Personal Development'],
  //   targetAudience: 'Young adults (Ages 16-25)',
  //   duration: 'Ongoing workshops and mentorship programs',
  //   galleryTitle: 'Elevating Futures',
  //   photos: [
  //     "https://dl.dropboxusercontent.com/scl/fi/k31oatkta5p9vvy2n9ijd/lets_summer_1.jpg?rlkey=89pz3ge065w75n61d8lb9njz0&raw=1",
  //   ],
  //   videos: [{
  //     url: "https://www.youtube.com/embed/mro5NEfTWNw",
  //     title: "Let's Elevate Success Story"
  //   }],
  //   howToContribute: [
  //     { type: 'Mentor', description: 'Share your professional experience and guide a young adult.', link: '/donate/time' },
  //     { type: 'Conduct Workshop', description: 'Volunteer to lead a session on your area of expertise.', link: '/donate/time' },
  //     { type: 'Sponsor Resources', description: 'Help us provide learning materials or access to online courses.', link: '/donate/money' }
  //   ],
  //   contact: {
  //     person: 'Youth Program Lead',
  //     email: 'elevate@letsdonate.org',
  //     phone: '+91-9876543211 (Raipur Office)'
  //   },
  //   testimonials: [
  //     { quote: "Let's Elevate helped me prepare for job interviews and boosted my confidence significantly.", author: 'Participant', location: 'Raipur' }
  //   ],
  //   youtubeLink: "https://www.youtube.com/embed/mro5NEfTWNw",
  // },
  {
    id: 'lets-prepare',
    title: "Let's Prepare",
    tagline: 'Because a little guidance can change a child’s entire future.',
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    category: 'Education Support',
    status: 'To Start', // Example: Done
    shortDescription: "Every Saturday, volunteers step into classrooms across Raipur to prepare students for scholarship exams — and for life.",
    fullDescription: [
      "Let’s Prepare is more than academic support — it’s a belief in children who’ve rarely been told they can. Every Saturday, our volunteers visit government schools across Raipur, helping students prepare for NMMS scholarship exams. But beyond textbooks and tests, we build something deeper: confidence, curiosity, and hope.",
      "For many students, this is their first real shot at breaking out of the cycle of poverty, doubt, and missed opportunities. We focus on key subjects, offer practice papers, and equip them with study techniques and life skills — all through consistent mentorship and care.",
      "Because when a child wins a scholarship, it’s not just financial help — it’s proof that they matter, that their dreams are valid. And that belief? It lasts a lifetime."
    ],
    impactAreas:  ['Academic Support', 'Scholarship Exam Prep', 'Confidence Building', 'Breaking Barriers'],
    targetAudience: 'Students in government schools',
    duration: 'June - November (Annually)',
    galleryTitle: 'Preparing for Success',
    photos: [
      "https://dl.dropboxusercontent.com/scl/fi/48ky4dqzd8q25f5ijjh46/lets_prepare_cover.JPG?rlkey=pgdyxzkp2s01k2qa9t1tboj6n&st=bjegrmay&raw=1",
      "https://dl.dropboxusercontent.com/scl/fi/fig90niaxt9awegy65o02/lets_prepare.JPG?rlkey=36joribfj1myyf0yqv3pt4g90&st=9jfd8ejk&raw=1",
      "https://dl.dropboxusercontent.com/scl/fi/0pivt93svpywbmrkl3lo1/lets_prepare_2.JPG?rlkey=bybzxdxdm8qay6v2nasc3sya8&st=745z5l3p&raw=1",
      "https://dl.dropboxusercontent.com/scl/fi/7kvgpstxariox0cuq9b7l/lets_prepare_3.JPG?rlkey=atm79e1l6tv5v5qnwkckuwlvt&st=qk9dhptz&raw=1",
      "https://dl.dropboxusercontent.com/scl/fi/18fr8yow00g3655fvs4ym/lets_prepare_4.jpg?rlkey=czimvo6tgqz2yrwuftezw3v17&st=0jc2l3pq&raw=1"
    ],
    videos: [{
      url: "https://www.youtube.com/embed/mro5NEfTWNw",
      title: "Let's Prepare Impact"
    }],
    howToContribute: [
      { type: '💡 Become a Tutor', description: 'Volunteer to teach a subject and mentor students every Saturday.', link: '/donate/time' },
      { type: '📘 Donate Study Materials', description: 'Help by providing books, stationery, or printed practice papers.', link: '/donate/material' },
      { type: '🏫 Fund a Learning Space', description: 'Support operational and resource costs at our partner schools.', link: '/donate/money' }
    ],
    contact: {
      person: 'Lets Donate Team',
      email: 'letsdonateofficial@gmail.com',
      phone: '+91-8109710356'
    },
    testimonials: [
      { quote: "Thanks to Let's Prepare, I scored much better in my exams. The tutors were very helpful.", author: 'Student', location: 'Raipur' }
    ],
    youtubeLink: "https://www.youtube.com/embed/mro5NEfTWNw",
  },
  {
    id: 'lets-share',
    title: "Let's Share",
    tagline: 'Giving with Purpose. Delivering comfort. Creating impact that lasts.',
    icon: <HandHeart className="h-8 w-8 text-primary" />,
    category: 'Humanitarian Aid',
    status: 'Ongoing',
    shortDescription: "Heart-led donation drives bringing everyday essentials to the people who need them the most.",
    fullDescription: [
      "Let’s Share is a program rooted in the belief that the simple act of giving can build stronger, more compassionate communities.",
      "Because everyone deserves comfort, dignity, and care, we focus on providing everyday essentials to those who need them most—like shoes for school children, umbrellas for street vendors, and buttermilk on scorching summer days. These small gestures make a big difference in the lives of others.",
      "Because when we share, we create ripples of hope and connection, we invite everyone to be a part of this movement—whether through financial contributions, donating useful items, or volunteering time. Every act of kindness is appreciated."
    ],
    impactAreas: ['Community Support', 'Health & Comfort', 'Basic Needs Fulfillment', 'Social Responsibility'],
    targetAudience: 'Underprivileged individuals and families, elderly, street vendors, school children',
    duration: 'Year-round',
    galleryTitle: 'Everyday Giving, Everyday Impact',
    photos: [
      "https://dl.dropboxusercontent.com/scl/fi/0bmkc8eegv78uobq54eo0/lets_share.JPG?rlkey=hdc6cd916ntiucr2quuhqdb22&st=k4ai2twy&raw=1",
      "https://dl.dropboxusercontent.com/scl/fi/h4oug7bpof4s5dsibq8k8/IMG_2640-min.JPG?rlkey=72ija29x8ia4wh6rgawc2xg28&st=vl9hwirr&raw=1",
      "https://dl.dropboxusercontent.com/scl/fi/ved81g68s2u72esnzv5b3/IMG_3781-min.jpg?rlkey=rt4du81exp4ch9z9wmjrcz4nq&st=ch2ls07x&raw=1",
      "https://dl.dropboxusercontent.com/scl/fi/t7iqtc4nbh2xvuirkvxn7/IMG_4153-min.jpg?rlkey=zbp6fg65qmu9u9tvwulr3rg9k&st=r1mpxj66&raw=1",
      "https://dl.dropboxusercontent.com/scl/fi/7w5sj6ompdlr4r4mxj5gn/IMG_4194-min.jpg?rlkey=u07eryx2mwxuy3qrjkko5f36m&st=9z9xzhgd&raw=1",
      "https://dl.dropboxusercontent.com/scl/fi/cp1fkuy979dvptvpeqj3i/IMG_7826-min.JPG?rlkey=j6ch0e7wmequ811kntn259m58&st=sakldxvr&raw=1"
    ],    
    videos: [{
      url: "https://www.youtube.com/embed/mJK_aR3HE1w",
      title:  "Let's Share: Giving with Purpose"
    }],
    howToContribute: [
      { type: 'Donate Essentials', description: 'Share shoes, books, clothes, umbrellas, buttermilk, and more.', link: '/donate/material' },
      { type: 'Volunteer for Distribution', description: 'Help us sort and distribute items with dignity and care.', link: '/donate/time' },
      { type: 'Organize a Collection Drive', description: 'Start a donation drive in your society or workplace.', link: '/contact-us' }
    ],
    contact: {
      person: 'Lets Donate Team',
      email: 'letsdonateofficial@gmail.com',
      phone: '+91-8109710356'
    },
    testimonials: [
      { quote: "Visited the school to distribute stationery and sweets. Seeing the kids’ faces light up was truly heartwarming. Grateful to be part of something that brings real hope to young lives.", author: 'Donor', location: 'Raipur' },
      { quote: "Thanks to generous donations, now me and my wife have enough warm clothes to go to work comfortably in the chilly winter mornings.", author: 'Slum Resident', location: 'Raipur' },
    ],
    youtubeLink: "https://www.youtube.com/embed/mJK_aR3HE1w",
  },
  {
    id: 'lets-foundation',
    title: "Let's Foundation",
    tagline: 'Strong basics, Bright future.',
    icon: <Leaf className="h-8 w-8 text-primary" />,
    category: 'Education & Skill Development',
    status: 'Ongoing',
    shortDescription: "One of our core initiatives, empowering young minds with the foundational knowledge they need to learn, grow, lead and inspire.",
    fullDescription: [
    "Every child deserves the chance to read, write, and express themselves with confidence, which is why we created 'Let’s Foundation'.",
    "Through this initiative, we equip children with foundational knowledge in English, Hindi, Mathematics, and other subjects—core skills that support learning, growth, and confidence at every stage of life.",
    "We collaborate with local schools and passionate individuals who share their knowledge wholeheartedly, creating a nurturing space for future minds.",
    "Our dedicated volunteers create engaging spaces every weekend, making learning fun through art, games, stories, and creative expression — bringing heart and hope to each session.",
    "This initiative continues to empower young minds, laying the groundwork for lifelong learning and brighter futures."
  ],
    impactAreas: [
      "Holistic Child Development",
      "Skill Enhancement",
      "Community Engagement",
      "Preventing Learning Loss"
    ],
    targetAudience: "Underprivileged children (Ages 4-12)",
    duration: 'Year-round activities',
    galleryTitle: 'Learning in Action',
    photos: [
      "https://dl.dropboxusercontent.com/scl/fi/s0dmswzr8dl39jwx1iue1/2fb71a2e-68e0-4088-8fb1-a6a13c997706.JPG?rlkey=m9jh2j84hrz9i7zw7n3sezd6i&st=kwmlz03n&raw=1",
      "https://dl.dropboxusercontent.com/scl/fi/3n2nhsaozbky6kdcsd3az/ce56ac2f-a3c6-4a48-b164-95da150fabc6.JPG?rlkey=03xls990as7foxvbjzno5nxac&st=uqmilro6&raw=1",
      "https://dl.dropboxusercontent.com/scl/fi/dcrrs7yvygihc4pin3vbe/802de282-62e8-4712-a2b8-e241734ca97f.JPG?rlkey=amtlfj78ce851alrexrlzlfjm&st=y7g4qgzq&raw=1",
      "https://dl.dropboxusercontent.com/scl/fi/su4qidhzzuw9s6shec9yx/96223bbb-c424-454a-af6d-9c15335fba29.JPG?rlkey=ybcvotjux34jw4i9q1nr4hppc&st=sjovz012&raw=1"
    ],
    videos: [{
      url: "https://www.youtube.com/embed/dpDbV9dEL3Y",
      title: "Let's Foundation Highlights"
    }],
    howToContribute: [
      { type: 'Volunteer Time', description: 'Join us for teaching sessions or activity facilitation.', link: '/donate/time' },
      { type: 'Donate Materials', description: 'Provide educational materials like books and stationery.', link: '/donate/material' },
      { type: 'Spread Awareness', description: 'Help share our mission and programs within your community.', link: '/social-change-circle' }
    ],
    contact: {
      person: 'Lets Donate Team',
      email: 'letsdonateofficial@gmail.com',
      phone: '+91-8109710356'
    },
    testimonials: [
      { 
        quote: "My child was teaching her grandmother what she learnt at School the other day. It feels very good to see that she’s receiving opportunities which I didn’t.", 
        author: 'Parent' 
      },
      { 
        quote: "Sometimes it's as if Im learning from the children and not the other way around. Teaching and spending time with them in general is like making a real difference.", 
        author: 'Volunteer' 
      }
    ],
    youtubeLink: "https://www.youtube.com/embed/dpDbV9dEL3Y",
  },
  {
    id: 'lets-connect',
    title: "Let's Connect",
    tagline: 'Empowering hearing-impaired children through creativity, communication, and community.',
    icon: <MessageCircle className="h-8 w-8 text-primary" />,
    category: 'Special Education & Inclusion',
    status: 'To Start',
    shortDescription: "Dedicated workshops and activities designed to support the growth, learning, and inclusion of hearing-impaired children in Raipur.",
    fullDescription: [
      "Let's Connect is a compassionate initiative focused on empowering hearing-impaired children through creative arts, skill-building, and inclusive communication.",
      "We provide weekly workshops featuring art, craft, clay modeling, self-defense, and more, tailored to meet the unique needs of children with hearing challenges.",
      "Our volunteers learn sign language and adaptive teaching methods to ensure every child feels heard, valued, and included.",
      "Special sessions like Rubik’s Cube solving, mehndi art, and physical fitness are designed to build confidence, creativity, and life skills.",
      "Led by dedicated volunteers and supported by partner schools, our program creates a nurturing environment where children develop socially, emotionally, and academically.",
      "Each year, we conclude with a joyful summer camp that celebrates achievement, friendship, and personal growth.",
      "Together with our partners and community, we strive to break communication barriers and foster belonging for every child."
    ],
    impactAreas: [
      "Inclusive Education",
      "Communication & Sign Language",
      "Creative Skill Development",
      "Confidence & Social Inclusion"
    ],
    targetAudience: "Special children, ages 6-14",
    duration: "Every Saturday sessions throughout the year, plus summer camps",
    galleryTitle: "Let's Connect - Empowering Special Children",
    photos: [
      "https://dl.dropboxusercontent.com/scl/fi/ep1qmiwv5my99aemotxqg/dc7872b4-9812-481e-a793-ae6374cdd5cc-min.JPG?rlkey=2wgydlj9j4tccy7owzd20n5sa&st=w132jfic&raw=1",
      "https://dl.dropboxusercontent.com/scl/fi/ug7f2p1tva4hsyzhgwfsx/4c98e9cb-cbca-4bd2-951c-561b6803d675-min.JPG?rlkey=mhkxmnorru7c7t7oh4ewnmf5d&st=xmj1oy8n&raw=1",
      "https://dl.dropboxusercontent.com/scl/fi/ew7vrtyk9yo08qg0ew00p/393dac39-3fd6-48a6-961f-0888ad508780-min.JPG?rlkey=9zfiivmmd6l1dqy6shy9t9rff&st=gtx8t3sv&raw=1",
      "https://dl.dropboxusercontent.com/scl/fi/3qfpwv41668zp9n7t8x1e/1382b991-03a2-4c33-af09-7d8dd97630cb-min.JPG?rlkey=axzhlaysq1y3093m8g8og02g0&st=x3cl166s&raw=1",
      "https://dl.dropboxusercontent.com/scl/fi/ltyzmmrr9ngnnn9gdsqdd/82320567-e9e5-4073-8316-7926a810f092-min.JPG?rlkey=miq86xc25amwsnxfryklq3pc0&st=hrkhz5dt&raw=1"
    ],    
    videos: [{
      url: "https://www.youtube.com/embed/So2rbtHfE-U",
      title: "Let's Connect - Empowering Special Children"
    }],
    howToContribute: [
      { type: 'Volunteer with Sign Language Skills', description: 'Join us to facilitate sessions and support communication.', link: '/donate/time' },
      { type: 'Donate Materials', description: 'Help by providing art supplies and educational tools.', link: '/donate/material' },
      { type: 'Partner with Us', description: 'Connect us with schools or organizations focused on special education.', link: '/contact-us' }
    ],
    contact: {
      person: 'Lets Donate Team',
      email: 'letsdonateofficial@gmail.com',
      phone: '+91-8109710356'
    },
    testimonials: [
      { quote: "Working with hearing-impaired children and learning sign language has been a heartwarming and transformative experience.", author: 'Simran, Volunteer', location: 'Raipur' },
      { quote: "My child feels more confident and connected, thanks to the inclusive activities and caring environment.", author: 'Parent', location: 'Raipur' }
    ],
    youtubeLink: "https://www.youtube.com/embed/So2rbtHfE-U",
  },
  {
    id: 'lets-celebrate',
    title: "Let's Celebrate",
    tagline: 'Because joy grows when shared!',
    icon: <MessageCircle className="h-8 w-8 text-primary" />,
    category: 'Joyful Gifting & Special Days',
    status: 'Ongoing',
    shortDescription: "Turn your special day into someone else's reason to smile—by donating, sponsoring, or simply celebrating with them.",
    fullDescription: [
      "Let’s Celebrate is an initiative that encourages people to turn their special days—such as birthdays, anniversaries, or any meaningful occasion—into moments of shared joy.",
      "Instead of traditional celebrations, individuals choose to mark these days by donating items like stationery or essentials, sponsoring fun and educational sessions, or simply spending time with children in need.",
      "The aim is to create lasting memories not just for themselves, but also for those who often go unnoticed. Through these heartfelt gestures, every celebration becomes a chance to spread happiness, hope, and a sense of belonging."
    ],
    impactAreas: ['Joyful Giving', 'Child Enrichment', 'Community Engagement'],
    targetAudience: 'Anyone with a reason to celebrate',
    duration: 'Year-round, as per individual occasions',
    galleryTitle: 'Celebrations That Create Smiles',
    photos: [
      "https://dl.dropboxusercontent.com/scl/fi/hp5guuk5ylrt2mivx58g7/birthday_carousel.jpg?rlkey=a1dmbffzc076ftrkjm0pt11ar&st=por05w3u&raw=1",
      "https://dl.dropboxusercontent.com/scl/fi/kivo8drkg1cvlvyum2i42/lets_celebrate.jpg?rlkey=u39h4j3frqwup12mt747qzf2m&st=tdg6tkoc&raw=1",
      "https://dl.dropboxusercontent.com/scl/fi/8b8xab5aqqg2rxp15nzd4/lets_celebrate_2.jpg?rlkey=60ks76l8rwkiq56g1ruh91o3v&st=rhjbgcwa&raw=1",
      "https://dl.dropboxusercontent.com/scl/fi/43il0qsjo1n2lf96iq76f/lets_celebrate3.jpg?rlkey=o7nub5cxpx4b1xhwzrhyr3w9i&st=zfeikoq8&raw=1",
      "https://dl.dropboxusercontent.com/scl/fi/v5843ibgd4jnkxi2hmcjs/lets_celebrate4.jpg?rlkey=3uo2wjfcp491v73l3uirunxfk&st=r6quvd54&raw=1"
    ],
    videos: [{
      url: "https://www.youtube.com/embed/V8ZkS1gnUZ4",
      title: "Celebrations That Create Smiles"
    }],
    howToContribute: [
      { type: '📦 Donate Items', description: 'Help organize or facilitate support group meetings (training provided).', link: '/celebrate-birthday' },
      { type: 'Sponsor a Learning Day', description: 'Fund or lead a joyful learning session or fun activity on your special day.', link: '/celebrate-birthday' },
      { type: 'Celebrate With Us', description: 'Join us for a celebration, create memories, and bring happiness to children.', link: '/celebrate-birthday' }
    ],
    contact: {
      person: 'Lets Donate Team',
      email: 'letsdonateofficial@gmail.com',
      phone: '+91-8109710356'
    },
    testimonials: [
      { quote: "Celebrating my birthday with the kids was unforgettable. I’ve never felt this fulfilled.", author: 'Nehal, Donor & Volunteer', location: 'Raipur' }
    ],
    youtubeLink: "https://www.youtube.com/embed/V8ZkS1gnUZ4",
  },
  {
    id: 'lets-reflect',
    title: "Let's Reflect",
    tagline: 'Nurturing young minds with emotional awareness and psychological care.',
    icon: <MessageCircle className="h-8 w-8 text-primary" />,
    category: 'Mental Health & Emotional Well-being',
    status: 'Ongoing',
    shortDescription: "Let’s Reflect promotes mental well-being and emotional growth among children through guided sessions led by mental health professionals.",
    fullDescription: [
      "Let’s Reflect supports the mental and emotional well-being of children from under-resourced communities — including government schools, orphanages, and vulnerable groups.",
      "We offer sessions led by psychologists, counselors, and expressive art therapists to help children build emotional awareness, resilience, and confidence.",
      "Activities include art therapy, mindfulness, yoga psychology, and mental health education — all in safe, nurturing spaces.",
      "A key highlight was our 3-month series with Click for Clarity, empowering teenage girls through emotional and cognitive development.",
      "Let’s Reflect is our promise to nurture minds and help children thrive with compassion and strength."
    ],
    impactAreas: [
      "Mental Health Awareness",
      "Emotional Intelligence",
      "Child-Centered Development",
      "Mindfulness & Regulation"
    ],
    targetAudience: "Children (ages 8–18), especially in underserved and government schools",
    duration: "Regular sessions throughout the academic year",
    galleryTitle: 'Reflections of Growth',
    photos: [
      "https://dl.dropboxusercontent.com/scl/fi/b5ttuqc5s9oxhql979g0k/bf337f0f-60a7-41d4-a72e-69ca4cce63b0-2-min.JPG?rlkey=qv53mdfsg24gclsod56k8o5ui&st=in120l0r&raw=1",
      "https://dl.dropboxusercontent.com/scl/fi/naicc05tfg1cm3tdzc5z8/IMG_5270-min.jpg?rlkey=mw2dgbwlzum6scq9dg9clbl3s&st=732rwxig&raw=1",
      "https://dl.dropboxusercontent.com/scl/fi/ckbx4fhnqrwiytvawtgog/IMG_2819-min.PNG?rlkey=q66cncsnkvfd2599xpbkawype&st=aolw7d7w&raw=1",
      "https://dl.dropboxusercontent.com/scl/fi/616y83tlw30m9wml6pnby/IMG_2820-min.PNG?rlkey=fwt5yil3j0uuhxc39fpkrm31b&st=4ns3hwic&raw=1",
      "https://dl.dropboxusercontent.com/scl/fi/gg4gh478kh5cva4y80db9/IMG_2818-min.PNG?rlkey=al1kib6mespzqgkf3x83pc54b&st=c7su5wot&raw=1",
      "https://dl.dropboxusercontent.com/scl/fi/9z1lfl5zm4r6g8122oghk/4ab76e02-257e-4708-91a6-972b62ab5e49-2-min.JPG?rlkey=9ufqrli1vnxkx4z07924j6sar&st=7sj1493i&raw=1"
    ],
    videos: [{
      url: "https://www.youtube.com/embed/6GhUA3rq43I",
      title: "Mental Wellness Workshops for Kids"
    }],
    howToContribute: [
      { type: 'Be a Mental Health Ally', description: 'Join us in organizing sessions or coordinating with professionals.', link: '/donate/time' },
      { type: 'Fund a Session', description: 'Support ongoing mental wellness workshops in government schools.', link: '/donate/money' },
      { type: 'Provide Resources', description: 'Help us offer creative material for art therapy and mindfulness kits.', link: '/donate/material' }
    ],
    contact: {
      person: 'Lets Donate Team',
      email: 'letsdonateofficial@gmail.com',
      phone: '+91-8109710356'
    },
    testimonials: [
      {
        quote: "I didn’t know how to talk about my feelings before. Now I draw them, and it makes me feel lighter.",
        author: 'Class 8th Student',
        location: 'Raipur'
      },
      {
        quote: "We saw visible changes in how the girls handled pressure and expressed themselves after the workshops.",
        author: 'Warden of an Insitutre',
        location: 'Raipur'
      }
    ],
    youtubeLink: "https://www.youtube.com/embed/6GhUA3rq43I",
  },
  {
    id: 'lets-wish',
    title: "Let's Wish",
    tagline: 'Empowering marginalized Women, One Wish at a Time.',
    icon: <MessageCircle className="h-8 w-8 text-primary" />,
    category: 'Women Empowerment',
    status: 'Ongoing',
    shortDescription: "An initiative focused on empowering women through education, mental wellness, and skill-building programs that foster independence and confidence.",
    fullDescription: [
      "Let’s Wish is an initiative dedicated to empowering marginalized women by equipping them with the tools they need to lead independent and fulfilling lives.",
      "Our work spans across key areas: education, emotional well-being, and skill development—ensuring that women are not only capable but also confident in taking control of their lives.",
      "We aim to create safe and supportive spaces where women can express themselves freely, learn with purpose, and grow with pride.",
      "Whether it’s through workshops on mental health, sessions on financial literacy, or hands-on skill training, we believe in nurturing both ability and aspiration.",
      "By helping women take small steps toward big dreams, Let’s Wish works to ensure that every woman feels heard, valued, and capable of turning her wishes into reality."
    ],
    impactAreas: [
      "Women Empowerment",
      "Mental Well-being",
      "Skill Development",
      "Safe and Supportive Spaces"
    ],
    targetAudience: "Women and girls (ages 15+), especially from underserved communities",
    duration: "Monthly workshops and ongoing support sessions",
    galleryTitle: 'Let Her Grow',
    photos: [
      "https://dl.dropboxusercontent.com/scl/fi/pmv3p33c35rlxc6pkxu85/IMG_2817-min.PNG?rlkey=yajns1mvkag4xpek6oth60hm7&st=q99s5n0h&raw=1",
      "https://dl.dropboxusercontent.com/scl/fi/wmx98xrovwgfqblfylq22/IMG_2815-min.PNG?rlkey=ne5ovqlizgmk7xz2hd8qhqdi2&st=l4wrtvcc&raw=1",
      "https://dl.dropboxusercontent.com/scl/fi/9h088hwrn60l87lhd5ghn/IMG_2814-min.PNG?rlkey=ypc9ivztkhxktuzn3633qo4c3&st=rjrh148m&raw=1",
      "https://dl.dropboxusercontent.com/scl/fi/bk9hshiz1cfl2unw11pif/IMG_2813-min.PNG?rlkey=0i3g348jbwdmnzaxs1jl1bs58&st=jzjeldr7&raw=1"
    ],    
    videos: [{
      url: "https://www.youtube.com/embed/0tLulMxgHAU",
      title: "Let’s Wish – Women Empowerment Program"
    }],
    howToContribute:  [
      { type: 'Host a Workshop', description: 'Share your knowledge or lead a session on skills, health, or self-growth.', link: '/donate/time' },
      { type: 'Donate Learning Kits', description: 'Provide books, hygiene kits, or resources to support learning.', link: '/donate/material' },
      { type: 'Sponsor Resources', description: 'Support a woman’s journey by funding her training or therapy sessions.', link: '/donate/money' }
    ],
    contact: {
      person: 'Lets Donate Team',
      email: 'letsdonateofficial@gmail.com',
      phone: '+91-8109710356'
    },
    testimonials: [
      {
        quote: "Let’s Wish gave me a chance to learn a skill I never thought I could. Now I’m more confident and independent.",
        author: 'Participant',
        location: 'Raipur'
      },
      {
        quote: "Watching these women grow stronger every week reminds me why safe spaces like these are so important.",
        author: 'Megha,Volunteer',
        location: 'Raipur'
      }
    ],
    youtubeLink: "https://www.youtube.com/embed/0tLulMxgHAU",
  }
];

export const getInitiativeById = (id) => {
  return staticInitiativesData.find(initiative => initiative.id === id);
};