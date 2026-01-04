import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  const socialLinks = [
    {
      name: 'github',
      url: 'https://github.com/1dh21996',
      icon: '👾',
    },
    {
      name: 'linkedin',
      url: 'https://www.linkedin.com/in/donghyeon-han-6518a5263/',
      icon: '💼',
    },
    {
      name: 'youtube',
      url: 'https://www.youtube.com/@dh9040/featured/',
      icon: '📺',
    },
    {
      name: 'rss',
      url: '/feed.xml',
      icon: '📡',
    },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex gap-6">
            {socialLinks.map(link => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                title={link.name}
              >
                {link.icon} {link.name}
              </a>
            ))}
          </div>
          <p className="text-gray-600 text-sm text-center">
            © 2024 Donghyeon Han. Some rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
