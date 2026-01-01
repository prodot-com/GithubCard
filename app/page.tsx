"use client";

import { useRouter } from 'next/navigation';
import { ArrowDown, ArrowUpRight, Github, GithubIcon, HomeIcon, Linkedin, LinkedinIcon, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import BrokenArrowIcon from '@/src/components/BrokenArrow';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

type userType = {
  avatarUrl: string,
  login: string,
  name: string,
  location: string,
  bio: string,
  followers: {totalCount: number};
  following: {totalCount: number};
  repositories: {totalCount: number};
}

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [userDetails, setUserDetails] = useState<userType | null>(null);
  const [error, setError] = useState('');
  const [buttonEnable, setButtonEnable] = useState<boolean>(false);

  const checkUsername = (name: any): string => {
    if (!name) return "";
    const username =  String(name).trim().replace(/^@+/, "");
    return username.toLocaleLowerCase()
  };

  useEffect(() => {
    if (!username) {
      setUserDetails(null);
      setError("");
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch("/api/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username }),
        });
        if (!res.ok) throw new Error("User not found");
        const data = await res.json();
        setUserDetails(data);
        setError("");
      } catch (err) {
        setUserDetails(null);
        setError("User not identified");
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [username]);

  useEffect(() => {
    setButtonEnable(!!(username.trim() && userDetails?.login === username.trim()));
  }, [username, userDetails]);

  const rediretcHandler = () => {
    if (!username.trim()) return;
    router.push(`/intro/${username}`);
  };

  return (
    <div className="bg-black selection:bg-zinc-500 min-h-screen overflow-x-hidden font-sans">
      <section 
        className="relative min-h-screen w-full flex flex-col items-center
                   bg-[url('/back.png')] bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>
        
        <div className='relative z-20 w-full p-6 flex justify-end items-center mx-auto'>
          <Link href="https://github.com/prodot-com/GithubCard">
            <Github className='h-6 w-6 hover:text-black/60 text-black transition-all'/>
          </Link>
        </div>

        <div className='relative z-20 flex flex-col items-center pt-12 md:pt-10 flex-1 w-full px-4 gap-8 md:gap-12'>

          <div className="text-center space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-[100px] border-transparent rounded-[5px] px-3 py-3 backdrop-blur-sm font-serif italic text-white tracking-tighter leading-none"
            >
              Githubwrap<span className='not-italic'>X</span><span className="text-zinc-900 pl-1 md:pl-2 text-2xl md:text-[60px]">25</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className='max-w-xl mx-auto text-black border-transparent rounded-[5px] py-1 backdrop-blur-sm text-base md:text-xl font-light tracking-tight px-2'
            >
              The ultimate 2025 GitHub Wrapped. <br className="hidden md:block"/>
              Identify your persona and generate your digital verdict.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-2xl px-2"
          >
            <div className="relative flex items-center bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full p-1.5 md:p-2 pl-4 md:pl-6 shadow-2xl transition-all focus-within:border-white/20">
              <GithubIcon className="h-4 w-4 md:h-5 md:w-5 text-zinc-400 md:text-zinc-500 mr-2 md:mr-4" />
              <input 
                type="text"  
                placeholder="Enter GitHub username..."
                value={username}
                onChange={e => {
                  setError("");
                  setUsername(checkUsername(e.target.value))
                }}
                className="flex-1 bg-transparent h-10 md:h-12 outline-none text-base md:text-2xl font-light text-white placeholder-white/75 md:placeholder:text-zinc-500"
              />
              <button
                onClick={rediretcHandler}
                disabled={!buttonEnable}
                className="group flex items-center justify-center bg-white text-black rounded-full w-10 h-10 md:w-14 md:h-14 disabled:opacity-20 disabled:grayscale transition-all hover:scale-105 active:scale-95 shrink-0"
              >
                <ArrowUpRight className="h-5 w-5 md:h-6 md:w-6 transform transition-transform group-hover:rotate-45" />
              </button>
            </div>
            {error && <p className="text-red-500 text-[10px] font-mono mt-3 text-center uppercase tracking-widest">{error}</p>}
          </motion.div>

          <div className="min-h-40 md:min-h-35 flex items-center pb-9 md:pb-4 justify-center w-full">
            <AnimatePresence>
              {userDetails?.login && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => setUsername(userDetails.login)}
                  className="flex flex-row items-center gap-4 md:gap-5 bg-white/3 backdrop-blur-xl border border-white/10 p-5 md:p-4 md:pr-8 rounded-[5px] cursor-pointer hover:bg-white/[0.07] transition-all group w-fit"
                >
                  <img
                    src={userDetails.avatarUrl}
                    alt="profile"
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/10 transition-all duration-500"
                  />
                  <div className="text-left">
                    <p className="text-xl font-bold text-white tracking-tight">@{userDetails.login}</p>
                    <p className="text-[10px] mt-1 md:text-xs text-zinc-500 font-mono uppercase tracking-widest">{userDetails.location || "Earth"}</p>
                    <div className="flex justify-center md:justify-start gap-3 mt-1">
                       <span className="text-[10px] font-mono text-zinc-300 uppercase italic">{userDetails.repositories.totalCount} Repos</span>
                       <span className="text-[10px] font-mono text-zinc-300 uppercase italic">{userDetails.followers.totalCount} Followers</span>
                    </div>
                  </div>
                </motion.div>
              )}
              {!userDetails && !username && (
                <div className='flex flex-col items-center'>
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 1 }}
                    className="flex items-center gap-3 text-[11px] md:text-[12px] font-mono tracking-[0.2em] text-zinc-200"
                  >
                    <span>
                      Try: 
                      <span 
                        onClick={() => setUsername("prodot-com")}
                        className="text-zinc-300 underline underline-offset-4 cursor-pointer hover:text-white transition-colors tracking-[0.5] ml-1"
                      >
                        prodot-com
                      </span>
                    </span>
                  </motion.div>
                  <motion.div 
                  initial={{opacity:0}}
                  animate={{opacity: 1}}
                  transition={{delay: 1}}
                  className=' absolute bottom-[46%] right-[21%] md:bottom-33 md:right-[42%] rotate-y-180 rotate-10'>
                      <BrokenArrowIcon className='w-12 h-12 text-white'/>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="absolute bottom-6 md:bottom-10 animate-bounce">
          <ArrowDown className="text-white w-5 h-5" />
        </div>
      </section>

      <footer className="bg-[#050505] pt-16 md:pt-20 pb-12 px-6 md:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-5 md:gap-12">
          <div className="space-y-1 md:space-y-2 max-w-sm">
            <h2 className="text-3xl md:text-4xl font-serif italic text-white">
              GithubwrapX<span className="text-zinc-600 text-xl md:text-2xl">25</span>
            </h2>
            <p className="text-[16px] md:text-[16px] text-zinc-500 font-light leading-relaxed">
              Visualize your evolution, identify your persona, and generate your 2025 digital verdict.
            </p>
          </div>

          <div className="flex flex-col gap-4 items-start md:items-end w-full md:w-auto">
            <div className="flex gap-3">
                <Link href="https://github.com/prodot-com" target='_blank' className="p-3 rounded-full bg-white/3 border border-white/5 hover:bg-white/10 transition-all">
                  <GithubIcon className="h-5 w-5 text-white/60" />
                </Link>
                <Link href="https://linkedin.com/in/ghoshprobal" target='_blank' className="p-3 rounded-full bg-white/3 border border-white/5 hover:bg-white/10 transition-all">
                  <LinkedinIcon className="h-5 w-5 text-white/60" />
                </Link>
                <Link href="#" target='_blank' className="p-3 rounded-full bg-white/3 border border-white/5 hover:bg-white/10 transition-all">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    fill="currentColor"
                    className='w-5 h-5 text-white/60'
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </Link>
            </div>
            <p className="text-[10px] ml-3 md:ml-0 md:text-[9px] font-mono tracking-[0.3em] md:tracking-[0.4em] uppercase text-zinc-600">
              ©2025 PROBAL GHOSH
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-7 md:mt-12 pt-8 border-t border-white/30 flex flex-wrap gap-x-8 gap-y-4 justify-center md:justify-start">
          {[
            { name: "Github", href: "https://github.com/prodot-com/GithubCard" },
            { name: "Start-Building", onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
            { name: "Docs", href: "https://github.com/prodot-com/GithubCard/blob/main/README.md" },
            { name: "Contact", href: "https://probalghosh.dev" },
            { name: "License", href: "https://github.com/prodot-com/GithubCard/blob/main/LICENSE" },
          ].map((link) => (
            <span 
              key={link.name}
              className="group relative cursor-pointer"
              onClick={link.onClick}
            >
              {link.href ? (
                <Link 
                  href={link.href} 
                  target="_blank" 
                  className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-500 transition-all duration-500 group-hover:text-white"
                >
                  {link.name}
                </Link>
              ) : (
                <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-500 transition-all duration-500 group-hover:text-white">
                  {link.name}
                </span>
              )}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-zinc-400 transition-all duration-500 group-hover:w-full opacity-0 group-hover:opacity-100" />
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
}