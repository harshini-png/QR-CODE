/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Printer, BookOpen, Trophy, Sparkles } from 'lucide-react';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function ServicesSection() {
  const services: ServiceItem[] = [
    {
      id: 'xerox',
      title: 'XEROX & LAMINATION',
      description: 'Black & white Xerox, color printing and lamination services.',
      icon: <Printer className="w-5 h-5 sm:w-6 sm:h-6 text-[#D8BD87]" />,
    },
    {
      id: 'stationery',
      title: 'STATIONERY ITEMS',
      description: 'Notebooks, pens, pencils, school supplies and everyday stationery essentials.',
      icon: <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-[#D8BD87]" />,
    },
    {
      id: 'sports',
      title: 'SPORTS ITEMS',
      description: 'Sports essentials and accessories for students.',
      icon: <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-[#D8BD87]" />,
    },
    {
      id: 'fancy',
      title: 'FANCY STATIONERY ITEMS',
      description: 'Creative, colorful and attractive fancy stationery items.',
      icon: <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#D8BD87]" />,
    },
  ];

  return (
    <section className="w-full">
      <div className="bg-[#FFFAF1] rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xl shadow-black/25 gold-border relative overflow-hidden">
        {/* Subtle decorative corner motifs */}
        <div className="absolute top-0 right-0 w-12 h-12 pointer-events-none opacity-20">
          <svg viewBox="0 0 48 48" fill="none" className="w-full h-full text-[#D8BD87]">
            <path d="M48 0H24C24 13.2548 34.7452 24 48 24V0Z" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 w-12 h-12 pointer-events-none opacity-20 rotate-180">
          <svg viewBox="0 0 48 48" fill="none" className="w-full h-full text-[#D8BD87]">
            <path d="M48 0H24C24 13.2548 34.7452 24 48 24V0Z" fill="currentColor" />
          </svg>
        </div>

        {/* Section Heading & Subtitle */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center justify-center gap-2 mb-1">
            <span className="w-6 h-[1px] bg-[#D8BD87]" />
            <h2 className="font-royal text-lg sm:text-xl font-bold tracking-wider text-[#4F1D27] uppercase">
              OUR SERVICES & PRODUCTS
            </h2>
            <span className="w-6 h-[1px] bg-[#D8BD87]" />
          </div>
          <p className="text-xs sm:text-sm text-[#796C68] max-w-sm mx-auto leading-relaxed">
            Everything you need, all in one place!
          </p>
        </div>

        {/* 2 × 2 Grid on Desktop and Mobile */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border border-[#D8BD87]/60 shadow-sm hover:border-[#D8BD87] hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col items-center text-center h-full group"
            >
              {/* Icon Container */}
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#4F1D27] flex items-center justify-center mb-2.5 shrink-0 border border-[#D8BD87]/70 shadow-sm shadow-black/20 group-hover:scale-105 transition-transform">
                {service.icon}
              </div>

              {/* Maroon-colored Heading */}
              <h3 className="font-royal text-xs sm:text-sm font-bold text-[#4F1D27] tracking-wider uppercase mb-1.5 leading-snug">
                {service.title}
              </h3>

              {/* Clear Readable Description */}
              <p className="text-[11px] sm:text-xs text-[#796C68] leading-relaxed flex-1">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
