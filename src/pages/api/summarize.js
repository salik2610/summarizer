import Groq from "groq-sdk";

const groq = new Groq({ apiKey: "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" });

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { transcript, instruction } = req.body;
    if (!transcript) return res.status(400).json({ error: "Transcript required" });

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "Summarize transcripts into structured meeting notes." },
        { role: "user", content: `Instruction: ${instruction || "Summarize the following transcript."}\n\nTranscript:\n${transcript}` },
      ],
      temperature: 0.2,
    });

    const summary = completion.choices?.[0]?.message?.content?.trim();
    if (!summary) {
      return res.status(500).json({ error: "No summary returned from model" });
    }
    res.json({ summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Summarization failed" });
  }
}
