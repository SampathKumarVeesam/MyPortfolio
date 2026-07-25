import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for frontend-backend communication in development
app.use(cors());

// Parse JSON request body
app.use(express.json());

// Serve static assets from Vite's production build folder (dist)
app.use(express.static(path.join(__dirname, 'dist')));

// ─── SMTP (SEND EMAIL) ENDPOINT ──────────────────────────────────────
app.post('/api/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      error: 'Name, email, and message are required.' 
    });
  }

  // Create standard Zoho SMTP transporter
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
    // Note: Zoho requires the 'from' email to match the authenticated ZOHO_EMAIL exactly.
    // Setting replyTo to the visitor's email lets you reply directly to them.
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

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully!' 
    });
  } catch (error) {
    console.error('Error sending email via Zoho SMTP:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to send email via SMTP server.', 
      details: error.message 
    });
  }
});

// For any other route, serve the index.html (fallback for SPA routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// ─── IMAP (READ EMAIL) INTEGRATION EXAMPLE ─────────────────────────────
// Below is an example of how you can retrieve email messages from your
// Zoho inbox using the `imapflow` library. To run this, you would first install
// imapflow: `npm install imapflow`
/*
import { ImapFlow } from 'imapflow';

async function fetchRecentEmails() {
  const client = new ImapFlow({
    host: process.env.IMAP_HOST || 'imap.zoho.in',
    port: parseInt(process.env.IMAP_PORT || '993', 10),
    secure: process.env.IMAP_SECURE === 'true' || true,
    auth: {
      user: process.env.ZOHO_EMAIL,
      pass: process.env.ZOHO_PASSWORD,
    },
    logger: false
  });

  try {
    await client.connect();

    // Select the INBOX folder
    let lock = await client.getMailboxLock('INBOX');
    try {
      // Search for the 5 most recent messages
      for await (let message of client.list({ seq: '1:5' }, { envelope: true })) {
        console.log(`Subject: ${message.envelope.subject}`);
        console.log(`From: ${message.envelope.from.map(f => f.address).join(', ')}`);
        console.log(`Date: ${message.envelope.date}`);
        console.log('---');
      }
    } finally {
      // Make sure to release the lock
      lock.release();
    }

    await client.logout();
  } catch (err) {
    console.error('IMAP error:', err);
  }
}
*/
