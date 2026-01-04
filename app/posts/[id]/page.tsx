import { Header } from '@/components/Header';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { PostCard } from '@/components/PostCard';
import { getPostData, getAllPostIds } from '@/lib/posts';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const ids = getAllPostIds();
  return ids.map(id => ({ id }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const post = await getPostData(params.id);
  if (!post) {
    return {};
  }
  return {
    title: post.title,
    description: post.excerpt || post.title,
  };
}

export default async function Post({ params }: { params: { id: string } }) {
  const post = await getPostData(params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <Navigation />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <article className="prose prose-sm md:prose max-w-none">
          <div className="mb-8 pb-8 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
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
              <div className="flex flex-wrap gap-2">
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
          </div>

          <div
            className="prose prose-sm md:prose max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.htmlContent }}
          />
        </article>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Back to posts
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
