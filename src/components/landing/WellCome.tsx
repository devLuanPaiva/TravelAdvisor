"use client";
import Link from "next/link";
import Image from "next/image";
import whiteLogo from "@/assets/whiteLogo.png";
import { FiLogIn } from "react-icons/fi";
import { motion } from "framer-motion";

export function WellCome() {
  return (
    <section className="bg-gradient-to-b from-gray-800 via-gray-900 to-black w-full h-[35vh] md:h-[50vh] lg:h-[60vh] xl:h-[70vh] md:[clip-path:polygon(0%_0%,100%_0%,100%_100%,30%_100%)]">
      <div className="container mx-auto h-full flex flex-col md:justify-end md:items-end">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full h-full flex flex-col p-4 md:p-6 justify-between items-end text-white"
        >
          <div className="w-full flex justify-between items-center gap-2">
            <Image src={whiteLogo} alt="logo" width={100} height={100} className="w-10 h-10 md:hidden"/>
            <motion.nav
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="w-full flex flex-wrap justify-center md:justify-between gap-4 py-4"
            >
              <Link href="/sign-in" className="hidden md:inline text-sm md:text-base hover:text-blue-400 transition-colors">Acessar</Link>
              <Link href="/" className="text-sm md:text-base hover:text-blue-400 transition-colors">Voos</Link>
              <Link href="/" className="text-sm md:text-base hover:text-blue-400 transition-colors">Cidades</Link>
              <Link href="/" className="text-sm md:text-base hover:text-blue-400 transition-colors">Promoções</Link>
              <Link href="/" className="text-sm md:text-base hover:text-blue-400 transition-colors">Contato</Link>
            </motion.nav>
          </div>

          <div className="w-full md:w-auto flex flex-col items-center md:items-end">
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
              className="text-base md:text-xl mb-6 text-gray-300 text-center md:text-right max-w-md"
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
                className="inline-flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 transition-colors px-5 py-2 rounded-full shadow-md text-sm md:text-base"
              >
                <FiLogIn className="text-lg md:text-xl" />
                Acessar
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}