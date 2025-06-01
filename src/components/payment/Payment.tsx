"use client";
import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { FaPlaneDeparture } from "react-icons/fa";
import { useMercadoPago } from "@/hooks/useMercadoPago";
import { travelPlans } from "@/constants/plans";

export function Payment({ session }: Readonly<{ session: Session }>) {
  const { createMercadoPagoCheckout } = useMercadoPago();

  return (
    <section className="flex flex-col justify-center w-[90%] items-center mx-auto py-10 px-5 gap-5">
      {travelPlans.map((plan) => (
        <motion.article
          key={plan.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative text-white p-6 rounded-2xl shadow-xl w-full border border-gray-700 overflow-hidden"
          style={{
            backgroundImage: `url(${plan.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/60 z-0" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">{plan.name}</h2>
              <FaPlaneDeparture className="text-white text-xl" />
            </div>
            <p className="text-gray-200 mb-6">{plan.description}</p>
            <Button
              className={cn(
                "bg-white w-fit cursor-pointer text-gray-900 hover:bg-gray-200 float-right"
              )}
              onClick={() =>
                createMercadoPagoCheckout({
                  testeId: "123",
                  userEmail: session.user?.email,
                })
              }
            >
              Comprar por R${" "}
              {plan.price.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </Button>
          </div>
        </motion.article>
      ))}
    </section>
  );
}
