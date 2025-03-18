"use client";

import React, { useState } from "react";
import { Stack, Box, Typography } from "@mui/material";
import PhotoAlbum, { RenderPhotoProps } from "react-photo-album";
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
    src: "/static/images/example1.webp",
    width: 1600,
    height: 1200,
    alt: "Example 1",
  },
  {
    src: "/static/images/example2.webp",
    width: 848,
    height: 862,
    alt: "Example 2",
  },
  {
    src: "/static/images/example3.webp",
    width: 1200,
    height: 1600,
    alt: "Example 3",
  },
  {
    src: "/static/images/example4.webp",
    width: 1600,
    height: 1200,
    alt: "Example 4",
  },
  {
    src: "/static/images/example5.webp",
    width: 1200,
    height: 1600,
    alt: "Example 5",
  },
  {
    src: "/static/images/example6.webp",
    width: 750,
    height: 750,
    alt: "Example 6",
  },
  {
    src: "/static/images/example7.webp",
    width: 1600,
    height: 1200,
    alt: "Example 7",
  },
  {
    src: "/static/images/example8.webp",
    width: 1600,
    height: 1200,
    alt: "Example 8",
  },
  {
    src: "/static/images/example9.webp",
    width: 1200,
    height: 1600,
    alt: "Example 9",
  },
  {
    src: "/static/images/example10.webp",
    width: 1200,
    height: 1600,
    alt: "Example 10",
  },
  {
    src: "/static/images/example11.webp",
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
    src: "/static/images/example13.webp",
    width: 1080,
    height: 1920,
    alt: "Example 13",
  },
  {
    src: "/static/images/example14.webp",
    width: 1080,
    height: 1920,
    alt: "Example 14",
  },
  {
    src: "/static/images/example15.webp",
    width: 1080,
    height: 1920,
    alt: "Example 15",
  },
  {
    src: "/static/images/example16.webp",
    width: 899,
    height: 1599,
    alt: "Example 16",
  },
  {
    src: "/static/images/example17.webp",
    width: 899,
    height: 1599,
    alt: "Example 17",
  },
  {
    src: "/static/images/example18.webp",
    width: 1200,
    height: 1600,
    alt: "Example 18",
  },
  {
    src: "/static/images/example19.webp",
    width: 899,
    height: 1599,
    alt: "Example 19",
  },
  {
    src: "/static/images/example20.webp",
    width: 1200,
    height: 1600,
    alt: "Example 20",
  },
  {
    src: "/static/images/example21.webp",
    width: 1599,
    height: 899,
    alt: "Example 21",
  },
  {
    src: "/static/images/example22.webp",
    width: 1200,
    height: 1600,
    alt: "Example 22",
  },
  {
    src: "/static/images/example23.webp",
    width: 1200,
    height: 1600,
    alt: "Example 23",
  },
  {
    src: "/static/images/example24.webp",
    width: 1599,
    height: 899,
    alt: "Example 24",
  },
  {
    src: "/static/images/example25.webp",
    width: 1200,
    height: 1600,
    alt: "Example 25",
  },
  {
    src: "/static/images/example26.webp",
    width: 899,
    height: 1599,
    alt: "Example 26",
  },
  {
    src: "/static/images/example27.webp",
    width: 1600,
    height: 1200,
    alt: "Example 27",
  },
  {
    src: "/static/images/example28.webp",
    width: 899,
    height: 1599,
    alt: "Example 28",
  },
  {
    src: "/static/images/example29.webp",
    width: 1200,
    height: 1600,
    alt: "Example 29",
  },
  {
    src: "/static/images/example30.webp",
    width: 1600,
    height: 1200,
    alt: "Example 30",
  },
  {
    src: "/static/images/example31.webp",
    width: 899,
    height: 1599,
    alt: "Example 31",
  },
];

const PhotoGallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const t = useTranslations("ExamplePage");

  const handlePhotoClick = (index: number) => {
    setLightboxIndex(index);
  };

  const renderPhoto = ({
    photo,
    wrapperStyle,
  }: RenderPhotoProps<{
    src: string;
    width: number;
    height: number;
    alt: string;
  }>) => {
    const index = photos.findIndex((p) => p.src === photo.src);

    return (
      <Box
        style={{
          ...wrapperStyle,
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
        }}
        sx={{ aspectRatio: `${photo.width} / ${photo.height}`, minHeight: 150 }} // CLS azaltır
        onClick={() => handlePhotoClick(index)} // Tıklama eventi burada
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          priority={index < 4}
          fetchPriority={index < 4 ? "high" : "low"}
          loading={index < 4 ? "eager" : "lazy"}
          style={{ objectFit: "cover", width: "100%", height: "auto" }}
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Box>
    );
  };

  return (
    <Stack
      spacing={3}
      sx={{ maxWidth: "lg", mx: "auto", px: 2, py: 4, mb: 10, mt: 20 }}
    >
      <Typography
        component="p"
        variant="h2"
        textAlign="center"
        suppressHydrationWarning
      >
        {t("title")}
      </Typography>

      <Typography variant="body1" textAlign="center" sx={{ mb: 4 }}>
        {t("description")}
      </Typography>

      {/* Photo Album */}
      <PhotoAlbum
        photos={photos}
        layout="rows"
        renderPhoto={renderPhoto}
        defaultContainerWidth={1200}
        onClick={({ index }) => {
          handlePhotoClick(index);
        }}
      />

      {lightboxIndex !== null && (
        <Lightbox
          open={lightboxIndex !== null}
          close={() => {
            setLightboxIndex(null);
          }}
          slides={photos.map((photo) => ({ src: photo.src, alt: photo.alt }))}
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
