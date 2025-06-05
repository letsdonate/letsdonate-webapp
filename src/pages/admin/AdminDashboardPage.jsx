import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CalendarDays, DollarSign, Users, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const AdminDashboardPage = () => {
  const { user } = useAuth();

  const quickLinks = [
    { title: 'Manage Events', description: 'Add, edit, or remove event listings.', link: '/admin/events', icon: <CalendarDays className="h-6 w-6 text-primary" /> },
    { title: 'Donation Info', description: 'Update content for donation pages.', link: '/admin/donations', icon: <DollarSign className="h-6 w-6 text-primary" /> },
    { title: 'Volunteer Submissions', description: 'View and manage volunteer applications.', link: '/admin/volunteers', icon: <Users className="h-6 w-6 text-primary" /> },
    { title: 'Gallery Management', description: 'Upload and organize gallery images.', link: '/admin/gallery', icon: <ImageIcon className="h-6 w-6 text-primary" /> },
  ];

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user?.email}! Manage your website content here.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {quickLinks.map((item) => (
          <Card key={item.title} className="shadow-soft hover:shadow-soft-hover transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold text-primary">{item.title}</CardTitle>
              {item.icon}
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
              <Button asChild variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10">
                <Link to={item.link}>
                  Go to {item.title.split(' ')[1]} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Placeholder for future stats or summaries */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-primary mb-4">Site Overview</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-md font-medium text-muted-foreground">Total Events</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">12</p>
              <p className="text-xs text-muted-foreground">+2 this month</p>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-md font-medium text-muted-foreground">Volunteer Signups</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">87</p>
              <p className="text-xs text-muted-foreground">+5 this week</p>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-md font-medium text-muted-foreground">Newsletter Subscribers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">250</p>
              <p className="text-xs text-muted-foreground">Growing steadily</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;