import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";
interface Message {
  role: "user" | "system";
  content: string;
}

const LLM_MODEL = "mixtral-8x7b-32768";
const BASE_URL = "https://api.groq.com/openai/v1";
const TEMPERATURE = 0.5;
const MAX_TOKENS = 1024;
const API_KEY = process.env.GROQ_API_KEY || "";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: API_KEY,
  baseURL: BASE_URL,
});

export async function POST(req: Request) {
  const { messages } = await req.json();
  // Ask Groq for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: LLM_MODEL,
    stream: true,
    messages,
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
