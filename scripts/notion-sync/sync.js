import { Client } from '@notionhq/client';
import { markdownToBlocks } from '@tryfabric/martian';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '../..');
const PAGE_ID_PATTERN = /<!-- notion-page-id: ([a-f0-9-]+) -->/;

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DATABASE_ID;

let titlePropertyName = '이름';

async function main() {
  if (!process.env.NOTION_TOKEN || !databaseId) {
    console.error('Missing NOTION_TOKEN or NOTION_DATABASE_ID');
    process.exit(1);
  }

  // Get database schema to find title property name
  try {
    const database = await notion.databases.retrieve({ database_id: databaseId });
    for (const [name, prop] of Object.entries(database.properties)) {
      if (prop.type === 'title') {
        titlePropertyName = name;
        break;
      }
    }
    console.log(`Using title property: "${titlePropertyName}"`);
  } catch (error) {
    console.warn('Could not retrieve database schema:', error.message);
  }

  const changedFiles = process.env.CHANGED_FILES?.split(' ').filter(Boolean) || [];

  if (changedFiles.length === 0) {
    console.log('No changed essay files to sync');
    return;
  }

  console.log(`Syncing ${changedFiles.length} file(s)...`);

  for (const filePath of changedFiles) {
    try {
      await syncEssay(filePath);
    } catch (error) {
      console.error(`Failed to sync ${filePath}:`, error.message);
    }
  }
}

async function syncEssay(filePath) {
  const absolutePath = path.resolve(PROJECT_ROOT, filePath);
  const content = await fs.readFile(absolutePath, 'utf-8');

  // Extract title from first H1 heading
  const titleMatch = content.match(/^# (.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : path.basename(filePath, '.md');

  // Check for existing Notion page ID
  const pageIdMatch = content.match(PAGE_ID_PATTERN);
  const existingPageId = pageIdMatch ? pageIdMatch[1] : null;

  // Remove the page ID comment for content processing
  const cleanContent = content.replace(PAGE_ID_PATTERN, '').trim();

  // Convert markdown to Notion blocks
  const blocks = markdownToBlocks(cleanContent);

  if (existingPageId) {
    await updateNotionPage(existingPageId, title, blocks);
    console.log(`Updated: "${title}" (${existingPageId})`);
  } else {
    const newPageId = await createNotionPage(title, blocks);

    // Append page ID to markdown file
    const updatedContent = `${cleanContent}\n\n<!-- notion-page-id: ${newPageId} -->\n`;
    await fs.writeFile(absolutePath, updatedContent, 'utf-8');
    console.log(`Created: "${title}" (${newPageId})`);
  }
}

async function createNotionPage(title, blocks) {
  const response = await notion.pages.create({
    parent: { database_id: databaseId },
    properties: {
      [titlePropertyName]: {
        title: [{ text: { content: title } }]
      }
    },
    children: blocks.slice(0, 100) // Notion limits 100 blocks per request
  });

  // If more than 100 blocks, append the rest
  if (blocks.length > 100) {
    await appendBlocksInChunks(response.id, blocks.slice(100));
  }

  return response.id;
}

async function updateNotionPage(pageId, title, blocks) {
  // Update page title
  await notion.pages.update({
    page_id: pageId,
    properties: {
      [titlePropertyName]: {
        title: [{ text: { content: title } }]
      }
    }
  });

  // Delete existing blocks
  const existingBlocks = await getAllBlocks(pageId);
  for (const block of existingBlocks) {
    try {
      await notion.blocks.delete({ block_id: block.id });
    } catch (error) {
      console.warn(`Could not delete block ${block.id}:`, error.message);
    }
  }

  // Append new blocks
  await appendBlocksInChunks(pageId, blocks);
}

async function getAllBlocks(pageId) {
  const blocks = [];
  let cursor;

  do {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
      page_size: 100
    });
    blocks.push(...response.results);
    cursor = response.has_more ? response.next_cursor : undefined;
  } while (cursor);

  return blocks;
}

async function appendBlocksInChunks(pageId, blocks) {
  const chunkSize = 100;
  for (let i = 0; i < blocks.length; i += chunkSize) {
    const chunk = blocks.slice(i, i + chunkSize);
    await notion.blocks.children.append({
      block_id: pageId,
      children: chunk
    });
  }
}

main().catch((error) => {
  console.error('Sync failed:', error);
  process.exit(1);
});
