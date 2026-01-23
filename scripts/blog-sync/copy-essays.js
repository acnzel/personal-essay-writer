import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ESSAYS_DIR = path.resolve(__dirname, '../../.claude/skills/personal-essay/data/essays');
const CONTENT_DIR = path.resolve(__dirname, '../../blog/content');
const MAPPING_FILE = path.resolve(__dirname, 'mapping.json');

function slugify(filename) {
  // Remove .md extension and create a simple slug
  const name = filename.replace(/\.md$/, '');
  // Use a hash-like approach for consistent naming
  return name;
}

function extractTitle(content) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : 'Untitled';
}

function extractExcerpt(content, maxLength = 200) {
  // Remove title
  const withoutTitle = content.replace(/^#\s+.+$/m, '').trim();
  // Remove comments
  const withoutComments = withoutTitle.replace(/<!-- .+ -->/g, '');
  // Clean markdown syntax
  const plainText = withoutComments
    .replace(/[#*_`\[\]]/g, '')
    .replace(/\n+/g, ' ')
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  return plainText.slice(0, maxLength).trim() + '...';
}

async function main() {
  console.log('📁 Copying essays to blog/content...\n');

  // Ensure content directory exists
  if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
    console.log(`Created directory: ${CONTENT_DIR}`);
  }

  // Get all essay files
  const files = fs.readdirSync(ESSAYS_DIR).filter(f => f.endsWith('.md'));
  console.log(`Found ${files.length} essay files\n`);

  const mapping = [];

  for (const file of files) {
    const sourcePath = path.join(ESSAYS_DIR, file);
    const content = fs.readFileSync(sourcePath, 'utf-8');

    // Clean content (remove Notion page ID)
    const cleanContent = content.replace(/<!-- notion-page-id: [a-f0-9-]+ -->\n?/g, '');

    const slug = slugify(file);
    const targetPath = path.join(CONTENT_DIR, file);

    // Write to content directory
    fs.writeFileSync(targetPath, cleanContent);

    const title = extractTitle(content);
    const excerpt = extractExcerpt(content);

    mapping.push({
      filename: file,
      slug,
      title,
      excerpt
    });

    console.log(`✓ ${file}`);
    console.log(`  Title: ${title}`);
    console.log('');
  }

  // Save mapping for sync-supabase.js
  fs.writeFileSync(MAPPING_FILE, JSON.stringify(mapping, null, 2));
  console.log(`\n📝 Mapping saved to ${MAPPING_FILE}`);
  console.log(`\n✅ Copied ${files.length} essays to blog/content`);
}

main().catch(console.error);
