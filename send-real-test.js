import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

console.log('Testing actual email delivery via Zoho SMTP...');

const isSecure = process.env.SMTP_SECURE !== undefined 
  ? process.env.SMTP_SECURE === 'true' 
  : (process.env.SMTP_PORT || '465') === '465';

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
  from: 'sampathkumarveesam@zohomail.in', // Test using correct zohomail.in domain
  to: 'sampathkumarveesam@zoho.in',
  subject: 'Test Minimal',
  text: 'Minimal test message.',
};

console.log('Sending test email to:', mailOptions.to);
console.log('From:', mailOptions.from);

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('\n❌ Failed to send email!');
    console.error('Error Message:', error.message);
    console.error('Full Error Object:', error);
  } else {
    console.log('\n✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);
  }
});
