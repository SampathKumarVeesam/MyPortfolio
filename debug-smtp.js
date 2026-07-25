import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

console.log('Starting SMTP Debug Session...');

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.in',
  port: 465,
  secure: true,
  debug: true,      // Enable SMTP debug logging
  logger: true,     // Log SMTP conversation to console
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_PASSWORD,
  },
});

const mailOptions = {
  from: process.env.ZOHO_EMAIL,
  to: process.env.ZOHO_EMAIL, // Send to self
  subject: 'SMTP Debug Test',
  text: 'SMTP debug session.',
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('\n❌ SMTP Debug Send Failed!');
  } else {
    console.log('\n✅ SMTP Debug Send Succeeded!');
  }
});
