"use client";

import { useParams, notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { Box, Container, Typography, Grid, Paper } from "@mui/material";
import Image from "next/image";

const BlogPostPage = () => {
  const { slug } = useParams() as { slug: string };
  const t = useTranslations("Blog");

  const posts = t.raw("posts") as Array<{
    title: string;
    slug: string;
    excerpt: string;
    content: string[];
    date: string;
    mainImage: string;
    rightImage: string;
    leftImage: string;
    highlight: string;
    highlightContent: string;
    leftImageCaption: string;
    rightImageCaption: string;
    belowImagesText: string[];
  }>;

  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <Container sx={{ py: 20 }}>
      {/* Başlık ve Tarih */}
      <Typography variant="h1" fontWeight="bold">
        {post.title}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
        {post.date}
      </Typography>

      {/* Ana Görsel ve Metin */}
      <Grid container spacing={4}>
        {/* Ana Görsel (Mobilde Üstte) */}
        <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
          <Image
            src={post.mainImage}
            alt={post.title}
            width={600}
            height={400}
            style={{ width: "100%", height: "auto", maxHeight: "400px", objectFit: "cover" }}
          />
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          order={{ xs: 2, md: 1 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {post.content.map((paragraph, index) => (
            <Typography
              key={index}
              variant="body1"
              sx={{ lineHeight: 1.8, mb: 2 }}
            >
              {paragraph}
            </Typography>
          ))}
        </Grid>
      </Grid>

      {/* Highlight Box */}
      <Paper
        elevation={3}
        sx={{
          mt: 5,
          py: 3,
          px: 4,
          backgroundColor: "#f5f5f5",
          borderLeft: "5px solid #1976d2",
        }}
      >
        <Typography variant="h6" fontWeight="bold" color="primary">
          {post.highlight}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {post.highlightContent}
        </Typography>
      </Paper>

      {/* Alt Görseller */}
      <Grid container spacing={2} sx={{ mt: 5 }}>
        <Grid item xs={12} md={6}>
          <Image
            src={post.leftImage}
            alt="Left Image"
            width={500}
            height={300}
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
          />
          <Typography
            variant="caption"
            display="block"
            textAlign="center"
            sx={{ mt: 1, fontSize: "14px", color: "gray", fontStyle: "italic" }}
          >
            {post.leftImageCaption}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Image
            src={post.rightImage}
            alt="Right Image"
            width={500}
            height={300}
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
          />
          <Typography
            variant="caption"
            display="block"
            textAlign="center"
            sx={{ mt: 1, fontSize: "14px", color: "gray", fontStyle: "italic" }}
          >
            {post.rightImageCaption}
          </Typography>
        </Grid>
      </Grid>

      {/* İki Resmin Altındaki Genel Yazılar */}
      <Box sx={{ mt: 5 }}>
        {post.belowImagesText.map((paragraph, index) => (
          <Typography
            key={index}
            variant="body1"
            sx={{ lineHeight: 1.8, mb: 2 }}
          >
            {paragraph}
          </Typography>
        ))}
      </Box>
    </Container>
  );
};

export default BlogPostPage;
