'use client'
import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import { motion } from 'framer-motion'
import { Button } from "../ui/button";
import { FaPlaneDeparture } from 'react-icons/fa'
import { useMercadoPago } from "@/hooks/useMercadoPago";

export function Payment({ session }: Readonly<{ session: Session }>) {
  const { createMercadoPagoCheckout } = useMercadoPago();
  return (
    <section className="flex justify-start w-[90%] flex-wrap mx-auto py-10 px-5">
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-900 text-white p-6 rounded-2xl shadow-xl max-w-sm w-full border border-gray-700"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Plano de Viagem</h2>
          <FaPlaneDeparture className="text-gray-400 text-xl" />
        </div>
        <p className="text-gray-300 mb-6">
          Aproveite uma experiência incrível por apenas <span className="font-semibold text-white">R$150,00</span>!
          Viagens seguras, econômicas e inesquecíveis.
        </p>
        <Button
          className={cn('bg-white cursor-pointer text-gray-900 hover:bg-gray-200 w-full')}
          onClick={() =>
            createMercadoPagoCheckout({
              testeId: '123',
              userEmail: session.user?.email,
            })
          }
        >
          Comprar Agora
        </Button>
      </motion.article>
    </section>
  )
}
