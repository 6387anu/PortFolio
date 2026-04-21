# 🚀 Anurag Yadav — Portfolio

Full-Stack Developer Portfolio built with **Node.js + Express** backend and a bold, colorful HTML/CSS/JS frontend.

---

## 📁 Project Structure

```
portfolio/
├── public/
│   └── index.html        # Frontend (HTML + CSS + JS)
├── routes/
│   └── contact.js        # POST /api/contact — email handler
├── server.js             # Express app entry point
├── package.json
├── .env.example          # Copy to .env and fill in your values
├── .gitignore
└── README.md
```

---

## ⚙️ Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Runtime    | Node.js (v18+)                    |
| Framework  | Express.js v4                     |
| Email      | Nodemailer (Gmail SMTP)           |
| Security   | Helmet, CORS, express-rate-limit  |
| Frontend   | HTML5, CSS3, Vanilla JS           |
| Fonts      | Google Fonts (Syne, DM Sans, Space Mono) |
| Deployment | Render / Railway / VPS            |

---

## 🛠️ Local Setup

### 1. Clone & Install

```bash
git clone https://github.com/anuragyadav/portfolio.git
cd portfolio
npm install
```

### 2. Setup Environment Variables

```bash
cp .env.example .env
```

Open `.env` and fill in:

```env
PORT=3000
NODE_ENV=development
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_TO=anurag@email.com
```

> ⚠️ **Gmail App Password** — Do NOT use your real Gmail password.
> Go to: Google Account → Security → 2FA → App Passwords → Generate one.
> Guide: https://support.google.com/accounts/answer/185833

### 3. Run Locally

```bash
# Development (auto-restart)
npm run dev

# Production
npm start
```

Visit: **http://localhost:3000**

---

## 📬 Contact Form API

**Endpoint:** `POST /api/contact`

**Request Body (JSON):**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Internship Opportunity",
  "message": "Hi Anurag, I'd like to connect..."
}
```

**Success Response:**
```json
{ "success": true, "message": "Message sent successfully! Check your inbox." }
```

**Rate Limit:** 5 requests per IP per 15 minutes.

---

## 🌐 Deployment

### Option 1 — Render (Recommended, Free)

1. Push code to GitHub
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your GitHub repo
4. Set:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add Environment Variables (EMAIL_USER, EMAIL_PASS, EMAIL_TO, NODE_ENV=production)
6. Deploy ✅

### Option 2 — Railway

1. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
2. Add environment variables in the Variables tab
3. Railway auto-detects Node.js and deploys ✅

### Option 3 — VPS (DigitalOcean / AWS EC2)

```bash
# On your server
git clone your-repo
cd portfolio
npm install
cp .env.example .env  # fill in values

# Install PM2 for process management
npm install -g pm2
pm2 start server.js --name portfolio
pm2 save
pm2 startup
```

---

## 📝 Customization Checklist

- [ ] Replace `Anurag Yadav` with your name in `public/index.html`
- [ ] Update projects section with your real projects
- [ ] Replace certificate cards with your real certs
- [ ] Add your GitHub, LinkedIn, email in contact section
- [ ] Drop your `resume.pdf` into the `public/` folder and update the download link
- [ ] Fill in `.env` with your Gmail credentials

---

## 📄 License

MIT — Free to use and modify for personal portfolios.
