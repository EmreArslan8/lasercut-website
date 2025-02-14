"use client";

import {
  List,
  ListItem,
  Typography,
  Box,
  Button,
  Checkbox,
  Stack,
  Card,
  IconButton,
  Modal,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import React from "react";

const MobileCart = () => {
  const { cartItems, clearCart, setCartItems } = useCart();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const { handleFormSubmit, isSubmitting } = useHandleFormSubmit(
    selectedItems,
    setSuccessOpen
  );

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleRemoveItem = (index: number) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleQuantityChange = (
    index: number,
    type: "increase" | "decrease"
  ) => {
    setCartItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index
          ? {
              ...item,
              quantity:
                type === "increase"
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  return (
    <Stack sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Sepet ({cartItems.length} Ürün)
      </Typography>

      {cartItems.length === 0 ? (
        <Stack
          spacing={3}
          alignItems="center"
          justifyContent="center"
          sx={{
            p: 4,
            borderRadius: "8px",
            textAlign: "center",
            mt: 3,
          }}
        >
          <Typography variant="h6">Sepetiniz boş</Typography>
          <Button variant="contained" color="primary" href="/" size="medium">
            Alışverişe Başla
          </Button>
        </Stack>
      ) : (
        <List sx={{ mt: 2 }}>
          {cartItems.map((item, index) => (
            <Card
              key={index}
              sx={{
                mb: 2,
                p: 2,
                borderRadius: "8px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                border: "1px solid grey.300",
                position: "relative",
              }}
            >
              {/* Ürün adı ve Checkbox */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #ddd",
                  pb: 1,
                  mb: 2,
                }}
              >
                <Typography variant="body1" fontWeight="bold">
                  {item.fileName.length > 20
                    ? `${item.fileName.substring(0, 20)}...`
                    : item.fileName}
                </Typography>
                <Checkbox
                  checked={selectedItems.includes(index)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedItems((prev) => [...prev, index]);
                    } else {
                      setSelectedItems((prev) =>
                        prev.filter((itemIndex) => itemIndex !== index)
                      );
                    }
                  }}
                />
              </Box>

           
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "3fr 1fr", 
                 
                  gap: 2,
                  width: "100%",
                }}
              >
                {/* SVG Alanı */}
                {item.svg && (
                  <Box
                    sx={{
                      width: "100%",
                      aspectRatio:
                        item.dimensions?.width && item.dimensions?.height
                          ? `${item.dimensions.width} / ${item.dimensions.height}`
                          : "1 / 1",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      minWidth: 100,
                      maxWidth: "100%", // SVG tam genişlik alsın
                    }}
                  >
                    <Box
                      dangerouslySetInnerHTML={{ __html: item.svg }}
                      sx={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                )}

                {/* Adet Seçimi ve Silme Butonu */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  {/* Adet Değiştirme */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      padding: "4px 8px",
                    }}
                  >
                    <IconButton
                      onClick={() => handleQuantityChange(index, "decrease")}
                      size="small"
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography variant="body1">{item.quantity}</Typography>
                    <IconButton
                      onClick={() => handleQuantityChange(index, "increase")}
                      size="small"
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>

                  {/* Silme Butonu - Icon ve Text Yan Yana */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      mt: 1,
                      cursor: "pointer",
                      color: "error.main",
                    }}
                    onClick={() => handleRemoveItem(index)}
                  >
                    <DeleteIcon sx={{ color: "red", fontSize: 16 }} />
                    <Typography variant="body2" fontWeight="bold" color="error">
                      REMOVE
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Ölçüler ve Malzeme Bilgileri */}
              {/* Malzeme ve Ek Hizmetler Gri Alan */}
              <Box
                sx={{
                  backgroundColor: "#f5f5f5", // Gri arka plan
                  borderRadius: "8px",
                  padding: "8px",
                  mt: 2,
                }}
              >
                <Typography variant="body2" fontWeight="bold">
                  {item.material}
                </Typography>
                <Typography fontSize={14} color="textSecondary">
                        {item.thickness}
                      </Typography>
                      {item.extraServices && (
                      <Typography fontSize={14} color="textSecondary">
                        Ek Hizmet: {item.extraServices}
                      </Typography>
                      )}
                {item.coating && (
                  <Typography fontSize={14} color="textSecondary">
                    Kaplama: {item.coating}
                  </Typography>
                )}
              </Box>

              {/* Ürün Fiyatı - Sağ Alt */}
              <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2 }}>
                <Box>
                  <Typography variant="body1" fontWeight="bold">
                    Toplam: $
                    {item.price
                      ? (Number(item.price) * item.quantity).toFixed(2)
                      : "0.00"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    ${item.price ? Number(item.price).toFixed(2) : "0.00"} / adet
                  </Typography>
                </Box>
              </Stack>

              {/* Silme Butonu ve REMOVE Metni */}
            </Card>
          ))}
        </List>
      )}

      {/* Sepeti Temizle ve Sipariş Tamamla Butonları */}
      <Stack direction="column" spacing={2} sx={{ mt: 4 }}>
        <Button variant="contained" color="secondary" onClick={clearCart}>
          Sepeti Temizle
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenModal}
          disabled={selectedItems.length === 0}
        >
          Siparişi Tamamla
        </Button>
      </Stack>

      {/* Modal ve Başarı Bildirimi */}
      {isModalOpen && (
        <Modal open={isModalOpen} onClose={handleCloseModal}>
          <ModalForm
            onClose={handleCloseModal}
            onSubmit={handleFormSubmit}
            disabled={isSubmitting}
            loading={isSubmitting}
          />
        </Modal>
      )}
      {isSuccessOpen && (
        <OrderSuccessFeedback
          open={isSuccessOpen}
          onClose={() => setSuccessOpen(false)}
        />
      )}
    </Stack>
  );
};

export default MobileCart;
