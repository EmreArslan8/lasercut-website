export const sendEmail = async (emailData: {
    from?: string;
    to: string;
    subject: string;
    text: string;
    html?: string; // HTML içeriği isteğe bağlı
  }) => {
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send email");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Email sending error:", error);
      throw error;
    }
  };
  