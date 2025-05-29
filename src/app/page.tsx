'use client';
import {motion} from "framer-motion";
import image1 from "@/assets/image1.jpg";
import image2 from "@/assets/image2.jpg";
import image3 from "@/assets/image3.jpg";
import { WellCome } from "@/components/landing/WellCome";
import Image from "next/image";
export default function Home() {
  return (
    <main className="flex h-screen w-screen items-start justify-between bg-zinc-100">
      <section className="relative w-[50%] h-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: -50, rotate: -15 }}
          animate={{ opacity: 1, y: 0, rotate: -12 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-28 right-56 z-10"
        >
          <Image
            src={image1}
            alt="image1"
            width={220}
            height={300}
            className="rounded-xl drop-shadow-xl hover:scale-105 transition-transform duration-300"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50, rotate: 15 }}
          animate={{ opacity: 1, y: 0, rotate: 6 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute top-48 right-5 z-20"
        >
          <Image
            src={image2}
            alt="image2"
            width={220}
            height={300}
            className="rounded-xl drop-shadow-xl hover:scale-105 transition-transform duration-300"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute bottom-40 right-72 z-0"
        >
          <Image
            src={image3}
            alt="image3"
            width={220}
            height={300}
            className="rounded-xl drop-shadow-xl hover:scale-105 transition-transform duration-300"
          />
        </motion.div>
      </section>
      <WellCome/>
    </main>
  );
}
