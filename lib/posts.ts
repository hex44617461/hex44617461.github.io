import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), '_posts');

export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export interface Post {
  id: string;
  title: string;
  date: string;
  updateDate?: string;
  content: string;
  htmlContent: string;
  categories: string[];
  tags: string[];
  excerpt?: string;
  headings?: HeadingItem[];
  readingTime?: number;
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

  // Get file modification time for updateDate
  const stats = fs.statSync(fullPath);
  const fileModifiedTime = stats.mtime;
  const fileModifiedDate = fileModifiedTime.toISOString().split('T')[0];

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  let htmlContent = processedContent.toString();
  
  // 헤더 추출 및 ID 추가
  const headings = extractHeadings(htmlContent);
  htmlContent = addHeadingIds(htmlContent, headings);

  const dateStr = typeof matterResult.data.date === 'string' 
    ? matterResult.data.date 
    : matterResult.data.date instanceof Date
    ? matterResult.data.date.toISOString().split('T')[0]
    : new Date().toISOString().split('T')[0];

  const updateDateStr = matterResult.data.updateDate
    ? typeof matterResult.data.updateDate === 'string' 
      ? matterResult.data.updateDate 
      : matterResult.data.updateDate instanceof Date
      ? matterResult.data.updateDate.toISOString().split('T')[0]
      : fileModifiedDate
    : fileModifiedDate;

  return {
    id,
    title: matterResult.data.title || id,
    date: dateStr,
    updateDate: updateDateStr,
    content: matterResult.content,
    htmlContent,
    categories: matterResult.data.categories || [],
    tags: matterResult.data.tags || [],
    excerpt: matterResult.data.excerpt || '',
    headings,
    readingTime: calculateReadingTime(matterResult.content),
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

function extractHeadings(htmlContent: string): HeadingItem[] {
  const headings: HeadingItem[] = [];
  const usedIds = new Set<string>();
  const regex = /<h([1-6])(?:[^>]*)>(.*?)<\/h\1>/g;
  let match;

  while ((match = regex.exec(htmlContent)) !== null) {
    const level = parseInt(match[1]);
    const text = match[2].replace(/<[^>]*>/g, ''); // 태그 제거
    let id = text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-') // 연속된 하이픈을 하나로
      .replace(/^-+|-+$/g, ''); // 시작과 끝 하이픈 제거

    // ID가 비어있으면 heading으로 설정
    if (!id) {
      id = 'heading';
    }

    // 중복 ID 처리
    let finalId = id;
    let counter = 1;
    while (usedIds.has(finalId)) {
      finalId = `${id}-${counter}`;
      counter++;
    }
    usedIds.add(finalId);

    headings.push({ id: finalId, text, level });
  }

  return headings;
}

function addHeadingIds(htmlContent: string, headings: HeadingItem[]): string {
  let result = htmlContent;

  headings.forEach(heading => {
    const regex = new RegExp(
      `<h${heading.level}(?:[^>]*)>([^<]*${heading.text}[^<]*)<\\/h${heading.level}>`,
      'i'
    );
    result = result.replace(
      regex,
      `<h${heading.level} id="${heading.id}">$1</h${heading.level}>`
    );
  });

  return result;
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
