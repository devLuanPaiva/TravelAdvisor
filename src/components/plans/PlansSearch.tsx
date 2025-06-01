"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

export function PlansSearch() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "w-full max-w-4xl mx-auto p-6 md:p-8 bg-neutral-100 rounded-2xl shadow-xl"
      )}
    >
      <form className="flex flex-col md:flex-row gap-4 items-stretch justify-between">
        <label>
          <span className="text-xs font-bold">Check-in</span>
          <input
            type="datetime-local"
            className={cn(
              "flex-1 p-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-500 transition"
            )}
            placeholder="Check-in"
          />
        </label>
        <label>
          <span className="text-xs font-bold">Check-out</span>
          <input
            type="datetime-local"
            className={cn(
              "flex-1 p-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-500 transition"
            )}
            placeholder="Check-out"
          />
        </label>
        <label>
          <span className="text-xs font-bold">Destino</span>
          <input
            type="search"
            className={cn(
              "flex-1 p-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-500 transition"
            )}
            placeholder="Destino"
          />
        </label>
        <button
          type="submit"
          className={cn(
            "flex items-center justify-center gap-2 p-3 px-5 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 transition"
          )}
        >
          <FaSearch className="text-white" />
          Buscar
        </button>
      </form>
    </motion.section>
  );
}
