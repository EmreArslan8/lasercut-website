export interface CartItem {
  id: string;
  fileName: string;
  material: string;
  thickness: string;
  quantity: number;
  coating: string;
  note?: string;
  file?: File;
  fileUrl?: string | null;
  extraServices?: string[];
  svg?: string;
  priceTL?: string;
  priceUSD?: string;
  dimensions?: {
    width: string;
    height: string;
    unit: "mm" | "inch";
  };
}
