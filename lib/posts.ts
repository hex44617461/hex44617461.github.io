import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), '_posts');

export interface Post {
  id: string;
  title: string;
  date: string;
  content: string;
  htmlContent: string;
  categories: string[];
  tags: string[];
  excerpt?: string;
}

export function getSortedPostsData(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      const matterResult = matter(fileContents);

      return {
        id,
        title: matterResult.data.title || id,
        date: typeof matterResult.data.date === 'string' 
          ? matterResult.data.date 
          : matterResult.data.date instanceof Date
          ? matterResult.data.date.toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0],
        content: matterResult.content,
        htmlContent: '',
        categories: matterResult.data.categories || [],
        tags: matterResult.data.tags || [],
        excerpt: matterResult.data.excerpt || '',
      };
    });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostData(id: string): Promise<Post | null> {
  const fullPath = path.join(postsDirectory, `${id}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const htmlContent = processedContent.toString();

  return {
    id,
    title: matterResult.data.title || id,
    date: typeof matterResult.data.date === 'string' 
      ? matterResult.data.date 
      : matterResult.data.date instanceof Date
      ? matterResult.data.date.toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0],
    content: matterResult.content,
    htmlContent,
    categories: matterResult.data.categories || [],
    tags: matterResult.data.tags || [],
    excerpt: matterResult.data.excerpt || '',
  };
}

export function getAllPostIds(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory)
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => fileName.replace(/\.md$/, ''));
}

export function getAllCategories(): string[] {
  const posts = getSortedPostsData();
  const categories = new Set<string>();

  posts.forEach(post => {
    post.categories.forEach(cat => categories.add(cat));
  });

  return Array.from(categories).sort();
}

export function getAllTags(): string[] {
  const posts = getSortedPostsData();
  const tags = new Set<string>();

  posts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag));
  });

  return Array.from(tags).sort();
}

export function getPostsByCategory(category: string): Post[] {
  return getSortedPostsData().filter(post =>
    post.categories.includes(category)
  );
}

export function getPostsByTag(tag: string): Post[] {
  return getSortedPostsData().filter(post => post.tags.includes(tag));
}
