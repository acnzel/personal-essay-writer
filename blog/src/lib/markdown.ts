import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import fs from 'fs';
import path from 'path';

export async function markdownToHtml(markdown: string): Promise<string> {
  // Remove Notion page ID comments
  const cleanMd = markdown.replace(/<!-- notion-page-id: [a-f0-9-]+ -->\n?/g, '');

  const result = await remark()
    .use(gfm)
    .use(html)
    .process(cleanMd);

  return result.toString();
}

export function getContentPath(): string {
  return path.join(process.cwd(), 'content');
}

export async function getArticleContent(filename: string): Promise<string | null> {
  const contentDir = getContentPath();
  const filePath = path.join(contentDir, filename);

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return content;
  } catch (error) {
    console.error('Error reading article file:', error);
    return null;
  }
}

export function extractTitle(markdown: string): string {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1] : 'Untitled';
}

export function extractExcerpt(markdown: string, maxLength: number = 200): string {
  // Remove title and clean up
  const withoutTitle = markdown.replace(/^#\s+.+$/m, '').trim();
  const withoutComments = withoutTitle.replace(/<!-- .+ -->/g, '');
  const plainText = withoutComments
    .replace(/[#*_`\[\]]/g, '')
    .replace(/\n+/g, ' ')
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  return plainText.slice(0, maxLength).trim() + '...';
}
