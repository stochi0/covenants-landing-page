import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { CONTACT } from "@/lib/contact";

export const runtime = "nodejs";

type ContactPayload = {
  name: string;
  email: string;
  country: string;
  company: string;
  phone: string;
  lookingFor?: string;
  message?: string;
  // Honeypot field: should remain empty
  website?: string;
};

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getEnv(name: string) {
  const v = process.env[name];
  return typeof v === "string" ? v.trim() : "";
}

function buildInternalEmail(payload: ContactPayload) {
  const subject = `New partner inquiry: ${payload.lookingFor || "General"} — ${payload.name}`;
  const lines = [
    `Name: ${payload.name}`,
    `Work Email: ${payload.email}`,
    `Country: ${payload.country}`,
    `Company: ${payload.company}`,
    `Phone: ${payload.phone}`,
    `Looking For: ${payload.lookingFor || "General"}`,
    "",
    payload.message || "",
  ].filter(Boolean);

  const text = lines.join("\n");
  const html = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; line-height: 1.5;">
      <h2 style="margin:0 0 12px;">New Partner Inquiry</h2>
      <table cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
        <tr><td style="padding:4px 12px 4px 0; color:#555;">Name</td><td style="padding:4px 0;"><b>${escapeHtml(payload.name)}</b></td></tr>
        <tr><td style="padding:4px 12px 4px 0; color:#555;">Work Email</td><td style="padding:4px 0;"><b>${escapeHtml(payload.email)}</b></td></tr>
        <tr><td style="padding:4px 12px 4px 0; color:#555;">Country</td><td style="padding:4px 0;">${escapeHtml(payload.country)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0; color:#555;">Company</td><td style="padding:4px 0;">${escapeHtml(payload.company)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0; color:#555;">Phone</td><td style="padding:4px 0;">${escapeHtml(payload.phone)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0; color:#555;">Looking For</td><td style="padding:4px 0;">${escapeHtml(payload.lookingFor || "General")}</td></tr>
      </table>
      ${
        payload.message
          ? `<h3 style="margin:16px 0 8px;">Message</h3><pre style="white-space: pre-wrap; background:#f7f7f7; padding:12px; border-radius:8px; border:1px solid #eee;">${escapeHtml(payload.message)}</pre>`
          : ""
      }
    </div>
  `;

  return { subject, text, html };
}

function buildAcknowledgementEmail(payload: ContactPayload) {
  const subject = "We received your message — Covenants Pharmachem";
  const text = [
    `Hi ${payload.name},`,
    "",
    "Thanks for contacting Covenants Pharmachem. We’ve received your inquiry and our team will get back to you shortly.",
    "",
    "Summary:",
    `- Looking for: ${payload.lookingFor || "General"}`,
    `- Company: ${payload.company}`,
    `- Country: ${payload.country}`,
    `- Phone: ${payload.phone}`,
    "",
    payload.message ? "Your message:" : "",
    payload.message || "",
    "",
    `If you need to add more details, reply to this email.`,
    "",
    "— Covenants Pharmachem",
    CONTACT.email,
  ].filter(Boolean);

  const html = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; line-height: 1.5;">
      <p>Hi <b>${escapeHtml(payload.name)}</b>,</p>
      <p>Thanks for contacting <b>Covenants Pharmachem</b>. We’ve received your inquiry and our team will get back to you shortly.</p>
      <div style="background:#f7f7f7; padding:12px; border-radius:10px; border:1px solid #eee;">
        <div><b>Looking for:</b> ${escapeHtml(payload.lookingFor || "General")}</div>
        <div><b>Company:</b> ${escapeHtml(payload.company)}</div>
        <div><b>Country:</b> ${escapeHtml(payload.country)}</div>
        <div><b>Phone:</b> ${escapeHtml(payload.phone)}</div>
      </div>
      ${
        payload.message
          ? `<p style="margin-top:16px;"><b>Your message:</b></p><pre style="white-space: pre-wrap; background:#fff; padding:12px; border-radius:8px; border:1px solid #eee;">${escapeHtml(payload.message)}</pre>`
          : ""
      }
      <p style="margin-top:16px;">If you need to add more details, reply to this email.</p>
      <p style="margin-top:16px;">— Covenants Pharmachem<br/>${escapeHtml(CONTACT.email)}</p>
    </div>
  `;

  return { subject, text: text.join("\n"), html };
}

export async function POST(req: Request) {
  let payload: ContactPayload;
  try {
    payload = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  // Basic bot protection (honeypot)
  if (isNonEmptyString(payload.website)) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const requiredFields: Array<keyof ContactPayload> = [
    "name",
    "email",
    "country",
    "company",
    "phone",
  ];

  for (const key of requiredFields) {
    if (!isNonEmptyString(payload[key])) {
      return NextResponse.json(
        { ok: false, error: `Missing required field: ${key}` },
        { status: 400 },
      );
    }
  }

  const smtpHost = getEnv("SMTP_HOST");
  const smtpPortRaw = getEnv("SMTP_PORT");
  const smtpUser = getEnv("SMTP_USER");
  const smtpPass = getEnv("SMTP_PASS");
  const mailTo = getEnv("CONTACT_TO") || CONTACT.email;
  const mailFrom = getEnv("MAIL_FROM") || smtpUser || CONTACT.email;

  const smtpPort = Number(smtpPortRaw || "587");
  if (!smtpHost || !smtpUser || !smtpPass || !Number.isFinite(smtpPort)) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Email is not configured on the server. Missing SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS.",
      },
      { status: 500 },
    );
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: false, // Outlook/Office365 uses STARTTLS on 587
    auth: { user: smtpUser, pass: smtpPass },
  });

  const internal = buildInternalEmail(payload);
  const ack = buildAcknowledgementEmail(payload);

  try {
    // 1) Send to Covenants inbox (reply goes to the sender)
    await transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      replyTo: payload.email,
      subject: internal.subject,
      text: internal.text,
      html: internal.html,
    });

    // 2) Send acknowledgement to sender
    await transporter.sendMail({
      from: mailFrom,
      to: payload.email,
      replyTo: mailTo,
      subject: ack.subject,
      text: ack.text,
      html: ack.html,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to send email";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}


