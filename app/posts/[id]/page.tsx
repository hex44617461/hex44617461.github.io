import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { PostSidebar } from '@/components/PostSidebar';
import { TableOfContents } from '@/components/TableOfContents';
import { getPostData, getAllPostIds, getSortedPostsData, getAllTags } from '@/lib/posts';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const ids = getAllPostIds();
  return ids.map(id => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPostData(id);
  if (!post) {
    return {};
  }
  return {
    title: post.title,
    description: post.excerpt || post.title,
  };
}

export default async function Post({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPostData(id);

  if (!post) {
    notFound();
  }

  const allPosts = getSortedPostsData();
  const allTags = getAllTags();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navigation />

      <main className="flex-1 ml-64 w-[calc(100%-256px)] px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="lg:col-span-3 relative">
            <TableOfContents headings={post.headings || []} />
            
            <article className="prose prose-sm md:prose max-w-none">
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h1 className="text-4xl font-bold text-gray-900 mb-4 border-b pb-3">{post.title}</h1>

                {/* Post Metadata */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 mb-6">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">Posted</span>
                    <time dateTime={post.date}>{post.date}</time>
                  </div>
                  {post.updateDate && (
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">Updated</span>
                      <time dateTime={post.updateDate}>{post.updateDate}</time>
                    </div>
                  )}
                  {post.readingTime && (
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">{post.readingTime} min read</span>
                    </div>
                  )}
                </div>

                {/* Categories */}
                {post.categories.length > 0 && (
                  <div className="flex gap-2 mb-4">
                    {post.categories.map(category => (
                      <Link
                        key={category}
                        href={`/categories/${encodeURIComponent(category)}`}
                        className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded text-xs font-medium hover:bg-blue-200 transition-colors"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Tags */}
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <Link
                        key={tag}
                        href={`/tags/${encodeURIComponent(tag)}`}
                        className="text-xs text-gray-600 hover:text-blue-600 transition-colors bg-gray-100 px-2.5 py-1 rounded"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Post Content */}
              <div
                className="prose prose-sm md:prose max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: post.htmlContent }}
              />
            </article>

            {/* Back Link */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium"
              >
                ← Back to posts
              </Link>
            </div>
          </div>

          {/* Right Sidebar */}
          <PostSidebar recentPosts={allPosts} allTags={allTags} headings={post.headings || []} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
