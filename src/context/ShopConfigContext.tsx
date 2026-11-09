/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ShopConfig {
  shopName: string;
  subtitle: string;
  whatsappNumber: string;
  rawPhone: string;
}

const DEFAULT_CONFIG: ShopConfig = {
  shopName: 'SREE DURGA MATHA STATIONERY',
  subtitle: 'BOOK STALL & FANCY ITEMS',
  whatsappNumber: '+91 83410 37373',
  rawPhone: '918341037373',
};

const STORAGE_KEY = 'sree_durga_matha_shop_config_v1';

interface ShopConfigContextType {
  config: ShopConfig;
  updateNumber: (newNumber: string) => { success: boolean; message: string };
  updateSubtitle: (newSubtitle: string) => void;
  resetToDefaults: () => void;
}

const ShopConfigContext = createContext<ShopConfigContextType | undefined>(undefined);

// Helper to sanitize phone input to raw digits and formatted display
export function sanitizePhone(input: string): { rawPhone: string; formattedNumber: string } | null {
  const digits = input.replace(/\D/g, '');
  if (!digits) return null;

  let raw = digits;
  // If user entered 10 digits without country code, add 91 (India)
  if (digits.length === 10) {
    raw = '91' + digits;
  } else if (digits.length === 11 && digits.startsWith('0')) {
    raw = '91' + digits.slice(1);
  } else if (digits.length < 10) {
    return null; // Invalid length
  }

  // Format as +91 XXXXX XXXXX if 12 digits starting with 91
  let formatted = input.trim();
  if (raw.length === 12 && raw.startsWith('91')) {
    const p1 = raw.slice(2, 7);
    const p2 = raw.slice(7);
    formatted = `+91 ${p1} ${p2}`;
  } else {
    formatted = `+${raw}`;
  }

  return { rawPhone: raw, formattedNumber: formatted };
}

export function ShopConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<ShopConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_CONFIG, ...parsed };
      }
    } catch {
      // Fallback to default
    }
    return DEFAULT_CONFIG;
  });

  // Save to localStorage whenever config updates
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch {
      // Ignore storage errors
    }
  }, [config]);

  const updateNumber = (newNumber: string) => {
    const sanitized = sanitizePhone(newNumber);
    if (!sanitized) {
      return {
        success: false,
        message: 'Please enter a valid 10-digit phone number (e.g. 83410 37373 or +91 83410 37373).',
      };
    }

    setConfig((prev) => ({
      ...prev,
      whatsappNumber: sanitized.formattedNumber,
      rawPhone: sanitized.rawPhone,
    }));

    return {
      success: true,
      message: `WhatsApp number updated successfully to ${sanitized.formattedNumber}!`,
    };
  };

  const updateSubtitle = (newSubtitle: string) => {
    setConfig((prev) => ({
      ...prev,
      subtitle: newSubtitle.trim() || DEFAULT_CONFIG.subtitle,
    }));
  };

  const resetToDefaults = () => {
    setConfig(DEFAULT_CONFIG);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  return (
    <ShopConfigContext.Provider
      value={{
        config,
        updateNumber,
        updateSubtitle,
        resetToDefaults,
      }}
    >
      {children}
    </ShopConfigContext.Provider>
  );
}

export function useShopConfig() {
  const context = useContext(ShopConfigContext);
  if (!context) {
    throw new Error('useShopConfig must be used within a ShopConfigProvider');
  }
  return context;
}
