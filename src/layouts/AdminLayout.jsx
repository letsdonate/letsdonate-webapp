import React from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/contexts/AuthContext';
import { LayoutDashboard, CalendarDays, DollarSign, Users, Image, LogOut, Home, Settings } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const adminNavLinks = [
  { to: '/admin', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
  { to: '/admin/events', label: 'Manage Events', icon: <CalendarDays className="h-5 w-5" /> },
  { to: '/admin/donations', label: 'Manage Donations Info', icon: <DollarSign className="h-5 w-5" /> },
  { to: '/admin/volunteers', label: 'View Volunteers', icon: <Users className="h-5 w-5" /> },
  { to: '/admin/gallery', label: 'Manage Gallery', icon: <Image className="h-5 w-5" /> },
];

const AdminLayout = () => {
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({ title: "Signed Out", description: "You have been successfully signed out." });
      navigate('/signin');
    } catch (error) {
      toast({ title: "Sign Out Error", description: error.message, variant: "destructive" });
    }
  };

  if (!isAdmin) {
    // This should ideally be caught by ProtectedRoute, but as a fallback:
    navigate('/'); 
    return null;
  }

  return (
    <div className="flex min-h-screen bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background sm:flex shadow-md">
        <div className="flex h-20 items-center border-b px-6">
          <Link to="/admin" className="flex items-center gap-2 font-semibold">
            <img src="/logo-icon.svg" alt="Logo" className="h-7 w-7 text-primary" />
            <span className="text-lg"><span className="text-foreground/70">Let's Donate</span> <span className="text-primary">Admin</span></span>
          </Link>
        </div>
        <ScrollArea className="flex-1 py-4">
          <nav className="grid items-start px-4 text-sm font-medium">
            {adminNavLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/admin'}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all hover:text-primary ${
                    isActive ? 'bg-primary/10 text-primary font-semibold' : 'text-muted-foreground'
                  }`
                }
              >
                {link.icon}
                {link.label}
              </NavLink>
            ))}
          </nav>
        </ScrollArea>
        <div className="mt-auto p-4 border-t">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-primary" onClick={() => navigate('/')}>
                <Home className="mr-2 h-5 w-5" /> Go to Public Site
            </Button>
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-destructive" onClick={handleSignOut}>
                <LogOut className="mr-2 h-5 w-5" /> Sign Out
            </Button>
        </div>
      </aside>

      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-64 flex-1">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background px-6 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 shadow-sm sm:shadow-none">
          {/* Mobile Nav Trigger can be added here if needed */}
          <div className="sm:hidden">
             <Link to="/admin" className="flex items-center gap-2 font-semibold">
                <img src="/logo-icon.svg" alt="Logo" className="h-6 w-6 text-primary" />
                <span className="text-md"><span className="text-foreground/70">LD</span> <span className="text-primary">Admin</span></span>
            </Link>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden sm:inline">Welcome, {user?.email?.split('@')[0] || 'Admin'}!</span>
            <Button variant="outline" size="sm" onClick={handleSignOut} className="sm:hidden">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </header>
        <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;