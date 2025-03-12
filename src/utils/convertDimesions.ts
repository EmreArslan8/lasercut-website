export const convertDimensions = (
    width: string,
    height: string,
    fromUnit: "mm" | "inch",
    toUnit: "mm" | "inch"
  ) => {
    if (fromUnit === toUnit) return { width, height }; // Birim değişmediyse dönüşüm yapma
  
    const factor = 25.4; // Dönüşüm katsayısı
    const convert = (value: string) =>
      (parseFloat(value) * (toUnit === "mm" ? factor : 1 / factor)).toFixed(2);
  
    return { width: convert(width), height: convert(height) };
  };
  