import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { PlusCircle, Edit, Trash2, ImageDown as ImageUp, Loader2, AlertTriangle, X } from 'lucide-react';

const STORAGE_BUCKET_NAME = 'lets-donate-media'; // Using the same bucket

// Define a simple structure for gallery items if not using a dedicated table
// For this example, we'll manage gallery items as a list of objects with URLs and maybe captions.
// This could be stored in a JSONB column in a 'site_settings' table or a simple 'gallery_items' table.
// For now, let's assume a 'gallery_items' table: { id, image_url, caption, created_at }

const AdminGalleryPage = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({ caption: '' });
  const [imageFile, setImageFile] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchGalleryItems = useCallback(async () => {
    setLoading(true);
    // Assuming you create a 'gallery_items' table
    const { data, error } = await supabase.from('gallery_items').select('*').order('created_at', { ascending: false });
    if (error) {
      // If table doesn't exist, show a message.
      if (error.code === '42P01') { // undefined_table
        toast({ title: 'Gallery Not Set Up', description: "The 'gallery_items' table doesn't exist in your database. Please create it to manage gallery images.", variant: 'default', duration: 10000 });
        setGalleryItems([]); // Ensure it's an empty array
      } else {
        toast({ title: 'Error fetching gallery items', description: error.message, variant: 'destructive' });
      }
    } else {
      setGalleryItems(data || []); // Ensure data is an array
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    fetchGalleryItems();
  }, [fetchGalleryItems]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const resetForm = () => {
    setFormData({ caption: '' });
    setImageFile(null);
    setExistingImageUrl('');
    setCurrentItem(null);
  };

  const handleAddNew = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setFormData({ caption: item.caption || '' });
    setExistingImageUrl(item.image_url || '');
    setImageFile(null);
    setIsDialogOpen(true);
  };

  const uploadImage = async () => {
    if (!imageFile) return existingImageUrl; // Return existing if no new file

    const fileName = `gallery/${Date.now()}-${imageFile.name}`;
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET_NAME)
      .upload(fileName, imageFile, { upsert: true });

    if (error) {
      toast({ title: 'Image Upload Error', description: error.message, variant: 'destructive' });
      throw error;
    }
    const { data: { publicUrl } } = supabase.storage.from(STORAGE_BUCKET_NAME).getPublicUrl(data.path);
    return publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile && !currentItem) { // Require image for new items
        toast({ title: 'Image Required', description: 'Please select an image to upload.', variant: 'destructive' });
        return;
    }
    setIsSubmitting(true);

    try {
      const imageUrl = await uploadImage();
      
      const galleryItemData = {
        caption: formData.caption,
        image_url: imageUrl,
        updated_at: new Date().toISOString(),
      };

      let error;
      if (currentItem) {
        ({ error } = await supabase.from('gallery_items').update(galleryItemData).eq('id', currentItem.id));
      } else {
        ({ error } = await supabase.from('gallery_items').insert({ ...galleryItemData, created_at: new Date().toISOString() }));
      }

      if (error) {
        if (error.code === '42P01') {
             toast({ title: 'Gallery Not Set Up', description: "The 'gallery_items' table doesn't exist. Please create it first.", variant: 'destructive', duration: 10000 });
        } else {
            throw error;
        }
      } else {
        toast({ title: `Gallery Item ${currentItem ? 'Updated' : 'Added'} Successfully`, className: 'bg-primary text-primary-foreground' });
        setIsDialogOpen(false);
        resetForm();
        fetchGalleryItems();
      }
    } catch (err) {
      toast({ title: `Error ${currentItem ? 'Updating' : 'Adding'} Item`, description: err.message, variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (itemId, imageUrl) => {
    if (!window.confirm('Are you sure you want to delete this gallery item?')) return;
    
    // Delete from storage
    if (imageUrl) {
        // const filePath = imageUrl.substring(imageUrl.indexOf(STORAGE_BUCKET_NAME) + STORAGE_BUCKET_NAME.length + 1);
        // const { error: storageError } = await supabase.storage.from(STORAGE_BUCKET_NAME).remove([filePath]);
        // if (storageError) {
        //     toast({ title: 'Storage Deletion Error', description: `Could not delete image: ${storageError.message}`, variant: 'destructive' });
        //     // Optionally, decide if you want to proceed with DB deletion if storage fails
        // }
        // Skipping actual file deletion for simplicity
    }

    const { error } = await supabase.from('gallery_items').delete().eq('id', itemId);
    if (error) {
      if (error.code === '42P01') {
           toast({ title: 'Gallery Not Set Up', description: "The 'gallery_items' table doesn't exist.", variant: 'destructive', duration: 10000 });
      } else {
        toast({ title: 'Error Deleting Item', description: error.message, variant: 'destructive' });
      }
    } else {
      toast({ title: 'Gallery Item Deleted Successfully', className: 'bg-primary text-primary-foreground' });
      fetchGalleryItems();
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /> <span className="ml-2">Loading gallery items...</span></div>;
  }
  
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Manage Gallery</h1>
        <Button onClick={handleAddNew} className="bg-primary hover:bg-primary-soft">
          <PlusCircle className="mr-2 h-5 w-5" /> Add New Image
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl text-primary">{currentItem ? 'Edit Gallery Item' : 'Add New Gallery Image'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div>
              <Label htmlFor="image_file">Image File {currentItem ? '(Leave blank to keep existing)' : '(Required)'}</Label>
              <Input id="image_file" name="image_file" type="file" onChange={handleImageFileChange} accept="image/*" className="rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"/>
              {existingImageUrl && !imageFile && <img src={existingImageUrl} alt="Current image" className="mt-2 h-32 w-auto object-contain border rounded-md"/>}
              {imageFile && <img src={URL.createObjectURL(imageFile)} alt="New image preview" className="mt-2 h-32 w-auto object-contain border rounded-md"/>}
            </div>
            <div>
              <Label htmlFor="caption">Caption (Optional)</Label>
              <Input id="caption" name="caption" value={formData.caption} onChange={handleInputChange} placeholder="E.g., Children enjoying the art workshop" className="rounded-lg"/>
            </div>
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="rounded-lg">Cancel</Button>
              <Button type="submit" disabled={isSubmitting} className="rounded-lg bg-primary hover:bg-primary-soft">
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (currentItem ? 'Save Changes' : 'Add Image')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {galleryItems.length === 0 && !loading ? (
        <Card className="text-center py-12 shadow-soft">
          <CardHeader>
            <AlertTriangle className="mx-auto h-12 w-12 text-secondary mb-4" />
            <CardTitle className="text-2xl text-primary">No Gallery Images Found</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>There are no images in the gallery. Click "Add New Image" to upload some.</CardDescription>
            <CardDescription className="mt-2 text-xs">If this is your first time, ensure the 'gallery_items' table exists in your Supabase database.</CardDescription>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {galleryItems.map((item) => (
            <Card key={item.id} className="shadow-soft hover:shadow-soft-hover transition-shadow duration-300 flex flex-col overflow-hidden">
              <img src={item.image_url} alt={item.caption || 'Gallery image'} className="w-full h-48 object-cover"/>
              <CardContent className="pt-4 flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-2">{item.caption || 'No caption'}</p>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 border-t pt-4 p-4">
                <Button variant="outline" size="sm" onClick={() => handleEdit(item)} className="border-primary text-primary hover:bg-primary/10">
                  <Edit className="mr-1 h-4 w-4" /> Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id, item.image_url)}>
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

export default AdminGalleryPage;