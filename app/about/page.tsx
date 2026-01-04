import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'About',
  description: 'About DH',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navigation />

      <main className="flex-1 ml-64 w-[calc(100%-256px)] max-w-6xl px-6 py-8">
        <article className="prose prose-sm md:prose max-w-none">
          <h1>About Me</h1>
            <ul>
              <li>문제 해결을 위한 의사결정에 관심을 가지고 있습니다.</li>
              <li>데이터 인프라 구축 · 데이터 활용에 대한 탐구하고 있습니다.</li>
            </ul>
          <section className="mb-8">
          </section>

          <section className="mb-8">
            <h2>Contact</h2>
            <ul>
              <li>hex44617461@gmail.com</li>
            </ul>
            <p></p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
