import { useEffect, useMemo, useRef, useState } from "react";
import Header from "./components/Header";
import HeroScene from "./components/HeroScene";
import MessageList from "./components/MessageList";
import ChatInput from "./components/ChatInput";

function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);

  const API_BASE = useMemo(() => {
    const env = import.meta.env.VITE_BACKEND_URL;
    return env && env.length > 0 ? env : "";
  }, []);

  // Load recent conversation list and start a fresh one on first mount
  useEffect(() => {
    // create a conversation on first mount for a smooth start
    const init = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/conversations`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: "CodeBro Chat" }),
        });
        const data = await res.json();
        setConversationId(data.conversation_id);
      } catch (e) {
        console.error(e);
      }
    };
    init();
  }, [API_BASE]);

  const send = async (text) => {
    const localId = `${Date.now()}-${Math.random()}`;
    const next = [...messages, { role: "user", content: text, localId }];
    setMessages(next);
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, conversation_id: conversationId }),
      });
      const data = await res.json();
      if (data?.conversation_id && !conversationId) setConversationId(data.conversation_id);
      setMessages([
        ...next,
        { role: "assistant", content: data.reply, localId: `${localId}-r` },
      ]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-fuchsia-50">
      <div className="mx-auto max-w-3xl px-4 py-6 md:py-10">
        <Header />
        <HeroScene />

        <div className="rounded-3xl border border-slate-200 bg-white/70 backdrop-blur p-4 md:p-6 shadow-lg">
          <div className="mb-4 md:mb-6">
            <MessageList messages={messages} loading={loading} />
          </div>
          <ChatInput onSend={send} disabled={loading} />
        </div>

        <p className="text-center text-xs text-slate-500 mt-6">
          Built with love by CodeBro • Demo responses are rule-based and saved to your database
        </p>
      </div>
    </div>
  );
}

export default App;
