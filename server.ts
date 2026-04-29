import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Test Route to verify API is working on Vercel
app.get("/api/test", (req, res) => {
  res.json({ 
    status: "ok", 
    message: "API is reachable",
    env: {
      GMAIL_USER: !!process.env.GMAIL_USER,
      GMAIL_APP_PASSWORD: !!process.env.GMAIL_APP_PASSWORD,
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: process.env.VERCEL
    }
  });
});

// API Route for sending emails via Gmail/Nodemailer
app.post("/api/send-welcome-email", async (req, res) => {
    const { email, name } = req.body;

    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "");

    if (!user || !pass) {
      console.error("Gmail credentials missing in environment. GMAIL_USER:", !!user, "GMAIL_APP_PASSWORD:", !!pass);
      return res.status(500).json({ error: "Server configuration error: Gmail credentials missing" });
    }

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    console.log(`Attempting to send email to: ${email} using ${user}`);

    // Create transporter inside the route to ensure fresh connection and env vars
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    const mailOptions = {
      from: `"Sruvo" <${user}>`,
      sender: user,
      to: email,
      subject: "You’re In — Sruvo Early Access Confirmed",
      html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<style>
  body {
    margin: 0;
    padding: 0;
    background: #f5f7fb;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial;
  }

  .wrapper {
    max-width: 600px;
    margin: auto;
    padding: 20px;
  }

  .container {
    background: linear-gradient(145deg, #ffffff, #f3f4f8);
    border-radius: 20px;
    padding: 35px 25px;
    text-align: center;
    box-shadow: 0 10px 40px rgba(0,0,0,0.05);
  }

  .logo-img {
    width: 130px;
    margin-bottom: 15px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    filter: drop-shadow(0 5px 15px rgba(122,92,255,0.25));
  }

  .logo-text {
    font-size: 22px;
    font-weight: 600;
    color: #333;
    margin-bottom: 10px;
  }

  .tag {
    display: inline-block;
    font-size: 12px;
    padding: 6px 14px;
    border-radius: 50px;
    background: rgba(122,92,255,0.1);
    color: #7a5cff;
    margin-bottom: 20px;
    animation: fadePulse 2s infinite;
  }

  @keyframes fadePulse {
    0% { opacity: 1; }
    50% { opacity: 0.6; }
    100% { opacity: 1; }
  }

  h1 {
    font-size: 26px;
    margin-bottom: 10px;
    color: #222;
  }

  p {
    color: #666;
    font-size: 15px;
    line-height: 1.6;
  }

  .highlight {
    color: #7a5cff;
    font-weight: 600;
  }

  .card {
    background: #ffffff;
    border-radius: 16px;
    padding: 18px;
    margin: 20px 0;
    box-shadow: 0 6px 20px rgba(0,0,0,0.04);
  }

  .button {
    display: inline-block;
    margin-top: 20px;
    padding: 14px 26px;
    border-radius: 12px;
    background: linear-gradient(90deg, #ff7eb3, #7a5cff);
    color: #fff;
    text-decoration: none;
    font-weight: 600;
  }

  .footer {
    text-align: center;
    font-size: 12px;
    color: #888;
    margin-top: 20px;
  }

  .subtle {
    font-size: 11px;
    color: #aaa;
    margin-top: 10px;
    line-height: 1.5;
  }

</style>
</head>

<body>

<div class="wrapper">

  <div class="container">

    <!-- NEW LOGO -->
    <img src="https://lh3.googleusercontent.com/d/1n2SgWctS5RgMjR2Uouvq-KpsqW5_ASxx" 
         alt="Sruvo Logo" 
         class="logo-img">

    <div class="logo-text">Sruvo</div>

    <div class="tag">EARLY ACCESS CONFIRMED</div>

    <h1>The Future of <span class="highlight">Pet Care</span> is Here 🐾</h1>

    <p>
      Hi ${name}, we’ve successfully received your request for <span class="highlight">Sruvo Early Access</span>.
    </p>

    <div class="card">
      <p>
        You're now part of an exclusive community shaping the future of modern pet care.
      </p>
    </div>

    <p>
      We're carefully onboarding users to ensure a seamless and premium experience.
      You'll be among the first to explore our platform.
    </p>

    <a href="https://www.sruvo.vercel.app" class="button">Check Your Status</a>

    <p style="margin-top:25px;">
      Stay tuned — something amazing is coming your way 🚀
    </p>

  </div>

  <div class="footer">
    © 2026 Sruvo • Built with care for pets & their people
    <div class="subtle">
      This is an automated message from Sruvo — responses to this email are not monitored.<br>
      For assistance, please contact our support team.
    </div>
  </div>

</div>

</body>
</html>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully to:", email);
      res.status(200).json({ success: true });
    } catch (err: any) {
      console.error("Nodemailer Error:", err);
      res.status(500).json({ error: err.message });
    }
  });

  // API Route for Contact Form
  app.post("/api/contact", async (req, res) => {
    const { name, email, subject, message } = req.body;

    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "");

    if (!user || !pass) {
      console.error("Gmail credentials missing for contact form. GMAIL_USER:", !!user, "GMAIL_APP_PASSWORD:", !!pass);
      return res.status(500).json({ error: "Gmail credentials missing" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    const dateTime = new Date().toLocaleString('en-US', { 
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'short'
    });

    const replyBody = encodeURIComponent(`\n\n\n--- Original Message ---\nFrom: ${name} <${email}>\nDate: ${dateTime}\nSubject: ${subject}\n\n${message}`);

    try {
      // Send both emails in parallel to save time and avoid timeouts
      await Promise.all([
        // 1. Send notification to admin (thesruvo@gmail.com)
        transporter.sendMail({
          from: `"${name}" <${user}>`,
          to: email, // This shows the user's email in the "To" field of the email client
          envelope: {
            from: user,
            to: [user] // This ensures the email is actually delivered to the admin
          },
          replyTo: email,
          subject: `[SUPPORT-REQUEST] New Contact Form: ${subject}`,
          text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
          html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  body { margin: 0; padding: 0; background: #f5f7fb; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial; }
  .wrapper { max-width: 600px; margin: auto; padding: 20px; }
  .container { background: linear-gradient(145deg, #ffffff, #f3f4f8); border-radius: 18px; padding: 25px; box-shadow: 0 10px 40px rgba(0,0,0,0.05); }
  .header { text-align: center; margin-bottom: 20px; }
  .logo { font-size: 28px; font-weight: 800; color: #7a5cff; }
  .logo-gradient {
    background: linear-gradient(90deg, #ff7eb3, #7a5cff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: #7a5cff; /* Fallback for clients that don't support text-gradient */
  }
  .title { font-size: 20px; margin-top: 6px; color: #222; }
  .tag { display: inline-block; margin-top: 10px; font-size: 11px; padding: 5px 12px; border-radius: 20px; background: rgba(122,92,255,0.1); color: #7a5cff; }
  .card { background: #ffffff; border-radius: 14px; padding: 16px; margin-top: 15px; box-shadow: 0 6px 20px rgba(0,0,0,0.04); }
  .field { margin-bottom: 12px; }
  .label { font-size: 12px; color: #888; margin-bottom: 3px; }
  .value { font-size: 14px; color: #222; font-weight: 500; }
  .message-box { background: #f9fafc; border-radius: 10px; padding: 12px; border: 1px solid #eee; font-size: 14px; color: #444; line-height: 1.5; }
  .button { display: inline-block; margin-top: 18px; padding: 12px 20px; border-radius: 10px; background: linear-gradient(90deg, #ff7eb3, #7a5cff); color: #ffffff !important; text-decoration: none; font-size: 14px; font-weight: 600; }
  .footer { text-align: center; font-size: 11px; color: #aaa; margin-top: 20px; }
</style>
</head>
<body>
<div class="wrapper">
  <div class="container">
    <div class="header">
      <div class="logo"><span class="logo-gradient">Sruvo</span></div>
      <div class="title">New Contact Submission 📩</div>
      <div class="tag">NEW REQUEST</div>
    </div>
    <div class="card">
      <div class="field">
        <div class="label">Full Name</div>
        <div class="value">${name}</div>
      </div>
      <div class="field">
        <div class="label">Email Address</div>
        <div class="value">${email}</div>
      </div>
    </div>
    <div class="card">
      <div class="label">Message</div>
      <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
    </div>
    <div class="card">
      <div class="label">Submitted At</div>
      <div class="value">${dateTime}</div>
    </div>
    <div style="text-align:center;">
      <a href="mailto:${email}?subject=Re: [SUPPORT-REQUEST] New Contact Form: ${subject}&body=${replyBody}" class="button">Reply to User</a>
    </div>
  </div>
  <div class="footer">
    © 2026 Sruvo • Built with care for pets & their people  
    <br><br>
    This email was generated automatically from the Sruvo contact form.
  </div>
</div>
</body>
</html>
        `
        }),
        // 2. Send automated response to the user
        transporter.sendMail({
          from: `"Sruvo Support" <${user}>`,
          to: email,
          subject: "We’ve Received Your Message — Sruvo Support",
          html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  body { margin: 0; padding: 0; background: #f5f7fb; font-family: Arial, sans-serif; }
  .wrapper { max-width: 600px; margin: auto; padding: 20px; }
  .container { background: #ffffff; border-radius: 20px; padding: 30px 20px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
  .logo-img { width: 120px; margin-bottom: 15px; }
  h1 { font-size: 24px; color: #222; margin-bottom: 10px; }
  p { color: #666; font-size: 14px; line-height: 1.6; }
  .tag { font-size: 12px; background: #f0f0f0; color: #7a5cff; font-weight: bold; padding: 6px 12px; border-radius: 20px; display: inline-block; margin-bottom: 15px; }
  .footer { text-align: center; font-size: 12px; color: #888; margin-top: 20px; }
  .subtle { font-size: 11px; color: #aaa; margin-top: 10px; line-height: 1.5; }
</style>
</head>
<body>
<div class="wrapper">
  <div class="container">
    <img class="logo-img" src="https://lh3.googleusercontent.com/d/1n2SgWctS5RgMjR2Uouvq-KpsqW5_ASxx" alt="Sruvo Logo" />
    <div class="tag">REQUEST RECEIVED</div>
    <h1>We’ve Got Your Message ✉️</h1>
    <p>Hi ${name},</p>
    <p>Thank you for reaching out to <b>Sruvo</b>. We’ve successfully received your request regarding "<b>${subject}</b>".</p>
    <p>Our support team will connect with you within <b>24–48 hours</b>.</p>
  </div>
  <div class="footer">
    © 2026 Sruvo • Built with care for pets & their people  
    <div class="subtle">
      This is an automated message from Sruvo — responses to this email are not monitored.<br>  
      Our team will connect with you shortly.
    </div>
  </div>
</div>
</body>
</html>
        `
        })
      ]);

      res.status(200).json({ success: true });
    } catch (err: any) {
      console.error("Contact Email Error:", err);
      res.status(500).json({ error: err.message });
    }
});

// API Route for Veterinary Partner Application Confirmation
app.post("/api/send-partner-email", async (req, res) => {
    const { email, name } = req.body;

    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "");

    if (!user || !pass) {
      console.error("Gmail credentials missing for partner email. GMAIL_USER:", !!user, "GMAIL_APP_PASSWORD:", !!pass);
      return res.status(500).json({ error: "Gmail credentials missing" });
    }

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    const mailOptions = {
      from: `"Sruvo" <${user}>`,
      to: email,
      subject: "We’ve Received Your Veterinary Partner Application",
      html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  body {
    margin: 0;
    padding: 0;
    background-color: #f8fafc;
    font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  .wrapper {
    width: 100%;
    table-layout: fixed;
    background-color: #f8fafc;
    padding-bottom: 40px;
  }
  .main {
    background-color: #ffffff;
    margin: 0 auto;
    width: 100%;
    max-width: 600px;
    border-spacing: 0;
    font-family: sans-serif;
    color: #4a4a4a;
    border-radius: 24px;
    overflow: hidden;
    margin-top: 40px;
    box-shadow: 0 20px 50px rgba(0,0,0,0.05);
  }
  .header {
    padding: 40px 0 20px;
    text-align: center;
  }
  .logo-img {
    width: 70px;
    height: auto;
    display: block;
    margin: 0 auto 12px;
  }
  .brand-name {
    font-size: 32px;
    font-weight: 800;
    margin: 0;
    letter-spacing: -1px;
    color: #7a5cff;
  }
  .content {
    padding: 0 40px 40px;
    text-align: center;
  }
  .tag {
    display: inline-block;
    background-color: #f0eaff;
    color: #7a5cff;
    font-size: 11px;
    font-weight: 700;
    padding: 8px 16px;
    border-radius: 100px;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 24px;
  }
  h1 {
    font-size: 28px;
    color: #1a1a1a;
    margin: 0 0 16px;
    line-height: 1.2;
    font-weight: 800;
  }
  p {
    font-size: 16px;
    line-height: 1.6;
    color: #555555;
    margin: 0 0 24px;
  }
  .info-card {
    background-color: #fcfaff;
    border: 1px solid #f0eaff;
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 32px;
    text-align: left;
  }
  .next-steps {
    background: linear-gradient(135deg, #ffffff, #f9f8ff);
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 32px;
    text-align: left;
    border: 1px solid #eee;
  }
  .step-title {
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 12px;
    display: block;
    font-size: 15px;
  }
  .step-item {
    margin-bottom: 8px;
    font-size: 14px;
    color: #666;
    display: block;
  }
  .btn-container {
    padding: 20px 0;
  }
  .button {
    background-color: #7a5cff;
    background: linear-gradient(90deg, #ff7eb3, #7a5cff);
    color: #ffffff !important;
    text-decoration: none;
    padding: 16px 40px;
    border-radius: 14px;
    font-weight: 700;
    font-size: 16px;
    display: inline-block;
    box-shadow: 0 10px 25px rgba(122, 92, 255, 0.3);
  }
  .footer {
    text-align: center;
    padding: 30px 0;
    color: #999999;
    font-size: 12px;
  }
  .footer p {
    font-size: 12px;
    margin-bottom: 8px;
  }
  @media screen and (max-width: 600px) {
    .main {
      margin-top: 20px;
      border-radius: 0;
    }
    .content {
      padding: 0 24px 40px;
    }
    h1 {
      font-size: 24px;
    }
  }
</style>
</head>
<body>
  <center class="wrapper">
    <table class="main" width="100%">
      <tr>
        <td class="header">
          <img src="https://lh3.googleusercontent.com/d/1n2SgWctS5RgMjR2Uouvq-KpsqW5_ASxx" alt="Sruvo Logo" class="logo-img">
          <h2 class="brand-name">Sruvo</h2>
        </td>
      </tr>
      <tr>
        <td class="content">
          <div class="tag">Application Received</div>
          <h1>🚀 You're One Step Closer to Joining Sruvo</h1>
          <p>Hi <strong>${name}</strong>,</p>
          <p>Your application to become a <strong>Veterinary Partner</strong> has been successfully submitted. We’re excited to review your profile and explore a potential partnership.</p>
          
          <div class="info-card">
            <p style="margin:0; font-size: 14px;">Our team carefully evaluates each application to ensure we maintain a trusted, high-quality network for pet parents across the ecosystem.</p>
          </div>

          <div class="next-steps">
            <span class="step-title">⏱ What happens next?</span>
            <span class="step-item">• Our team is currently reviewing your credentials.</span>
            <span class="step-item">• We may reach out for additional verification if needed.</span>
            <span class="step-item">• You will receive a status update within <strong>24–48 hours</strong>.</span>
          </div>

          <div class="btn-container">
            <a href="https://sruvo.com/how-it-works" class="button">Explore the Platform</a>
          </div>

          <p style="margin-top: 32px; font-size: 14px; color: #888;">We appreciate your interest in building a better future for pet care with us 🐾</p>
        </td>
      </tr>
    </table>
    <div class="footer">
      <p>© 2026 Sruvo • Built with care for pets & their people</p>
      <p>This is an automated message — replies to this email are not monitored.</p>
    </div>
  </center>
</body>
</html>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true });
    } catch (err: any) {
      console.error("Partner Email Error:", err);
      res.status(500).json({ error: err.message });
    }
});

async function startServer() {
  // Only run this if NOT on Vercel
  if (process.env.VERCEL) return;

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

export default app;
