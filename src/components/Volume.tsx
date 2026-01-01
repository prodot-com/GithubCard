"use client";

import { useEffect } from "react";
import { motion, useSpring, useTransform, animate } from "framer-motion";
import { Database } from "lucide-react";
import { getVolumeCopy } from "../utils/VolumeCopy";

type IntroProps = {
  totalCommits: number,
  totalRepo: number;
  contributedRepo: number;
}

export default function VolumePage({ totalCommits, totalRepo, contributedRepo }: IntroProps) {
  const count = useSpring(0, {
    stiffness: 30,
    damping: 20,
    restDelta: 0.001
  });

  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, totalCommits, { duration: 3, ease: "easeOut" });
    return controls.stop;
  }, [totalCommits, count]);

  const copy = getVolumeCopy(totalCommits);

  return (
    <div className="min-h-screen w-full py-20 md:pb-17 bg-[#050505] text-white flex flex-col items-center justify-center relative overflow-hidden px-1 md:px-4">

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 md:w-150 h-75 md:h-150 bg-blue-500/5 blur-[100px] md:blur-[140px] rounded-full pointer-events-none" />

      <div className="absolute inset-0 pointer-events-none opacity-[0.03] 
      bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_2px,3px_100%]" />

      <div className="z-10 text-center flex flex-col items-center w-full">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 md:gap-3 text-zinc-500 font-mono uppercase tracking-[0.3em] md:tracking-[0.5em] text-[9px] md:text-xs mb-6 md:mb-8"
        >
          <Database size={12} className="text-zinc-600 md:w-3.5" /> Chapter 02: The Volume
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-[23px] md:text-2xl font-serif italic text-zinc-400 mb-2"
        >
          {copy.title}
        </motion.h2>

        <div className="relative group w-full flex justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-8xl md:text-[220px] font-serif italic font-light tracking-tighter leading-none text-white"
          >
            <motion.span>{rounded}</motion.span>
          </motion.div>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "60%" }}
            transition={{ delay: 1.5, duration: 2, ease: "circOut" }}
            className="h-px bg-linear-to-r from-transparent via-zinc-500 to-transparent absolute -bottom-2 left-1/2 -translate-x-1/2"
          />
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-[20px] md:text-xl font-light tracking-tight mt-10 md:mt-12 text-zinc-400"
        >
          Total contributions across <br className="md:hidden" />
          <span className="text-white font-medium border-b border-zinc-800 pb-1">{totalRepo} repositories</span>.
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="pt-10 md:pt-12 flex flex-col items-center gap-4 px-6"
      >
        <p className="text-zinc-500 italic max-w-xs md:max-w-sm text-center font-serif text-sm md:text-base leading-relaxed">
          "{copy.footer}"
        </p>
      </motion.div>
    </div>
  );
}