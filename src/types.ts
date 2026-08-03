export interface LinkedExplainer {
  id: string;
  title: string;
}

export interface Article {
  id: string;
  category: string;
  title: string;
  description: string;
  meta: string;
  author: string;
  readTime: string;
  date: string;
  featuredSummary: string;
  content: string;
  isDealSignal?: boolean;
  pharmaSignalRead?: string;
  useThisWhen?: string;
  linkedExplainers?: LinkedExplainer[];
  tags?: string[];
  sourceNote?: string;
}

export type ActiveTab = 'HOME' | 'EXPLAINERS' | 'DEAL SIGNALS' | 'ABOUT' | 'NEWSLETTER';

export interface NewsletterSubscriber {
  email: string;
  timestamp: string;
}

