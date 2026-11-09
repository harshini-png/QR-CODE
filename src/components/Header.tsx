/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useShopConfig } from '../context/ShopConfigContext';

export default function Header() {
  const { config } = useShopConfig();

  return (
    <header className="pt-4 pb-2 px-1 sm:px-2 w-full">
      {/* Compact Horizontal Layout as shown in reference */}
      <div className="flex items-center gap-3 sm:gap-4 py-2">
        {/* Circular Gold-Outlined Logo on the Left */}
        <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-full bg-[#4F1D27] border-2 border-[#D8BD87] flex items-center justify-center shrink-0 shadow-md shadow-black/30">
          <svg
            className="w-8 h-8 sm:w-9 sm:h-9 text-[#D8BD87]"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Center lotus sacred petal */}
            <path
              d="M24 7C24 7 20 16 20 22C20 25.2 21.8 27.5 24 27.5C26.2 27.5 28 25.2 28 22C28 16 24 7 24 7Z"
              fill="currentColor"
              fillOpacity="0.95"
            />
            {/* Inner Left Petal */}
            <path
              d="M21 15C21 15 13 18.5 11.5 25C10.2 29.5 13.8 33 17 33C19.8 33 21.8 30.5 21.8 27.5C21.8 22 21 15 21 15Z"
              fill="currentColor"
              fillOpacity="0.8"
            />
            {/* Inner Right Petal */}
            <path
              d="M27 15C27 15 35 18.5 36.5 25C37.8 29.5 34.2 33 31 33C28.2 33 26.2 30.5 26.2 27.5C26.2 22 27 15 27 15Z"
              fill="currentColor"
              fillOpacity="0.8"
            />
            {/* Outer Left Bloom */}
            <path
              d="M14 25.5C14 25.5 7.5 28 7.5 33.5C7.5 37.5 12 39 16 38.5C18.8 37.8 19.8 35 18.8 32.5C17 29 14 25.5 14 25.5Z"
              fill="currentColor"
              fillOpacity="0.6"
            />
            {/* Outer Right Bloom */}
            <path
              d="M34 25.5C34 25.5 40.5 28 40.5 33.5C40.5 37.5 36 39 32 38.5C29.2 37.8 28.2 35 29.2 32.5C31 29 34 25.5 34 25.5Z"
              fill="currentColor"
              fillOpacity="0.6"
            />
            {/* Sacred Cradle Base */}
            <path
              d="M17 37C21 40 27 40 31 37C30 39.5 27 41.5 24 41.5C21 41.5 18 39.5 17 37Z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Shop Name & Subtitle on the Right */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <h1 className="font-royal text-base sm:text-xl font-bold tracking-wide text-[#FFFAF1] uppercase leading-tight">
            SREE DURGA MATHA STATIONERY
          </h1>
          <p className="mt-0.5 text-xs sm:text-sm font-semibold tracking-wider text-[#D8BD87] uppercase truncate">
            {config.subtitle || 'BOOK STALL & FANCY ITEMS'}
          </p>
        </div>
      </div>

      {/* Thin elegant gold separator below compact header */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#D8BD87]/40 to-transparent mt-2" aria-hidden="true" />
    </header>
  );
}
