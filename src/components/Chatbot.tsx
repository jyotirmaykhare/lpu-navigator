import React, { useState } from "react";

// Replace this with your actual AI/chat API endpoint
const API_URL = "https://api.openai.com/v1/chat/completions";

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm your campus AI assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    setMessages((msgs) => [...msgs, userMessage]);
    setInput("");
    setLoading(true);
    try {
      // Example: Replace with your actual API call and authentication
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [...messages, userMessage],
        }),
      });
      const data = await response.json();
      const aiMessage = data.choices?.[0]?.message?.content || "Sorry, I couldn't process that.";
      setMessages((msgs) => [...msgs, { role: "assistant", content: aiMessage }]);
    } catch (err) {
      setMessages((msgs) => [...msgs, { role: "assistant", content: "Error: Unable to reach AI service." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 max-w-full bg-white dark:bg-gray-900 shadow-lg rounded-xl border p-4 flex flex-col gap-2">
      <div className="flex-1 overflow-y-auto max-h-64 mb-2">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 text-sm ${msg.role === "user" ? "text-right" : "text-left"}`}>
            <span className={msg.role === "user" ? "bg-primary text-primary-foreground px-2 py-1 rounded-lg" : "bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-lg"}>
              {msg.content}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          className="flex-1 border rounded-lg px-2 py-1 text-sm bg-gray-50 dark:bg-gray-800"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-primary text-primary-foreground px-3 py-1 rounded-lg text-sm disabled:opacity-50"
          disabled={loading || !input.trim()}
        >
          {loading ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
