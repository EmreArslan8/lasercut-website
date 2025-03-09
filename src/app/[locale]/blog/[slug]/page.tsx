"use client";

import { useParams, notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { Box, Container, Typography } from "@mui/material";

const BlogPostPage = () => {
  const { slug } = useParams() as { slug: string };
  const t = useTranslations("Blog");

  const posts = t.raw("posts") as Array<{
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    date: string;
  }>;

  const post = posts.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <Container sx={{ py: 10 }}>
      <Typography variant="h2" gutterBottom>
        {post.title}
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {post.date}
      </Typography>
      <Typography variant="body1" sx={{ mt: 4 }}>
        {post.content}
      </Typography>
    </Container>
  );
};

export default BlogPostPage;
