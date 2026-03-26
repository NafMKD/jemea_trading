"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  index: number;
}

export function ProductCard({ title, description, image, index }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative cursor-pointer"
    >
      <div
        className={cn(
          "relative overflow-hidden bg-[var(--card)] border border-[var(--border)]",
          "transition-all duration-500",
          "hover:shadow-2xl hover:-translate-y-2",
          "hover:border-[var(--accent)]"
        )}
      >
        {/* Angular accent corner */}
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden z-10">
          <div className="absolute top-0 right-0 w-[90px] h-[2px] bg-[var(--accent)] origin-top-right rotate-[-45deg] translate-x-[15px] translate-y-[22px] transition-all duration-500 group-hover:w-[120px]" />
        </div>

        {/* Image container */}
        <div className="relative h-52 overflow-hidden bg-[var(--secondary)]">
          <div className="absolute inset-0 flex items-center justify-center p-10">
            <Image
              src={image}
              alt={title}
              width={240}
              height={180}
              className="object-contain w-full h-full transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        </div>

        {/* Content */}
        <div className="relative px-6 pb-6 pt-5">
          <h3 className="font-heading text-lg font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--accent)] transition-colors duration-300">
            {title}
          </h3>
          <p className="font-body text-sm text-[var(--muted-foreground)] leading-relaxed">
            {description}
          </p>

          {/* Bottom accent line */}
          <div className="mt-5 flex items-center gap-2">
            <div className="h-[2px] w-0 bg-[var(--accent)] transition-all duration-500 group-hover:w-12" />
            <span className="text-xs font-body uppercase tracking-wider text-[var(--accent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              Learn More
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
