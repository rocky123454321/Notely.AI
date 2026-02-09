import dotenv from "dotenv";
dotenv.config();


import asyncHandler from "express-async-handler";
import Chat from "../models/Chat.js";
import { OpenRouter } from "@openrouter/sdk";

const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY
});


export const getChats = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const chats = await Chat.find({ userId }).sort({ createdAt: 1 });
  res.status(200).json(chats);
});


export const sendMessage = asyncHandler(async (req, res) => {
  const { message } = req.body;
  const userId = req.user._id; 

  if (!message) {
    res.status(400);
    throw new Error("Message is required");
  }


  const savedMessage = await Chat.create({
    userId,
    role: "user",
    content: message
  });

  let aiReply = "";

  try {

    const stream = await openrouter.chat.send({
      model: "arcee-ai/trinity-large-preview:free",
      messages: [{ role: "user", content: message }],
      stream: true
    });

   
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) aiReply += content;
    }

   
    await Chat.create({
      userId,
      role: "assistant",
      content: aiReply
    });

    
    res.status(200).json({ reply: aiReply });

  } catch (err) {
    console.error("OpenRouter Error:", err.message);

    res.status(200).json({
      reply: "AI service not available. Your message was saved.",
      message: savedMessage
    });
  }
});
