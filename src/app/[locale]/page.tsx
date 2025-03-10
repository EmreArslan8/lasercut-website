"use client";

import { Stack, Box } from "@mui/material";
import useFileUpload from "@/lib/hooks/useFileUpload";
import CustomBanner from "@/components/CustomBanner";
import ExampleSlider from "@/components/ExampleWorks";
import WhatsAppButton from "@/components/WpButton";
import FileUpload from "@/components/FileUpload";
import FeatureSection from "@/components/FeatureSection";
import AdvantageSection from "@/components/AdvantageSection";
import ServicesSection from "@/components/ServiceSection";
import HeroSection from "@/components/HeroSection";
import Archivements from "@/components/Archivements";
import MaterialListSection from "@/components/MaterialSection";
import Arcade from "@/components/Arcade/index";
import BlogPost from "@/components/Blogs";

const HomePage = () => {
  const { uploadedFiles, setUploadedFiles } = useFileUpload();

  return (
    <Stack sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Box sx={{ backgroundColor: "#fff", mb: 4 }}>
        <CustomBanner />
      </Box>

      <Box sx={{ mb: 4, px: 2, display: "flex", justifyContent: "center" }}>
        <FileUpload
          onFileUpload={(files) => {
            setUploadedFiles(files);
          }}
          files={uploadedFiles}
          setUploadedFiles={setUploadedFiles}
        />
      </Box>
      <FeatureSection />
      <Arcade />
      <ServicesSection />
      <HeroSection />
      <Archivements />
      <MaterialListSection />
      <AdvantageSection />
      <ExampleSlider />
      <BlogPost />
      <WhatsAppButton />
    </Stack>
  );
};

export default HomePage;
