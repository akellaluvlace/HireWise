'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Sparkles, 
  Search, 
  Gem,
  Play,
  ArrowRight
} from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <main className="min-h-screen bg-brand-cream text-brand-dark selection:bg-brand-primary selection:text-white overflow-hidden">
      
      <Navbar />

      {/* 2. Hero Section: Impact & Typography */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-32 pb-12 overflow-hidden">
         {/* Background Visuals */}
         <div className="absolute inset-0 z-0 select-none pointer-events-none">
            <Image 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
              alt="Architecture Abstract" 
              fill 
              className="object-cover opacity-10 grayscale contrast-125 scale-105 animate-[float_20s_ease-in-out_infinite]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-brand-cream"></div>
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-accent/10 rounded-full blur-[100px]"></div>
         </div>

        <div className="relative z-10 max-w-[1920px] mx-auto w-full">
          <div data-aos="fade-up" className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 bg-white/50 backdrop-blur-md mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
            <span className="text-xs font-mono tracking-widest text-brand-muted uppercase">Recruitment 2.0</span>
          </div>

          <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-bold leading-[0.9] tracking-tighter text-brand-dark mb-12">
            <span className="block" data-aos="fade-up" data-aos-delay="100">HELPING YOU</span>
            <span className="block text-brand-muted tracking-normal" data-aos="fade-up" data-aos-delay="200">HIRE BETTER</span>
            <div className="flex items-center gap-6" data-aos="fade-up" data-aos-delay="300">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">RETAIN BEST</span>
                <div className="hidden md:block h-[2px] flex-grow bg-slate-200"></div>
            </div>
          </h1>

          <div className="flex flex-col md:flex-row items-end justify-between gap-12 mt-12 border-t border-slate-200 pt-8" data-aos="fade-up" data-aos-delay="400">
            <div className="max-w-xl space-y-6">
              <p className="text-xl text-brand-muted font-light leading-relaxed">
                We don't just fill seats. We navigate the nuances of your organization to find people who elevate your culture.
              </p>
              <Link href="/demo">
                <button className="px-8 py-4 bg-brand-dark text-white font-bold rounded-full hover:bg-brand-primary transition-all duration-300 flex items-center gap-2 group shadow-lg shadow-brand-primary/20">
                  TRY THE DEMO <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
            <div className="flex items-center gap-4">
               <div className="flex -space-x-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs text-brand-muted font-mono shadow-sm">
                      {i}
                    </div>
                  ))}
               </div>
               <span className="text-sm font-mono text-brand-muted uppercase tracking-widest">Trusted Partners</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Marquee: High-End Styling */}
      <div className="py-8 bg-brand-dark border-y border-white/5 relative z-20 overflow-hidden" data-aos="fade-up" data-aos-duration="1500" data-aos-offset="0">
         {/* Gradient Masks for a smooth fade effect on edges */}
         <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-brand-dark to-transparent z-10"></div>
         <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-brand-dark to-transparent z-10"></div>
         
         <div className="flex whitespace-nowrap animate-marquee items-center">
            {[...Array(8)].map((_, i) => (
                <div key={i} className="flex items-center gap-16 mx-8">
                    <span className="text-xl font-light text-white tracking-[0.3em] uppercase opacity-90">Strategic Partners</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/50"></span>
                    <span className="text-xl font-light text-brand-muted tracking-[0.3em] uppercase">HireWise</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/50"></span>
                </div>
            ))}
         </div>
      </div>

      {/* 4. Intro Section: Minimal & Bold */}
      <section className="py-32 px-6 md:px-12 max-w-[1920px] mx-auto grid md:grid-cols-12 gap-16 items-start">
         <div className="md:col-span-5" data-aos="fade-right">
            <h2 className="text-3xl md:text-6xl font-bold leading-tight tracking-tight text-brand-dark">
                Your strategic <br/>
                <span className="text-brand-primary">recruitment partner.</span>
            </h2>
            <div className="mt-8 w-20 h-1.5 bg-brand-accent rounded-full"></div>
         </div>
         <div className="md:col-span-7" data-aos="fade-left">
            <p className="text-2xl md:text-3xl font-light leading-normal text-brand-muted">
                We have a passion for hiring the right people the right way. Every organisation is different with a variety of nuances to navigate. 
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                {['Recruitment as a Service', 'Contingent Recruitment', 'Exclusive Recruitment'].map((model, i) => (
                    <div key={i} className="glass-panel p-6 rounded-2xl hover:bg-white transition-all cursor-default hover:-translate-y-1 shadow-sm hover:shadow-md">
                        <span className="block text-brand-primary font-mono text-sm mb-2">0{i+1}</span>
                        <h3 className="text-lg font-bold text-brand-dark">{model}</h3>
                    </div>
                ))}
            </div>
         </div>
      </section>

      {/* 5. Video Section: Immersive */}
      <section className="relative py-20 px-4 md:px-12">
        <div className="max-w-[1920px] mx-auto relative rounded-[3rem] overflow-hidden border border-white shadow-2xl group">
            <div className="absolute top-8 left-8 z-20 text-white">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter drop-shadow-lg">Creating a healthy<br/>hiring culture</h2>
            </div>
            
            <video 
                autoPlay 
                muted 
                loop 
                playsInline
                className="w-full h-[80vh] object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
            >
                <source src="/video.mp4" type="video/mp4" />
            </video>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
            
            <div className="absolute bottom-8 right-8 z-20">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 hover:scale-110 transition-transform cursor-pointer shadow-lg">
                    <Play className="fill-white text-white w-10 h-10 ml-1" />
                </div>
            </div>
        </div>
      </section>

      {/* 6. Benefits: Light Bento Grid */}
      <section className="py-32 px-6 md:px-12 max-w-[1920px] mx-auto">
         <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-brand-dark">
                Why <span className="text-brand-muted">HireWise?</span>
            </h2>
            <p className="text-brand-primary font-mono uppercase tracking-widest mt-4 md:mt-0 font-bold">The Competitive Edge</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="glass-panel p-10 rounded-3xl hover:-translate-y-2 transition-transform duration-500 group border border-slate-100" data-aos="fade-up" data-aos-delay="0">
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-primary transition-colors duration-500 text-brand-primary group-hover:text-white">
                    <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-brand-dark">Reduced cost & time to hire</h3>
                <p className="text-brand-muted leading-relaxed group-hover:text-slate-600 transition-colors">
                    Hire quickly and effectively by following the HireWise recruitment process. Tried and tested across industries, our four step hiring process will result in you hiring the right person every time.
                </p>
            </div>

            {/* Card 2 - Featured */}
            <div className="glass-panel p-10 rounded-3xl bg-white border-slate-100 hover:-translate-y-2 transition-transform duration-500 relative overflow-hidden group shadow-lg" data-aos="fade-up" data-aos-delay="100">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-primary/5 rounded-full blur-[80px] group-hover:bg-brand-primary/10 transition-colors"></div>
                
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-accent group-hover:text-white transition-colors duration-500 relative z-10 text-brand-primary">
                    <Search className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 relative z-10 text-brand-dark">Best in class hiring process</h3>
                <p className="text-brand-muted leading-relaxed group-hover:text-slate-600 transition-colors relative z-10">
                    The HireWise hiring process is tried and tested. Follow our four steps (every time) and you will reap the benefits of effective recruiting. It's not rocket science, but it works.
                </p>
            </div>

            {/* Card 3 */}
            <div className="glass-panel p-10 rounded-3xl hover:-translate-y-2 transition-transform duration-500 group border border-slate-100" data-aos="fade-up" data-aos-delay="200">
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-primary transition-colors duration-500 text-brand-primary group-hover:text-white">
                    <Gem className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-brand-dark">Hire the right candidates</h3>
                <p className="text-brand-muted leading-relaxed group-hover:text-slate-600 transition-colors">
                    Hiring the right person for your business can be challenging. Hiring the wrong person can be detrimental. With HireWise, you gain a partner for the long haul.
                </p>
            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}