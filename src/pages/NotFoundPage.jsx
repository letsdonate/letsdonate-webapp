import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <PageHeader title="" subtitle=""> {/* Empty PageHeader for consistent layout margins perhaps? Or remove it */}
        <AlertTriangle className="h-24 w-24 text-destructive mb-8" />
        <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-muted-foreground mb-6">Oops! Page Not Found</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
          The page you're looking for doesn't seem to exist. Maybe it was moved, or you mistyped the URL.
        </p>
        <Button asChild size="lg">
          <Link to="/">Go Back to Homepage</Link>
        </Button>
      </PageHeader>
    </div>
  );
};

export default NotFoundPage;