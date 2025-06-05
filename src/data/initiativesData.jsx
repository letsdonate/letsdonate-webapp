import React from 'react';
import { Heart, BookOpen, Zap, Sun, MessageSquare, Users, Sparkles, Brain, Users2, Gift, TrendingUp, Target, CheckCircle, Wrench, Award, Palette, Lightbulb, CalendarDays, Smile } from 'lucide-react';

export const staticInitiativesData = [
  {
    id: 'lets-donate-core',
    title: "Let's Donate (Core Initiative)",
    icon: <Heart className="h-12 w-12 text-primary" />,
    subtitle: "Year-round community engagement through diverse learning.",
    description: "Our flagship initiative focuses on consistent, year-round support in underserved communities. We provide holistic development through academic tutoring, creative workshops, and essential life skills training. Donations are versatile: time, talent, old books, toys, or even a story can profoundly impact a child's day and future.",
    themeColor: 'bg-primary/10',
    photos: ["/images/initiatives/core/core_1.jpg", "/images/initiatives/core/core_2.jpg"], // Placeholder for actual image URLs
    youtubeLink: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    sections: [
      { 
        title: "Areas of Engagement", 
        content: [
          "Academic subjects: English, Mathematics, Science, Vedic Maths, Verbal Reasoning.",
          "Creative learning: Storytelling, Motivation, Value education, Emotional awareness.",
          "Life Skills: Communication, Financial Literacy, Curiosity-based exploration."
        ],
        icon: <BookOpen className="h-6 w-6 text-primary" />
      },
      { 
        title: "Venues We Serve",
        content: [
          "Government and community schools.",
          "Children's homes and orphanages.",
          "Slum learning centers and informal education hubs."
        ],
        icon: <Users className="h-6 w-6 text-primary" />
      },
      {
        title: "Unique Feature",
        content: ["Donations aren't just monetary. You can give your time, talent, old books, toys, skills, or even a story — and change a child's day."],
        icon: <Gift className="h-6 w-6 text-primary" />
      }
    ],
    imagePlaceholder: "Collage of diverse learning activities from the core initiative"
  },
  {
    id: 'lets-prepare',
    title: "Let's Prepare",
    icon: <BookOpen className="h-12 w-12 text-primary" />,
    subtitle: "Academic readiness for a brighter future.",
    description: "Launched in July 2024, 'Let's Prepare' is our dedicated program to equip 8th-grade students in government schools for crucial scholarship examinations. We focus on building strong conceptual foundations and test-taking confidence.",
    themeColor: 'bg-teal-500/10',
    photos: ["/images/initiatives/prepare/prepare_1.jpg"],
    youtubeLink: null,
    sections: [
      { 
        title: "Target Group & Goals",
        content: [
          "Primarily 8th-grade students in government schools.",
          "Preparation for competitive scholarship exams.",
          "Boosting academic confidence and ambition."
        ],
        icon: <Target className="h-6 w-6 text-teal-600" />
      },
      {
        title: "Program Activities",
        content: [
          "In-depth concept-building sessions for key subjects.",
          "Regular practice tests and mock exams to simulate exam conditions.",
          "Personalized doubt-clearing sessions with experienced volunteers.",
          "Assistance with filling out scholarship and exam application forms."
        ],
        icon: <CheckCircle className="h-6 w-6 text-teal-600" />
      },
      {
        title: "Broader Impact",
        content: ["Beyond academic scores, we aim to cultivate a mindset of continuous learning, resilience, and the pursuit of higher education."],
        icon: <TrendingUp className="h-6 w-6 text-teal-600" />
      }
    ],
    imagePlaceholder: "Students focused during a 'Let's Prepare' coaching session"
  },
  {
    id: 'lets-elevate',
    title: "Let's Elevate",
    icon: <Zap className="h-12 w-12 text-primary" />,
    subtitle: "Empowering through mentorship and second-chance education.",
    description: "'Let's Elevate' is a specialized initiative designed to support school dropouts and teenage girls, offering them a pathway to personal and professional growth. We believe in second chances and the power of focused mentorship.",
    themeColor: 'bg-purple-500/10',
    photos: ["/images/initiatives/elevate/elevate_1.jpg", "/images/initiatives/elevate/elevate_2.jpg"],
    youtubeLink: "https://www.youtube.com/embed/rokGy0huYEA",
     sections: [
      { 
        title: "Primary Focus",
        content: [
          "Empowering individuals, especially teenage girls and school dropouts, who have the will to grow despite past challenges.",
          "Providing tools and guidance for renewed self-belief and capability."
        ],
        icon: <Sparkles className="h-6 w-6 text-purple-600" />
      },
      {
        title: "Skill Development Areas",
        content: [
          "Personality development and confidence-building workshops.",
          "Essential financial literacy and money management skills.",
          "Training in practical side-income skills like Mehndi art, tailoring, and home-based business fundamentals.",
          "Inspirational sessions featuring success stories from relatable role models."
        ],
        icon: <Wrench className="h-6 w-6 text-purple-600" />
      },
      {
        title: "Our Aim",
        content: ["To give youth the courage and capacity to dream again, equipping them with skills for independence and a brighter future."],
        icon: <Award className="h-6 w-6 text-purple-600" />
      }
    ],
    imagePlaceholder: "Mentorship session with engaged young participants in 'Let's Elevate'"
  },
  {
    id: 'lets-summer',
    title: "Let's Summer",
    icon: <Sun className="h-12 w-12 text-primary" />,
    subtitle: "Making summer holidays joyful and enriching.",
    description: "Our Annual summer camp designed for children who have limited access to structured breaks. Held across shelter homes, government schools, and special institutions, this initiative brings joy, learning, and self-expression through creative and confidence-building workshops led by passionate volunteers.",
    themeColor: 'bg-orange-500/10',
    photos: ["https://dl.dropboxusercontent.com/scl/fi/1bdoxdf3btzwiiu7hr8pi/LETS_SUMMER_MAIN.jpg?rlkey=61ukkag7liy9qiot36qz7fp18&raw=1"],
    youtubeLink: "https://www.youtube-nocookie.com/embed/mro5NEfTWNw",
    sections: [
      { 
        title: "Camp Format",
        content: [
          "Duration: April–May (2 months).",
          "Frequency: Daily or alternate-day sessions.",
          "Facilitators: Guest teachers, artists, professionals, and dedicated volunteers."
        ],
        icon: <CalendarDays className="h-6 w-6 text-orange-600" />
      },
      {
        title: "Fun Meets Learning Activities",
        content: [
          "Creative Arts: Dance, Art, and Theatre workshops.",
          "Practical Skills: Baking, basic crafts, and interactive games.",
          "Well-being: Mindfulness sessions and physical activities.",
          "Academics through Play: Engaging Science, Maths, and General Knowledge modules."
        ],
        icon: <Palette className="h-6 w-6 text-orange-600" />
      },
      {
        title: "Key Outcomes",
        content: ["Children discover the joy in learning, develop critical curiosity, build social skills, and find new avenues for self-expression."],
        icon: <Smile className="h-6 w-6 text-orange-600" />
      }
    ],
    imagePlaceholder: "Children participating in an outdoor activity during 'Let's Summer' camp"
  },
  {
    id: 'lets-donate-clarity',
    title: "Let's Donate Clarity (Social Change Circle)",
    icon: <MessageSquare className="h-12 w-12 text-primary" />,
    subtitle: "Fostering community-led solutions to societal issues.",
    description: "Originally focused on brain development, 'Let's Donate Clarity' has evolved into the 'Social Change Circle,' a collaborative initiative with ClickForClarity. It provides a platform for young adults and volunteers to address real-world problems through empathetic dialogue and actionable steps.",
    themeColor: 'bg-sky-500/10',
    photos: ["/images/initiatives/clarity/clarity_1.jpg"],
    youtubeLink: "https://www.youtube.com/embed/3P1CnWI62Ik",
    sections: [
      { 
        title: "Expanded Format & Goal",
        content: [
          "Monthly meetups designed for young adults and volunteers.",
          "Primary Goal: To foster community-led change through empathy, constructive conversation, and collective action."
        ],
        icon: <Users2 className="h-6 w-6 text-sky-600" />
      },
      {
        title: "Process & Action",
        content: [
          "Each group collaboratively chooses a real societal issue to focus on (e.g., unemployment, local environmental concerns, addiction, gender discrimination).",
          "Participants engage in guided brainstorming sessions to understand the issue deeply.",
          "The group collectively decides on and takes the first small, manageable step towards a potential resolution or awareness campaign."
        ],
        icon: <Lightbulb className="h-6 w-6 text-sky-600" />
      },
      {
        title: "Core Philosophy",
        content: ["Belief in the power of shared understanding and incremental, grassroots efforts to drive significant societal improvements."],
        icon: <Brain className="h-6 w-6 text-sky-600" />
      }
    ],
    imagePlaceholder: "Diverse group of people in a thoughtful discussion at a 'Social Change Circle' meetup"
  },
  {
    id: 'placeholder-initiative-6',
    title: "Future Smiles Initiative",
    icon: <Sparkles className="h-12 w-12 text-primary" />,
    subtitle: "Investing in tomorrow's potential, today.",
    description: "This upcoming initiative will focus on early childhood education and nutritional support for preschoolers in vulnerable communities. We aim to provide a strong foundation for lifelong learning and well-being. More details will be announced soon!",
    themeColor: 'bg-rose-500/10',
    photos: ["/images/initiatives/future/future_1.jpg"],
    youtubeLink: null,
    sections: [
        { 
            title: "Key Focus Areas",
            content: [
                "Early literacy and numeracy programs.",
                "Nutritional support and health check-ups.",
                "Parental engagement and capacity building."
            ],
            icon: <Users className="h-6 w-6 text-rose-600" />
        },
        {
            title: "Expected Impact",
            content: [
                "Improved school readiness for young children.",
                "Enhanced health and developmental outcomes.",
                "Empowered parents and stronger community involvement."
            ],
            icon: <TrendingUp className="h-6 w-6 text-rose-600" />
        }
    ],
    imagePlaceholder: "Happy children in a vibrant learning environment for the Future Smiles Initiative"
  }
];
