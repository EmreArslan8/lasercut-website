'use client';

import { Container, Stack, Box, useMediaQuery } from "@mui/material";
import useFileUpload from "@/lib/hooks/useFileUpload";
import AdvantageSection from "../components/Advantage";
import FileUpload from "../components/FileUpload";
import ProcessSteps from "../components/Process";
import OrderDetails from "../components/OrderDetails";
import ExampleSlider from "../components/ExampleWorks";
import WhatsAppButton from "../components/WpButton";
import { useCart } from "@/app/context/CartContext";
import { ArcadeEmbed } from "../components/Arcade";
import BannerSlider from "../components/Banner";

const HomePage = () => {
  const { uploadedFiles, setUploadedFiles } = useFileUpload();
  const { addToCart } = useCart();

  const isMobile = useMediaQuery('(max-width:600px)');

  const handleAddToCart = (file: File, productDetails: { material: string; thickness: string; quantity: number; coating: string; note?: string }) => {
    const cartItem = {
      fileName: file.name,
      file,
      ...productDetails,
    };
    addToCart(cartItem);
  };

  const handleClearFiles = () => {
    setUploadedFiles([]);
  };

  return (
    <Stack sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", mt: 1 }}>
      {isMobile ? (
        <>
          {/* Mobil Tasarım: Slider ve Dosya Yükleme Alt Alta */}
          <Box sx={{ backgroundColor: "#fff", mb: 4 }}>
            <BannerSlider />
          </Box>
          <Box sx={{ mb: 4, px: 2 }}>
            <FileUpload
              onFileUpload={(files) => {
                setUploadedFiles(files);
              }}
            />
          </Box>
        </>
      ) : (
        <Box sx={{ position: "relative", backgroundColor: "#fff" }}>
          {/* Masaüstü Tasarım: Slider ve Dosya Yükleme Birlikte */}
          <BannerSlider />
          <Box
            sx={{
              position: "absolute",
              top: "85%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
              zIndex: 10,
            }}
          >
            <FileUpload
              onFileUpload={(files) => {
                setUploadedFiles(files);
              }}
            />
          </Box>
        </Box>
      )}
      <Container>
        <Stack spacing={14} sx={{ mt: isMobile ? 4 : 25 }}>
          {uploadedFiles.length === 0 ? (
            <>
              <ProcessSteps />
              <ArcadeEmbed />
              <ExampleSlider />
              <AdvantageSection />
              <WhatsAppButton />
            </>
          ) : (
            <OrderDetails files={uploadedFiles} onAddToCart={handleAddToCart} onClose={handleClearFiles} />
          )}
        </Stack>
      </Container>
    </Stack>
  );
};

export default HomePage;
