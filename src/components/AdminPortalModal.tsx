/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useShopConfig } from '../context/ShopConfigContext';
import {
  Lock,
  X,
  Phone,
  CheckCircle,
  AlertCircle,
  RotateCcw,
  ExternalLink,
  Save,
  LogIn,
  LogOut,
  User,
  Key,
} from 'lucide-react';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminPortalModal({ isOpen, onClose }: AdminPortalModalProps) {
  const { config, updateNumber, updateSubtitle, resetToDefaults } = useShopConfig();

  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userIdInput, setUserIdInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Form states
  const [phoneInput, setPhoneInput] = useState(config.whatsappNumber);
  const [subtitleInput, setSubtitleInput] = useState(config.subtitle);
  const [statusMessage, setStatusMessage] = useState<{ text: string; isError?: boolean } | null>(
    null
  );

  // Sync inputs and reset auth when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setPhoneInput(config.whatsappNumber);
      setSubtitleInput(config.subtitle);
      setStatusMessage(null);
    } else {
      setIsAuthenticated(false);
      setUserIdInput('');
      setPasswordInput('');
      setAuthError('');
      setStatusMessage(null);
    }
  }, [isOpen, config.whatsappNumber, config.subtitle]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (userIdInput.trim() === 'lychittiharshini' && passwordInput === 'harshini8019') {
      setIsAuthenticated(true);
      setAuthError('');
      setPhoneInput(config.whatsappNumber);
      setSubtitleInput(config.subtitle);
    } else {
      setAuthError('Invalid credentials. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserIdInput('');
    setPasswordInput('');
    setAuthError('');
    setStatusMessage(null);
  };

  const handleSavePhone = (e: React.FormEvent) => {
    e.preventDefault();
    const result = updateNumber(phoneInput);
    if (result.success) {
      setStatusMessage({ text: result.message });
      setTimeout(() => setStatusMessage(null), 4000);
    } else {
      setStatusMessage({ text: result.message, isError: true });
    }
  };

  const handleSaveSubtitle = (e: React.FormEvent) => {
    e.preventDefault();
    updateSubtitle(subtitleInput);
    setStatusMessage({ text: 'Shop subtitle updated successfully!' });
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Reset WhatsApp number and shop settings back to initial defaults?')) {
      resetToDefaults();
      setPhoneInput('+91 83410 37373');
      setSubtitleInput('BOOK STALL & FANCY ITEMS');
      setStatusMessage({ text: 'Reset to original defaults (+91 83410 37373).' });
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="bg-[#FFFAF1] w-full max-w-md rounded-2xl sm:rounded-3xl border-1.5 border-[#D8BD87] shadow-2xl shadow-black/50 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="bg-[#4F1D27] text-[#FFFAF1] px-5 py-4 flex items-center justify-between border-b border-[#D8BD87]/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#702B35] gold-border flex items-center justify-center text-[#D8BD87]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-royal text-base sm:text-lg font-bold tracking-wider text-[#FFFAF1] leading-none">
                OWNER ADMIN PORTAL
              </h2>
              <span className="text-[10px] text-[#D8BD87] tracking-wider uppercase">
                Sree Durga Matha Stationery
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1.5 rounded-lg text-[#FFFAF1]/80 hover:text-white hover:bg-[#702B35] transition-colors cursor-pointer"
            aria-label="Close admin portal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {!isAuthenticated ? (
            /* SECURE CREDENTIALS SCREEN - NO HINTS OR DEFAULTS MENTIONED */
            <form onSubmit={handleLogin} className="space-y-4 py-2">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#4F1D27]/10 flex items-center justify-center text-[#4F1D27] mb-2">
                  <Lock className="w-6 h-6 text-[#4F1D27]" />
                </div>
                <h3 className="font-royal text-base font-bold text-[#33272A]">Owner Verification</h3>
                <p className="text-xs text-[#796C68]">
                  Please sign in to access shop configuration controls.
                </p>
              </div>

              {/* User ID Field */}
              <div className="space-y-1">
                <label
                  htmlFor="admin-user-id"
                  className="block text-xs font-semibold text-[#4F1D27] uppercase tracking-wider"
                >
                  User ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#796C68]">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="admin-user-id"
                    type="text"
                    value={userIdInput}
                    onChange={(e) => {
                      setUserIdInput(e.target.value);
                      setAuthError('');
                    }}
                    placeholder="Enter User ID"
                    autoComplete="off"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-[#D8BD87]/70 text-[#33272A] font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#4F1D27]/30"
                    autoFocus
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1">
                <label
                  htmlFor="admin-password"
                  className="block text-xs font-semibold text-[#4F1D27] uppercase tracking-wider"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#796C68]">
                    <Key className="w-4 h-4" />
                  </div>
                  <input
                    id="admin-password"
                    type="password"
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setAuthError('');
                    }}
                    placeholder="Enter Password"
                    autoComplete="off"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-[#D8BD87]/70 text-[#33272A] font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#4F1D27]/30"
                  />
                </div>
              </div>

              {authError && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-[#4F1D27] hover:bg-[#3d151e] active:scale-[0.98] text-[#FFFAF1] border border-[#D8BD87] font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <LogIn className="w-4 h-4 text-[#D8BD87]" />
                  <span>Sign In</span>
                </button>
              </div>
            </form>
          ) : (
            /* AUTHENTICATED ADMIN CONTROLS */
            <div className="space-y-6">
              {/* Top status bar with Logout */}
              <div className="flex items-center justify-between pb-2 border-b border-[#D8BD87]/30">
                <div className="flex items-center gap-1.5 text-xs text-[#218B54] font-semibold">
                  <CheckCircle className="w-4 h-4" />
                  <span>Authenticated as Owner</span>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-xs text-[#796C68] hover:text-[#4F1D27] flex items-center gap-1 transition-colors cursor-pointer py-1 px-2 rounded hover:bg-[#4F1D27]/5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>

              {/* Feedback Alert */}
              {statusMessage && (
                <div
                  className={`flex items-start gap-2 p-3 rounded-xl border text-xs leading-relaxed animate-in fade-in duration-150 ${
                    statusMessage.isError
                      ? 'bg-red-50 border-red-200 text-red-800'
                      : 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  }`}
                >
                  {statusMessage.isError ? (
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                  )}
                  <span className="font-medium">{statusMessage.text}</span>
                </div>
              )}

              {/* SECTION: EDIT WHATSAPP NUMBER */}
              <div className="bg-white rounded-xl p-4 border border-[#D8BD87]/50 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-[#4F1D27]">
                  <Phone className="w-4 h-4 text-[#218B54]" />
                  <h3 className="font-royal text-sm font-bold tracking-wide">
                    EDIT WHATSAPP NUMBER
                  </h3>
                </div>

                <p className="text-xs text-[#796C68]">
                  Changing this updates the displayed phone number, the one-tap WhatsApp chat link,
                  and the downloadable VCF contact file immediately.
                </p>

                <form onSubmit={handleSavePhone} className="space-y-3 pt-1">
                  <div>
                    <label
                      htmlFor="whatsapp-number-input"
                      className="block text-[11px] font-medium text-[#796C68] uppercase mb-1"
                    >
                      Phone Number (10 digits or with +91)
                    </label>
                    <input
                      id="whatsapp-number-input"
                      type="text"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      placeholder="+91 83410 37373 or 8341037373"
                      className="w-full py-2.5 px-3.5 rounded-lg bg-[#FFFAF1]/50 border border-[#D8BD87]/70 text-[#33272A] font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#218B54]/40"
                    />
                  </div>

                  {/* Active Link Preview */}
                  <div className="p-2.5 rounded-lg bg-[#FFFAF1] border border-[#D8BD87]/40 text-[11px] flex items-center justify-between">
                    <span className="text-[#796C68]">Chat Link:</span>
                    <a
                      href={`https://wa.me/${config.rawPhone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[#218B54] hover:underline flex items-center gap-1 font-semibold"
                    >
                      <span>wa.me/{config.rawPhone}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-lg bg-[#218B54] hover:bg-[#1a7043] active:scale-[0.98] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save WhatsApp Number</span>
                  </button>
                </form>
              </div>

              {/* SECTION: EDIT SUBTITLE */}
              <div className="bg-white rounded-xl p-4 border border-[#D8BD87]/50 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-royal text-sm font-bold text-[#4F1D27] tracking-wide">
                    SHOP SUBTITLE
                  </h3>
                  <span className="text-[10px] text-[#796C68]">Header & VCF Title</span>
                </div>

                <form onSubmit={handleSaveSubtitle} className="space-y-3">
                  <input
                    type="text"
                    value={subtitleInput}
                    onChange={(e) => setSubtitleInput(e.target.value)}
                    placeholder="BOOK STALL & FANCY ITEMS"
                    className="w-full py-2 px-3 rounded-lg bg-[#FFFAF1]/50 border border-[#D8BD87]/70 text-[#33272A] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#4F1D27]/30"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 px-3 rounded-lg bg-[#4F1D27] hover:bg-[#3d151e] active:scale-[0.98] text-[#FFFAF1] font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5 text-[#D8BD87]" />
                    <span>Update Subtitle</span>
                  </button>
                </form>
              </div>

              {/* SECTION: RESET TO DEFAULTS & DONE */}
              <div className="pt-2 flex items-center justify-between border-t border-[#D8BD87]/40">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-[#796C68] hover:text-red-700 flex items-center gap-1.5 transition-colors cursor-pointer py-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to Defaults</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-1.5 rounded-lg bg-[#4F1D27] text-[#FFFAF1] text-xs font-semibold hover:bg-[#3d151e] transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
