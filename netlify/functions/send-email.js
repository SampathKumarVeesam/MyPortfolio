import nodemailer from 'nodemailer';

export const handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, error: 'Method Not Allowed' }),
    };
  }

  try {
    const { name, email, subject, message } = JSON.parse(event.body);

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: 'Name, email, and message are required.' }),
      };
    }

    const isSecure = process.env.SMTP_SECURE !== undefined 
      ? process.env.SMTP_SECURE === 'true' 
      : (process.env.SMTP_PORT || '465') === '465';

    // Create Zoho SMTP transporter using environment variables configured in Netlify
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.zoho.in',
      port: parseInt(process.env.SMTP_PORT || '465', 10),
      secure: isSecure,
      auth: {
        user: process.env.ZOHO_EMAIL,
        pass: process.env.ZOHO_PASSWORD,
      },
    });

    const mailOptions = {
      // Must be the authenticated Zoho email address to avoid 553 relay error
      from: process.env.ZOHO_EMAIL,
      replyTo: email,
      to: process.env.RECIPIENT_EMAIL || 'sampathkumarveesam@gmail.com',
      subject: subject ? `Portfolio Contact: ${subject}` : `New portfolio contact form submission from ${name}`,
      text: `You have received a new message from your portfolio contact form:\n\n` +
            `Name: ${name}\n` +
            `Email: ${email}\n` +
            `Subject: ${subject || 'No Subject'}\n\n` +
            `Message:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 8px;">
          <h2 style="color: #6c63ff; border-bottom: 2px solid #6c63ff; padding-bottom: 10px;">New Message from Portfolio</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Subject:</strong> ${subject || 'No Subject'}</p>
          <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #6c63ff; margin-top: 20px;">
            <p style="margin: 0; white-space: pre-wrap;"><strong>Message:</strong><br/>${message}</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ success: true, message: 'Email sent successfully!' }),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        success: false, 
        error: 'Failed to send email via SMTP server.', 
        details: error.message 
      }),
    };
  }
};
