"use client"

import { useRouter } from 'next/navigation';
import { ArrowUpRight, Github } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [showNav, setShowNav] = useState(false);

  // Monitor scroll to show navbar after passing the first screen
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.8) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const rediretcHandler = () => {
    if (!username) {
      window.alert("pls enter a username");
    } else {
      router.push(`/intro/${username}`);
    }
  };

  return (
    <div className="bg-white selection:bg-fuchsia-300">

      <section 
        className="h-screen w-full relative bg-cover bg-center flex flex-col items-center"
        style={{ backgroundImage: "url('/back.png')" }}
      >
        <div className="absolute inset-0 backdrop-blur-[2px] "></div>
        <div className='relative z-20 w-full'>
          <div className='h-10 mt-4 flex items-center justify-end'>
            <div className='mr-5'>
              <Github className='h-7 w-7 cursor-pointer '/>
            </div>
          </div>

          <div className='flex flex-col min-h-137.5 justify-around'>
            <div className="flex justify-center">
              <p
              className="shadow-2xl px-4 border border-transparent py-3 text-8xl instrument-serif-italic-bold text-black backdrop-blur-xl
              rounded-[5px]"
              >
                Github-Wrapped
              </p>
            </div>

            <div className='flex justify-center'>
              <p className='px-1 py-2 rounded-[5px] bg-fuchsia-300/50 backdrop-blur-2xl border border-transparent text-3xl instrument-serif-italic-bold'>
                You coded. You shipped. You grew. See your 2025 coding Journey in motion.</p>
            </div>

            <div className="flex justify-center ">
              <div className="bg-fuchsia-300 border-2 border-black min-w-2xl h-16 flex items-center justify-between rounded-full px-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <input 
                type="text"  
                placeholder="GitHub username..."
                onChange={e=>{
                  setUsername(e.target.value)
                }}
                className="ml-4 w-[80%] bg-transparent h-10 outline-none text-3xl instrument-serif-italic"
                />
          
                <button
                onClick={()=>rediretcHandler()}
                disabled={!username.trim()}
                className="group cursor-pointer bg-black  transition-colors rounded-full p-3 mr-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
                >
                  <ArrowUpRight className="h-7 w-7 text-white transform transition-transform duration-300 group-hover:rotate-45 ease-in-out" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 animate-bounce">
          <p className="text-black font-bold uppercase tracking-widest text-xs">Scroll to Explore</p>
        </div>
      </section>

      <section className="min-h-screen p-20 grid grid-cols-1 md:grid-cols-2 gap-10">
          
      </section>
    </div>
  );
}