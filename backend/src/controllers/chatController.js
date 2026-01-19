// src/controllers/chatController.js
import asyncHandler from "express-async-handler";
import Chat from "../models/Chat.js";
import { OpenRouter } from "@openrouter/sdk";

// Initialize OpenRouter with your API key from .env

const openrouter = new OpenRouter({ apiKey: "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" });

const result = await openrouter.chat.send({
  model: "xiaomi/mimo-v2-flash:free",
  messages: [{ role: "user", content: "Hello world!" }]
});

console.log(result);
// GET all chats
export const getAllChats = asyncHandler(async (req, res) => {
  const chats = await Chat.find().sort({ createdAt: 1 });
  res.status(200).json(chats);
});

// POST: send message
export const sendMessage = asyncHandler(async (req, res) => {
  const { message } = req.body;

  if (!message) {
    res.status(400);
    throw new Error("Message is required");
  }

  // 1️⃣ Save user message
  const savedMessage = await Chat.create({ role: "user", content: message });

  let aiReply = "";

  try {
    // 2️⃣ Send message to OpenRouter AI
    const stream = await openrouter.chat.send({
      model: "xiaomi/mimo-v2-flash:free", // free model
      messages: [{ role: "user", content: message }],
      stream: true,
      streamOptions: { includeUsage: true }
    });

    // 3️⃣ Collect AI response from stream
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) aiReply += content;
    }

    // 4️⃣ Save AI response
    await Chat.create({ role: "assistant", content: aiReply });

    // 5️⃣ Return AI response
    res.status(200).json({ reply: aiReply });

  } catch (err) {
    console.error("OpenRouter Error:", err.message);

    // Fallback: return simple message
    res.status(200).json({ 
      reply: "AI service not available. Your message was saved.", 
      message: savedMessage 
    });
  }
});
