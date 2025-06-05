import React from 'react';
import PageHeader from '@/components/shared/PageHeader';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'; // Added CardFooter
import { Button } from '@/components/ui/button';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Heart, BookOpen, Zap, Sun, MessageSquare, Users, Sparkles, Brain, Users2, Gift, TrendingUp, Target, CheckCircle, Wrench as Tool, Award, Palette, Lightbulb, CalendarDays, Smile } from 'lucide-react'; // Added missing icons
import { motion } from 'framer-motion';

const initiativesData = [
  {
    id: 'lets-donate-core',
    title: "Let's Donate (Core Initiative)",
    icon: <Heart className="h-12 w-12 text-primary" />,
    subtitle: "Year-round community engagement through diverse learning.",
    description: "Our flagship initiative focuses on consistent, year-round support in underserved communities. We provide holistic development through academic tutoring, creative workshops, and essential life skills training. Donations are versatile: time, talent, old books, toys, or even a story can profoundly impact a child's day and future.",
    themeColor: 'bg-primary/10',
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
          "Children’s homes and orphanages.",
          "Slum learning centers and informal education hubs."
        ],
        icon: <Users className="h-6 w-6 text-primary" />
      },
      {
        title: "Unique Feature",
        content: ["Donations aren't just monetary. You can give your time, talent, old books, toys, skills, or even a story — and change a child’s day."],
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
        icon: <Tool className="h-6 w-6 text-purple-600" />
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
    description: "Our annual summer camp designed for children who have limited access to structured breaks. Held across shelter homes, government schools, and special institutions, this initiative brings joy, learning, and self-expression through creative and confidence-building workshops led by passionate volunteers.",
    themeColor: 'bg-orange-500/10',
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
  }
];


const InitiativeDetailPage = () => {
  const { initiativeId } = useParams();
  const initiative = initiativesData.find(i => i.id === initiativeId);

  if (!initiative) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <h2 className="text-2xl font-semibold text-destructive">Initiative Not Found</h2>
        <p className="text-muted-foreground mt-2">The requested initiative could not be found.</p>
        <Button asChild variant="link" className="mt-4 text-primary">
          <Link to="/events-gallery">Back to Events & Gallery</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <PageHeader title={initiative.title} subtitle={initiative.subtitle}>
        {React.cloneElement(initiative.icon, { className: "h-16 w-16 text-primary mx-auto mt-4" })}
      </PageHeader>

      <SectionWrapper className={`!pt-0 ${initiative.themeColor} rounded-xl`}>
        <Card className="shadow-xl overflow-hidden bg-background">
          <CardHeader className="p-6 md:p-8">
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay: 0.2, duration: 0.8}}>
              <img  
                src={`https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200&h=500&fit=crop&auto=format&description=${encodeURIComponent(initiative.imagePlaceholder)}`}
                alt={initiative.title} 
                className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg mb-6"
              />
            </motion.div>
            <CardDescription className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {initiative.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8 space-y-8">
            {initiative.sections.map((section, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <h3 className="text-xl md:text-2xl font-semibold text-primary mb-3 flex items-center">
                  {React.cloneElement(section.icon, { className: "mr-3 h-7 w-7"})}
                  {section.title}
                </h3>
                <ul className="list-disc list-inside space-y-1.5 text-muted-foreground pl-4">
                  {section.content.map((item, idx) => <li key={idx} className="leading-relaxed">{item}</li>)}
                </ul>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </SectionWrapper>

      <SectionWrapper className="text-center">
        <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
          <Link to="/events-gallery" className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to All Events & Initiatives
          </Link>
        </Button>
      </SectionWrapper>
    </div>
  );
};


const InitiativesPage = () => {
   const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  };
  return (
    <div className="container mx-auto px-4">
       <PageHeader title="Our Initiatives" subtitle="Driving change through focused programs and community action.">
         <Sparkles className="h-16 w-16 text-primary mx-auto mt-4"/>
       </PageHeader>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
         {initiativesData.map((initiative, index) => (
           <motion.custom
             key={initiative.id}
             custom={index}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, amount: 0.2 }}
             variants={cardVariants}
             className="h-full"
           >
             <Card className={`h-full flex flex-col rounded-xl shadow-soft hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden ${initiative.themeColor || 'bg-card'}`}>
               <CardHeader className="items-center text-center p-6">
                 {React.cloneElement(initiative.icon, { className: "h-12 w-12 text-primary mb-3"})}
                 <CardTitle className="text-2xl text-primary">{initiative.title}</CardTitle>
               </CardHeader>
               <CardContent className="flex-grow p-6 pt-0">
                 <CardDescription className="text-sm text-muted-foreground leading-relaxed text-center">{initiative.subtitle}</CardDescription>
               </CardContent>
               <CardFooter className="p-6 border-t">
                 <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                   <Link to={`/initiatives/${initiative.id}`}>Learn More</Link>
                 </Button>
               </CardFooter>
             </Card>
           </motion.custom>
         ))}
        </div>
    </div>
   );
}


export { InitiativesPage, InitiativeDetailPage, initiativesData };