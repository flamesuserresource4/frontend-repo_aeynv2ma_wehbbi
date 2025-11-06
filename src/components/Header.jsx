import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

export default function Header() {
  return (
    <div className="relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3"
      >
        <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
          <Rocket className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            CodeBro
          </h1>
          <p className="text-sm text-slate-500">Your friendly coding copilot</p>
        </div>
      </motion.div>

      {/* Animated shine */}
      <motion.div
        aria-hidden
        className="absolute -inset-x-20 -top-10 h-24 bg-gradient-to-r from-transparent via-blue-200/30 to-transparent pointer-events-none"
        initial={{ x: -200 }}
        animate={{ x: 200 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      />
    </div>
  );
}
