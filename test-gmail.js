import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

console.log('Testing Gmail SMTP Connection and Delivery...');

// If ZOHO_EMAIL in .env is your Gmail address, we will use it
const gmailUser = process.env.ZOHO_EMAIL.includes('gmail.com') 
  ? process.env.ZOHO_EMAIL 
  : process.env.RECIPIENT_EMAIL || 'sampathkumarveesam@gmail.com';

const appPassword = process.env.ZOHO_PASSWORD; // Place your 16-character Gmail App Password here

console.log('--------------------------------------------------');
console.log('Gmail SMTP Details:');
console.log('SMTP_HOST: smtp.gmail.com');
console.log('SMTP_PORT: 465');
console.log('Sender (Gmail):', gmailUser);
console.log('Recipient (Gmail):', gmailUser);
console.log('--------------------------------------------------');

if (!appPassword || appPassword.length !== 16 || appPassword === 'abcdefghijkl') {
  console.error('❌ Error: Please configure your 16-character Gmail App Password in your .env file first!');
  console.log('\nTo generate one:');
  console.log('1. Go to https://myaccount.google.com/');
  console.log('2. Search for "App passwords" (ensure 2-step verification is enabled)');
  console.log('3. Generate a password for "Portfolio Form" and copy the 16-character code.');
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: gmailUser,
    pass: appPassword,
  },
});

const mailOptions = {
  from: `"${gmailUser}" <${gmailUser}>`,
  to: gmailUser,
  subject: 'Test Email via Gmail SMTP',
  text: 'This is a test email sent from Gmail SMTP to verify the configuration.',
};

console.log('Sending test email...');

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('\n❌ Gmail SMTP Send Failed!');
    console.error('Error Message:', error.message);
  } else {
    console.log('\n✅ Success! Gmail SMTP sent the test email successfully!');
    console.log('Message ID:', info.messageId);
  }
});
