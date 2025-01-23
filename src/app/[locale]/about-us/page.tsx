"use client";

import { Box, Grid2, Typography } from "@mui/material";
import Image from "next/image";
import { useTranslations } from "next-intl";

const AboutUs = () => {
  const t = useTranslations("aboutUsPage");

  return (
    <Box sx={{ maxWidth: "lg", mx: "auto", px: 2, py: 6 }}>
      {/* Page Title */}
      <Typography
        variant="h1"
        textAlign="center"
        sx={{ mb: 8 }}
      >
        {t("title")}
      </Typography>

      {/* About Us Section */}
      <Grid2 container spacing={8}>
        <Grid2 size= {{xs:12, sm: 6}}>
          <Typography
            variant="h3"
            sx={{ mb: 3 }}
          >
            {t("aboutUsTitle")}
          </Typography>
          <Typography
            fontSize={18}
   
            dangerouslySetInnerHTML={{ __html: t("aboutUsText1") }}
            sx={{ mb: 5 }}
          />
          <Typography
            fontSize={18}
            dangerouslySetInnerHTML={{ __html: t("aboutUsText2") }}
            sx={{mt: 2}}
          />
        </Grid2>
        <Grid2 size= {{xs:12, sm: 6}}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "500px",
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: 2,
            }}
          >
            <Image
              src="/static/images/banner5.avif"
              alt={t("aboutUsTitle")}
              layout="fill"
              objectFit="cover"
            />
          </Box>
        </Grid2>
      </Grid2>

      {/* Our Approach Section */}
      <Grid2 container spacing={8} sx={{ mt: 12 }}>
      <Grid2 size= {{xs:12, sm: 6}}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "500px",
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: 2,
            }}
          >
            <Image
              src="/static/images/about-us-2.webp"
              alt={t("approachTitle")}
              layout="fill"
              objectFit="cover"
            />
          </Box>
        </Grid2>
        <Grid2 size= {{xs:12, sm: 6}}>
          <Typography
            variant="h2"
            fontWeight="bold"
            gutterBottom
            sx={{ mb: 3 }}
          >
            {t("approachTitle")}
          </Typography>
          <Typography
            fontSize={18}
           
            sx={{ mb: 5 }}
          >
            {t("approachText1")}
          </Typography>
          <Typography fontSize={18} sx={{ mt: 2 }}>{t("approachText2")}</Typography>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default AboutUs;
