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

  // 🔹 Eğer "Kaynak" veya "Boya" seçildiyse, fiyat bilgisi siparişten sonra verilecek.
  if (
    extraServices &&
    (extraServices.includes("welding") || extraServices.includes("painting"))
  ) {
    console.log(
      "🔔 Kaynak veya Boya seçildi. Fiyat bilgisi siparişten sonra verilecek."
    );
    return {
      priceTL: "pending", // veya "siparişten sonra" gibi özel bir keyword
      priceUSD: "pending",
    };
  }

  if (!(material in materialDensities)) {
    console.error("❌ Geçersiz malzeme:", material);
    return { priceTL: "0.00", priceUSD: "0.00" };
  }

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

  // **Levha ağırlığını hesaplayalım (kg cinsinden)**
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

  // **%35 kar eklenmiş fiyat**
  let finalPriceTL = totalCost * 1.35;
  let finalPriceUSD = totalCostUSD * 1.35;

  // **Ek hizmetler (Büküm eklenirse fiyat artır)**
  let extraCostUSD = 0;
  if (extraServices && Array.isArray(extraServices)) {
    if (extraServices.includes("bending")) {
      extraCostUSD += 1; // 🔥 **Her "Büküm" için 1 USD ekle**
      console.log("✅ Büküm seçildi, fiyat artırıldı: +1 USD");
    }
  }

  // **Büküm için ekstra maliyet ekleyelim**
  finalPriceUSD += extraCostUSD;
  finalPriceTL += extraCostUSD * exchangeRate;

  console.log("✅ Hesaplama Tamamlandı!");
  console.log("💰 Toplam Maliyet (TL):", totalCost.toFixed(2));
  console.log("💰 Son Fiyat (TL):", finalPriceTL.toFixed(2));
  console.log("💵 Son Fiyat (USD):", finalPriceUSD.toFixed(2));

  return {
    priceTL: finalPriceTL.toFixed(2),
    priceUSD: finalPriceUSD.toFixed(2),
  };
};
