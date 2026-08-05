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
  isDraft?: boolean;
  mechanism?: string;
  pharmaSignalTake?: string;
  pharmaSignalRead?: string;
  sourceUrl?: string;
  sourceLabel?: string;
  useThisWhen?: string;
  linkedExplainers?: LinkedExplainer[];
  tags?: string[];
  sourceNote?: string;
  imageUrl?: string;
  shortTitle?: string;
}

export type ActiveTab = 'HOME' | 'EXPLAINERS' | 'DEAL SIGNALS' | 'LENSES' | 'ABOUT' | 'NEWSLETTER';

export interface NewsletterSubscriber {
  email: string;
  timestamp: string;
}

