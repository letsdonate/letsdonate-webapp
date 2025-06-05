import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { PlusCircle, Edit, Trash2, DollarSign, AlertTriangle, Loader2, UploadCloud } from 'lucide-react';

const STORAGE_BUCKET_NAME = 'lets-donate-media'; // Same bucket for QR codes

const AdminDonationsPage = () => {
  const [donationOptions, setDonationOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentOption, setCurrentOption] = useState(null);
  const [formData, setFormData] = useState({
    type: 'funds', // Default to funds, can be expanded
    title: '',
    description: '',
    impact_info: { amount: '', benefit: '' }, // For funds type
    qr_code_url: '',
    contact_info: '',
  });
  const [qrCodeFile, setQrCodeFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchDonationOptions = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from('donation_options').select('*').order('created_at', { ascending: false });
    if (error) {
      toast({ title: 'Error fetching donation options', description: error.message, variant: 'destructive' });
    } else {
      setDonationOptions(data);
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    fetchDonationOptions();
  }, [fetchDonationOptions]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'impact_amount' || name === 'impact_benefit') {
      const impactKey = name.split('_')[1];
      setFormData((prev) => ({
        ...prev,
        impact_info: { ...prev.impact_info, [impactKey]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleQrCodeFileChange = (e) => {
    setQrCodeFile(e.target.files[0]);
  };

  const resetForm = () => {
    setFormData({ type: 'funds', title: '', description: '', impact_info: { amount: '', benefit: '' }, qr_code_url: '', contact_info: '' });
    setQrCodeFile(null);
    setCurrentOption(null);
  };

  const handleAddNew = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEdit = (option) => {
    setCurrentOption(option);
    setFormData({
      type: option.type || 'funds',
      title: option.title || '',
      description: option.description || '',
      impact_info: option.impact_info || { amount: '', benefit: '' },
      qr_code_url: option.qr_code_url || '',
      contact_info: option.contact_info || '',
    });
    setQrCodeFile(null);
    setIsDialogOpen(true);
  };

  const uploadQrCode = async () => {
    if (!qrCodeFile) return formData.qr_code_url; // Return existing URL if no new file

    const fileName = `qr-codes/${Date.now()}-${qrCodeFile.name}`;
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET_NAME)
      .upload(fileName, qrCodeFile, { upsert: true }); // Upsert to overwrite if same name (though unlikely with timestamp)

    if (error) {
      toast({ title: 'QR Code Upload Error', description: error.message, variant: 'destructive' });
      throw error;
    }
    
    const { data: { publicUrl } } = supabase.storage.from(STORAGE_BUCKET_NAME).getPublicUrl(data.path);
    return publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newQrCodeUrl = await uploadQrCode();
      
      const optionData = {
        ...formData,
        qr_code_url: newQrCodeUrl, // Use new or existing URL
        updated_at: new Date().toISOString(),
      };
      // Ensure impact_info is stored as JSONB
      if (typeof optionData.impact_info !== 'object' || optionData.impact_info === null) {
        optionData.impact_info = {};
      }


      let error;
      if (currentOption) {
        ({ error } = await supabase.from('donation_options').update(optionData).eq('id', currentOption.id));
      } else {
        ({ error } = await supabase.from('donation_options').insert({ ...optionData, created_at: new Date().toISOString() }));
      }

      if (error) throw error;

      toast({ title: `Donation Option ${currentOption ? 'Updated' : 'Added'} Successfully`, className: 'bg-primary text-primary-foreground' });
      setIsDialogOpen(false);
      resetForm();
      fetchDonationOptions();
    } catch (err) {
      toast({ title: `Error ${currentOption ? 'Updating' : 'Adding'} Option`, description: err.message, variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (optionId) => {
    if (!window.confirm('Are you sure you want to delete this donation option?')) return;
    
    // Optionally delete QR code from storage
    const optionToDelete = donationOptions.find(opt => opt.id === optionId);
    if (optionToDelete && optionToDelete.qr_code_url) {
        // const filePath = optionToDelete.qr_code_url.substring(optionToDelete.qr_code_url.indexOf(STORAGE_BUCKET_NAME) + STORAGE_BUCKET_NAME.length + 1);
        // await supabase.storage.from(STORAGE_BUCKET_NAME).remove([filePath]);
        // Skipping actual file deletion for simplicity
    }

    const { error } = await supabase.from('donation_options').delete().eq('id', optionId);
    if (error) {
      toast({ title: 'Error Deleting Option', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Donation Option Deleted Successfully', className: 'bg-primary text-primary-foreground' });
      fetchDonationOptions();
    }
  };
  
  if (loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /> <span className="ml-2">Loading donation options...</span></div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Manage Donation Page Content</h1>
        <Button onClick={handleAddNew} className="bg-primary hover:bg-primary-soft">
          <PlusCircle className="mr-2 h-5 w-5" /> Add New Option
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl text-primary">{currentOption ? 'Edit Donation Option' : 'Add New Donation Option'}</DialogTitle>
            <DialogDescription>Configure the information displayed on the donation pages.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div>
              <Label htmlFor="type">Type</Label>
              <select id="type" name="type" value={formData.type} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-lg bg-background focus:ring-primary focus:border-primary">
                <option value="funds">Funds Donation Info</option>
                <option value="material">Material Donation Info</option>
                <option value="time">Time Donation Info</option>
              </select>
            </div>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" value={formData.title} onChange={handleInputChange} required className="rounded-lg"/>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} rows={3} className="rounded-lg"/>
            </div>
            
            {formData.type === 'funds' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="impact_amount">Impact Amount (e.g., 500)</Label>
                        <Input id="impact_amount" name="impact_amount" type="number" value={formData.impact_info.amount} onChange={handleInputChange} placeholder="500" className="rounded-lg"/>
                    </div>
                    <div>
                        <Label htmlFor="impact_benefit">Impact Benefit (e.g., school kit)</Label>
                        <Input id="impact_benefit" name="impact_benefit" value={formData.impact_info.benefit} onChange={handleInputChange} placeholder="school kit for 10 kids" className="rounded-lg"/>
                    </div>
                </div>
                <div>
                  <Label htmlFor="qr_code_file">Upload QR Code Image (Optional)</Label>
                  <Input id="qr_code_file" name="qr_code_file" type="file" onChange={handleQrCodeFileChange} accept="image/*" className="rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"/>
                  {formData.qr_code_url && !qrCodeFile && <img src={formData.qr_code_url} alt="Current QR Code" className="mt-2 h-24 w-24 object-contain border rounded-md"/>}
                  {qrCodeFile && <img src={URL.createObjectURL(qrCodeFile)} alt="New QR Code Preview" className="mt-2 h-24 w-24 object-contain border rounded-md"/>}
                </div>
              </>
            )}

            <div>
              <Label htmlFor="contact_info">Contact Info (Optional)</Label>
              <Input id="contact_info" name="contact_info" value={formData.contact_info} onChange={handleInputChange} placeholder="E.g., UPI ID: donate@example, Phone: +91..." className="rounded-lg"/>
            </div>

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="rounded-lg">Cancel</Button>
              <Button type="submit" disabled={isSubmitting} className="rounded-lg bg-primary hover:bg-primary-soft">
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (currentOption ? 'Save Changes' : 'Add Option')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {donationOptions.length === 0 && !loading ? (
         <Card className="text-center py-12 shadow-soft">
          <CardHeader>
            <AlertTriangle className="mx-auto h-12 w-12 text-secondary mb-4" />
            <CardTitle className="text-2xl text-primary">No Donation Options Found</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>There are no donation options configured. Click "Add New Option" to create one.</CardDescription>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {donationOptions.map((option) => (
            <Card key={option.id} className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center">
                  <DollarSign className="mr-2 h-5 w-5" /> {option.title} <span className="ml-2 text-xs font-normal px-2 py-0.5 bg-secondary/20 text-secondary-foreground rounded-full">{option.type}</span>
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">{option.description || 'No description.'}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                {option.type === 'funds' && option.impact_info && (
                  <p><strong>Impact:</strong> ₹{option.impact_info.amount} = {option.impact_info.benefit}</p>
                )}
                {option.qr_code_url && <p><strong>QR Code:</strong> <a href={option.qr_code_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">View Image</a></p>}
                {option.contact_info && <p><strong>Contact/Details:</strong> {option.contact_info}</p>}
              </CardContent>
              <CardFooter className="flex justify-end gap-2 border-t pt-4">
                <Button variant="outline" size="sm" onClick={() => handleEdit(option)} className="border-primary text-primary hover:bg-primary/10">
                  <Edit className="mr-1 h-4 w-4" /> Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(option.id)}>
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

export default AdminDonationsPage;