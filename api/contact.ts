import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from "nodemailer";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "");

  if (!user || !pass) {
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
    await Promise.all([
      transporter.sendMail({
        from: `"${name}" <${user}>`,
        to: email,
        envelope: { from: user, to: [user] },
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
  body { margin: 0; padding: 0; background: #f5f7fb; font-family: Arial, sans-serif; }
  .wrapper { max-width: 600px; margin: auto; padding: 20px; }
  .container { background: #ffffff; border-radius: 18px; padding: 25px; box-shadow: 0 10px 40px rgba(0,0,0,0.05); }
  .header { text-align: center; margin-bottom: 20px; }
  .logo { font-size: 28px; font-weight: 800; color: #7a5cff; }
  .card { background: #ffffff; border-radius: 14px; padding: 16px; margin-top: 15px; box-shadow: 0 6px 20px rgba(0,0,0,0.04); }
  .message-box { background: #f9fafc; border-radius: 10px; padding: 12px; border: 1px solid #eee; font-size: 14px; color: #444; line-height: 1.5; }
  .button { display: inline-block; margin-top: 18px; padding: 12px 20px; border-radius: 10px; background: linear-gradient(90deg, #ff7eb3, #7a5cff); color: #ffffff !important; text-decoration: none; font-size: 14px; font-weight: 600; }
</style>
</head>
<body>
<div class="wrapper">
  <div class="container">
    <div class="header">
      <div class="logo">Sruvo</div>
      <div style="font-size: 20px; color: #222;">New Contact Submission 📩</div>
    </div>
    <div class="card">
      <div style="font-size: 12px; color: #888;">Full Name</div>
      <div style="font-size: 14px; color: #222; font-weight: 500;">${name}</div>
      <div style="font-size: 12px; color: #888; margin-top: 10px;">Email Address</div>
      <div style="font-size: 14px; color: #222; font-weight: 500;">${email}</div>
    </div>
    <div class="card">
      <div style="font-size: 12px; color: #888;">Message</div>
      <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
    </div>
    <div style="text-align:center;">
      <a href="mailto:${email}?subject=Re: [SUPPORT-REQUEST] New Contact Form: ${subject}&body=${replyBody}" class="button">Reply to User</a>
    </div>
  </div>
</div>
</body>
</html>`
      }),
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
</style>
</head>
<body>
<div class="wrapper">
  <div class="container">
    <img class="logo-img" src="https://lh3.googleusercontent.com/d/1n2SgWctS5RgMjR2Uouvq-KpsqW5_ASxx" alt="Sruvo Logo" />
    <h1>We’ve Got Your Message ✉️</h1>
    <p>Hi ${name},</p>
    <p>Thank you for reaching out to <b>Sruvo</b>. We’ve successfully received your request regarding "<b>${subject}</b>".</p>
    <p>Our support team will connect with you within <b>24–48 hours</b>.</p>
  </div>
</div>
</body>
</html>`
      })
    ]);
    return res.status(200).json({ success: true });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
