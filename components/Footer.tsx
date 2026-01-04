import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12 ml-64">
      <div className="max-w-6xl px-6 py-6">
        <div className="flex flex-col items-center justify-center gap-3">
          <p className="text-sm text-gray-600 text-center">
            © 2026 hex44617461. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Made with Next.js and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};
