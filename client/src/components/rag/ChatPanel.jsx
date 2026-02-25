import { useState, useRef, useEffect } from "react";
import API from "../../api/axios";

export default function ChatPanel() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  // ✅ auto scroll inside chat container
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const askQuestion = async () => {
    if (!question.trim() || loading) return;

    const userMsg = { role: "user", text: question };

    setMessages((prev) => [...prev, userMsg]);
    setQuestion("");
    setLoading(true);

    try {
      const res = await API.post("/chat", {
        question,
      });

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: res.data.answer },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "⚠️ Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    // ✅ FULL HEIGHT CONTAINER
    <div className="h-full flex flex-col bg-gray-50 overflow-hidden">

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-10 py-6 space-y-6">

        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-20 px-4">
            Ask questions about your uploaded document 📄
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[90%] sm:max-w-[75%] px-4 py-3 rounded-2xl shadow-sm ${
                msg.role === "user"
                  ? "bg-indigo-600 text-white rounded-br-md"
                  : "bg-white border rounded-bl-md"
              }`}
            >
              <p className="whitespace-pre-wrap text-sm md:text-base">
                {msg.text}
              </p>
            </div>
          </div>
        ))}

        {/* typing indicator */}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border px-4 py-3 rounded-2xl">
              AI is thinking...
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* INPUT AREA (STICKY BOTTOM) */}
      <div className="border-t bg-white p-3 sm:p-4">
        <div className="flex gap-2 sm:gap-3 max-w-4xl mx-auto">

          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && askQuestion()
            }
            placeholder="Ask anything about your document..."
            className="flex-1 border rounded-full px-4 sm:px-5 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            onClick={askQuestion}
            disabled={loading}
            className="bg-indigo-600 text-white px-5 sm:px-6 rounded-full hover:bg-indigo-700 transition disabled:opacity-50"
          >
            Ask
          </button>

        </div>
      </div>
    </div>
  );
}