export interface Article {
  id: string;
  category: string;
  title: string;
  description: string;
  meta: string;
  content: string;
  author: string;
  readTime: string;
  date: string;
  featuredSummary: string;
}

export type ActiveTab = 'HOME' | 'EXPLAINERS' | 'ABOUT';

export interface NewsletterSubscriber {
  email: string;
  timestamp: string;
}
