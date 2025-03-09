// src/utils/formatPrice.ts

export const formatPrice = (price: number, currency: "USD" | "TL" = "USD") => {
    if (!price) return "0.00";
  
    const formattedPrice = new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: currency === "USD" ? "USD" : "TRY",
      minimumFractionDigits: 2,
    }).format(price);
  
    return formattedPrice;
  };
  