"use client";

import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import styles from "./styles";
import Link from "../common/Link";


const blogPosts = [
    {
        id: "1",
        "title": "How to Easy Engineering",
        "slug": "how-to-easy-engineering",
       "image": "/static/images/cnc1.jpg",
        "excerpt": "Discover simple steps to streamline your engineering processes and increase efficiency.",
        "content": "Engineering doesn't have to be complicated. With the right tools and methodologies, you can simplify your workflow and achieve better results.",
        "date": "March 4, 2024"
      },
      {
        id: "2",
        "title": "The Future of Laser Cutting",
        "slug": "the-future-of-laser-cutting",
        "image": "/static/images/cnc1.jpg",
        "excerpt": "Explore how laser cutting is transforming industries with precision and speed.",
        "content": "Laser cutting technology is advancing rapidly, enabling manufacturers to create complex designs with unprecedented accuracy.",
        "date": "February 20, 2024"
      },
      {
        id: "3",
        "title": "Maximizing Productivity in Fabrication",
        "slug": "maximizing-productivity-in-fabrication",
        "image": "/static/images/cnc1.jpg",
        "excerpt": "Boost your fabrication process with these expert tips and techniques.",
        "content": "Optimizing your fabrication process is key to staying competitive. Reduce waste, save time, and deliver top-quality results.",
        "date": "January 15, 2024"
      }
    
];

const BlogPost = () => {
  return (
    <Box sx={styles.wrapper}>
      <Container>
        <Typography variant="h6" sx={styles.subTitle}>
          BLOG POST
        </Typography>
        <Typography variant="h3" sx={styles.title}>
          READ OUR BLOG
        </Typography>
        <Typography variant="body1" sx={styles.desc}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
          tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
        </Typography>

        <Grid container spacing={4}>
          {blogPosts.map((post) => (
            <Grid key={post.id} item xs={12} md={4}>
              <Box>
                <Box sx={styles.imageWrapper}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </Box>
                <Typography variant="h6" sx={styles.cardTitle}>
                  {post.title}
                </Typography>
                <Typography variant="body2" sx={styles.cardDesc}>
                  {post.excerpt}
                </Typography>
                <Link href={`/blog/${post.slug}`}>
                  <Button variant="text" sx={styles.readMoreButton}>
                    Read More
                  </Button>
                </Link>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default BlogPost;
