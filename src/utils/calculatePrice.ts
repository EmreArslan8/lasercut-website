import { getExchangeRate } from "./getExchangeRate";
import {
  materialDensities,
  materialUnitPrices,
  laborCosts,
} from "@/constants/materials";

export const calculatePrice = async (stepData: {
  dimensions: { width: string; height: string };
  material: string;
  thickness: string;
  quantity: number;
  extraServices?: string[];
}): Promise<{ priceTL: string; priceUSD: string }> => {
  const { dimensions, material, thickness, quantity, extraServices } = stepData;

  console.log("🔄 Fiyat Hesaplama Başlıyor...");


  const density = materialDensities[material];
  const rawPrice = materialUnitPrices[material] ?? 0;
  const laborCost = laborCosts[material] ?? 0;

  const width = parseFloat(dimensions.width);
  const height = parseFloat(dimensions.height);

  let thicknessInMM: number;
  if (typeof thickness === "string") {
    thicknessInMM = parseFloat(thickness.replace("mm", ""));
  } else if (typeof thickness === "number") {
    thicknessInMM = thickness;
  } else {
    console.error("❌ Geçersiz kalınlık değeri:", thickness);
    return { priceTL: "0.00", priceUSD: "0.00" };
  }

  console.log("📏 Genişlik (mm):", width);
  console.log("📐 Yükseklik (mm):", height);
  console.log("🔩 Kalınlık (mm):", thicknessInMM);
  console.log("⚖️ Malzeme Yoğunluğu:", density);

  const weight = (thicknessInMM * width * height * density) / 1_000;

  console.log("⚖️ Hesaplanan Ağırlık (kg):", weight.toFixed(6));

  if (weight <= 0) {
    console.error("❌ Malzeme ağırlığı sıfır veya negatif çıktı!");
    return { priceTL: "0.00", priceUSD: "0.00" };
  }

  const laserMaterialPrice = rawPrice * 1.04;
  const materialCost = weight * laserMaterialPrice;
  const laborCostTotal = weight * laborCost;
  const totalCost = (materialCost + laborCostTotal) * quantity;

  const exchangeRate = await getExchangeRate();
  const totalCostUSD = totalCost / exchangeRate;

  let finalPriceTL = totalCost * 1.35;
  let finalPriceUSD = totalCostUSD * 1.35;

  let extraCostUSD = 0;

  if (extraServices && Array.isArray(extraServices)) {
    if (extraServices.includes("bending")) {
      extraCostUSD += 1;
      console.log("✅ Büküm seçildi, fiyat artırıldı: +1 USD");
    }

    // 🎨 BOYA EKLEMESİ: m² başına 2 USD
    if (extraServices.includes("painting")) {
      const areaM2 = (width / 1000) * (height / 1000);
      const paintingCostUSD = areaM2 * 2;
      extraCostUSD += paintingCostUSD;
      console.log(
        `✅ Boya seçildi, alan: ${areaM2.toFixed(
          2
        )} m², fiyat artırıldı: +${paintingCostUSD.toFixed(2)} USD`
      );
    }
  }

  finalPriceUSD += extraCostUSD;
  finalPriceTL += extraCostUSD * exchangeRate;

  console.log("✅ Hesaplama Tamamlandı!");
  console.log("💰 Son Fiyat (TL):", finalPriceTL.toFixed(2));
  console.log("💵 Son Fiyat (USD):", finalPriceUSD.toFixed(2));

  return {
    priceTL: finalPriceTL.toFixed(2),
    priceUSD: finalPriceUSD.toFixed(2),
  };
};

export const calculateTotalPrice = (
  selectedItems: number[],
  cartItems: any[],
  locale: string
) => {
  if (selectedItems.length === 0) {
    return locale === "en" ? "$0.00 USD" : "0.00 TL";
  }

  const total = selectedItems.reduce((sum, index) => {
    const price =
      locale === "en"
        ? Number(cartItems[index]?.priceUSD) || 0
        : Number(cartItems[index]?.priceTL) || 0;

    return sum + price * (cartItems[index]?.quantity || 1);
  }, 0);

  return locale === "en" ? `$${total.toFixed(2)} USD` : `${total.toFixed(2)} TL`;
};
