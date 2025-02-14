export const sendSlackMessage = async (orderId: string, formData: { name: string; email: string; phone: string }) => {
  const webhookUrl = process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL; // Webhook URL'sini .env'den al

  if (!webhookUrl) {
    console.error("Slack Webhook URL tanımlanmamış!");
    return;
  }

  const message = {
    text: `📢 *Yeni Sipariş Geldi!*\n🆔 *Sipariş ID:* ${orderId}\n👤 *Müşteri:* ${formData.name}\n📧 *E-Posta:* ${formData.email}\n📞 *Telefon:* ${formData.phone}`
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error(`Slack mesajı gönderilemedi. Status: ${response.status}`);
    }

    console.log("Slack mesajı başarıyla gönderildi!");
  } catch (error) {
    console.error("Slack mesaj gönderme hatası:", error);
  }
};
