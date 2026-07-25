import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const password = process.env.ZOHO_PASSWORD;
const recipient = process.env.RECIPIENT_EMAIL || 'sampathkumarveesam@gmail.com';
const loginEmail = process.env.ZOHO_EMAIL;

const casings = [
  'sampathkumarveesam@zoho.in',
  'SampathKumarVeesam@zoho.in',
  'Sampathkumarveesam@zoho.in',
  'sampathkumar.veesam@zoho.in',
  'Sampath.Kumar.Veesam@zoho.in'
];

async function testCasing(fromEmail) {
  console.log(`Testing from: ${fromEmail}`);
  
  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.in',
    port: 465,
    secure: true,
    auth: {
      user: loginEmail,
      pass: password,
    },
  });

  const mailOptions = {
    from: fromEmail,
    to: recipient,
    subject: `Casing Test: ${fromEmail}`,
    text: `Testing casing: ${fromEmail}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ SUCCESS: ${fromEmail}`);
    return true;
  } catch (error) {
    console.log(`❌ FAILED: ${fromEmail} -> ${error.message}`);
    return false;
  }
}

async function runAll() {
  for (const casing of casings) {
    const success = await testCasing(casing);
    if (success) {
      console.log(`\n🎉 Found the working casing! The correct From address is: ${casing}`);
      break;
    }
  }
}

runAll();
