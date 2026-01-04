import React from 'react';
import Link from 'next/link';

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: 'HOME', href: '/' },
  { name: 'CATEGORIES', href: '/categories' },
  { name: 'TAGS', href: '/tags' },
  { name: 'ARCHIVES', href: '/archives' },
  { name: 'ABOUT', href: '/about' },
];

export const Navigation: React.FC = () => {
  return (
    <nav className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <ul className="flex flex-wrap gap-6 text-sm font-medium">
          {navLinks.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
