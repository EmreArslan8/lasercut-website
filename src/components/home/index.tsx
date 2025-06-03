"use client";

import CustomBanner from "@/components/CustomBanner";
import ExampleSlider from "@/components/ExampleWorks";
import FeatureSection from "@/components/FeatureSection";
import FileUpload from "@/components/FileUpload";
import ServicesSection from "@/components/ServiceSection";
import WhatsAppButton from "@/components/WpButton";
import useFileUpload from "@/hooks/useFileUpload";
import Stack from "@mui/material/Stack";

const HomePage = () => {
  const { uploadedFiles, setUploadedFiles } = useFileUpload();
  return (
    <Stack sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <CustomBanner />

      <FileUpload
        onFileUpload={(files) => {
          setUploadedFiles(files);
        }}
        files={uploadedFiles}
        setUploadedFiles={setUploadedFiles}
      />

      <FeatureSection />
      <ServicesSection />
      <ExampleSlider />
      <WhatsAppButton />
    </Stack>
  );
};

export default HomePage;
