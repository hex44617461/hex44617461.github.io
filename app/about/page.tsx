import { Header } from '@/components/Header';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'About',
  description: 'About DH',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <Navigation />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <article className="prose prose-sm md:prose max-w-none">
          <h1>About Me</h1>

          <section className="mb-8">
            <h2>👋 Hello!</h2>
            <p>
              Welcome to my blog! I'm a developer passionate about sharing knowledge
              and documenting my journey in software development.
            </p>
          </section>

          <section className="mb-8">
            <h2>🚀 What I Do</h2>
            <p>
              I work on various projects ranging from web development, mobile applications,
              to exploring new technologies. This blog serves as a platform to share my
              experiences, tutorials, and insights.
            </p>
          </section>

          <section className="mb-8">
            <h2>📚 Topics I Write About</h2>
            <ul>
              <li>Web Development (React, Next.js, TypeScript)</li>
              <li>Mobile Development (Android, iOS)</li>
              <li>DevOps & Deployment</li>
              <li>Project Builds & Tutorials</li>
              <li>Technical Knowledge Sharing</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>🔗 Connect With Me</h2>
            <p>
              You can find me on various platforms. Feel free to reach out and connect!
            </p>
            <ul>
              <li>
                <a href="https://github.com/1dh21996" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/donghyeon-han-6518a5263/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@dh9040/featured/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2>📝 Latest Posts</h2>
            <p>
              Check out my recent posts to see what I've been working on and learning about!
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
