import Groq from "groq-sdk";
import { rateLimit } from "@/lib/rateLimit";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "anonymous";
    const { success, remaining } = await rateLimit(ip);

    if (!success) {
      return Response.json(
        { error: "Daily limit reached." },
        { status: 429 }
      );
    }

    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== "string" || prompt.length > 2000) {
      return Response.json({ error: "Invalid request." }, { status: 400 });
    }

    const stream = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 1000,
      stream: true,
      messages: [{ role: "user", content: prompt }],
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content || "";
          if (text) {
            controller.enqueue(encoder.encode(text));
          }
        }
        controller.enqueue(
          encoder.encode(`\n__REMAINING__:${remaining}`)
        );
        controller.close();
      },
    });

    return new Response(readable, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });

  } catch (error) {
    console.error("Generate error:", error);
    return Response.json(
      { error: "Generation failed. Please try again." },
      { status: 500 }
    );
  }
}