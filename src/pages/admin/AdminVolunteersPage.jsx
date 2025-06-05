import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Users, Mail, Phone, MapPin as MapPinIcon, Info, Loader2, AlertTriangle, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

const AdminVolunteersPage = () => {
  const [applications, setApplications] = useState([]);
  const [eventRegistrations, setEventRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data: appsData, error: appsError } = await supabase
      .from('volunteer_applications')
      .select('*')
      .order('submission_date', { ascending: false });

    if (appsError) {
      toast({ title: 'Error fetching volunteer applications', description: appsError.message, variant: 'destructive' });
    } else {
      setApplications(appsData);
    }

    const { data: eventRegsData, error: eventRegsError } = await supabase
      .from('event_volunteer_registrations')
      .select('*')
      .order('registration_date', { ascending: false });

    if (eventRegsError) {
      toast({ title: 'Error fetching event registrations', description: eventRegsError.message, variant: 'destructive' });
    } else {
      setEventRegistrations(eventRegsData);
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (id, type) => {
    const tableName = type === 'application' ? 'volunteer_applications' : 'event_volunteer_registrations';
    const confirmationMessage = `Are you sure you want to delete this volunteer ${type}? This action cannot be undone.`;
    
    if (!window.confirm(confirmationMessage)) return;

    const { error } = await supabase.from(tableName).delete().eq('id', id);

    if (error) {
      toast({ title: `Error Deleting ${type}`, description: error.message, variant: 'destructive' });
    } else {
      toast({ title: `Volunteer ${type} Deleted`, description: `The ${type} has been successfully removed.`, className: 'bg-primary text-primary-foreground' });
      fetchData(); // Refresh data
    }
  };


  if (loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /> <span className="ml-2">Loading volunteer data...</span></div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-primary mb-8">Volunteer Submissions</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-primary mb-4">General Volunteer Applications</h2>
        {applications.length === 0 ? (
          <Card className="text-center py-10 shadow-soft">
             <CardHeader>
                <Users className="mx-auto h-10 w-10 text-secondary mb-3" />
                <CardTitle className="text-xl">No General Applications</CardTitle>
             </CardHeader>
             <CardContent>
                <CardDescription>There are currently no general volunteer applications.</CardDescription>
             </CardContent>
          </Card>
        ) : (
          <Card className="shadow-soft">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Area of Interest</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.full_name}</TableCell>
                    <TableCell><a href={`mailto:${app.email}`} className="text-primary hover:underline">{app.email}</a></TableCell>
                    <TableCell>{app.phone_number}</TableCell>
                    <TableCell>{app.city || 'N/A'}</TableCell>
                    <TableCell>{app.area_of_interest || 'N/A'}</TableCell>
                    <TableCell className="max-w-xs truncate" title={app.reason_to_volunteer}>{app.reason_to_volunteer || 'N/A'}</TableCell>
                    <TableCell>{format(new Date(app.submission_date), 'MMM dd, yyyy')}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(app.id, 'application')} className="text-destructive hover:text-destructive/80">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-primary mb-4">Event Volunteer Registrations</h2>
        {eventRegistrations.length === 0 ? (
          <Card className="text-center py-10 shadow-soft">
            <CardHeader>
                <Users className="mx-auto h-10 w-10 text-secondary mb-3" />
                <CardTitle className="text-xl">No Event Registrations</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>No volunteers have registered for specific events yet.</CardDescription>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-soft">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event Title</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Registered On</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {eventRegistrations.map((reg) => (
                  <TableRow key={reg.id}>
                    <TableCell className="font-medium">{reg.event_title || 'N/A'}</TableCell>
                    <TableCell>{reg.name}</TableCell>
                    <TableCell><a href={`mailto:${reg.email}`} className="text-primary hover:underline">{reg.email}</a></TableCell>
                    <TableCell>{reg.phone}</TableCell>
                    <TableCell>{format(new Date(reg.registration_date), 'MMM dd, yyyy, hh:mm a')}</TableCell>
                    <TableCell className="text-right">
                       <Button variant="ghost" size="icon" onClick={() => handleDelete(reg.id, 'registration')} className="text-destructive hover:text-destructive/80">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}
      </section>
    </div>
  );
};

export default AdminVolunteersPage;