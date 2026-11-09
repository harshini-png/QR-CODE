/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Settings } from 'lucide-react';
import { useShopConfig } from '../context/ShopConfigContext';

interface FooterProps {
  onOpenAdmin: () => void;
}

export default function Footer({ onOpenAdmin }: FooterProps) {
  const { config } = useShopConfig();

  return (
    <footer className="mt-8 mb-6 pt-4 text-center px-4">
      {/* Decorative center divider */}
      <div className="flex items-center justify-center gap-2 mb-3 max-w-xs mx-auto" aria-hidden="true">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#D8BD87]/40 to-[#D8BD87]/60" />
        <div className="w-1.5 h-1.5 rotate-45 bg-[#D8BD87]/70" />
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#D8BD87]/40 to-[#D8BD87]/60" />
      </div>

      <p className="text-xs sm:text-sm text-[#FFFAF1]/85 font-medium tracking-wide">
        Thank you for visiting Sree Durga Matha Stationery.
      </p>

      <p className="mt-1 text-[11px] text-[#D8BD87]/70 tracking-wider uppercase">
        {config.subtitle}
      </p>

      {/* Discreet Admin Portal Entry */}
      <div className="mt-5 flex items-center justify-center">
        <button
          onClick={onOpenAdmin}
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] text-[#D8BD87]/70 hover:text-[#FFFAF1] hover:bg-[#4F1D27]/60 transition-all border border-[#D8BD87]/20 hover:border-[#D8BD87]/50 cursor-pointer"
          title="Owner Admin Portal to edit WhatsApp phone number"
        >
          <Settings className="w-3 h-3 text-[#D8BD87]" />
          <span>Admin Portal</span>
        </button>
      </div>
    </footer>
  );
}
