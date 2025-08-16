import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_HGwrakVb_AfvvJeHeai6RPfkyxdTMSxRn");

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { recipients, subject, summary } = req.body;
    if (!recipients || !summary) {
      return res.status(400).json({ error: "Recipients and summary are required" });
    }
    const arr = recipients
      .split(",")
      .map((r) => r.trim())
      .filter(Boolean);

    if (arr.length === 0) {
      return res.status(400).json({ error: "No valid recipients provided" });
    }

    const emailSubject = subject || "Meeting Summary";
    const emailHtml = `<h2>${emailSubject}</h2><p>${(summary || "").replace(/\n/g, "<br>")}</p>`;

         await resend.emails.send({
       from: process.env.RESEND_FROM || "Summarizer <onboarding@resend.dev>"
       ,
       to: arr,
       subject: emailSubject,
       html: emailHtml,
     });

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Email send failed" });
  }
}
