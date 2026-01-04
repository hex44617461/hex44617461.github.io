import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { PostCard } from '@/components/PostCard';
import { getSortedPostsData } from '@/lib/posts';

export const metadata: Metadata = {
  title: "DH's Blog",
  description: 'Records of work - A technical blog',
};

export default function Home() {
  const allPosts = getSortedPostsData();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <Navigation />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
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
