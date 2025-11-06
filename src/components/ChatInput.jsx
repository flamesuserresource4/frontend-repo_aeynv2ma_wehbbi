import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const v = value.trim();
    if (!v) return;
    onSend(v);
    setValue("");
  };

  return (
    <form onSubmit={submit} className="relative">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/70 backdrop-blur px-3 py-2 shadow-sm"
      >
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ask CodeBro anything about code…"
          className="flex-1 bg-transparent outline-none text-slate-800 placeholder:text-slate-400 py-2"
        />
        <button
          type="submit"
          disabled={disabled}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 disabled:bg-blue-300 text-white px-3 py-2 font-medium shadow hover:bg-blue-700 transition"
        >
          <Send className="w-4 h-4" />
          Send
        </button>
      </motion.div>
    </form>
  );
}
