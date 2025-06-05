import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { LogIn, AlertCircle } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';

const SignInPage = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { error: signInError } = await signIn({ email, password });
      if (signInError) {
        throw signInError;
      }
      toast({
        title: "Signed In Successfully!",
        description: "Welcome back!",
        className: "bg-primary text-primary-foreground",
      });
      navigate('/admin'); // Or to a user dashboard if you have one
    } catch (err) {
      setError(err.message || 'Failed to sign in. Please check your credentials.');
      toast({
        title: "Sign In Failed",
        description: err.message || 'Please check your credentials.',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader title="Sign In" subtitle="Access your Let's Donate account." />
      <div className="container mx-auto px-4 flex justify-center py-12">
        <Card className="w-full max-w-md shadow-soft">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Sign In</CardTitle>
            <CardDescription>Enter your credentials to access your account.</CardDescription>
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
                  placeholder="••••••••"
                  required
                  className="rounded-lg"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-stretch">
              <Button type="submit" disabled={loading} className="w-full rounded-lg bg-primary hover:bg-primary-soft text-primary-foreground">
                {loading ? 'Signing In...' : <><LogIn className="mr-2 h-4 w-4" /> Sign In</>}
              </Button>
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-primary hover:underline">
                  Sign Up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
};

export default SignInPage;