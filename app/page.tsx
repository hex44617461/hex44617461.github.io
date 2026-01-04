import type { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { PostCard } from '@/components/PostCard';
import { getSortedPostsData } from '@/lib/posts';

export const metadata: Metadata = {
  title: "hex44617461",
  description: 'About Data - A technical blog',
};

export default function Home() {
  const allPosts = getSortedPostsData();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navigation />

      <main className="flex-1 ml-64 w-[calc(100%-256px)] max-w-6xl px-6 py-8">
        {allPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No posts found. Check back soon!</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {allPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
