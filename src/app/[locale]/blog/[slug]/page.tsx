import BlogPostPage from './view';
import { getMessages } from 'next-intl/server';
import { Locale } from '@/i18n';

export const generateMetadata = async (props: any) => {
  const { slug, locale } = props.params as { slug: string; locale: Locale };

  const messages = await getMessages({ locale });

  // Blog yazıları t("posts") -> array
  const posts = ((messages as any).Blog?.posts ?? []) as Array<{
    slug: string;
    title: string;
    excerpt: string;
  }>;

  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Blog | 2dtocut',
      description: 'Explore insights and updates on CNC laser cutting.',
    };
  }

  const base = 'https://2dtocut-v2.vercel.app';
  const path = `${base}/${locale}/blog/${slug}`;

  return {
    title: `${post.title} | 2dtocut Blog`,
    description: post.excerpt,
    alternates: {
      canonical: path,
      languages: {
        en: `https://www.2dtocut.com/en/blog/${slug}`,
        tr: `https://www.2dtocut.com/tr/blog/${slug}`,
        'x-default': `https://www.2dtocut.com/en/blog/${slug}`,
      },
    },
  };
};

export default function BlogPostPageWrapper() {
  return <BlogPostPage />;
}
