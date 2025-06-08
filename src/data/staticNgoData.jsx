import React from 'react';
import { HeartHandshake, Users, BookOpen, Leaf, ShieldHalf, Palette, Zap, Sparkles } from 'lucide-react';

const DEFAULT_NGO_GALLERY_IMAGE = "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80";

export const staticNgoData = [
  {
    id: 'static-ngo-5', 
    slug: 'sampoorna-foundation',
    name: 'Sampoorna Foundation',
    logo_url: 'https://dl.dropboxusercontent.com/scl/fi/f34cbs1invujcq5717rfd/sampoorna_logo.jpg?rlkey=fmxkm9kxx7ukkivea7ati6s14&st=1mh6a3qx&dl=0raw=1', 
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
    instagram_handle: 'sampoorna_life',
    tags: ['Education', 'Child Welfare', 'Skill Building', 'Extracurricular Activities', 'Learning'],
    icon: <BookOpen className="h-10 w-10 text-primary" />,
    photos: [
        "https://dl.dropboxusercontent.com/scl/fi/pfvuyrnlbcx6m6oqqsg1k/sampoorna_1.webp?rlkey=my7qk9vkbj9qqogct7gor8ljs&st=j5jk2kbo&dl=0raw=1",
        "https://dl.dropboxusercontent.com/scl/fi/1jeodin7i96msd2j8lxik/Sampoorna_2.jpg?rlkey=4anba5nrvrd061uqget6mpbmk&st=bjluk5jt&dl=0war=1",
        "https://dl.dropboxusercontent.com/scl/fi/5m96fsctknk2936arvsr1/sampoorna_3.jpg?rlkey=eivva68ec7jck6dxs8o0dfit1&st=7527kyd7&dl=0&raw=1"
    ]
  },
  {
    id: 'static-ngo-6',
    slug: 'lucky-tails',
    name: 'Lucky Tails',
    logo_url: 'https://dl.dropboxusercontent.com/scl/fi/8if8evt8ij7ipwremak7u/lucky_tails_logo.jpg?rlkey=cvm28lrsaj1vb91fie47f34xc&st=pkr8l7mn&raw=1', 
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
    instagram_handle: 'luckytails_chhattisgarh',
    tags: ['Animal Rescue', 'Animal Rehabilitation', 'Animal Welfare', 'Adoption'],
    icon: <HeartHandshake className="h-10 w-10 text-primary" />,
    photos: [
        "https://dl.dropboxusercontent.com/scl/fi/8ebhh638wpya60183m96o/lucky_tails_1.webp?rlkey=x50ncfp68d49ztujq7fadzy5m&st=psds54oy&raw=1",
        "https://dl.dropboxusercontent.com/scl/fi/24bi28apwquivgedly40u/lucky_tails_2.webp?rlkey=8z80ipwmhzqff8f9euyw6qyhy&st=m2nw65zd&raw=1",
        "https://dl.dropboxusercontent.com/scl/fi/so2ytu5evpk0uzhm9eijc/lucky_tails_3.jpg?rlkey=byzgpyj1o27obit1fajmlxvuu&st=glclw1pm&raw=1"
    ]
  },
  {
    id: 'static-ngo-7',
    slug: 'sneh-community',
    name: 'Sneh',
    logo_url: 'https://dl.dropboxusercontent.com/scl/fi/eyzbcm45rrqk43728vu46/sneh_logo.jpg?rlkey=nicay1s7vvnqgl6yd9vxh2yn4&st=dn1uqy8u&raw=1', 
    short_description: 'Learn. Yearn. Turn. Empowering underprivileged children through community action.',
    full_description: "Sneh is a community led by compassionate women working towards uplifting and empowering underprivileged children. Guided by our core motto “Learn. Yearn. Turn.”, we believe in the power of knowledge, empathy and action. At Sneh, we strive to nurture not just minds, but also hearts. Through education, mentorship and projects focused on equipping students with other skills, we intend to inspire children to create a brighter future.",
    mission: "Our mission is to empower dreams and support children in order to reach their full potential. We aim to educate while also facilitating out-of-textbook skills which contributes to the overall development of our little ones.",
    work_area: 'Community Centers & Schools',
    impact_highlights: [
      { text: "Multiple collaborations with local schools and community groups." },
      { text: "Rich network of dedicated volunteers contributing diverse skills." }
    ],
    website_url: '#',
    instagram_handle: 'snehraipur',
    tags: ['Education', 'Volunteering', 'Child Welfare', 'Skill Development', 'Learning'],
    icon: <Sparkles className="h-10 w-10 text-primary" />,
    photos: [
        "https://dl.dropboxusercontent.com/scl/fi/yr3um8lfytinqgbvz5yqk/sneh_1.jpg?rlkey=dvh98aswft9gvhz6hyhd0birz&st=egrp9svm&raw=1",
        "https://dl.dropboxusercontent.com/scl/fi/pqaqopajefbsg091813vx/sneh_2.jpg?rlkey=6f6shoj2hxhoatzl28onjr7vi&st=o5tqwk9o&war=1",
        "https://dl.dropboxusercontent.com/scl/fi/doz660zpf421k4suwobuu/sneh_3.png?rlkey=pq2g9nht8cxp7gkavgextymf1&st=np66tbgo&raw=1"
    ]
  },
  {
    id: 'static-ngo-8',
    slug: 'abhikalp-foundation',
    name: 'Abhikalp Foundation',
    logo_url: 'https://dl.dropboxusercontent.com/scl/fi/hew3udvbbo6ggo9emobn0/abhikalp_foundation.jpg?rlkey=qx4n2by1hbokexi7iwxz7joan&st=2w74ttg9&raw=1', 
    short_description: 'Sankalp. Sambal. Sahyog. Samarpan.',
    full_description: "Our mission is to nurture informed and educated individuals. We strive to build stronger, more self-reliant and educated communities.",
    work_area: 'Community Centers & Schools',
    impact_highlights: [
      { text: "Funded the education of children affected by the pandemic." },
      { text: "Sambal and Sankalp campaigns which promoting public volunteering and sponsoring education of children." },
      { text: "Campaigns such as Samadhan, Sahyog, which focus on correct implementation of policies and encourage donations for the betterment of rural communities." }
    ],
    website_url: '#',
    instagram_handle: 'abhikalpfoundation',
    tags: ['Rural Areas', 'Volunteering', 'Child Welfare', 'Development', 'Learning','Education'],
    icon: <Sparkles className="h-10 w-10 text-primary" />,
    photos: [
        "https://dl.dropboxusercontent.com/scl/fi/kdtgh72efn1zucs1fcmq2/abhikalp_3.jpg?rlkey=eotfh1m6dcgdl4blkguwnm97w&st=pnwsmgs5&raw=1",
        "https://dl.dropboxusercontent.com/scl/fi/bp7bo7r4q92cimfism1s1/abhikalp_4.jpg?rlkey=8ea2woyhp0h06sref6mva5rh0&st=46zqdnxm&raw=1",
        "https://dl.dropboxusercontent.com/scl/fi/xjxqzuzyp6fa4sta0q1f0/abhikalp_5.jpg?rlkey=hngi5xxlvruiqufqk0j0qjkai&st=gru2czfd&raw=1"
    ]
  }
];
