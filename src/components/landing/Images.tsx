"use client";
import { motion } from "framer-motion";
import image1 from "@/assets/image1.jpg";
import image2 from "@/assets/image2.jpg";
import image3 from "@/assets/image3.jpg";
import Image from "next/image";

export function Images() {
  return (
    <section className="">
      <motion.div
        initial={{ opacity: 0, y: -50, rotate: -15 }}
        animate={{ opacity: 1, y: 0, rotate: -12 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-20 right-10 md:right-56 z-10 w-32 sm:w-40 md:w-52 lg:w-56"
      >
        <Image
          src={image1}
          alt="image1"
          layout="responsive"
          className="rounded-xl drop-shadow-xl hover:scale-105 transition-transform duration-300 h-auto"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50, rotate: 15 }}
        animate={{ opacity: 1, y: 0, rotate: 6 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute top-40 right-2 md:right-5 z-20 w-32 sm:w-40 md:w-52 lg:w-56"
      >
        <Image
          src={image2}
          alt="image2"
          layout="responsive"
          className="rounded-xl drop-shadow-xl hover:scale-105 transition-transform duration-300 h-auto"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute bottom-20 right-10 md:right-72 z-0 w-32 sm:w-40 md:w-52 lg:w-56"
      >
        <Image
          src={image3}
          alt="image3"
          layout="responsive"
          className="rounded-xl drop-shadow-xl hover:scale-105 transition-transform duration-300 h-auto"
        />
      </motion.div>
    </section>
  );
}
