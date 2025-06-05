import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { PlusCircle, Edit, Trash2, ImageDown as ImageUp, Loader2, AlertTriangle, X } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const STORAGE_BUCKET_NAME = 'lets-donate-media';

const AdminEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    youtube_link: '',
    category: '',
    images: [], 
  });
  const [imageFiles, setImageFiles] = useState([]); 
  const [existingImageUrls, setExistingImageUrls] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from('events').select('*').order('date', { ascending: false });
    if (error) {
      toast({ title: 'Error fetching events', description: error.message, variant: 'destructive' });
    } else {
      setEvents(data);
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFiles(Array.from(e.target.files));
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', date: '', location: '', youtube_link: '', category: '', images: [] });
    setImageFiles([]);
    setExistingImageUrls([]);
    setCurrentEvent(null);
  };

  const handleAddNew = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEdit = (event) => {
    setCurrentEvent(event);
    setFormData({
      title: event.title || '',
      description: event.description || '',
      date: event.date ? format(parseISO(event.date), "yyyy-MM-dd'T'HH:mm") : '',
      location: event.location || '',
      youtube_link: event.youtube_link || '',
      category: event.category || '',
      images: event.images || [], 
    });
    setExistingImageUrls(event.images || []);
    setImageFiles([]);
    setIsDialogOpen(true);
  };

  const handleDeleteImage = async (imageUrlToDelete, isExisting = true) => {
    if (isExisting) {
      setExistingImageUrls(prev => prev.filter(url => url !== imageUrlToDelete));
      // Optionally, delete from Supabase Storage if it's an existing image being removed from the event
      // For now, we'll just remove the URL. Actual file deletion can be complex.
    } else {
      // This case is for newly staged files, but we handle file staging via imageFiles state
    }
  };

  const uploadImages = async () => {
    if (imageFiles.length === 0) return [];
    const uploadedImageUrls = [];
    for (const file of imageFiles) {
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from(STORAGE_BUCKET_NAME)
        .upload(`events/${fileName}`, file);

      if (error) {
        toast({ title: 'Image Upload Error', description: error.message, variant: 'destructive' });
        throw error; 
      }
      
      const { data: { publicUrl } } = supabase.storage.from(STORAGE_BUCKET_NAME).getPublicUrl(data.path);
      uploadedImageUrls.push(publicUrl);
    }
    return uploadedImageUrls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newImageUrls = await uploadImages();
      const finalImageUrls = [...existingImageUrls, ...newImageUrls];
      
      const eventData = {
        ...formData,
        date: formData.date ? new Date(formData.date).toISOString() : null,
        images: finalImageUrls,
        updated_at: new Date().toISOString(),
      };

      let error;
      if (currentEvent) {
        ({ error } = await supabase.from('events').update(eventData).eq('id', currentEvent.id));
      } else {
        ({ error } = await supabase.from('events').insert({ ...eventData, created_at: new Date().toISOString() }));
      }

      if (error) throw error;

      toast({ title: `Event ${currentEvent ? 'Updated' : 'Added'} Successfully`, className: 'bg-primary text-primary-foreground' });
      setIsDialogOpen(false);
      resetForm();
      fetchEvents();
    } catch (err) {
      toast({ title: `Error ${currentEvent ? 'Updating' : 'Adding'} Event`, description: err.message, variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) return;
    
    // Optionally, delete images from storage first
    const eventToDelete = events.find(e => e.id === eventId);
    if (eventToDelete && eventToDelete.images && eventToDelete.images.length > 0) {
        const filePaths = eventToDelete.images.map(url => {
            const parts = url.split('/');
            return `events/${parts[parts.length -1]}`; // Assumes 'events/' prefix in path
        });
        // const { error: storageError } = await supabase.storage.from(STORAGE_BUCKET_NAME).remove(filePaths);
        // if (storageError) {
        //     toast({ title: 'Storage Deletion Error', description: `Could not delete all images: ${storageError.message}`, variant: 'destructive' });
        // }
        // For now, skipping actual file deletion from storage to simplify, as it can be complex with permissions.
    }

    const { error } = await supabase.from('events').delete().eq('id', eventId);
    if (error) {
      toast({ title: 'Error Deleting Event', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Event Deleted Successfully', className: 'bg-primary text-primary-foreground' });
      fetchEvents();
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /> <span className="ml-2">Loading events...</span></div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Manage Events</h1>
        <Button onClick={handleAddNew} className="bg-primary hover:bg-primary-soft">
          <PlusCircle className="mr-2 h-5 w-5" /> Add New Event
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-primary">{currentEvent ? 'Edit Event' : 'Add New Event'}</DialogTitle>
            <DialogDescription>Fill in the details for the event.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" value={formData.title} onChange={handleInputChange} required className="rounded-lg"/>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} rows={4} className="rounded-lg"/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="date">Date & Time</Label>
                <Input id="date" name="date" type="datetime-local" value={formData.date} onChange={handleInputChange} className="rounded-lg"/>
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" value={formData.location} onChange={handleInputChange} className="rounded-lg"/>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="category">Category</Label>
                <Input id="category" name="category" value={formData.category} onChange={handleInputChange} placeholder="E.g., Art & Drama, Education" className="rounded-lg"/>
              </div>
              <div>
                <Label htmlFor="youtube_link">YouTube Video Link (Optional)</Label>
                <Input id="youtube_link" name="youtube_link" type="url" value={formData.youtube_link} onChange={handleInputChange} placeholder="https://www.youtube.com/watch?v=..." className="rounded-lg"/>
              </div>
            </div>
            <div>
              <Label htmlFor="images">Upload Images</Label>
              <Input id="images" name="images" type="file" multiple onChange={handleImageChange} accept="image/*" className="rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"/>
              <p className="text-xs text-muted-foreground mt-1">You can select multiple images. Max 5MB per image.</p>
            </div>
            
            {existingImageUrls.length > 0 && (
              <div className="space-y-2">
                <Label>Current Images:</Label>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                  {existingImageUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <img src={url} alt={`Event image ${index + 1}`} className="w-full h-24 object-cover rounded-md shadow-sm" />
                      <Button type="button" variant="destructive" size="icon" className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleDeleteImage(url, true)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {imageFiles.length > 0 && (
                 <div className="space-y-2">
                    <Label>New Images to Upload:</Label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                    {imageFiles.map((file, index) => (
                        <div key={index} className="relative group">
                        <img src={URL.createObjectURL(file)} alt={`New image ${index + 1}`} className="w-full h-24 object-cover rounded-md shadow-sm" />
                        </div>
                    ))}
                    </div>
                </div>
            )}


          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="rounded-lg">Cancel</Button>
            <Button type="submit" disabled={isSubmitting} className="rounded-lg bg-primary hover:bg-primary-soft">
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (currentEvent ? 'Save Changes' : 'Add Event')}
            </Button>
          </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {events.length === 0 && !loading ? (
        <Card className="text-center py-12 shadow-soft">
          <CardHeader>
            <AlertTriangle className="mx-auto h-12 w-12 text-secondary mb-4" />
            <CardTitle className="text-2xl text-primary">No Events Found</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>There are no events to display. Click "Add New Event" to get started.</CardDescription>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card key={event.id} className="shadow-soft hover:shadow-soft-hover transition-shadow duration-300 flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl text-primary">{event.title}</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  {event.date ? format(parseISO(event.date), 'MMM dd, yyyy, hh:mm a') : 'Date TBD'} | {event.location || 'Location TBD'}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{event.description || 'No description available.'}</p>
                {event.images && event.images.length > 0 && (
                  <img src={event.images[0]} alt={event.title} className="w-full h-40 object-cover rounded-md mb-2 shadow-sm"/>
                )}
                 <p className="text-xs text-muted-foreground">Category: {event.category || 'N/A'}</p>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 border-t pt-4">
                <Button variant="outline" size="sm" onClick={() => handleEdit(event)} className="border-primary text-primary hover:bg-primary/10">
                  <Edit className="mr-1 h-4 w-4" /> Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(event.id)}>
                  <Trash2 className="mr-1 h-4 w-4" /> Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminEventsPage;