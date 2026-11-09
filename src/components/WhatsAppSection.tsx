/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserPlus, MessageCircle, Copy, Check } from 'lucide-react';
import { useShopConfig } from '../context/ShopConfigContext';

export default function WhatsAppSection() {
  const { config } = useShopConfig();
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const rawPhone = config.rawPhone;
  const displayPhone = config.whatsappNumber;
  const whatsappUrl = `https://wa.me/${config.rawPhone}`;

  // Handles downloading standard vCard (VCF) with fallback blob support for Android/iOS
  const handleSaveContact = () => {
    try {
      const vcfContent = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        'N:Stationery;Sree Durga Matha;;;',
        'FN:Sree Durga Matha Stationery',
        'ORG:Sree Durga Matha Stationery',
        'TITLE:Book Stall & Fancy Items',
        `TEL;TYPE=CELL,VOICE,PREF:${rawPhone}`,
        `TEL;TYPE=WORK,VOICE:${rawPhone}`,
        `URL;TYPE=WORK:${whatsappUrl}`,
        `NOTE:Book Stall & Fancy Items · WhatsApp: ${displayPhone}`,
        'CATEGORIES:Stationery,Book Stall,Fancy Items',
        'END:VCARD',
      ].join('\r\n');

      const blob = new Blob([vcfContent], { type: 'text/vcard;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'sree-durga-matha-contact.vcf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch {
      // Direct static fallback if blob creation fails
      window.location.href = '/sree-durga-matha-contact.vcf';
    }
  };

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(displayPhone).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      // Silent fail
    });
  };

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
              CONNECT WITH US
            </h2>
            <span className="w-6 h-[1px] bg-[#D8BD87]" />
          </div>
          <p className="text-xs sm:text-sm text-[#796C68] max-w-sm mx-auto leading-relaxed">
            Save our WhatsApp number to stay connected with Sree Durga Matha Stationery.
          </p>
        </div>

        {/* Prominent WhatsApp Number Display */}
        <div className="my-5 p-4 rounded-xl bg-white border border-[#D8BD87]/40 shadow-sm flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#218B54]/10 text-[#218B54] flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="text-[11px] font-medium tracking-wide text-[#796C68] uppercase block">
                Official WhatsApp
              </span>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg sm:text-xl font-bold text-[#33272A] tracking-wide hover:text-[#218B54] transition-colors"
              >
                {displayPhone}
              </a>
            </div>
          </div>

          {/* Quick Copy Action */}
          <button
            onClick={handleCopyNumber}
            type="button"
            className="p-2.5 rounded-lg text-[#796C68] hover:text-[#4F1D27] hover:bg-[#FFFAF1] transition-colors border border-transparent hover:border-[#D8BD87]/40 flex items-center gap-1 text-xs"
            title="Copy number"
            aria-label="Copy phone number"
          >
            {copied ? (
              <span className="flex items-center gap-1 text-[#218B54] font-medium text-xs">
                <Check className="w-4 h-4" />
                <span className="hidden xs:inline">Copied</span>
              </span>
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 pt-1">
          {/* BUTTON 2: WHATSAPP US (Primary Contact CTA) */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full min-h-[50px] px-5 py-3.5 rounded-xl bg-[#218B54] hover:bg-[#1a7043] active:scale-[0.98] text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-md shadow-[#218B54]/25 transition-all text-center tracking-wide"
          >
            <MessageCircle className="w-5 h-5 fill-white text-white shrink-0" />
            <span>WHATSAPP US</span>
          </a>

          {/* BUTTON 1: SAVE CONTACT */}
          <button
            onClick={handleSaveContact}
            type="button"
            className="w-full min-h-[50px] px-5 py-3.5 rounded-xl bg-[#4F1D27] hover:bg-[#3d151e] active:scale-[0.98] text-[#FFFAF1] border border-[#D8BD87]/70 font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-md shadow-[#4F1D27]/25 transition-all text-center tracking-wide cursor-pointer"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-5 h-5 text-[#D8BD87] shrink-0" />
                <span className="text-[#D8BD87]">CONTACT SAVED (VCF)</span>
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5 text-[#D8BD87] shrink-0" />
                <span>SAVE CONTACT</span>
              </>
            )}
          </button>
        </div>

        {/* Format note for compatibility */}
        <p className="mt-3 text-[11px] text-center text-[#796C68]/80">
          Compatible with Android & iPhone contacts
        </p>
      </div>
    </section>
  );
}
