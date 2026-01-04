import React from 'react';
import Link from 'next/link';
import { Post } from '@/lib/posts';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <article className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="mb-4">
        <Link
          href={`/posts/${post.id}`}
          className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
        >
          {post.title}
        </Link>
      </div>

      {post.excerpt && (
        <p className="text-gray-700 mb-4 line-clamp-2">{post.excerpt}</p>
      )}

      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
        <time dateTime={post.date}>{post.date}</time>

        {post.categories.length > 0 && (
          <div className="flex gap-2">
            {post.categories.map(category => (
              <Link
                key={category}
                href={`/categories/${encodeURIComponent(category)}`}
                className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200 transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        )}
      </div>

      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {post.tags.map(tag => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="text-xs text-gray-600 hover:text-blue-600 transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}
    </article>
  );
};
