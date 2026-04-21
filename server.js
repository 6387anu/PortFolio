require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const contactRouter = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Security Middleware ───────────────────────────
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      scriptSrcAttr: ["'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'"],
    },
  },
}));
app.use(cors());

// ─── Body Parsing ──────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Static Files (CSS, JS, images, resume PDF) ───
app.use(express.static(path.join(__dirname, 'public')));

// ─── Routes ───────────────────────────────────────
app.use('/api/contact', contactRouter);

// ─── Serve Portfolio (SPA-style fallback) ─────────
app.get('/resume.pdf', (req, res) => {
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline; filename="resume.pdf"');
  res.sendFile(path.join(__dirname, 'public', 'resume.pdf'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ─── 404 Handler ──────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ─── Global Error Handler ─────────────────────────
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// ─── Start Server ─────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Portfolio running at http://localhost:${PORT}`);
  console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}\n`);
});
