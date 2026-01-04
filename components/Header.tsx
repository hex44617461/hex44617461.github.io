import React from 'react';

export const Header: React.FC<{ title?: string }> = ({ title = "DH's Blog" }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600 mt-2">Records of work</p>
      </div>
    </header>
  );
};
