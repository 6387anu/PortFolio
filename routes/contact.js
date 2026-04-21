const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');

// ─── Rate Limiter: max 5 emails per 15 min per IP ──
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many messages sent. Please try again after 15 minutes.' },
});

// ─── Input Validator ───────────────────────────────
function validateInput({ name, email, subject, message }) {
  const errors = [];
  if (!name || name.trim().length < 2) errors.push('Name must be at least 2 characters.');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Valid email is required.');
  if (!subject || subject.trim().length < 3) errors.push('Subject must be at least 3 characters.');
  if (!message || message.trim().length < 10) errors.push('Message must be at least 10 characters.');
  return errors;
}

// ─── POST /api/contact ─────────────────────────────
router.post('/', limiter, async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validate
  const errors = validateInput({ name, email, subject, message });
  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  // Setup transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email to Anurag
  const mailToOwner = {
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: `📬 New Message: ${subject}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; background: #0a0a0f; color: #f0f0f8; padding: 32px; border-radius: 12px;">
        <h2 style="color: #ff3cac; margin-bottom: 4px;">New Portfolio Message</h2>
        <p style="color: #8888aa; font-size: 13px;">Received via your portfolio contact form</p>
        <hr style="border-color: #2a2a3a; margin: 20px 0;" />
        <p><strong style="color:#00f5d4;">From:</strong> ${name}</p>
        <p><strong style="color:#00f5d4;">Email:</strong> ${email}</p>
        <p><strong style="color:#00f5d4;">Subject:</strong> ${subject}</p>
        <p><strong style="color:#00f5d4;">Message:</strong></p>
        <div style="background:#16161f; padding:16px; border-radius:8px; border-left: 3px solid #ff3cac;">
          <p style="line-height:1.7; margin:0;">${message.replace(/\n/g, '<br/>')}</p>
        </div>
        <hr style="border-color: #2a2a3a; margin: 20px 0;" />
        <p style="color:#8888aa; font-size:12px;">Reply directly to: <a href="mailto:${email}" style="color:#00f5d4;">${email}</a></p>
      </div>
    `,
  };

  // Auto-reply to sender
  const mailToSender = {
    from: `"Anurag Yadav" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Thanks for reaching out, ${name}! 👋`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; background: #0a0a0f; color: #f0f0f8; padding: 32px; border-radius: 12px;">
        <h2 style="color: #ff3cac;">Hey ${name}! 👋</h2>
        <p style="line-height: 1.7; color: #c0c0d8;">
          Thanks for getting in touch through my portfolio. I've received your message and will get back to you as soon as possible — usually within 24 hours.
        </p>
        <div style="background:#16161f; padding:16px; border-radius:8px; border-left: 3px solid #00f5d4; margin: 20px 0;">
          <p style="margin:0; color:#8888aa; font-size:13px;"><strong style="color:#00f5d4;">Your message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
        </div>
        <p style="color: #8888aa;">— Anurag Yadav<br/>Full-Stack Developer | CSE @ Galgotias</p>
        <hr style="border-color: #2a2a3a; margin: 20px 0;" />
        <p style="color:#555; font-size:11px;">This is an automated reply. Please don't reply to this email directly.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailToOwner);
    await transporter.sendMail(mailToSender);
    return res.status(200).json({ success: true, message: 'Message sent successfully! Check your inbox.' });
  } catch (err) {
    console.error('Email error FULL:', err);
    return res.status(500).json({ success: false, message: 'Failed to send email. Please try again later.' });
  }
});

module.exports = router;
