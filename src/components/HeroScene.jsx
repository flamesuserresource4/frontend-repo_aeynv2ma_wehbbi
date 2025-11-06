import Spline from "@splinetool/react-spline";
import { motion } from "framer-motion";

export default function HeroScene() {
  return (
    <div className="relative h-[260px] md:h-[320px] w-full rounded-3xl overflow-hidden mb-6">
      <Spline scene="https://prod.spline.design/wl8fDvM6DPbJ4mW4/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      <motion.div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      />
    </div>
  );
}
