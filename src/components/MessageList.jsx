import { motion, AnimatePresence } from "framer-motion";

function Bubble({ role, content }) {
  const me = role === "user";
  return (
    <div className={`flex ${me ? "justify-end" : "justify-start"}`}>
      <motion.div
        initial={{ opacity: 0, y: 6, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -6 }}
        className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-3 shadow-sm text-sm leading-relaxed whitespace-pre-wrap ${
          me
            ? "bg-blue-600 text-white rounded-br-md"
            : "bg-white text-slate-800 border border-slate-200 rounded-bl-md"
        }`}
      >
        {content}
      </motion.div>
    </div>
  );
}

export default function MessageList({ messages, loading }) {
  return (
    <div className="space-y-3">
      <AnimatePresence initial={false}>
        {messages.map((m) => (
          <Bubble key={m._id || m.localId} role={m.role} content={m.content} />
        ))}
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-slate-500 text-sm"
          >
            CodeBro is thinking…
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
