export interface LinkedExplainer {
  id: string;
  title: string;
}

export interface Article {
  id: string;
  category: string;
  title: string;
  subtitle?: string;
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
  sourceOrg?: string;
  sourceTitle?: string;
  sourceDate?: string;
  useThisWhen?: string;
  linkedExplainers?: LinkedExplainer[];
  tags?: string[];
  sourceNote?: string;
  imageUrl?: string;
  imageUrlLight?: string;
  imageUrlDark?: string;
  imageAlt?: string;
  shortTitle?: string;
  assetClass?: string;
  dealStructure?: string;
  geographicScope?: string;
  principleQuote?: string;
  hideFromHomepage?: boolean;
}

export type ActiveTab = 'HOME' | 'EXPLAINERS' | 'DEAL SIGNALS' | 'LENSES' | 'ABOUT' | 'NEWSLETTER' | '404';

export interface NewsletterSubscriber {
  email: string;
  timestamp: string;
}

