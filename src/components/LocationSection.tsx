/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

export default function LocationSection() {
  const mapEmbedUrl = 'https://www.google.com/maps?q=17.537269,78.322017&z=17&output=embed';
  const mapsDestinationUrl =
    'https://www.google.com/maps/place/Sree+Durga+Mata+Stationery+Book+Stall+and+Fancy+Items/@17.537269,78.322017,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcb8d5c9c08441b:0xd6a3477cdd4023b2!8m2!3d17.537269!4d78.322017!16s%2Fg%2F11zzsg1mkb?entry=ttu';

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

        {/* Section Heading */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center justify-center gap-2 mb-1">
            <span className="w-6 h-[1px] bg-[#D8BD87]" />
            <h2 className="font-royal text-lg sm:text-xl font-bold tracking-wider text-[#4F1D27] uppercase">
              VISIT OUR STORE
            </h2>
            <span className="w-6 h-[1px] bg-[#D8BD87]" />
          </div>
          <p className="text-xs sm:text-sm text-[#796C68] max-w-sm mx-auto leading-relaxed">
            Find us easily! Our shop location is shown below.
          </p>
        </div>

        {/* Embedded Google Maps Container */}
        <div className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden border border-[#D8BD87]/70 shadow-inner bg-slate-100">
          {/* Subtle top indicator bar */}
          <div className="bg-[#4F1D27] text-[#FFFAF1] px-3.5 py-2 flex items-center justify-between text-xs border-b border-[#D8BD87]/40">
            <div className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#D8BD87]" />
              <span className="tracking-wide text-[11px] sm:text-xs">Store Coordinates · 17.537269, 78.322017</span>
            </div>
            <span className="text-[10px] text-[#D8BD87]/90 font-mono">Live Map</span>
          </div>

          {/* Map Iframe */}
          <div className="relative w-full h-64 sm:h-72">
            <iframe
              title="Sree Durga Matha Stationery Location Map"
              src={mapEmbedUrl}
              className="w-full h-full border-0"
              loading="eager"
              allowFullScreen={false}
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Button below embedded map: OPEN IN GOOGLE MAPS */}
        <div className="mt-4 pt-1">
          <a
            href={mapsDestinationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full min-h-[50px] px-5 py-3.5 rounded-xl bg-[#4F1D27] hover:bg-[#3d151e] active:scale-[0.98] text-[#FFFAF1] border border-[#D8BD87] font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-md shadow-[#4F1D27]/25 transition-all text-center tracking-wide group"
          >
            <Navigation className="w-5 h-5 text-[#D8BD87] group-hover:scale-110 transition-transform shrink-0" />
            <span>OPEN IN GOOGLE MAPS</span>
            <ExternalLink className="w-4 h-4 text-[#D8BD87]/70 shrink-0 ml-0.5" />
          </a>
        </div>

        <p className="mt-3 text-[11px] text-center text-[#796C68]/80">
          Tap above to open directions directly in Google Maps
        </p>
      </div>
    </section>
  );
}
