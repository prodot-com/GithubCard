import axios from "axios";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";

type Props = {
  params: { userId: string };
};

export default async function UserIntroPage({ params }: Props) {
  const { userId } = await params;

   const response = await axios.get(
    `https://api.github.com/users/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
    }
  );
  const user = response.data;

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Content */}
      <div className="z-10 flex flex-col items-center text-center px-6">
        
        {/* Avatar with Animation Ring */}
        <div className="relative mb-8">
          <div className="absolute inset-0 rounded-full" />
          
          <div className="border border-transparent rounded-full flex justify-center items-center">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-40 h-40 rounded-full border-2 border-neutral-800 relative z-10"
          />
               <BorderBeam
                size={80}
                initialOffset={20}
                borderWidth={1}
                className="from-transparent via-green-500 to-transparent"
              />
          </div>
     
        </div>

        {/* Story Text */}
        <div className="space-y-4 mb-12">
          <p className="text-green-500 font-mono tracking-widest uppercase text-sm flex items-center justify-center gap-2">
            <Sparkles size={16} /> Chapter 01: The Arrival
          </p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
            2025 WAS A BIG <br /> YEAR FOR YOU.
          </h1>
          <p className="text-neutral-400 text-xl md:text-2xl font-medium">
            Let's unfold your story, <span className="text-white">@{user.login}</span>.
          </p>
        </div>

        {/* The "Proceed" Button */}
        <Link
          href={`/intro2/${userId}`}
          className="group relative flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full font-bold text-xl hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
          Start the Journey
          <ChevronRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Bottom Progress Indicator (Slide 1 of 6) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
        <div className="h-1 w-8 bg-white rounded-full" />
        <div className="h-1 w-8 bg-neutral-800 rounded-full" />
        <div className="h-1 w-8 bg-neutral-800 rounded-full" />
        <div className="h-1 w-8 bg-neutral-800 rounded-full" />
        <div className="h-1 w-8 bg-neutral-800 rounded-full" />
        <div className="h-1 w-8 bg-neutral-800 rounded-full" />
      </div>
    </div>
  );
}