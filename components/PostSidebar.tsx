'use client';

import React from 'react';
import Link from 'next/link';
import { Post, HeadingItem } from '@/lib/posts';

interface PostSidebarProps {
  recentPosts: Post[];
  allTags: string[];
  headings: HeadingItem[];
}

export const PostSidebar: React.FC<PostSidebarProps> = ({ recentPosts, allTags, headings }) => {
  const tagCounts = allTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const trendingTags = Object.entries(tagCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([tag]) => tag);

  return (
    <aside className="col-xl-3 ps-2 mb-5 text-muted">
      {/* Recently Updated */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
          RECENTLY UPDATED
        </h3>
        <ul className="space-y-3">
          {recentPosts.slice(0, 5).map(post => (
            <li key={post.id} className="text-xs">
              <Link
                href={`/posts/${post.id}`}
                className="text-gray-700 hover:text-blue-600 transition-colors line-clamp-2"
                title={post.title}
              >
                {post.title}
              </Link>
              <div className="text-gray-500 text-xs mt-1">{post.date}</div>
            </li>
          ))}
        </ul>
      </div>

      {/* Trending Tags */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
          TRENDING TAGS
        </h3>
        <div className="flex flex-wrap gap-2">
          {trendingTags.map(tag => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="text-xs text-gray-600 hover:text-blue-600 bg-gray-100 px-2.5 py-1.5 rounded transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Contents */}
      {headings.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
            CONTENTS
          </h3>
          <nav className="text-xs space-y-1.5">
            {headings
              .filter(heading => heading.level >= 2)
              .map(heading => (
                <div
                  key={heading.id}
                  style={{ paddingLeft: `${(heading.level - 2) * 0.75}rem` }}
                >
                  <a
                    href={`#${heading.id}`}
                    className="text-gray-600 hover:text-blue-600 transition-colors block"
                    title={heading.text}
                  >
                    {heading.text}
                  </a>
                </div>
              ))}
          </nav>
        </div>
      )}
    </aside>
  );
};
