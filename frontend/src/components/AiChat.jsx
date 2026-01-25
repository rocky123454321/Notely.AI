import React, { useEffect, useRef, useState } from "react";
import api from "../../lib/axios";

const ChatMessage = ({ msg, typewriter, onUpdate }) => {
  const [displayedText, setDisplayedText] = useState(
    msg.role === "user" ? msg.content : ""
  );

  useEffect(() => {
    if (msg.role === "assistant" && typewriter) {
      setDisplayedText("");
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(msg.content.slice(0, i + 1));
        i++;
        onUpdate(); // scroll during typewriter
        if (i >= msg.content.length) clearInterval(interval);
      }, 30);
      return () => clearInterval(interval);
    } else if (msg.role === "assistant") {
      setDisplayedText(msg.content);
      onUpdate(); // scroll for old AI messages
    }
  }, [msg.content, msg.role, typewriter, onUpdate]);

  return (
    <div className="w-full flex">
      <div
        className={`max-w-[95%] break-words whitespace-pre-wrap rounded-lg px-4 py-2 border ${
          msg.role === "user"
            ? "ml-auto bg-black text-white border-black"
            : "bg-gray-50 text-gray-700 border-gray-200"
        }`}
      >
        {displayedText}
      </div>
    </div>
  );
};

const AiChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [latestAIIndex, setLatestAIIndex] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch chats from backend
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await api.get("/chat");
        setMessages(res.data);
        scrollBottom();
      } catch (err) {
        console.error("Failed to fetch chats", err);
      }
    };

    fetchChats();
  }, []);

  // Send message
  const sendMessage = async () => {
    if (!input.trim()) return;

    const text = input;
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await api.post("/chat", { message: text });

      setMessages((prev) => {
        const next = [...prev, { role: "assistant", content: res.data.reply }];
        setLatestAIIndex(next.length - 1);
        return next;
      });
    } catch (err) {
      console.error("Send failed", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "AI service not available. Your message was saved on the server.",
        },
      ]);
      setLatestAIIndex(messages.length);
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="w-full max-w-md sm:max-w-3xl md:max-w-5xl h-full bg-white border border-gray-200 rounded-xl flex flex-col overflow-hidden mx-auto shadow-lg">

  {/* Header */}
  <div className="flex-shrink-0 px-4 py-3 border-b border-gray-200 text-sm font-semibold text-gray-800 bg-gray-50">
    AI Assistant
  </div>

  {/* Messages area */}
  <div className="flex-1 flex flex-col overflow-y-auto px-4 py-3 space-y-3 bg-white">
    {messages.length === 0 && !loading && (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center text-gray-500 max-w-[85%]">
          <p className="text-sm font-medium">Start a conversation</p>
          <p className="mt-1 text-xs text-gray-400">
            Ask anything — ideas, summaries, or quick help.
          </p>
        </div>
      </div>
    )}

    {messages.map((msg, index) => (
      <ChatMessage
        key={index}
        msg={msg}
        typewriter={index === latestAIIndex}
        onUpdate={() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })}
      />
    ))}

    {loading && (
      <div className="flex justify-center py-2">
        <span className="loading loading-dots loading-sm" />
      </div>
    )}

    <div ref={messagesEndRef} />
  </div>

  {/* Input area */}
  <div className="flex-shrink-0 px-4 py-3 border-t border-gray-200 bg-gray-50">
    <div className="flex items-end gap-2">
      <textarea
        rows={2}
        placeholder="Describe your idea…"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 resize-none rounded-lg border border-gray-300 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-black placeholder-gray-400"
      />
      <button
        onClick={sendMessage}
        disabled={loading || input.trim() === ""}
        className="shrink-0 rounded-lg border border-gray-300 px-4 py-2 text-sm bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send
      </button>
    </div>
  </div>
</div>


  );
};

export default AiChat;
