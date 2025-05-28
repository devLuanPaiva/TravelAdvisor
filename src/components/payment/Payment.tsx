"use client";
import { useMercadoPago } from "@/hooks/useMercadoPago";
import { Session } from "next-auth";

export function Payment({ session }: Readonly<{ session: Session }>) {
  const { createMercadoPagoCheckout } = useMercadoPago();
  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={() =>
          createMercadoPagoCheckout({
            testeId: "123",
            userEmail: session.user?.email,
          })
        }
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Comprar
      </button>
    </div>
  );
}
