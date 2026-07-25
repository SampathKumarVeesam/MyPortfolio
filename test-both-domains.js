import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const password = process.env.ZOHO_PASSWORD;
const recipient = process.env.RECIPIENT_EMAIL || 'sampathkumarveesam@gmail.com';

async function testEmail(userEmail, host) {
  console.log(`\n--- Testing user: ${userEmail} via host: ${host} ---`);
  
  const transporter = nodemailer.createTransport({
    host: host,
    port: 465,
    secure: true,
    auth: {
      user: userEmail,
      pass: password,
    },
  });

  const mailOptions = {
    from: userEmail,
    replyTo: 'test-visitor@example.com',
    to: recipient,
    subject: `Test from ${userEmail}`,
    text: `This is a test email to verify sending from ${userEmail}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Success for ${userEmail}! Message ID: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed for ${userEmail}: ${error.message}`);
    return false;
  }
}

async function runAll() {
  // Test 1: zoho.in email via smtp.zoho.in
  await testEmail('sampathkumarveesam@zoho.in', 'smtp.zoho.in');
  
  // Test 2: zoho.com email via smtp.zoho.com
  await testEmail('sampathkumarveesam@zoho.com', 'smtp.zoho.com');

  // Test 3: zoho.in email via smtp.zoho.com
  await testEmail('sampathkumarveesam@zoho.in', 'smtp.zoho.com');

  // Test 4: zoho.com email via smtp.zoho.in
  await testEmail('sampathkumarveesam@zoho.com', 'smtp.zoho.in');
}

runAll();
