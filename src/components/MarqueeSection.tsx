'use client';

import React from 'react';

export default function MarqueeSection() {
  const items = [
    '✔ Telah Terjual 10.000+ Pcs',
    '✔ Tanpa Pengawet',
    '✔ Halal & Higienis',
  ];

  return (
    <div className="bg-forest-green text-white py-4 overflow-hidden">
      <div className="marquee-container">
        <div className="marquee-content">
          {/* Repeat items 3 times for smooth loop */}
          {[...items, ...items, ...items].map((item, index) => (
            <span key={index} className="inline-block px-8 text-lg font-medium">
              {item} •
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
