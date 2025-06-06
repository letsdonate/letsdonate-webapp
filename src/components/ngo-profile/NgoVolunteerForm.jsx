import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Send } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';

const areasOfInterestOptions = [
  { id: 'teaching', label: 'Teaching & Tutoring' },
  { id: 'events', label: 'Event Support' },
  { id: 'fundraising', label: 'Fundraising' },
  { id: 'admin', label: 'Admin Support' },
  { id: 'other', label: 'Other (Specify)' },
];

const NgoVolunteerForm = ({ ngo }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    city: '',
    areasOfInterest: [],
    otherAreaOfInterest: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const validateField = (name, value) => {
    let error = '';
    if (name === "email" && value && !/^\S+@\S+\.\S+$/.test(value)) {
      error = "Invalid email address.";
    }
    if (name === "phoneNumber") {
      if (value && !/^\d+$/.test(value)) {
        error = "Phone number must contain only digits.";
      } else if (value && value.length !== 10) {
        error = "Phone number must be 10 digits.";
      }
    }
    setFormErrors(prev => ({ ...prev, [name]: error }));
    return error === '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    if (name === "phoneNumber") {
      processedValue = value.replace(/\D/g, '');
      if (processedValue.length > 10) processedValue = processedValue.slice(0, 10);
    }
    setFormData(prev => ({ ...prev, [name]: processedValue }));
    if (formErrors[name]) {
        validateField(name, processedValue);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleCheckboxChange = (areaId) => {
    setFormData(prev => {
      const newAreas = prev.areasOfInterest.includes(areaId)
        ? prev.areasOfInterest.filter(area => area !== areaId)
        : [...prev.areasOfInterest, areaId];
      return { ...prev, areasOfInterest: newAreas };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentErrors = {};
    let formIsValid = true;

    if (!formData.fullName) { currentErrors.fullName = "Full name is required."; formIsValid = false; }
    if (!formData.email) { currentErrors.email = "Email is required."; formIsValid = false; }
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) { currentErrors.email = "Invalid email address."; formIsValid = false; }
    
    if (!formData.phoneNumber) { currentErrors.phoneNumber = "Phone number is required."; formIsValid = false; }
    else if (!/^\d{10}$/.test(formData.phoneNumber)) { currentErrors.phoneNumber = "Phone number must be 10 digits."; formIsValid = false; }

    if (!formData.city) { currentErrors.city = "City is required."; formIsValid = false; }
    
    setFormErrors(currentErrors);

    if (!formIsValid) {
        toast({ title: "Validation Error", description: "Please correct the errors in the form.", variant: "destructive" });
        return;
    }
    
    if (!ngo) { 
        toast({ title: "Error", description: "NGO profile not loaded. Cannot submit form.", variant: "destructive" });
        return;
    }
    
    setIsSubmitting(true);
    
    let finalAreasOfInterest = formData.areasOfInterest.join(', ');
    if (formData.areasOfInterest.includes('other') && formData.otherAreaOfInterest) {
      finalAreasOfInterest += `, Other: ${formData.otherAreaOfInterest}`;
    }

    const submissionData = { 
        ngo_name: ngo.name, 
        name: formData.fullName, 
        email: formData.email, 
        phone: formData.phoneNumber,
        city: formData.city,
        areas_of_interest: finalAreasOfInterest,
        message: formData.message,
        ngo_profile_id: null 
      };

    if (ngo.id && !ngo.id.toString().startsWith('static-ngo-')) {
        submissionData.ngo_profile_id = ngo.id;
    }

    const { error } = await supabase
      .from('ngo_interest_requests')
      .insert([submissionData]);

    setIsSubmitting(false);
    if (error) {
      toast({ title: "Submission Error", description: error.message, variant: "destructive" });
    } else {
      toast({
        title: "Message Sent! 👍",
        description: `Thank you, ${formData.fullName}! Your interest has been forwarded to ${ngo.name}.`,
        className: "bg-primary text-primary-foreground",
        duration: 7000
      });
      setFormData({ fullName: '', email: '', phoneNumber: '', city: '', areasOfInterest: [], otherAreaOfInterest: '', message: '' });
      setFormErrors({});
    }
  };

  return (
    <Card className="shadow-xl bg-card mt-6">
      <CardHeader>
        <CardTitle className="text-xl text-primary">Volunteer with {ngo.name}</CardTitle>
        <CardDescription>Express your interest in volunteering directly with this NGO.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="ngo-volunteer-fullName">Full Name <span className="text-destructive">*</span></Label>
            <Input id="ngo-volunteer-fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Your Full Name" required className={`mt-1 ${formErrors.fullName ? 'border-destructive' : ''}`}/>
            {formErrors.fullName && <p className="text-xs text-destructive mt-1">{formErrors.fullName}</p>}
          </div>
          <div>
            <Label htmlFor="ngo-volunteer-email">Email <span className="text-destructive">*</span></Label>
            <Input id="ngo-volunteer-email" name="email" type="email" value={formData.email} onChange={handleInputChange} onBlur={handleBlur} placeholder="Your Email" required className={`mt-1 ${formErrors.email ? 'border-destructive' : ''}`}/>
            {formErrors.email && <p className="text-xs text-destructive mt-1">{formErrors.email}</p>}
          </div>
          <div>
            <Label htmlFor="ngo-volunteer-phoneNumber">Phone Number <span className="text-destructive">*</span></Label>
            <Input id="ngo-volunteer-phoneNumber" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleInputChange} onBlur={handleBlur} placeholder="Your Phone (10 digits)" required maxLength="10" className={`mt-1 ${formErrors.phoneNumber ? 'border-destructive' : ''}`}/>
            {formErrors.phoneNumber && <p className="text-xs text-destructive mt-1">{formErrors.phoneNumber}</p>}
          </div>
          <div>
            <Label htmlFor="ngo-volunteer-city">City <span className="text-destructive">*</span></Label>
            <Input id="ngo-volunteer-city" name="city" value={formData.city} onChange={handleInputChange} placeholder="Your City" required className={`mt-1 ${formErrors.city ? 'border-destructive' : ''}`}/>
            {formErrors.city && <p className="text-xs text-destructive mt-1">{formErrors.city}</p>}
          </div>
          <div>
            <Label className="font-medium block mb-1">Area(s) of Interest</Label>
            <div className="space-y-1">
              {areasOfInterestOptions.map(option => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`ngo-volunteer-area-${option.id}`} 
                    checked={formData.areasOfInterest.includes(option.id)}
                    onCheckedChange={() => handleCheckboxChange(option.id)}
                  />
                  <Label htmlFor={`ngo-volunteer-area-${option.id}`} className="text-sm font-normal text-muted-foreground cursor-pointer">{option.label}</Label>
                </div>
              ))}
            </div>
            {formData.areasOfInterest.includes('other') && (
              <Input 
                name="otherAreaOfInterest" 
                value={formData.otherAreaOfInterest} 
                onChange={handleInputChange} 
                placeholder="Please specify other area" 
                className="mt-2"
              />
            )}
          </div>
          <div>
            <Label htmlFor="ngo-volunteer-message">Message (Optional)</Label>
            <Textarea id="ngo-volunteer-message" name="message" value={formData.message} onChange={handleInputChange} placeholder="Any specific skills or message..." className="mt-1" rows={2}/>
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary-soft" disabled={isSubmitting}>
            <Send className="mr-2 h-4 w-4"/> {isSubmitting ? 'Sending Interest...' : 'Express Interest'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default NgoVolunteerForm;