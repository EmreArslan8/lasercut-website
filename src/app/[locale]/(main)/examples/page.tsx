"use client";

import React, { useState } from "react";
import { Stack, Box, Typography } from "@mui/material";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
import { useTranslations } from "next-intl";
import Image from "next/image";

const photos = [
  {
    src: "/static/images/example1.jpeg",
    width: 1600,
    height: 1200,
    alt: "Example 1",
  },
  {
    src: "/static/images/example2.jpeg",
    width: 848,
    height: 862,
    alt: "Example 2",
  },
  {
    src: "/static/images/example3.jpeg",
    width: 1200,
    height: 1600,
    alt: "Example 3",
  },
  {
    src: "/static/images/example4.jpeg",
    width: 1600,
    height: 1200,
    alt: "Example 4",
  },
  {
    src: "/static/images/example5.jpeg",
    width: 1200,
    height: 1600,
    alt: "Example 5",
  },
  {
    src: "/static/images/example6.jpeg",
    width: 750,
    height: 750,
    alt: "Example 6",
  },
  {
    src: "/static/images/example7.jpeg",
    width: 1600,
    height: 1200,
    alt: "Example 7",
  },
  {
    src: "/static/images/example8.jpeg",
    width: 1600,
    height: 1200,
    alt: "Example 8",
  },
  {
    src: "/static/images/example9.jpeg",
    width: 1200,
    height: 1600,
    alt: "Example 9",
  },
  {
    src: "/static/images/example10.jpeg",
    width: 1200,
    height: 1600,
    alt: "Example 10",
  },
  {
    src: "/static/images/example11.jpeg",
    width: 1200,
    height: 1600,
    alt: "Example 11",
  },
  {
    src: "/static/images/example12.jpg",
    width: 1600,
    height: 1200,
    alt: "Example 12",
  },
  {
    src: "/static/images/example13.jpeg",
    width: 1080,
    height: 1920,
    alt: "Example 13",
  },
  {
    src: "/static/images/example14.jpeg",
    width: 1080,
    height: 1920,
    alt: "Example 14",
  },
  {
    src: "/static/images/example15.jpeg",
    width: 1080,
    height: 1920,
    alt: "Example 15",
  },
  {
    src: "/static/images/example16.jpeg",
    width: 899,
    height: 1599,
    alt: "Example 16",
  },
  {
    src: "/static/images/example17.jpeg",
    width: 899,
    height: 1599,
    alt: "Example 17",
  },
  {
    src: "/static/images/example18.jpeg",
    width: 1200,
    height: 1600,
    alt: "Example 18",
  },
  {
    src: "/static/images/example19.jpeg",
    width: 899,
    height: 1599,
    alt: "Example 19",
  },
  {
    src: "/static/images/example20.jpeg",
    width: 1200,
    height: 1600,
    alt: "Example 20",
  },
  {
    src: "/static/images/example21.jpeg",
    width: 1599,
    height: 899,
    alt: "Example 21",
  },
  {
    src: "/static/images/example22.jpeg",
    width: 1200,
    height: 1600,
    alt: "Example 22",
  },
  {
    src: "/static/images/example23.jpeg",
    width: 1200,
    height: 1600,
    alt: "Example 23",
  },
  {
    src: "/static/images/example24.jpeg",
    width: 1599,
    height: 899,
    alt: "Example 24",
  },
  {
    src: "/static/images/example25.jpeg",
    width: 1200,
    height: 1600,
    alt: "Example 25",
  },
  {
    src: "/static/images/example26.jpeg",
    width: 899,
    height: 1599,
    alt: "Example 26",
  },
  {
    src: "/static/images/example27.jpeg",
    width: 1600,
    height: 1200,
    alt: "Example 27",
  },
  {
    src: "/static/images/example28.jpeg",
    width: 899,
    height: 1599,
    alt: "Example 28",
  },
  {
    src: "/static/images/example29.jpeg",
    width: 1200,
    height: 1600,
    alt: "Example 29",
  },
  {
    src: "/static/images/example30.jpeg",
    width: 1600,
    height: 1200,
    alt: "Example 30",
  },
  {
    src: "/static/images/example31.jpeg",
    width: 899,
    height: 1599,
    alt: "Example 31",
  },
];

const PhotoGallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handlePhotoClick = (index: number) => {
    setLightboxIndex(index);
  };

  const t = useTranslations("ExamplePage");

  return (
    <Stack
      spacing={3}
      sx={{ maxWidth: "lg", mx: "auto", px: 2, py: 4, mb: 10, mt: 20 }}
    >
      <Typography variant="h2" textAlign="center">
        {t("title")}
      </Typography>
      <Typography variant="body1" textAlign="center" sx={{ mb: 4 }}>
        {t("description")}
      </Typography>

      {/* Full-width 24th Image */}
     

      {/* Photo Album */}
      <PhotoAlbum
        photos={photos}
        layout="rows"
        onClick={({ index }) => handlePhotoClick(index)}
      />

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          open={lightboxIndex !== null}
          close={() => setLightboxIndex(null)}
          slides={photos.map((photo) => ({
            src: photo.src,
            alt: photo.alt,
          }))}
          index={lightboxIndex}
          plugins={[Thumbnails, Zoom, Fullscreen, Slideshow]}
          thumbnails={{
            position: "bottom",
            gap: 1,
            border: 2,
            borderColor: "black",
          }}
        />
      )}
    </Stack>
  );
};

export default PhotoGallery;
