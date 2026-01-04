'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HeadingItem } from '@/lib/posts';

interface TableOfContentsProps {
  headings: HeadingItem[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ headings }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!headings || headings.length === 0) {
    return null;
  }

  return (
    <>
      {/* 우측 끝에 붙는 토글 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-l-lg transition-all duration-300 hidden lg:flex items-center justify-center"
        aria-label={isOpen ? '목차 숨기기' : '목차 보이기'}
        title="목차"
      >
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* 슬라이드 사이드바 */}
      <aside
        className={`fixed right-0 top-0 h-screen w-72 bg-white border-l border-gray-200 shadow-lg z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col p-6 pt-20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">목차</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="목차 닫기"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="space-y-2 overflow-y-auto flex-1">
            {headings.map(heading => (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                onClick={() => setIsOpen(false)}
                className={`block text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded transition-colors ${
                  heading.level === 2 ? 'font-medium' : ''
                }`}
                style={{ paddingLeft: `${12 + (heading.level - 2) * 12}px` }}
              >
                {heading.text}
              </a>
            ))}
          </nav>
        </div>
      </aside>

      {/* 오버레이 (투명 - 클릭만 감지) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 hidden lg:block"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
