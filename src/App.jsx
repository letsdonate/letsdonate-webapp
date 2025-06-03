import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import LandingPage from '@/pages/LandingPage';
import TimeDonationPage from '@/pages/TimeDonationPage';
import MoneyDonationPage from '@/pages/MoneyDonationPage';
import MaterialDonationPage from '@/pages/MaterialDonationPage';
import CelebrateBirthdayPage from '@/pages/CelebrateBirthdayPage'; // New Page
import AboutUsPage from '@/pages/AboutUsPage';
import InitiativesAndEventsPage from '@/pages/InitiativesAndEventsPage';
import InitiativeDetailPage from '@/pages/InitiativeDetailPage';
import NgoNetworkPage from '@/pages/NgoNetworkPage'; // New Page
import NgoProfilePage from '@/pages/NgoProfilePage'; // New Page
import SocialChangeCirclePage from '@/pages/SocialChangeCirclePage';
import PoliciesPage from '@/pages/PoliciesPage';
import NotFoundPage from '@/pages/NotFoundPage';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/donate/time" element={<TimeDonationPage />} />
          <Route path="/donate/money" element={<MoneyDonationPage />} />
          <Route path="/donate/material" element={<MaterialDonationPage />} />
          <Route path="/celebrate-birthday" element={<CelebrateBirthdayPage />} /> {/* New Route */}
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/initiatives-events" element={<InitiativesAndEventsPage />} />
          <Route path="/initiatives-events/:initiativeId" element={<InitiativeDetailPage />} />
          <Route path="/ngo-network" element={<NgoNetworkPage />} /> {/* New Route */}
          <Route path="/ngo-network/:slug" element={<NgoProfilePage />} /> {/* New Route */}
          <Route path="/social-change-circle" element={<SocialChangeCirclePage />} />
          <Route path="/policies" element={<PoliciesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;