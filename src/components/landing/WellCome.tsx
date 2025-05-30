"use client";
import Link from "next/link";
import { FiLogIn } from "react-icons/fi";
import { motion } from "framer-motion"
export function WellCome() {
    return(
        <section className="bg-gradient-to-b from-gray-800 via-gray-900 to-black  w-full h-[50%] [clip-path:polygon(0%_0%,100%_0%,100%_100%,30%_100%)] flex justify-end">
        <div className="w-[70%] h-full flex flex-col p-4 justify-end items-end text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full  h-full flex flex-col p-6 justify-between items-end text-white"
          >
            <motion.nav
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="w-full flex justify-between gap-4 "
            >
              <Link href="/sign-in">Acessar</Link>
              <Link href="/">Voos</Link>
              <Link href="/">Cidades</Link>
              <Link href="/">Promocões</Link>
              <Link href="/">Contato</Link>
            </motion.nav>
            <div className="flex flex-col items-end">
              <motion.h1
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-5xl  font-bold mb-2 "
              >
                Travel Advisor
              </motion.h1>
              <motion.p
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg md:text-xl mb-4 text-gray-300 text-right"
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
                  <FiLogIn className="text-xl" />
                  Acessar
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    )
}
