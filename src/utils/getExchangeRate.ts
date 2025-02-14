export const getExchangeRate = async (): Promise<number> => {
    try {
      const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
      const data = await response.json();
  
      if (!data || !data.rates || !data.rates["TRY"]) {
        throw new Error("TCMB döviz kuru alınamadı.");
      }
  
      return data.rates["TRY"];
    } catch (error) {
      console.error("⚠️ Döviz kuru alınırken hata oluştu:", error);
      return 36; // Hata olursa varsayılan kur
    }
  };
  