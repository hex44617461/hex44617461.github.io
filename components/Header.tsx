'use client';

import React from 'react';
import Link from 'next/link';

export const Header: React.FC<{ title?: string }> = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <Link href="/" className="block">
        <div className="max-w-6xl mx-auto px-6 py-3 ml-64">
          {/* Empty header - logo/branding in sidebar */}
        </div>
      </Link>
    </header>
  );
};
