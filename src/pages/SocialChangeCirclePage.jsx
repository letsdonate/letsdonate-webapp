
import React from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

const SocialChangeCirclePage = () => {
  return (
    <div>
      <PageHeader title="Social Change Circle" subtitle="Join our community initiative to discuss societal issues and collaborate on solutions.">
         <MessageCircle className="h-16 w-16 text-primary mx-auto mt-4" />
      </PageHeader>
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Coming Soon!</h2>
        <p className="text-muted-foreground mb-6">
          We're setting up our Social Change Circle in collaboration with ClickForClarity. 
          Soon, you'll be able to join our WhatsApp group and participate in meaningful discussions.
        </p>
        <Button size="lg" disabled>
          Join WhatsApp Group (Coming Soon)
        </Button>
        <img  class="mx-auto mt-8 w-1/2 md:w-1/3" alt="Community discussion illustration" src="https://images.unsplash.com/photo-1612362426872-b42e80d6b94d" />
      </div>
    </div>
  );
};

export default SocialChangeCirclePage;
  