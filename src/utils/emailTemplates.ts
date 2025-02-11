interface CartItem {
  fileName: string;
  material: string;
  thickness: string;
  quantity: number;
  coating?: string; // Opsiyonel olarak kaplama eklenebilir
  note?: string; // Opsiyonel not alanı
  file?: File; // Dosya eklenebilir
  fileUrl?: string; // Dosya URL'si (opsiyonel)
  extraServices?: string[];
  svg?: string;
  price?: string;
  dimensions?: {
    width: string;
    height: string;
    unit: "mm" | "inch";
  };
}

export const getCustomerEmailContent = (formData: { name: string }, orderId: string,  cartItemsWithUrls: CartItem[]) => {
  return {
    subject: "Sipariş Onayı",
    text: `Merhaba ${formData.name},

Siparişiniz başarıyla alındı. Detaylar aşağıdadır:

Sipariş Numarası: ${orderId}
Ürünler:
${cartItemsWithUrls
  .map(
    (item) =>
      `- Ürün: ${item.material}, Kalınlık: ${item.thickness} mm, Miktar: ${
        item.quantity
      }, Dosya: ${item.file ? item.file.name : "Yok"} (${item.fileUrl || "Dosya Yüklenmedi"})`
  )
  .join("\n")}

Teşekkür ederiz!
LaserCut Ekibi`,
    html: `
      <h1>Merhaba ${formData.name},</h1>
      <p>Siparişiniz başarıyla alındı. Detaylar aşağıda:</p>
      <h2>Sipariş Numarası: ${orderId}</h2>
      <ul>
        ${cartItemsWithUrls
          .map(
            (item) => `<li><strong>Ürün:</strong> ${item.material}, 
              <strong>Kalınlık:</strong> ${item.thickness} mm, 
              <strong>Miktar:</strong> ${item.quantity}, 
              <strong>Dosya:</strong> ${item.file ? item.file.name : "Yok"} 
              (${item.fileUrl ? `<a href="${item.fileUrl}">Dosyayı Gör</a>` : "Dosya Yüklenmedi"})</li>`
          )
          .join("")}
      </ul>
      <p>Teşekkür ederiz!</p>
      <p>Saygılar,<br>LaserCut Ekibi</p>`,
  };
};

export const getAdminEmailContent = (formData: { name: string; phone: string }, orderId: string, cartItemsWithUrls: CartItem[]) => {
  return {
    subject: "Yeni Sipariş Alındı",
    text: `Yeni sipariş: ${orderId}, Müşteri: ${formData.name}

Telefon: ${formData.phone}

Ürünler:
${cartItemsWithUrls
  .map(
    (item) =>
      `- Ürün: ${item.material}, Kalınlık: ${item.thickness} mm, Miktar: ${
        item.quantity
      }, Kaplama: ${item.coating || "Yok"}, Dosya: ${item.file ? item.file.name : "Yok"} (${item.fileUrl || "Dosya Yüklenmedi"})`
  )
  .join("\n")}

Lütfen siparişi kontrol edin.
LaserCut Ekibi`,
    html: `
      <h1>Yeni Sipariş Alındı</h1>
      <h2>Sipariş Numarası: ${orderId}</h2>
      <p><strong>Kullanıcı:</strong> ${formData.name}</p>
      <p><strong>Telefon:</strong> ${formData.phone}</p>
      <ul>
        ${cartItemsWithUrls
          .map(
            (item) => `<li><strong>Ürün:</strong> ${item.material}, 
              <strong>Kalınlık:</strong> ${item.thickness} mm, 
              <strong>Miktar:</strong> ${item.quantity}, 
              <strong>Kaplama:</strong> ${item.coating || "Yok"}, 
              <strong>Dosya:</strong> ${item.file ? item.file.name : "Yok"} 
              (${item.fileUrl ? `<a href="${item.fileUrl}">Dosyayı Gör</a>` : "Dosya Yüklenmedi"})</li>`
          )
          .join("")}
      </ul>
      <p>Lütfen siparişi kontrol edin.</p>`,
  };
};
