import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getBlogPosts } from '../utils/sanity';

export const GET: APIRoute = async (context) => {
  const posts = await getBlogPosts();
  return rss({
    title: 'Little Wise Kids Blog',
    description: 'Childcare news, early years guidance, parenting ideas, nutrition advice and community updates from Little Wise Kids in Bristol BS5.',
    site: context.site ?? 'https://littlewisekids.co.uk',
    items: posts.map((post) => ({
      title: post.title,
      pubDate: new Date(post.publishedAt),
      description: post.excerpt,
      link: `/blog/${post.slug.current}`,
    })),
    customData: `<language>en-gb</language>`,
  });
};
