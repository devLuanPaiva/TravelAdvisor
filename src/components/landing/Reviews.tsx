"use client";

import { motion } from "framer-motion";
import { reviews } from "@/constants/reviews";
import { cn } from "@/lib/utils";
import { AiFillStar } from "react-icons/ai";
import Image from "next/image";
import { useCarousel } from "@/hooks/useCarousel";
import { useEffect, useState } from "react";

export function Reviews() {
  const { current } = useCarousel({
    elements: reviews,
    intervalTime: 10000,
  });

  const [columns, setColumns] = useState(1);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width >= 768) setColumns(3);
      else if (width >= 640) setColumns(2);
      else setColumns(1);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  if (!reviews || reviews.length === 0) {
    return null;
  }

  const currentItems = Array.from({ length: columns }, (_, i) => {
    const index = (current + i) % reviews.length;
    return reviews[index];
  });
  return (
    <section className="w-full py-10 ">
      <div className="w-full mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
          O que dizem nossos viajantes
        </h2>

        <motion.div
          className="w-full mx-auto gap-4 mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {currentItems.map((review) => (
            <motion.div
              key={review.id}
              className={cn(
                "mx-auto w-[90%] md:min-w-[250px] max-w-full md:max-w-[280px] bg-white shadow-md rounded-[10px] p-4",
                "flex flex-col justify-between"
              )}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src={review.userImage}
                  alt={review.username}
                  width={48}
                  height={48}
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
