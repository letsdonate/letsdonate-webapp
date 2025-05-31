
import React from 'react';
import PageHeader from '@/components/shared/PageHeader';

const AboutUsPage = () => {
  return (
    <div>
      <PageHeader title="About Us" subtitle="Learn about our journey, mission, and the team behind Let's Donate.">
        {/* Icon or relevant image here */}
      </PageHeader>
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Coming Soon!</h2>
        <p className="text-muted-foreground">This page is under construction. We're excited to share our story with you soon!</p>
        <img  class="mx-auto mt-8 w-1/2 md:w-1/3" alt="Team working on a project illustration" src="https://images.unsplash.com/photo-1690191886622-fd8d6cda73bd" />
      </div>
    </div>
  );
};

export default AboutUsPage;
  