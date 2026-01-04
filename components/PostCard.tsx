import React from 'react';
import Link from 'next/link';
import { Post } from '@/lib/posts';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <article className="border-b border-gray-200 pb-6 mb-6 hover:bg-gray-50 transition-colors px-3 py-3 rounded">
      <div className="mb-3">
        <Link
          href={`/posts/${post.id}`}
          className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
        >
          {post.title}
        </Link>
      </div>

      {post.excerpt && (
        <p className="text-gray-700 mb-3 text-sm line-clamp-2 leading-6">{post.excerpt}</p>
      )}

      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
        <time dateTime={post.date} className="font-medium">
          {post.date}
        </time>

        {post.categories.length > 0 && (
          <div className="flex gap-1.5">
            {post.categories.map(category => (
              <Link
                key={category}
                href={`/categories/${encodeURIComponent(category)}`}
                className="px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        )}
      </div>

      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {post.tags.map(tag => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="text-xs text-gray-600 hover:text-blue-600 transition-colors bg-gray-100 px-2 py-1 rounded"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}
    </article>
  );
};
