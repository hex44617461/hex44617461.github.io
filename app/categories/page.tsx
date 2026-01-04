import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { getAllCategories } from '@/lib/posts';
import Link from 'next/link';

export const metadata = {
  title: 'Categories',
  description: 'Browse posts by category',
};

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navigation />

      <main className="flex-1 ml-64 w-[calc(100%-256px)] max-w-6xl px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Categories</h1>

        {categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No categories yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map(category => (
              <Link
                key={category}
                href={`/categories/${encodeURIComponent(category)}`}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md hover:bg-blue-50 transition-all"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {category}
                </h3>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
