import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { getSortedPostsData } from '@/lib/posts';
import Link from 'next/link';

export const metadata = {
  title: 'Archives',
  description: 'Browse posts by date',
};

export default function ArchivesPage() {
  const posts = getSortedPostsData();

  // Group posts by year
  const postsByYear: Record<string, typeof posts> = {};

  posts.forEach(post => {
    const dateStr = typeof post.date === 'string' ? post.date : String(post.date);
    const year = dateStr.split('-')[0];
    if (!postsByYear[year]) {
      postsByYear[year] = [];
    }
    postsByYear[year].push(post);
  });

  const years = Object.keys(postsByYear).sort().reverse();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navigation />

      <main className="flex-1 ml-64 w-[calc(100%-256px)] max-w-6xl px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Archives</h1>

        {years.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No posts yet.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {years.map(year => (
              <div key={year}>
                <h2 className="text-xl font-bold text-gray-900 mb-4">{year}</h2>
                <div className="space-y-3 border-l-2 border-gray-300 pl-6">
                  {postsByYear[year].map(post => (
                    <div key={post.id}>
                      <div className="flex gap-4">
                        <span className="text-sm text-gray-600 whitespace-nowrap">
                          {post.date}
                        </span>
                        <Link
                          href={`/posts/${post.id}`}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          {post.title}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
