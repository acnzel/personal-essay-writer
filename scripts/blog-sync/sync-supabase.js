import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MAPPING_FILE = path.resolve(__dirname, 'mapping.json');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing environment variables: SUPABASE_URL, SUPABASE_SERVICE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function main() {
  console.log('🔄 Syncing articles to Supabase...\n');

  // Read mapping file
  if (!fs.existsSync(MAPPING_FILE)) {
    console.error('❌ mapping.json not found. Run copy-essays.js first.');
    process.exit(1);
  }

  const mapping = JSON.parse(fs.readFileSync(MAPPING_FILE, 'utf-8'));
  console.log(`Found ${mapping.length} articles to sync\n`);

  // Get existing articles
  const { data: existing, error: fetchError } = await supabase
    .from('articles')
    .select('id, slug');

  if (fetchError) {
    console.error('❌ Error fetching existing articles:', fetchError);
    process.exit(1);
  }

  const existingSlugs = new Set(existing?.map(a => a.slug) || []);
  const newSlugs = new Set(mapping.map(a => a.slug));

  // Upsert articles
  for (const article of mapping) {
    const { error } = await supabase
      .from('articles')
      .upsert({
        slug: article.slug,
        filename: article.filename,
        title: article.title,
        excerpt: article.excerpt,
        updated_at: new Date().toISOString(),
        published: true
      }, {
        onConflict: 'slug'
      });

    if (error) {
      console.error(`❌ Error upserting ${article.slug}:`, error);
    } else {
      const isNew = !existingSlugs.has(article.slug);
      console.log(`${isNew ? '➕' : '✓'} ${article.title}`);
    }
  }

  // Mark removed articles as unpublished
  for (const existingArticle of existing || []) {
    if (!newSlugs.has(existingArticle.slug)) {
      await supabase
        .from('articles')
        .update({ published: false })
        .eq('id', existingArticle.id);

      console.log(`🗑️ Unpublished: ${existingArticle.slug}`);
    }
  }

  console.log('\n✅ Sync complete!');
}

main().catch(console.error);
