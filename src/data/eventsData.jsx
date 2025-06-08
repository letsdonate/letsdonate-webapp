import { CalendarDays, Users, Sparkles, Brain, Heart } from 'lucide-react';

export const staticEventsData = [
  {
    id: 'conscious-connected-breathwork',
    title: "Conscious Connected Breathwork – For A Cause",
    description: "Join a guided Conscious Connected Breathwork session led by Shubhangi at Rush Fitness, Shailendra Nagar. This healing experience invites participants to explore their breath, emotions, and energy while contributing to a meaningful cause. Every breath taken during this 90-minute workshop supports summer camp experiences for girls from a local orphanage through Let's Donate. This session blends mindfulness with impact—bringing calm to the self while spreading joy and learning to those in need. All proceeds go directly to the initiative. Let's come together to breathe, heal, and give.",
    date: "2025-04-27T17:30:00+05:30",
    location: "Rush Fitness, Shailendra Nagar, Raipur",
    category: "Fundraiser Workshop",
    status: "Done",
    photos: [
      "https://dl.dropboxusercontent.com/scl/fi/29u8ak4wdf933xs9f6qhl/shubhangi_breathwork.JPG?rlkey=cwy79jouxdxhdsz1ryf722129&st=kl1bmkeq&raw=1",
      "https://dl.dropboxusercontent.com/scl/fi/t3mbtfy4iiy5sbf1syjlu/shubhangi_breathwork-1.jpg?rlkey=6gyfcivu9yc5v69efgw40fwm3&st=uqq0ozrs&raw=1"
    ],
    videos: [],
    hasVideo: false,
    registration_link: "/events/conscious-connected-breathwork",
    contact: {
      person: "Lets Donate Team",
      email: "letsdonateofficial@gmail.com",
      phone: "+91-8109710356"
    },
    type: "event"
  },
  {
    id: 'umbrella-distribution-drive',
    title: "Umbrella Distribution Drive – Spreading Shade & Smiles 🤍",
    description: "Under the scorching Raipur sun, many lack shelter from the heat. This community outreach initiative offers umbrellas not just as sun protection—but as symbols of hope and care. Led by Mahi and supported by Aakansha, Toshita, and Krish, the team walked the streets of Raipur sharing shade and smiles. This drive is a reminder that just as an umbrella shields from the sun, our kindness can shield others from life's harshness. With support from a generous donor, Let's Donate created a ripple of comfort and community one umbrella at a time.",
    date: "2025-05-01T12:00:00+05:30",
    location: "Streets of Raipur",
    category: "Community Outreach",
    status: "Done",
    photos: [
        "https://www.dropbox.com/scl/fi/q9rbj9cxpreeu8fknmoy7/IMG_3779-min.jpg?rlkey=wter0dz8y0psfks6kco0g8nvf&st=9m0c8467&raw=1",
        "https://www.dropbox.com/scl/fi/u6yi4s9a8fpffebfep3ou/IMG_3788-min.jpg?rlkey=ayhm16tw82hjrlqovx4xeakxv&st=zbwxs9i5&raw=1",
        "https://www.dropbox.com/scl/fi/rtxp7e0aj6hj53hxte4p0/IMG_8502-min.jpg?rlkey=k8pzywv42o0ppdbqeqxmi1ysb&st=xhj3ctru&raw=1"
      ],
    videos: [{
      url: "https://www.youtube.com/embed/8LLS_8Q-QEQ",
      title: "Umbrella Distribution Drive Highlights"
    }],
    hasVideo: true,
    registration_link: "/events/umbrella-distribution-drive",
    contact: {
      person: "Lets Donate Team",
      email: "letsdonateofficial@gmail.com",
      phone: "+91-8109710356"
    },
    type: "event"
  },
  {
    id: 'summer-refreshment-drive',
    title: "Summer Refreshment Drive – Sip of Kindness: Hydrating Hope Together",
    description: "On a hot summer day in Raipur, the Let's Donate team distributed over 4,000 glasses of refreshing chass and jaljeera to those braving the heat. This heartfelt gesture wasn't just about quenching thirst—it was about offering care, connection, and community joy. With laughter, gratitude, and smiling faces, the drive turned into a celebration of kindness. Fueled by dedicated volunteers and generous support, this simple act reminded us that even a sip of kindness can nourish a soul.",
    date: "2025-06-07T12:00:00+05:30",
    location: "Telibanda Gurudwara, Raipur",
    category: "Community Service Drive",
    status: "Done",
    photos: [
        "https://dl.dropboxusercontent.com/scl/fi/kr4n6v471o5s4gyqocu6p/IMG_4119-2-min.jpg?rlkey=bv9pq3wcod9qy7s1mlsnoig46&st=kq9jakfl&raw=1",
        "https://dl.dropboxusercontent.com/scl/fi/rmpz8y51r56nrrksc4biu/IMG_4125-min.jpg?rlkey=nc49xaguo45b7ofyx4tor6urh&st=609nh6qe&raw=1",
        "https://dl.dropboxusercontent.com/scl/fi/w0d65twprk85jjyw97uol/IMG_4153-2-min.jpg?rlkey=u90h39ja43u87rpgodpdtd598&st=t1v0s2uv&raw=1",
        "https://dl.dropboxusercontent.com/scl/fi/agrwifqwamteeb1dfspfl/IMG_4192-2-min.jpg?rlkey=t33kyq3j6ecw8gqhhy9vdf6vv&st=xp44fpzu&raw=1"
      ]
      ,
    videos: [{
      url: "https://www.youtube.com/embed/mJK_aR3HE1w",
      title: "Summer Refreshment Drive Highlights"
    }],
    hasVideo: true,
    registration_link: "/events/summer-refreshment-drive",
    contact: {
      person: "Lets Donate Team",
      email: "letsdonateofficial@gmail.com",
      phone: "+91-8109710356"
    },
    type: "event"
  }
];

export const getEventById = (id) => {
  return staticEventsData.find(event => event.id === id);
}; 