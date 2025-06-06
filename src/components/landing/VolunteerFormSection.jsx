import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { Checkbox } from "@/components/ui/checkbox";

const areasOfInterestOptions = [
  { id: 'teaching', label: 'Teaching & Tutoring' },
  { id: 'admin', label: 'Administrative Support' },
  { id: 'photography', label: 'Photography & Videography' },
  { id: 'events', label: 'Event Management & Support' },
  { id: 'fundraising', label: 'Fundraising & Outreach' },
  { id: 'mentorship', label: 'Mentorship Programs' },
  { id: 'skills', label: 'Skill-based Workshops (Art, Music, etc.)' },
  { id: 'other', label: 'Other (Please specify)' },
];

const VolunteerFormSection = ({ formIdPrefix = "home" }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    city: '',
    age: '',
    areasOfInterest: [],
    availability: '',
    whyVolunteer: '',
    howHeard: '',
    otherAreaOfInterest: '',
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
    if (name === "age") {
      if (value && !/^\d+$/.test(value)) {
        error = "Age must contain only digits.";
      } else if (value && (parseInt(value) <= 0 || parseInt(value) > 120)) {
        error = "Please enter a valid age.";
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
    if (name === "age") {
      processedValue = value.replace(/\D/g, '');
      if (processedValue.length > 3) processedValue = processedValue.slice(0, 3);
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
    
    if (!formData.age) { currentErrors.age = "Age is required."; formIsValid = false; }
    else if (isNaN(parseInt(formData.age)) || parseInt(formData.age) <= 0 || parseInt(formData.age) > 120) { currentErrors.age = "Invalid age."; formIsValid = false; }

    setFormErrors(currentErrors);

    if (!formIsValid) {
        toast({ title: "Validation Error", description: "Please correct the errors in the form.", variant: "destructive" });
        return;
    }

    setIsSubmitting(true);
    
    let finalAreasOfInterest = formData.areasOfInterest.join(', ');
    if (formData.areasOfInterest.includes('other') && formData.otherAreaOfInterest) {
      finalAreasOfInterest += `, Other: ${formData.otherAreaOfInterest}`;
    }
    
    const { data, error } = await supabase
      .from('volunteer_applications')
      .insert([{ 
        full_name: formData.fullName, 
        email: formData.email, 
        phone_number: formData.phoneNumber,
        city: formData.city,
        age: parseInt(formData.age),
        areas_of_interest: finalAreasOfInterest,
        availability: formData.availability,
        reason_to_volunteer: formData.whyVolunteer,
        how_they_heard: formData.howHeard,
      }]);

    setIsSubmitting(false);
    if (error) {
      toast({ title: "Application Error", description: error.message, variant: "destructive" });
    } else {
      toast({
        title: "Application Submitted! 🙌",
        description: `Thank you, ${formData.fullName}! We've received your volunteer application and will be in touch soon.`,
        className: "bg-primary text-primary-foreground",
        duration: 7000
      });
      setFormData({ fullName: '', email: '', phoneNumber: '', city: '', age: '', areasOfInterest: [], availability: '', whyVolunteer: '', howHeard: '', otherAreaOfInterest: '' });
      setFormErrors({});
    }
  };

  return (
    <SectionWrapper id={`${formIdPrefix}-volunteer-form`} className="bg-secondary/10 rounded-xl py-16 md:py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-4">Become a Volunteer Today</h2>
      <p className="text-center text-muted-foreground mb-12 md:mb-16 max-w-xl mx-auto">
        Join our passionate team and make a direct impact. Fill out the form below to get started!
      </p>
      <Card className="max-w-3xl mx-auto p-6 sm:p-8 rounded-xl shadow-soft bg-background">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <Label htmlFor={`${formIdPrefix}-fullName`} className="font-medium">Full Name <span className="text-destructive">*</span></Label>
              <Input id={`${formIdPrefix}-fullName`} name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="E.g., Priya Sharma" required className={`mt-1 rounded-lg ${formErrors.fullName ? 'border-destructive' : ''}`}/>
              {formErrors.fullName && <p className="text-xs text-destructive mt-1">{formErrors.fullName}</p>}
            </div>
            <div>
              <Label htmlFor={`${formIdPrefix}-email`} className="font-medium">Email Address <span className="text-destructive">*</span></Label>
              <Input id={`${formIdPrefix}-email`} name="email" type="email" value={formData.email} onChange={handleInputChange} onBlur={handleBlur} placeholder="E.g., priya@example.com" required className={`mt-1 rounded-lg ${formErrors.email ? 'border-destructive' : ''}`}/>
              {formErrors.email && <p className="text-xs text-destructive mt-1">{formErrors.email}</p>}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <Label htmlFor={`${formIdPrefix}-phoneNumber`} className="font-medium">Phone Number <span className="text-destructive">*</span></Label>
              <Input id={`${formIdPrefix}-phoneNumber`} name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleInputChange} onBlur={handleBlur} placeholder="E.g., 9876543210" required maxLength="10" className={`mt-1 rounded-lg ${formErrors.phoneNumber ? 'border-destructive' : ''}`}/>
              {formErrors.phoneNumber && <p className="text-xs text-destructive mt-1">{formErrors.phoneNumber}</p>}
            </div>
            <div>
              <Label htmlFor={`${formIdPrefix}-city`} className="font-medium">City <span className="text-destructive">*</span></Label>
              <Input id={`${formIdPrefix}-city`} name="city" value={formData.city} onChange={handleInputChange} placeholder="E.g., Bangalore" required className={`mt-1 rounded-lg ${formErrors.city ? 'border-destructive' : ''}`}/>
              {formErrors.city && <p className="text-xs text-destructive mt-1">{formErrors.city}</p>}
            </div>
          </div>
          <div>
            <Label htmlFor={`${formIdPrefix}-age`} className="font-medium">Age <span className="text-destructive">*</span></Label>
            <Input id={`${formIdPrefix}-age`} name="age" type="text" value={formData.age} onChange={handleInputChange} onBlur={handleBlur} placeholder="E.g., 25" required maxLength="3" className={`mt-1 rounded-lg ${formErrors.age ? 'border-destructive' : ''}`}/>
            {formErrors.age && <p className="text-xs text-destructive mt-1">{formErrors.age}</p>}
          </div>
          <div>
            <Label className="font-medium block mb-2">Area(s) of Interest</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
              {areasOfInterestOptions.map(option => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`${formIdPrefix}-area-${option.id}`} 
                    checked={formData.areasOfInterest.includes(option.id)}
                    onCheckedChange={() => handleCheckboxChange(option.id)}
                  />
                  <Label htmlFor={`${formIdPrefix}-area-${option.id}`} className="text-sm font-normal text-muted-foreground cursor-pointer">{option.label}</Label>
                </div>
              ))}
            </div>
            {formData.areasOfInterest.includes('other') && (
              <Input 
                name="otherAreaOfInterest" 
                value={formData.otherAreaOfInterest} 
                onChange={handleInputChange} 
                placeholder="Please specify other area" 
                className="mt-2 rounded-lg"
              />
            )}
          </div>
          <div>
            <Label htmlFor={`${formIdPrefix}-availability`} className="font-medium">Availability</Label>
            <Input id={`${formIdPrefix}-availability`} name="availability" value={formData.availability} onChange={handleInputChange} placeholder="E.g., Weekends, Weekday evenings" className="mt-1 rounded-lg"/>
          </div>
          <div>
            <Label htmlFor={`${formIdPrefix}-whyVolunteer`} className="font-medium">Why do you want to volunteer?</Label>
            <Textarea id={`${formIdPrefix}-whyVolunteer`} name="whyVolunteer" value={formData.whyVolunteer} onChange={handleInputChange} placeholder="Share your motivation (short text)" className="mt-1 rounded-lg" rows={3}/>
          </div>
          <div>
            <Label htmlFor={`${formIdPrefix}-howHeard`} className="font-medium">Where did you hear about us?</Label>
            <Input id={`${formIdPrefix}-howHeard`} name="howHeard" value={formData.howHeard} onChange={handleInputChange} placeholder="E.g., Social Media, Friend, Event" className="mt-1 rounded-lg"/>
          </div>
          <Button type="submit" size="lg" className="w-full rounded-lg bg-primary hover:bg-primary-soft text-primary-foreground py-3 text-base" disabled={isSubmitting}>
            <Send className="h-5 w-5 mr-2" /> {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </Button>
        </form>
      </Card>
    </SectionWrapper>
  );
};

export default VolunteerFormSection;