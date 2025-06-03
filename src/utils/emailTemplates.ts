interface OrderItem {
  fileName: string;
  material: string;
  thickness: number;
  quantity: number;
  price: string;
  fileUrl?: string;
}

interface OrderEmailContent {
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  locale?: string;
}

export const generateOrderEmail = ({
  customerName,
  customerEmail,
  items,
}: OrderEmailContent) => {
  return {
    subject: `Yeni Sipariş Geldi (Ödemesi henüz yapılmadı)`,
    text: `Yeni sipariş:\nMüşteri: ${customerName}\nEmail: ${customerEmail}\nÜrün Sayısı: ${items.length}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>📦 Yeni Sipariş Bilgisi</h2>
        <p><strong>👤 Müşteri:</strong> ${customerName}</p>
        <p><strong>📧 E-Posta:</strong> ${customerEmail}</p>
        <h3>🛒 Sipariş Detayları:</h3>
        <table cellpadding="10" cellspacing="0" style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th style="border-bottom: 1px solid #ddd;">Dosya</th>
              <th style="border-bottom: 1px solid #ddd;">Malzeme</th>
              <th style="border-bottom: 1px solid #ddd;">Kalınlık</th>
              <th style="border-bottom: 1px solid #ddd;">Adet</th>
              <th style="border-bottom: 1px solid #ddd;">Fiyat</th>
              <th style="border-bottom: 1px solid #ddd;">Dosya Linki</th>
            </tr>
          </thead>
          <tbody>
            ${items
              .map(
                (item) => `
              <tr>
                <td>${item.fileName}</td>
                <td>${item.material}</td>
                <td>${item.thickness}mm</td>
                <td>${item.quantity}</td>
                <td>${item.price}</td>
                <td><a href="${item.fileUrl}" target="_blank">Görüntüle</a></td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
        <p style="margin-top: 20px;">🕐 Sipariş tarihi: ${new Date().toLocaleString()}</p>
      </div>
    `,
  };
};
