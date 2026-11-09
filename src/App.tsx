/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Header from './components/Header';
import WhatsAppSection from './components/WhatsAppSection';
import LocationSection from './components/LocationSection';
import ServicesSection from './components/ServicesSection';
import Footer from './components/Footer';
import AdminPortalModal from './components/AdminPortalModal';
import { ShopConfigProvider } from './context/ShopConfigContext';

function CardContent() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <div className="min-h-screen bg-maroon-pattern flex flex-col justify-between py-2 sm:py-6 px-3 sm:px-4">
      {/* Centered visiting card column (Mobile-first, optimized for poster QR code scans) */}
      <main className="w-full max-w-md mx-auto flex flex-col gap-5 sm:gap-6">
        {/* 1. Compact Shop Header */}
        <Header />

        {/* 2. WhatsApp Contact Section */}
        <WhatsAppSection />

        {/* 3. Embedded Google Maps Location */}
        <LocationSection />

        {/* 4 & 5. Our Services & Products (Four Service Cards in 2x2 grid) */}
        <ServicesSection />

        {/* 6. Small Footer */}
        <Footer onOpenAdmin={() => setIsAdminOpen(true)} />
      </main>

      {/* Admin Portal Modal for shop owner configuration */}
      <AdminPortalModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <ShopConfigProvider>
      <CardContent />
    </ShopConfigProvider>
  );
}
