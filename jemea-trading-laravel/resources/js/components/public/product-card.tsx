import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProductCardProps {
    title: string;
    description: string;
    image: string;
    index: number;
}

export function ProductCard({
    title,
    description,
    image,
    index,
}: ProductCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="group relative cursor-pointer"
        >
            <div
                className={cn(
                    'relative overflow-hidden border border-[var(--border)] bg-[var(--card)]',
                    'transition-[border-color,transform,box-shadow] duration-500',
                    'hover:-translate-y-2 hover:shadow-2xl',
                    'hover:border-[var(--primary)]',
                )}
            >
                <div className="absolute top-0 right-0 z-10 h-16 w-16 overflow-hidden">
                    <div className="absolute top-0 right-0 h-[2px] w-[90px] origin-top-right translate-x-[15px] translate-y-[22px] rotate-[-45deg] bg-[var(--primary)] transition-[width] duration-500 group-hover:w-[120px]" />
                </div>

                <div className="relative h-52 overflow-hidden bg-[var(--secondary)]">
                    <div className="absolute inset-0 flex items-center justify-center p-10">
                        <img
                            src={image}
                            alt={title}
                            width={240}
                            height={180}
                            loading="lazy"
                            className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-110"
                        />
                    </div>
                </div>

                <div className="relative flex flex-col gap-3 px-6 pt-5 pb-6">
                    <h3 className="font-heading text-lg font-bold text-[var(--foreground)] transition-colors duration-300 group-hover:text-[var(--primary)]">
                        {title}
                    </h3>
                    <p className="font-body text-sm leading-relaxed text-[var(--muted-foreground)]">
                        {description}
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                        <div className="h-[2px] w-0 bg-[var(--primary)] transition-[width] duration-500 group-hover:w-12" />
                        <span className="font-body text-xs tracking-wider text-[var(--primary)] uppercase opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                            Learn More
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
