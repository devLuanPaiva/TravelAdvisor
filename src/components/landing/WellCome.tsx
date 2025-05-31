"use client";
import Link from "next/link";
import { FiLogIn, FiMenu, FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import Image from "next/image";
import logo from "@/assets/whiteLogo.png";
import { useState } from "react";

export function WellCome() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="bg-gradient-to-b from-gray-800 via-gray-900 to-black w-full md:h-[50%] md:[clip-path:polygon(0%_0%,100%_0%,100%_100%,30%_100%)] flex justify-end">
      <div className="w-full md:w-[70%] h-full flex flex-col p-4 md:justify-end items-end text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full h-full flex flex-col p-6 justify-between items-center md:items-end text-white"
        >
          <div className="flex items-center justify-between w-full gap-x-4">
            <Image
              src={logo}
              alt="travel-logo"
              width={100}
              height={100}
              className="h-10 w-10 md:hidden"
            />

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white text-2xl"
              aria-label="Abrir menu"
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>

            <motion.nav
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="hidden md:flex flex-1 max-w-[90%] flex-wrap justify-between gap-4"
            >
              <Link href="/sign-in">Acessar</Link>
              <Link href="/">Voos</Link>
              <Link href="/">Cidades</Link>
              <Link href="/">Promocões</Link>
              <Link href="/">Contato</Link>
            </motion.nav>
          </div>

          {menuOpen && (
            <div className="md:hidden w-full flex flex-col items-center mt-4 gap-2">
              <Link href="/sign-in" className="text-white">
                Acessar
              </Link>
              <Link href="/" className="text-white">
                Voos
              </Link>
              <Link href="/" className="text-white">
                Cidades
              </Link>
              <Link href="/" className="text-white">
                Promocões
              </Link>
              <Link href="/" className="text-white">
                Contato
              </Link>
            </div>
          )}

          <div className="flex flex-col items-center md:items-end mt-6 md:mt-0">
            <motion.h1
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-center md:text-right"
            >
              Travel Advisor
            </motion.h1>
            <motion.p
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg md:text-xl mb-4 text-gray-300 text-center md:text-right"
            >
              Seu planejador de viagens.
            </motion.p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                href="/sign-in"
                className="inline-flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 transition-colors px-5 py-2 rounded-full shadow-md"
              >
                <FiLogIn className="text-lg sm:text-xl" />
                Acessar
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
