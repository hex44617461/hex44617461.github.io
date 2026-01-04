import { Header } from '@/components/Header';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { getAllTags } from '@/lib/posts';
import Link from 'next/link';

export const metadata = {
  title: 'Tags',
  description: 'Browse posts by tag',
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <Navigation />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Tags</h1>

        {tags.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No tags yet.</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {tags.map(tag => (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag)}`}
                className="px-4 py-2 border border-gray-300 rounded-full hover:bg-blue-100 hover:border-blue-300 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
