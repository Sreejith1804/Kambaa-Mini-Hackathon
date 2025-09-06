import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function processTranscript(transcript) {
  // 1️⃣ Pre-check for empty or too short transcripts
  if (!transcript || transcript.trim().length < 10) {
    return {
      summary: "Transcript is empty or too short to summarize.",
      actionItems: [],
      taskAssignments: {}
    };
  }

  try {
    // 2️⃣ Construct prompt for OpenAI
    const prompt = `
You are an assistant summarizing meeting transcripts. 
Given the meeting text below, do the following:
1. Provide a concise summary (2-3 sentences max).
2. Extract action items (bullet points).
3. Extract task assignments (who will do what).

Meeting Transcript:
${transcript}

Respond in JSON format like this:
{
  "summary": "...",
  "actionItems": ["...", "..."],
  "taskAssignments": {"Alice": "...", "Bob": "..."}
}
Only provide valid JSON without extra characters or markdown.
`;

    // 3️⃣ Call OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2
    });

    let content = response.choices[0].message.content;

    // 4️⃣ Clean content from possible markdown
    content = content.replace(/```json|```/g, "").trim();

    // 5️⃣ Parse JSON
    const result = JSON.parse(content);
    return result;

  } catch (error) {
    console.error("Error processing transcript:", error);

    // 6️⃣ Handle specific OpenAI API errors
    if (error.code === "insufficient_quota") {
      return {
        summary: "Cannot generate summary: OpenAI quota exceeded.",
        actionItems: [],
        taskAssignments: {}
      };
    }

    return {
      summary: "Error generating summary.",
      actionItems: [],
      taskAssignments: {}
    };
  }
}
