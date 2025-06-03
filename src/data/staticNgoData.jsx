import React from 'react';
import { HeartHandshake, Users, BookOpen, Leaf, ShieldHalf, Palette } from 'lucide-react';

export const staticNgoData = [
  {
    id: 'static-ngo-1', // Use a distinct ID if this might clash with DB UUIDs
    slug: 'hope-foundation-static',
    name: 'Hope Foundation (Sample)',
    logo_url: '/images/ngos/hope-foundation-logo.png',
    short_description: 'Empowering children through education and nutrition in urban slums.',
    full_description: "Hope Foundation is a non-profit organization dedicated to breaking the cycle of poverty by providing quality education, nutritious meals, and healthcare to underprivileged children living in urban slum communities. We believe every child deserves a chance to reach their full potential.",
    mission: "To create a brighter future for children by ensuring access to education, health, and a supportive environment.",
    work_area: 'Bangalore Urban Slums, Karnataka',
    impact_highlights: [
      { text: "Provided daily meals to 500+ children in 2023." },
      { text: "Enrolled 200+ out-of-school children into formal education." },
      { text: "Conducted health camps benefiting over 1000 community members." }
    ],
    website_url: 'https://example-hopefoundation.org',
    instagram_handle: 'HopeFoundationIndia',
    tags: ['Education', 'Nutrition', 'Child Welfare', 'Healthcare'],
    icon: <BookOpen className="h-10 w-10 text-primary" /> // For card display if needed
  },
  {
    id: 'static-ngo-2',
    slug: 'green-earth-initiative-static',
    name: 'Green Earth Initiative (Sample)',
    logo_url: '/images/ngos/green-earth-logo.png',
    short_description: 'Protecting local ecosystems through plantation and awareness.',
    full_description: "Green Earth Initiative is committed to environmental sustainability. We organize tree plantation drives, conduct waste management workshops, and run awareness campaigns in schools and communities to foster a love for nature and promote responsible living.",
    mission: "To conserve and restore natural ecosystems for a healthier planet and promote environmental stewardship among communities.",
    work_area: 'Various locations in South India',
    impact_highlights: [
      { text: "Planted over 10,000 saplings in the last two years." },
      { text: "Reached 5000+ students through environmental workshops." },
      { text: "Initiated 5 community composting projects." }
    ],
    website_url: 'https://example-greenearth.org',
    instagram_handle: 'GreenEarthOfficial',
    tags: ['Environment', 'Conservation', 'Sustainability', 'Awareness'],
    icon: <Leaf className="h-10 w-10 text-primary" />
  },
  {
    id: 'static-ngo-3',
    slug: 'eldercare-connect-static',
    name: 'ElderCare Connect (Sample)',
    logo_url: '/images/ngos/eldercare-logo.png',
    short_description: 'Providing companionship and support to senior citizens.',
    full_description: "ElderCare Connect focuses on improving the quality of life for elderly individuals, especially those living alone or in assisted care facilities. We offer companionship programs, health monitoring assistance, and recreational activities to combat loneliness and promote active aging.",
    mission: "To ensure dignity, respect, and joyful companionship for every senior citizen in our community.",
    work_area: 'Metropolitan Cities',
    impact_highlights: [
      { text: "Paired 150+ volunteers with elderly individuals for regular visits." },
      { text: "Organized 20+ recreational events for seniors in old age homes." },
      { text: "Provided basic health check-ups for 300+ elderly persons." }
    ],
    website_url: 'https://example-eldercare.org',
    instagram_handle: 'ElderCareConnect',
    tags: ['Elderly Care', 'Companionship', 'Healthcare', 'Community Support'],
    icon: <ShieldHalf className="h-10 w-10 text-primary" />
  },
  {
    id: 'static-ngo-4',
    slug: 'kala-sangam-static',
    name: 'Kala Sangam (Sample)',
    logo_url: '/images/ngos/kala-sangam-logo.png',
    short_description: 'Promoting traditional arts and empowering local artisans.',
    full_description: "Kala Sangam is dedicated to the preservation and promotion of traditional Indian art forms. We work with local artisans, providing them with platforms to showcase their skills, access to markets, and training in contemporary design and business practices.",
    mission: "To sustain and celebrate India's rich artistic heritage by empowering artisans and fostering appreciation for traditional crafts.",
    work_area: 'Rural Artisan Clusters, Pan-India',
    impact_highlights: [
      { text: "Supported 100+ artisan families through fair trade practices." },
      { text: "Organized 15 exhibitions showcasing traditional art forms." },
      { text: "Conducted skill upgradation workshops for 200+ artisans." }
    ],
    website_url: 'https://example-kalasangam.org',
    instagram_handle: 'KalaSangamArts',
    tags: ['Arts & Culture', 'Artisan Support', 'Heritage', 'Livelihood'],
    icon: <Palette className="h-10 w-10 text-primary" />
  }
];

// Function to populate Supabase if table is empty (run once manually or via a script)
// This is illustrative; actual seeding might be done via Supabase dashboard or a migration script.
/*
import { supabase } from '@/lib/supabaseClient';
export async function seedNgoProfiles() {
  const { data: existingNgos, error: fetchError } = await supabase.from('ngo_profiles').select('id').limit(1);
  if (fetchError) {
    console.error("Error checking existing NGOs:", fetchError);
    return;
  }
  if (existingNgos && existingNgos.length > 0) {
    console.log("NGO profiles table already has data. Skipping seed.");
    return;
  }

  const { error } = await supabase.from('ngo_profiles').insert(staticNgoData.map(ngo => ({
    slug: ngo.slug,
    name: ngo.name,
    logo_url: ngo.logo_url,
    short_description: ngo.short_description,
    full_description: ngo.full_description,
    mission: ngo.mission,
    work_area: ngo.work_area,
    impact_highlights: ngo.impact_highlights,
    website_url: ngo.website_url,
    instagram_handle: ngo.instagram_handle,
    tags: ngo.tags
  })));

  if (error) {
    console.error('Error seeding NGO profiles:', error);
  } else {
    console.log('Successfully seeded NGO profiles with static data.');
  }
}
*/