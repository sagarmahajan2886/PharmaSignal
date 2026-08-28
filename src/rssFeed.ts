import { ALL_ARTICLES } from './articlesData';

function parseDateToRFC822(dateStr: string): string {
  try {
    let clean = dateStr.trim();
    if (/^[A-Za-z]+ \d{4}$/.test(clean)) {
      clean = `${clean.split(' ')[0]} 01, ${clean.split(' ')[1]}`;
    }
    const d = new Date(clean);
    if (!isNaN(d.getTime())) {
      return d.toUTCString();
    }
  } catch (e) {
    // fallback
  }
  return new Date().toUTCString();
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

export function generateRssXml(baseUrl: string = 'https://pharmasignal.com'): string {
  const siteUrl = baseUrl.replace(/\/$/, '');
  const feedUrl = `${siteUrl}/rss.xml`;
  const buildDate = new Date().toUTCString();

  const itemsXml = ALL_ARTICLES.map((article) => {
    const itemPath = article.isDealSignal 
      ? `/deal-signals/${article.id}` 
      : `/explainers/${article.id}`;
    const itemUrl = `${siteUrl}${itemPath}`;
    const pubDate = parseDateToRFC822(article.date || 'August 2026');
    
    // Construct rich text for RSS readers / LinkedIn ingestors
    const takeText = article.pharmaSignalTake ? `\n\nPharmaSignal Take: ${article.pharmaSignalTake}` : '';
    const mechanismText = article.mechanism ? ` [Mechanism: ${article.mechanism}]` : '';
    const rawDescription = `${article.featuredSummary || article.description}${mechanismText}${takeText}`;

    return `    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${itemUrl}</link>
      <guid isPermaLink="true">${itemUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>${escapeXml(article.author || 'PharmaSignal Deal Desk')}</author>
      <category><![CDATA[${article.category || 'Deal Signals'}]]></category>
      <description><![CDATA[${rawDescription}]]></description>
    </item>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>PharmaSignal — Biopharma Decision Intelligence &amp; Deal Signals</title>
    <link>${siteUrl}</link>
    <description>Independent decision intelligence, deal mechanics, and strategic execution analysis for biopharma BD, licensing, and portfolio leaders.</description>
    <language>en-us</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <image>
      <url>${siteUrl}/apple-touch-icon.png</url>
      <title>PharmaSignal</title>
      <link>${siteUrl}</link>
    </image>
${itemsXml}
  </channel>
</rss>`;
}

export function generateJsonFeed(baseUrl: string = 'https://pharmasignal.com') {
  const siteUrl = baseUrl.replace(/\/$/, '');
  return {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'PharmaSignal — Biopharma Decision Intelligence & Deal Signals',
    home_page_url: siteUrl,
    feed_url: `${siteUrl}/feed.json`,
    description: 'Independent decision intelligence, deal mechanics, and strategic execution analysis for biopharma BD, licensing, and portfolio leaders.',
    items: ALL_ARTICLES.map((article) => {
      const itemPath = article.isDealSignal 
        ? `/deal-signals/${article.id}` 
        : `/explainers/${article.id}`;
      return {
        id: `${siteUrl}${itemPath}`,
        url: `${siteUrl}${itemPath}`,
        title: article.title,
        summary: article.featuredSummary || article.description,
        date_published: new Date(parseDateToRFC822(article.date || 'August 2026')).toISOString(),
        author: {
          name: article.author || 'PharmaSignal Deal Desk',
        },
        tags: article.tags || [article.category],
      };
    }),
  };
}
