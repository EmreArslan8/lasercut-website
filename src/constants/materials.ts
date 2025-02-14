export const materialDensities: Record<string, number> = {
    "Aluminum": 0.00272,
    "DKP Steel": 0.00786,
    "ST37-K / S235JR": 0.00785,
    "Stainless Steel 304": 0.00793,
    "Stainless Steel 316L": 0.00800,
    "Black Sheet": 0.00785,
  };
  
  export const materialUnitPrices: Record<string, number> = {
    "Aluminum": 165.72024,
    "DKP Steel": 45.3726,
    "ST37-K / S235JR": 46.62,
    "Stainless Steel 304": 139.1544,
    "Stainless Steel 316L": 123.97392,
    "Black Sheet": 40.7358,
  };
  
  export const laborCosts: Record<string, number> = {
    "Aluminum": 50,
    "DKP Steel": 50,
    "ST37-K / S235JR": 50,
    "Stainless Steel 304": 50,
    "Stainless Steel 316L": 50,
    "Black Sheet": 50,
  };
  
  // Sitede Kullanıcıya Gösterilecek Malzeme Listesi
  export const materialOptions = Object.keys(materialDensities);
  