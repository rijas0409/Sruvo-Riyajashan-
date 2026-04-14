import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from "nodemailer";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, name } = req.body;
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "");

  if (!user || !pass) {
    return res.status(500).json({ error: "Gmail credentials missing" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `"Sruvo" <${user}>`,
      to: email,
      subject: "You’re In — Sruvo Early Access Confirmed",
      html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  body { margin: 0; padding: 0; background: #f5f7fb; font-family: Arial, sans-serif; }
  .wrapper { max-width: 600px; margin: auto; padding: 20px; }
  .container { background: #ffffff; border-radius: 20px; padding: 35px 25px; text-align: center; box-shadow: 0 10px 40px rgba(0,0,0,0.05); }
  .logo-img { width: 130px; margin-bottom: 15px; }
  h1 { font-size: 26px; color: #222; }
  p { color: #666; font-size: 15px; line-height: 1.6; }
  .highlight { color: #7a5cff; font-weight: 600; }
  .button { display: inline-block; margin-top: 20px; padding: 14px 26px; border-radius: 12px; background: linear-gradient(90deg, #ff7eb3, #7a5cff); color: #fff; text-decoration: none; font-weight: 600; }
</style>
</head>
<body>
<div class="wrapper">
  <div class="container">
    <img src="https://lh3.googleusercontent.com/d/1n2SgWctS5RgMjR2Uouvq-KpsqW5_ASxx" alt="Sruvo Logo" class="logo-img">
    <h1>The Future of <span class="highlight">Pet Care</span> is Here 🐾</h1>
    <p>Hi ${name}, we’ve successfully received your request for <span class="highlight">Sruvo Early Access</span>.</p>
    <p>You're now part of an exclusive community shaping the future of modern pet care.</p>
    <a href="https://sruvo.com" class="button">Check Your Status</a>
  </div>
</div>
</body>
</html>`
    });
    return res.status(200).json({ success: true });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
