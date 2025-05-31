
import React from 'react';
import PageHeader from '@/components/shared/PageHeader';

const MaterialDonationPage = () => {
  return (
    <div>
      <PageHeader title="Donate Material" subtitle="Your gently used or new items can make a big difference.">
         {/* Icon or relevant image here */}
      </PageHeader>
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Coming Soon!</h2>
        <p className="text-muted-foreground">This page is under construction. We're working hard to bring you the Material Donation section soon!</p>
        <img  class="mx-auto mt-8 w-1/2 md:w-1/3" alt="Under construction illustration" src="https://images.unsplash.com/photo-1570201855506-e2f86badbb96" />
      </div>
    </div>
  );
};

export default MaterialDonationPage;
  