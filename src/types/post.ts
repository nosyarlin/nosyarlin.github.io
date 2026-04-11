export type PostMeta = {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  tags: string[];
  cover?: string;
  featured?: boolean;
  draft?: boolean;
  readMinutes?: number;
};
