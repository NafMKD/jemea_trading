import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, product, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"Jemea Trading Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || "info@jemeatrading.com",
      replyTo: email,
      subject: `New Inquiry from ${name}${company ? ` (${company})` : ""}`,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #2c1810; padding: 24px 32px;">
            <h1 style="color: #d4a017; margin: 0; font-size: 24px;">New Contact Inquiry</h1>
          </div>
          <div style="padding: 32px; background: #faf6f1; border: 1px solid #e0c9ac;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #4a2d1f; width: 120px;">Name:</td>
                <td style="padding: 8px 0; color: #2c1810;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #4a2d1f;">Email:</td>
                <td style="padding: 8px 0; color: #2c1810;">${email}</td>
              </tr>
              ${company ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #4a2d1f;">Company:</td><td style="padding: 8px 0; color: #2c1810;">${company}</td></tr>` : ""}
              ${product ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #4a2d1f;">Product:</td><td style="padding: 8px 0; color: #2c1810;">${product}</td></tr>` : ""}
            </table>
            <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #e0c9ac;">
              <p style="font-weight: bold; color: #4a2d1f; margin-bottom: 8px;">Message:</p>
              <p style="color: #2c1810; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          <div style="padding: 16px 32px; background: #2c1810; text-align: center;">
            <p style="color: #8a552c; font-size: 12px; margin: 0;">Sent from Jemea Trading website contact form</p>
          </div>
        </div>
      `,
    };

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      await transporter.sendMail(mailOptions);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
