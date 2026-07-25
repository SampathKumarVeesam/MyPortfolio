import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environmental variables
dotenv.config();

console.log('--------------------------------------------------');
console.log('Zoho SMTP Connection Diagnostic Test');
console.log('--------------------------------------------------');
console.log('SMTP_HOST:', process.env.SMTP_HOST || 'smtp.zoho.in');
console.log('SMTP_PORT:', process.env.SMTP_PORT || '465');
console.log('SMTP_SECURE:', process.env.SMTP_SECURE || 'not specified');
console.log('ZOHO_EMAIL:', process.env.ZOHO_EMAIL || 'MISSING');
console.log('ZOHO_PASSWORD:', process.env.ZOHO_PASSWORD ? 'configured (Length: ' + process.env.ZOHO_PASSWORD.length + ')' : 'MISSING');
console.log('--------------------------------------------------');

if (!process.env.ZOHO_EMAIL || !process.env.ZOHO_PASSWORD) {
  console.error('❌ Error: ZOHO_EMAIL and ZOHO_PASSWORD must be configured in your .env file!');
  process.exit(1);
}

if (process.env.ZOHO_PASSWORD === 'abcdefghijkl') {
  console.warn('⚠️ Warning: You are using the default placeholder password "abcdefghijkl".');
  console.warn('Please replace it with your actual Zoho Account Application-Specific Password.');
}

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

console.log('Testing SMTP connection...');

transporter.verify((error, success) => {
  if (error) {
    console.error('\n❌ SMTP Connection Verification Failed!');
    console.error('Error Code:', error.code || 'N/A');
    console.error('Details:', error.message);
    console.log('\n--------------------------------------------------');
    console.log('Troubleshooting Guide:');
    
    if (error.message.includes('Authentication Failed') || error.message.includes('535')) {
      console.log('1. [CREDENTIALS] The password you entered is incorrect.');
      console.log('   Ensure you generated an "Application-Specific Password" (12 characters) in Zoho Account.');
      console.log('   Go to: Zoho Account -> Security -> App Passwords -> Generate App Password.');
      console.log('   Use the generated password without spaces in your ZOHO_PASSWORD.');
    } else if (error.code === 'ETIMEDOUT' || error.code === 'ECONNREFUSED' || error.message.includes('timeout')) {
      console.log('1. [NETWORK/PORT] Connection timed out or was refused.');
      console.log('   Your local network, router, or firewall might block port 465 (SSL).');
      console.log('   Try switching to port 587 (TLS/STARTTLS):');
      console.log('   In your .env file, update:');
      console.log('     SMTP_PORT=587');
      console.log('     SMTP_SECURE=false');
    } else {
      console.log('1. Ensure SMTP Access is enabled in Zoho Mail Admin Console.');
      console.log('   Go to: Zoho Mail -> Settings -> Mail Accounts -> IMAP/SMTP -> Check SMTP checkbox.');
      console.log('2. Verify if you should use "smtp.zoho.in" or "smtp.zoho.com".');
    }
    console.log('--------------------------------------------------');
  } else {
    console.log('\n✅ Success! Your Zoho SMTP configuration is verified and ready to send emails.');
  }
});
