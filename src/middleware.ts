import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  
  const accept = context.request.headers.get("Accept") || "";
  
  // If agent requests markdown and the response is HTML
  if (accept.includes("text/markdown") && response.headers.get("content-type")?.includes("text/html")) {
    const html = await response.text();
    
    // Very basic HTML to Markdown naive conversion for agent discovery
    let markdown = html
      .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '') // Remove head
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '') // Remove scripts
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '') // Remove styles
      .replace(/<h([1-6])[^>]*>(.*?)<\/h\1>/gi, (match, level, content) => {
        return `\n${'#'.repeat(parseInt(level, 10))} ${content.replace(/<[^>]+>/g, '').trim()}\n`;
      }) // Headers
      .replace(/<p[^>]*>(.*?)<\/p>/gi, (match, content) => `\n${content.replace(/<[^>]+>/g, '').trim()}\n`) // Paragraphs
      .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)') // Links
      .replace(/<li[^>]*>(.*?)<\/li>/gi, (match, content) => `\n- ${content.replace(/<[^>]+>/g, '').trim()}`) // List items
      .replace(/<[^>]+>/g, ' ') // Strip remaining tags
      .replace(/\n\s+\n/g, '\n\n') // Clean up whitespace
      .replace(/ {2,}/g, ' ')
      .trim();
      
    if (!markdown) {
      markdown = "# Markdown Version\n\nPage content not easily convertible.";
    }

    const newResponse = new Response(markdown, {
      status: response.status,
      headers: new Headers(response.headers)
    });
    
    newResponse.headers.set("Content-Type", "text/markdown");
    newResponse.headers.set("X-Markdown-Tokens", Math.round(markdown.length / 4).toString());
    
    return newResponse;
  }

  return response;
});
