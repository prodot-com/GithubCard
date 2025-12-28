"use client"

import { useRouter } from 'next/navigation';
import { ArrowDown, ArrowUpRight, Github, HomeIcon, Linkedin} from 'lucide-react';
import { useEffect, useState } from 'react';
import pkg from "@/package.json";
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [error, setError] = useState('')
  const [userDetails, setUserDetails] = useState({})

  useEffect(()=>{
    
      async function fetchUsername(username: string){
        try {
          
            const res = await fetch("/api/user",{
            method: "POST",
            body: JSON.stringify({
              username
            })
          })

          const data = await res.json();
          console.log(data)
        } catch (error) {
          console.log("Error", error)
        }
        
      }

      fetchUsername(username)

  },[username])

  const rediretcHandler = () => {
    if (!username) {
      setError("Enter your Username")
    } else {
      setError("Enter your Username")
      // router.push(`/intro/${username}`);
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
              <Link href="https://github.com/prodot-com/GithubCard">
                <Github className='h-7 w-7 cursor-pointer hover:text-fuchsia-600 transition-all delay-75'/>
              </Link>
            </div>
          </div>

          <div className='flex flex-col min-h-90 justify-between'>
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
                Your year in code, analyzed by AI. The ultimate 2025 GitHub Wrapped is here.</p>
            </div>

            <div className="flex justify-center ">
              <div className="bg-fuchsia-300 border-2 border-black min-w-2xl h-16 flex items-center rounded-full px-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className='p-2'>
                  <Github className='h-8'/>
                </div>
                <input 
                type="text"  
                placeholder="GitHub username..."
                onChange={e=>{
                  setError("")
                  setUsername(e.target.value)
                }}
                className="w-[85%] bg-transparent h-10 outline-none text-3xl instrument-serif-italic"
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

        <div className="mt-10 flex justify-center">
          <div className="relative w-[370px] rounded-[5px] bg-fuchsia-200/20 backdrop-blur-2xl border border-white/20 shadow-xl p-4">

            <div className="flex gap-7 items-center">
              <img
                src="https://avatars.githubusercontent.com/u/6751787?u=69a6486b20fc980615e51457f6a5b56103cea295&v=4"
                alt="profile"
                width={100}
                height={100}
                className="rounded-full border-2 border-black shadow-md"
              />

              
              <div className="flex flex-col">
                <p className="text-xl font-black text-black leading-tight">
                  Theo Browne
                </p>

                <p className="text-sm font-bold italic text-black/70">
                  @t3dotgg
                </p>

                <p className="mt-2 text-xs font-medium text-black/60 flex items-center gap-1">
                  <HomeIcon className='w-4 h-4'/> San Francisco, CA
                </p>
              </div>
            </div>

            <div className="mt-2 border-t border-black/10 pt-4">
              <p className="text-sm text-black font-medium italic text-center">
                “Im just here for the vibes, man.”
              </p>
            </div>
          </div>
        </div>

        </div>

        <div className='z-20'>
          {error && (
            <div className='border-transparent rounded-sm text-white px-2 py-1 backdrop-blur-2xl'>
              {error}
            </div>)}
        </div>

        <div className="absolute bottom-10 animate-bounce">
          <p className="text-fuchsia-200 font-bold uppercase tracking-widest text-xs">
            <ArrowDown/>
          </p>
        </div>

      </section>

<footer className="bg-white p-10 md:px-20 md:pb-9">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
    
    <div className="space-y-1 max-w-sm">
      <h2 className="text-4xl font-black italic tracking-tighter">
        GITHUB-<span className="text-fuchsia-500">WRAPPED</span>
      </h2>
      <p className="text-xl font-medium leading-tight tracking-tighter italic">
        Visualize your commit history, discover your coding persona, and share your year in review.
      </p>
    </div>

    <div className="flex flex-col gap-6">
      <div className="flex gap-4">
        <Link href="https://github.com/prodot-com" target="_blank" className="p-4 border-2 border-black rounded-xl hover:bg-fuchsia-300 hover:-translate-x-1 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
          <Github className="h-6 w-6" />
        </Link>
        <Link href="https://twitter.com" target="_blank" className="p-4 border-2 border-black rounded-xl hover:bg-fuchsia-300 hover:-translate-x-1 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </Link>
        <Link href="https://linkedin.com/in/ghoshprobal" target="_blank" className="p-4 border-2 border-black rounded-xl hover:bg-fuchsia-300 hover:-translate-x-1 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
          <Linkedin className="h-6 w-6" />
        </Link>
      </div>
      
      <p className="text-sm font-bold uppercase tracking-widest">
        ©2025 • Probal Ghosh
      </p>
    </div>
  </div>


  <div className="mt-10 pt-5 border-t-2 border-black/10 flex flex-wrap gap-x-8 gap-y-4 text-sm font-black italic uppercase">
  <span className="cursor-pointer transition-all duration-300 hover:text-fuchsia-500 hover:-translate-y-1 active:translate-y-0">
    Github
  </span>

  <span className="cursor-pointer transition-all duration-300 hover:text-fuchsia-500 hover:-translate-y-1 active:translate-y-0"
  onClick={()=>
    window.scrollTo({top:0, behavior: "smooth"})
  }
  >
    Start Building
  </span>

  <span className="cursor-pointer transition-all duration-300 hover:text-fuchsia-500 hover:-translate-y-1 active:translate-y-0">
    Docs
  </span>

  <span className="cursor-pointer transition-all duration-300 hover:text-fuchsia-500 hover:-translate-y-1 active:translate-y-0">
    <Link href="https://github.com/prodot-com/GithubCard/issues" target='_blank'>Contact
    </Link>
  </span>

  <span className="ml-auto bg-black text-white px-3 py-1 rounded  cursor-default">
    V{pkg.version}
  </span>
  
</div>
</footer>
    </div>
  );
}