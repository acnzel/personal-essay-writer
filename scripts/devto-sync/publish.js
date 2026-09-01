import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '../..');

const API_BASE = 'https://dev.to/api/articles';
const DEFAULT_TAGS = ['leadership', 'management', 'career'];
const MAX_TAGS = 4;
const REQUEST_DELAY_MS = 2000;

const ID_PATTERN = /<!-- dev-to-id: (\d+) -->/;
const URL_PATTERN = /<!-- dev-to-url: (.+?) -->/;
const PUBLISHED_PATTERN = /<!-- dev-to-published: (true|false) -->/;
const TAGS_PATTERN = /<!-- dev-to-tags: (.+?) -->/;
const ANY_META_PATTERN = /^<!-- dev-to-[a-z]+:.*-->\s*$/gm;

const apiKey = process.env.DEVTO_API_KEY;

async function main() {
  if (!apiKey) {
    console.error('Missing DEVTO_API_KEY');
    process.exit(1);
  }

  const changedFiles = process.env.CHANGED_FILES?.split(' ').filter(Boolean) || [];

  if (changedFiles.length === 0) {
    console.log('No changed English essay files to publish');
    return;
  }

  console.log(`Publishing ${changedFiles.length} file(s)...`);

  let failed = 0;
  for (const [index, filePath] of changedFiles.entries()) {
    if (index > 0) {
      await sleep(REQUEST_DELAY_MS);
    }
    try {
      await publishEssay(filePath);
    } catch (error) {
      failed += 1;
      console.error(`Failed to publish ${filePath}:`, error.message);
    }
  }

  if (failed > 0) {
    console.error(`${failed} file(s) failed to publish`);
    process.exit(1);
  }
}

async function publishEssay(filePath) {
  const absolutePath = path.resolve(PROJECT_ROOT, filePath);
  const content = await fs.readFile(absolutePath, 'utf-8');

  const titleMatch = content.match(/^# (.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : path.basename(filePath, '.md');

  const existingId = content.match(ID_PATTERN)?.[1] ?? null;
  const rawTags = content.match(TAGS_PATTERN)?.[1]?.trim() ?? null;
  const tags = parseTags(rawTags);

  // The file keeps its H1; only dev.to gets a body without it, since the H1
  // becomes the article's title field and would otherwise render twice.
  const cleanContent = content.replace(ANY_META_PATTERN, '').trim();
  const bodyMarkdown = titleMatch
    ? cleanContent.replace(titleMatch[0], '').trim()
    : cleanContent;

  const article = {
    title,
    body_markdown: bodyMarkdown,
    published: true,
    tags
  };

  const result = existingId
    ? await request('PUT', `${API_BASE}/${existingId}`, article)
    : await request('POST', API_BASE, article);

  const updatedContent = writeMetadata(cleanContent, {
    tags: rawTags,
    id: result.id,
    url: result.url
  });
  await fs.writeFile(absolutePath, updatedContent, 'utf-8');

  const action = existingId ? 'Updated' : 'Created';
  console.log(`${action}: "${title}" (${result.id}) ${result.url}`);
}

// dev.to only accepts lowercase alphanumeric tags, at most 4 of them.
function parseTags(rawTags) {
  const tags = (rawTags ?? '')
    .split(',')
    .map((tag) => tag.trim().toLowerCase().replace(/[^a-z0-9]/g, ''))
    .filter(Boolean);

  return (tags.length > 0 ? tags : DEFAULT_TAGS).slice(0, MAX_TAGS);
}

function writeMetadata(cleanContent, { tags, id, url }) {
  const lines = [];
  if (tags) {
    lines.push(`<!-- dev-to-tags: ${tags} -->`);
  }
  lines.push(`<!-- dev-to-id: ${id} -->`);
  lines.push(`<!-- dev-to-url: ${url} -->`);
  lines.push('<!-- dev-to-published: true -->');

  return `${cleanContent}\n\n${lines.join('\n')}\n`;
}

async function request(method, url, article) {
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify({ article })
    });

    if (response.status === 429 && attempt === 0) {
      const retryAfter = Number(response.headers.get('retry-after')) || 30;
      console.log(`Rate limited, retrying in ${retryAfter}s...`);
      await sleep(retryAfter * 1000);
      continue;
    }

    const text = await response.text();
    if (!response.ok) {
      throw new Error(`${method} ${url} returned ${response.status}: ${text}`);
    }
    return JSON.parse(text);
  }

  throw new Error(`${method} ${url} failed after retrying a rate limit`);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main().catch((error) => {
  console.error('Publish failed:', error);
  process.exit(1);
});
