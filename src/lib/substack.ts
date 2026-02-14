import { XMLParser } from 'fast-xml-parser';

export interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  excerpt: string;
}

export async function fetchSubstackPosts(feedUrl: string): Promise<SubstackPost[]> {
  try {
    const response = await fetch(feedUrl);
    if (!response.ok) return [];

    const xml = await response.text();
    const parser = new XMLParser({ ignoreAttributes: false });
    const parsed = parser.parse(xml);

    const items = parsed?.rss?.channel?.item;
    if (!items) return [];

    const posts = Array.isArray(items) ? items : [items];

    return posts.map((item: any) => ({
      title: item.title ?? '',
      link: item.link ?? '',
      pubDate: item.pubDate ?? '',
      excerpt: stripHtml(item.description ?? '').slice(0, 200),
    }));
  } catch {
    return [];
  }
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}
