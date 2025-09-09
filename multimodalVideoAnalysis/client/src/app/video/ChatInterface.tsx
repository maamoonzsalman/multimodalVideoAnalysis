"use client";
import { useState } from "react";
import { Bot, Send, User } from "lucide-react";

type Message = {
  id: string;
  role: "bot" | "user";
  text: string;
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m-1",
      role: "bot",
      text:
        "Hello! I've analyzed your video and I'm ready to answer questions about its content. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", text: input.trim() },
    ]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "bot",
          text: "Great question! (This is a placeholder response.)",
        },
      ]);
    }, 400);
  };

  return (
    <div className="w-110">
      <div className="flex items-center space-x-2 bg-black/40 p-3 rounded-t-lg border border-purple-500/30">
        <Bot className="h-4 w-4 text-purple-400" />
        <div className="font-bold">Video Chat</div>
      </div>

      <div className="bg-black/40 p-4 border-x border-b border-purple-500/30 rounded-b-lg flex flex-col space-y-3 min-h-[280px]">
        <div className="flex flex-col space-y-3">
          {messages.map((m) =>
            m.role === "bot" ? (
              <div key={m.id} className="flex items-start space-x-2">
                <div className="shrink-0">
                  <Bot className="h-4 w-4 text-purple-400 mt-1" />
                </div>
                <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-2 text-gray-100 max-w-[85%]">
                  {m.text}
                </div>
              </div>
            ) : (
              <div key={m.id} className="flex items-start justify-end space-x-2">
                <div className="bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg px-3 py-2 text-white max-w-[85%]">
                  {m.text}
                </div>
                <div className="shrink-0">
                  <User className="h-4 w-4 text-white bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg p-1" />
                </div>
              </div>
            )
          )}
        </div>

        <form onSubmit={handleSubmit} className="mt-auto flex items-center space-x-2 pt-2">
          <div className="flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about the video content…"
              className="w-full p-2 bg-black border border-purple-500/40 rounded-lg text-white placeholder-gray-400"
            />
          </div>

          <button
            type="submit"
            className="shrink-0 p-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
            aria-label="Send"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </form>
      </div>
    </div>
  );
}
