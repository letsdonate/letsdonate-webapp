
import React from 'react';
import PageHeader from '@/components/shared/PageHeader';

const EventsGalleryPage = () => {
  return (
    <div>
      <PageHeader title="Events & Gallery" subtitle="See the moments of joy and impact from our past events.">
        {/* Icon or relevant image here */}
      </PageHeader>
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Coming Soon!</h2>
        <p className="text-muted-foreground">Our gallery is being curated! Check back soon to see photos and videos from our events.</p>
        <img  class="mx-auto mt-8 w-1/2 md:w-1/3" alt="Photo camera and film illustration" src="https://images.unsplash.com/photo-1696426482844-b5c079595317" />
      </div>
    </div>
  );
};

export default EventsGalleryPage;
  