import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const accept = context.request.headers.get("accept") || context.request.headers.get("Accept") || "";
  
  const response = await next();
  
  // If agent requests markdown
  if (accept.includes("text/markdown")) {
    const html = await response.text();
    
    let markdown = html
      .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '') // Remove head
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '') // Remove scripts
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '') // Remove styles
      .replace(/<h([1-6])[^>]*>(.*?)<\/h\1>/gi, (match, level, content) => {
        return `\n${'#'.repeat(parseInt(level, 10))} ${content.replace(/<[^>]+>/g, '').trim()}\n`;
      })
      .replace(/<p[^>]*>(.*?)<\/p>/gi, (match, content) => `\n${content.replace(/<[^>]+>/g, '').trim()}\n`)
      .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
      .replace(/<li[^>]*>(.*?)<\/li>/gi, (match, content) => `\n- ${content.replace(/<[^>]+>/g, '').trim()}`)
      .replace(/<[^>]+>/g, ' ')
      .replace(/\n\s+\n/g, '\n\n')
      .replace(/ {2,}/g, ' ')
      .trim();
      
    if (!markdown) {
      markdown = "# Markdown Version\n\nPage content not easily convertible.";
    }

    return new Response(markdown, {
      status: response.status,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "X-Markdown-Tokens": Math.round(markdown.length / 4).toString(),
        "Vary": "Accept"
      }
    });
  }

  return response;
});
