'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLink {
  name: string;
  href: string;
  icon: string;
}

const navLinks: NavLink[] = [
  { name: 'HOME', href: '/', icon: 'fas fa-home' },
  { name: 'CATEGORIES', href: '/categories', icon: 'fas fa-list' },
  { name: 'TAGS', href: '/tags', icon: 'fas fa-tags' },
  { name: 'ARCHIVES', href: '/archives', icon: 'fas fa-archive' },
  { name: 'ABOUT', href: '/about', icon: 'fas fa-circle-info' },
];

const socialLinks = [
  { name: 'github', url: 'https://github.com/hex44617461', icon: 'fab fa-github' },
  { name: 'youtube', url: 'https://www.youtube.com/channel/UCgMBplmqKqfsJLXYd-e5GDw', icon: 'fab fa-youtube' },
  { name: 'linkedin', url: 'https://www.linkedin.com/in/dh-han-6070893a3/', icon: 'fab fa-linkedin-in' },
];

export const Navigation: React.FC = () => {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check localStorage and system preference
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = saved ? saved === 'dark' : prefersDark;
    
    setIsDark(shouldBeDark);
    
    // Apply theme immediately
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
    
    if (newDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const isActive = (href: string): boolean => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 overflow-y-auto flex flex-col">
      {/* Profile Section */}
      <div className="px-6 py-8 border-b border-gray-200">
        <Link href="/" className="block text-center mb-6">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#446174' }}>
            <span className="text-2xl font-bold text-white">H</span>
          </div>
        </Link>
        <h2 className="text-xl font-bold text-gray-900 text-center">hex44617461</h2>
        <p className="text-sm text-gray-600 text-center mt-2 italic">About Data</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="flex flex-col gap-1">
          {navLinks.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'bg-opacity-10 text-[#446174] border-l-2 border-[#446174] pl-2'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <i className={`${link.icon} w-4 text-center`}></i>
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Social Links & Dark Mode Toggle */}
      <div className="px-6 py-6 border-t border-gray-200">
        <div className="flex gap-3 justify-center">
          {socialLinks.map(link => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-[#446174] hover:text-white transition-all duration-200"
              title={link.name}
            >
              <i className={`${link.icon} text-lg`}></i>
            </a>
          ))}
          
          {/* Dark Mode Toggle */}
          {mounted && (
            <button
              onClick={toggleDarkMode}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-[#446174] hover:text-white transition-all duration-200"
              title={isDark ? 'Light mode' : 'Dark mode'}
              aria-label="Toggle dark mode"
            >
              <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'} text-lg`}></i>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
