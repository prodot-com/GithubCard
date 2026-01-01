"use client";

import { motion } from "framer-motion";

export default function ProgressBar({ step, total = 5 }: { step: number; total?: number }) {
  return (
    <div className="flex items-center gap-2 px-4">
      {[...Array(total)].map((_, i) => {
        const isPast = step > i + 1;
        const isCurrent = step === i + 1;

        return (
          <div key={i} className="relative h-1 w-8 bg-white/10 rounded-full overflow-hidden">
            {(isPast || isCurrent) && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                className={`h-full ${isCurrent ? "bg-white" : "bg-zinc-500"} shadow-[0_0_10px_rgba(255,255,255,0.3)]`}
                transition={{ duration: 0.5 }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}