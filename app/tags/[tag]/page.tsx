import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { PostCard } from '@/components/PostCard';
import { getAllTags, getPostsByTag } from '@/lib/posts';
import Link from 'next/link';
import React from 'react';

export const metadata = {
  title: 'Tags',
  description: 'Browse posts by tag',
};

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map(tag => ({ tag: encodeURIComponent(tag) }));
}

export default function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const tag = decodeURIComponent(React.use(params).tag);
  const posts = getPostsByTag(tag);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navigation />

      <main className="flex-1 ml-64 w-[calc(100%-256px)] max-w-6xl px-6 py-8">
        <div className="mb-8">
          <Link href="/tags" className="text-blue-600 hover:text-blue-800">
            ← Back to tags
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">Tag: #{tag}</h1>
          <p className="text-gray-600 mt-2">{posts.length} posts</p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No posts with this tag.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
