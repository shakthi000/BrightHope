import { Resend } from "resend";
import { SITE } from "@/lib/constants";
import { formatDate, formatTime } from "@/lib/utils";

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return new Resend(apiKey);
}

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "Bright Hope <onboarding@resend.dev>";

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

async function sendWithRetry(
  payload: Parameters<Resend["emails"]["send"]>[0]
): Promise<{ success: boolean; error?: string }> {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const resend = getResend();
      const { error } = await resend.emails.send(payload);
      if (!error) return { success: true };
      if (attempt === MAX_RETRIES) return { success: false, error: error.message };
    } catch (err) {
      if (attempt === MAX_RETRIES) {
        return {
          success: false,
          error: err instanceof Error ? err.message : "Unknown error",
        };
      }
    }
    await new Promise((r) => setTimeout(r, RETRY_DELAY_MS * attempt));
  }
  return { success: false, error: "Max retries exceeded" };
}

function baseTemplate(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bright Hope</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f9f6;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f0f9f6;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          <tr>
            <td style="background:linear-gradient(135deg,#287562,#35927a);padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:600;letter-spacing:0.5px;">Bright Hope</h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">Counselling & Coaching Centre</p>
            </td>
          </tr>
          <tr>
            <td style="padding:40px;">
              ${content}
            </td>
          </tr>
          <tr>
            <td style="background-color:#f0f9f6;padding:24px 40px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0;color:#6b7280;font-size:12px;line-height:1.6;">
                ${SITE.address.full}<br>
                Phone: ${SITE.phoneFormatted} | Email: ${SITE.email}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function fieldRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 0;border-bottom:1px solid #f3f4f6;">
      <strong style="color:#287562;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;">${label}</strong><br>
      <span style="color:#374151;font-size:15px;">${value}</span>
    </td>
  </tr>`;
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  const timestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });

  const content = `
    <h2 style="margin:0 0 24px;color:#1c3f38;font-size:20px;">New Contact Form Submission</h2>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
      ${fieldRow("Name", data.name)}
      ${fieldRow("Email", data.email)}
      ${fieldRow("Phone", data.phone)}
      ${fieldRow("Subject", data.subject)}
      ${fieldRow("Message", data.message.replace(/\n/g, "<br>"))}
      ${fieldRow("Timestamp", timestamp)}
    </table>`;

  return sendWithRetry({
    from: FROM_EMAIL,
    to: SITE.email,
    subject: `[Contact] ${data.subject} — ${data.name}`,
    html: baseTemplate(content),
    replyTo: data.email,
  });
}

export async function sendContactConfirmation(data: {
  name: string;
  email: string;
}) {
  const content = `
    <h2 style="margin:0 0 16px;color:#1c3f38;font-size:20px;">Thank You, ${data.name}!</h2>
    <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 16px;">
      We have received your message and appreciate you reaching out to Bright Hope Counselling & Coaching Centre.
    </p>
    <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 16px;">
      Our team will review your enquiry and get back to you. If your matter is urgent, please call us at <strong>${SITE.phoneFormatted}</strong>.
    </p>
    <p style="color:#6b7280;font-size:14px;line-height:1.6;margin:0;">
      With warmth and hope,<br>
      <strong style="color:#287562;">The Bright Hope Team</strong>
    </p>`;

  return sendWithRetry({
    from: FROM_EMAIL,
    to: data.email,
    subject: "We received your message — Bright Hope",
    html: baseTemplate(content),
  });
}

export async function sendAppointmentNotification(data: {
  bookingId: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message: string;
}) {
  const timestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });

  const content = `
    <h2 style="margin:0 0 24px;color:#1c3f38;font-size:20px;">New Appointment Booking</h2>
    <div style="background:#f0f9f6;border-radius:8px;padding:16px;margin-bottom:24px;text-align:center;">
      <span style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Booking ID</span><br>
      <strong style="color:#287562;font-size:22px;letter-spacing:1px;">${data.bookingId}</strong>
    </div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
      ${fieldRow("Name", data.name)}
      ${fieldRow("Email", data.email)}
      ${fieldRow("Phone", data.phone)}
      ${fieldRow("Service", data.service)}
      ${fieldRow("Preferred Date", formatDate(data.date))}
      ${fieldRow("Preferred Time", formatTime(data.time))}
      ${data.message ? fieldRow("Message", data.message.replace(/\n/g, "<br>")) : ""}
      ${fieldRow("Timestamp", timestamp)}
    </table>`;

  return sendWithRetry({
    from: FROM_EMAIL,
    to: SITE.email,
    subject: `[Booking] ${data.bookingId} — ${data.name}`,
    html: baseTemplate(content),
    replyTo: data.email,
  });
}

export async function sendAppointmentConfirmation(data: {
  bookingId: string;
  name: string;
  email: string;
  service: string;
  date: string;
  time: string;
}) {
  const content = `
    <h2 style="margin:0 0 16px;color:#1c3f38;font-size:20px;">Appointment Request Confirmed</h2>
    <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 24px;">
      Dear ${data.name}, thank you for choosing Bright Hope. Your appointment request has been received.
    </p>
    <div style="background:#f0f9f6;border-radius:12px;padding:24px;margin-bottom:24px;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
        ${fieldRow("Booking ID", data.bookingId)}
        ${fieldRow("Service", data.service)}
        ${fieldRow("Preferred Date", formatDate(data.date))}
        ${fieldRow("Preferred Time", formatTime(data.time))}
      </table>
    </div>
    <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 16px;">
      We will confirm your appointment shortly. If you need to make changes, please contact us at <strong>${SITE.phoneFormatted}</strong> or reply to this email.
    </p>
    <p style="color:#6b7280;font-size:14px;line-height:1.6;margin:0;">
      With warmth and hope,<br>
      <strong style="color:#287562;">The Bright Hope Team</strong>
    </p>`;

  return sendWithRetry({
    from: FROM_EMAIL,
    to: data.email,
    subject: `Appointment Confirmed — ${data.bookingId}`,
    html: baseTemplate(content),
  });
}
