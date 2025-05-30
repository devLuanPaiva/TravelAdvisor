"use client";

import { motion } from "framer-motion";
import { reviews } from "@/constants/reviews";
import { cn } from "@/lib/utils";
import { AiFillStar } from "react-icons/ai";
import Image from "next/image";

export function Reviews() {
  return (
    <section className="w-full py-10 ">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">
          O que dizem nossos viajantes
        </h2>

        <motion.div
          className="flex gap-4 overflow-x-auto scrollbar-hide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              className={cn(
                "min-w-[280px] max-w-[300px] bg-white shadow-md rounded-2xl p-4",
                "flex flex-col justify-between"
              )}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src={review.userImage}
                  alt={review.username}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="text-sm font-semibold">{review.username}</div>
              </div>

              <p className="text-sm text-gray-700 mb-4">{review.review}</p>

              <div className="flex gap-1 text-yellow-400">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <AiFillStar
                    key={idx}
                    className={cn(
                      idx < review.rating ? "text-yellow-400" : "text-gray-300"
                    )}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
