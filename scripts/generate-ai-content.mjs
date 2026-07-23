import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distClientDir = path.resolve(__dirname, '../dist/client');

if (!fs.existsSync(distClientDir)) {
  console.log(`Directory ${distClientDir} does not exist. Skipping AI content generation.`);
  process.exit(0);
}

function htmlToMarkdown(html) {
  let markdown = html
    .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<svg[^>]*>[\s\S]*?<\/svg>/gi, '')
    .replace(/<h([1-6])[^>]*>(.*?)<\/h\1>/gi, (match, level, content) => {
      return `\n${'#'.repeat(parseInt(level, 10))} ${content.replace(/<[^>]+>/g, '').trim()}\n`;
    })
    .replace(/<p[^>]*>(.*?)<\/p>/gi, (match, content) => `\n${content.replace(/<[^>]+>/g, '').trim()}\n`)
    .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, (match, href, text) => {
      const cleanText = text.replace(/<[^>]+>/g, '').trim();
      return cleanText ? `[${cleanText}](${href})` : '';
    })
    .replace(/<li[^>]*>(.*?)<\/li>/gi, (match, content) => `\n- ${content.replace(/<[^>]+>/g, '').trim()}`)
    .replace(/<[^>]+>/g, ' ')
    .replace(/\n\s+\n/g, '\n\n')
    .replace(/ {2,}/g, ' ')
    .trim();

  return markdown || "# Content\n\nNo text content extracted.";
}

function htmlToPlainText(html) {
  const md = htmlToMarkdown(html);
  return md
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)')
    .replace(/^#+\s+/gm, '')
    .replace(/^-\s+/gm, '• ');
}

function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name !== '_astro' && entry.name !== 'assets') {
        processDirectory(fullPath);
      }
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      const htmlContent = fs.readFileSync(fullPath, 'utf-8');
      
      const mdContent = htmlToMarkdown(htmlContent);
      const txtContent = htmlToPlainText(htmlContent);

      const baseName = entry.name === 'index.html' && dir === distClientDir
        ? 'index'
        : entry.name.replace(/\.html$/, '');

      const mdPath = path.join(dir, `${baseName}.md`);
      const txtPath = path.join(dir, `${baseName}.txt`);

      fs.writeFileSync(mdPath, mdContent, 'utf-8');
      fs.writeFileSync(txtPath, txtContent, 'utf-8');

      console.log(`Generated AI formats for ${path.relative(distClientDir, fullPath)} -> .md, .txt`);
    }
  }
}

console.log('Generating AI markdown & text files from dist/client HTML output...');
processDirectory(distClientDir);
console.log('AI content generation complete!');
