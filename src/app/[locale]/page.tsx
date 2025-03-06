"use client";

import { Container, Stack, Box, useMediaQuery } from "@mui/material";
import useFileUpload from "@/lib/hooks/useFileUpload";
import { ArcadeEmbed } from "@/components/Arcade";
import CustomBanner from "@/components/CustomBanner";
import ExampleSlider from "@/components/ExampleWorks";
import WhatsAppButton from "@/components/WpButton";
import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import Blogs from "@/components/Blogs";
import FeatureSection from "@/components/FeatureSection";
import AdvantageSection from "@/components/AdvantageSection";
import ServicesSection from "@/components/ServiceSection";
import HeroSection from "@/components/HeroSection";
import Archivements from "@/components/Archivements";
import MaterialListSection from "@/components/MaterialSection";

const HomePage = () => {
  const { uploadedFiles, setUploadedFiles } = useFileUpload();
  const isMobile = useMediaQuery("(max-width:600px)");
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Stack sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh"}}>
      {isMobile ? (
        <>
          {/* Mobil Tasarım: Slider ve Dosya Yükleme Alt Alta */}
          <Box sx={{ backgroundColor: "#fff", mb: 4 }}>
          <CustomBanner setDrawerOpen={setDrawerOpen} />
          </Box>
          <Box sx={{ mb: 4, px: 2 }}>
            <FileUpload
              onFileUpload={(files) => {
                setUploadedFiles(files);
              }}
              files={uploadedFiles}
              setUploadedFiles={setUploadedFiles} 
              drawerOpen={drawerOpen}
              setDrawerOpen={setDrawerOpen}/>
          </Box>
        </>
      ) : (
        <Box sx={{ position: "relative", backgroundColor: "#fff" }}>
          <CustomBanner setDrawerOpen={setDrawerOpen} />
            <FileUpload
              onFileUpload={(files) => {
                setUploadedFiles(files);
              }}
              files={uploadedFiles}
              setUploadedFiles={setUploadedFiles} 
              setDrawerOpen={setDrawerOpen}
              drawerOpen= {drawerOpen}
            />
          </Box>
      )}
       <FeatureSection />
              <ArcadeEmbed />
              <ServicesSection />
              <HeroSection />
              <Archivements />
             <MaterialListSection />
              <AdvantageSection />
              <ExampleSlider />
              <Blogs />
              <WhatsAppButton />
        </Stack>

  );
};

export default HomePage;
