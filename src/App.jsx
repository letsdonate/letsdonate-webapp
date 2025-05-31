
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import LandingPage from '@/pages/LandingPage';
import TimeDonationPage from '@/pages/TimeDonationPage';
import MoneyDonationPage from '@/pages/MoneyDonationPage';
import MaterialDonationPage from '@/pages/MaterialDonationPage';
import AboutUsPage from '@/pages/AboutUsPage';
import EventsGalleryPage from '@/pages/EventsGalleryPage';
import SocialChangeCirclePage from '@/pages/SocialChangeCirclePage';
import PoliciesPage from '@/pages/PoliciesPage';
import NotFoundPage from '@/pages/NotFoundPage';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/donate/time" element={<TimeDonationPage />} />
          <Route path="/donate/money" element={<MoneyDonationPage />} />
          <Route path="/donate/material" element={<MaterialDonationPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/events-gallery" element={<EventsGalleryPage />} />
          <Route path="/social-change-circle" element={<SocialChangeCirclePage />} />
          <Route path="/policies" element={<PoliciesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MainLayout>
      <Toaster />
    </Router>
  );
}

export default App;
  