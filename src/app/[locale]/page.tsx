"use client";

import { Container, Stack} from "@mui/material";
import useFileUpload from "@/lib/hooks/useFileUpload";
import AdvantageSection from "../components/Advantage";
import FileUpload from "../components/FileUpload";
import ProcessSteps from "../components/Process";
import OrderDetails from "../components/OrderDetails";
import ExampleSlider from "../components/ExampleWorks";
import WhatsAppButton from "../components/WpButton";
import { useCart } from "@/app/context/CartContext";
import { ArcadeEmbed } from "../components/Arcade";


const HomePage = () => {
  const { uploadedFiles, setUploadedFiles } = useFileUpload();
  const { addToCart } = useCart(); 

  const handleAddToCart = (file: File, productDetails: { material: string; thickness: string; quantity: number; note?: string }) => {
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
    <Container maxWidth="xl">
      <Stack spacing={4} sx={{ mt: 4 }}>
            {uploadedFiles.length === 0 ? (
              <>
                <FileUpload
                  onFileUpload={(files) => {
                    setUploadedFiles(files);

                  }}
                />
        
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
  );
};

export default HomePage;
