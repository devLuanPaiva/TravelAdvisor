"use client";
import { motion } from "framer-motion";

export function MotionProgressBar() {
  return (
    <div className="relative w-full h-2 bg-gray-200 rounded overflow-hidden  mb-3">
      <motion.div
        className="absolute top-0 left-0 h-full bg-gray-950 mb-3"
        initial={{ x: "-100%", width: "99%" }}
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
