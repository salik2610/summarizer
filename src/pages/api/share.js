import { Resend } from "resend";

const resend = new Resend("re_6XBdiYqV_FREJXz7KUFVYjqjfra1NxXd5");

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { recipients, subject, summary } = req.body;
    if (!recipients || !summary) {
      return res.status(400).json({ error: "Recipients and summary are required" });
    }

    // Support both array and comma-separated string for recipients
    let arr = [];
    if (Array.isArray(recipients)) {
      arr = recipients.map((r) => r.trim()).filter(Boolean);
    } else if (typeof recipients === "string") {
      arr = recipients
        .split(",")
        .map((r) => r.trim())
        .filter(Boolean);
    }

    if (arr.length === 0) {
      return res.status(400).json({ error: "No valid recipients provided" });
    }

    const emailSubject = subject || "Meeting Summary";
    const emailHtml = `<h2>${emailSubject}</h2><p>${(summary || "").replace(/\n/g, "<br>")}</p>`;

    const data = await resend.emails.send({
      from: process.env.RESEND_FROM || "Summarizer <onboarding@resend.dev>",
      to: arr,
      subject: emailSubject,
      html: emailHtml,
    });

    if (data.error) {
      return res.status(500).json({ error: data.error.message || "Email send failed" });
    }

    res.json({ ok: true, id: data.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Email send failed" });
  }
}
