import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { UserPlus, AlertCircle } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      toast({ title: "Sign Up Error", description: "Passwords do not match.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      // Default role is 'user'. Admin role needs to be set manually in Supabase dashboard or via a trusted server-side function.
      const { error: signUpError } = await signUp({ 
        email, 
        password,
        options: {
          data: {
            role: 'user' // Set default role
          }
        }
      });
      if (signUpError) {
        throw signUpError;
      }
      toast({
        title: "Account Created!",
        description: "Please check your email to confirm your account.",
        className: "bg-primary text-primary-foreground",
      });
      navigate('/signin');
    } catch (err) {
      setError(err.message || 'Failed to create account. Please try again.');
      toast({
        title: "Sign Up Failed",
        description: err.message || 'Please try again.',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader title="Sign Up" subtitle="Create your Let's Donate account." />
      <div className="container mx-auto px-4 flex justify-center py-12">
        <Card className="w-full max-w-md shadow-soft">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Create Account</CardTitle>
            <CardDescription>Join our community by creating an account.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <div className="bg-destructive/10 p-3 rounded-md flex items-center text-destructive text-sm">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  {error}
                </div>
              )}
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="rounded-lg"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="•••••••• (min. 6 characters)"
                  required
                  className="rounded-lg"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="rounded-lg"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-stretch">
              <Button type="submit" disabled={loading} className="w-full rounded-lg bg-primary hover:bg-primary-soft text-primary-foreground">
                {loading ? 'Creating Account...' : <><UserPlus className="mr-2 h-4 w-4" /> Sign Up</>}
              </Button>
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/signin" className="font-medium text-primary hover:underline">
                  Sign In
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
};

export default SignUpPage;