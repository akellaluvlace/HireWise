'use client';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Image from 'next/image';
import { Heart, Shield, Users, Award } from 'lucide-react';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AboutUs() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <main className="min-h-screen bg-brand-cream text-brand-dark selection:bg-brand-primary selection:text-white overflow-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale"
        >
            <source src="/banner.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-cream to-transparent"></div>
        
        <h1 
            data-aos="fade-up"
            className="relative z-10 text-7xl md:text-9xl font-black tracking-tighter text-brand-dark"
        >
            ABOUT US
        </h1>
      </section>

      {/* Intro */}
      <section className="py-20 px-6 md:px-12 max-w-[1200px] mx-auto text-center md:text-left">
        <h2 
            data-aos="fade-up"
            className="text-4xl md:text-6xl font-bold mb-12 text-brand-dark"
        >
            Welcome To <span className="text-brand-primary">HireWise</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-12 text-xl font-light text-brand-muted leading-relaxed">
            <div className="space-y-6" data-aos="fade-up" data-aos-delay="100">
                <p>
                    HireWise is a talent solutions consultancy based in Ireland, dedicated to helping businesses build high-performing teams through strategic hiring.
                </p>
                <p>
                    We go beyond recruitment—we build partnerships. Our approach is collaborative, flexible, and tailored to your organisation's culture and values.
                </p>
            </div>
            <div className="space-y-6" data-aos="fade-up" data-aos-delay="200">
                <p>
                    We believe that a healthy hiring culture is the key to long-term success. By aligning your hiring team, maintaining momentum, and using a robust methodology, you can consistently attract and secure the right talent—quickly and effectively.
                </p>
                <p className="text-brand-dark font-medium">
                    Let's create a hiring process that drives your business forward. Explore our services to find the best solution for your team.
                </p>
            </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 md:px-12 bg-white border-y border-slate-100">
        <div className="max-w-[1200px] mx-auto">
            <h2 
                data-aos="fade-up"
                className="text-3xl md:text-5xl font-bold mb-16 text-center text-brand-dark"
            >
                Our Values
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { icon: Heart, title: 'Culture', desc: 'Healthy hiring culture - to foster effective growth' },
                    { icon: Shield, title: 'Integrity', desc: 'Trust is at the core of every partnership' },
                    { icon: Users, title: 'Collaboration', desc: 'A close relationship to deliver on your unique needs' },
                    { icon: Award, title: 'Respect', desc: 'Fostering transparent communication to candidates and clients' },
                ].map((val, i) => (
                    <div 
                        key={i} 
                        data-aos="fade-up"
                        data-aos-delay={i * 100}
                        className="glass-panel p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300 border border-slate-100"
                    >
                        <val.icon className="w-10 h-10 text-brand-primary mb-6" />
                        <h3 className="text-xl font-bold mb-3 text-brand-dark">{val.title}</h3>
                        <p className="text-brand-muted font-light">{val.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-6 md:px-12 max-w-[1200px] mx-auto">
         <div className="text-center max-w-3xl mx-auto mb-20" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-brand-dark">Meet the team</h2>
            <p className="text-xl text-brand-muted font-light">
                With a combined 30 years of recruitment experience, your hiring needs are in safe hands. Our experience includes agency and inhouse from SME to multinational companies. We pride ourselves on being recruitment experts rather than being contained to a specific industry.
            </p>
         </div>

         <div className="grid md:grid-cols-2 gap-12 md:gap-24">
            {/* Robert */}
            <div className="group relative" data-aos="fade-right" data-aos-delay="100">
                <div className="relative h-[400px] w-full overflow-hidden rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-500 shadow-xl">
                    <Image 
                        src="/rob.jpg" 
                        alt="Robert Coffey" 
                        fill 
                        className="object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
                </div>
                <div className="absolute bottom-6 left-6">
                    <h3 className="text-3xl font-bold text-white">Robert Coffey</h3>
                    <p className="text-brand-accent font-medium">Recruiter - Founder</p>
                </div>
            </div>

            {/* Helga */}
            <div className="group relative md:mt-12" data-aos="fade-left" data-aos-delay="200">
                <div className="relative h-[400px] w-full overflow-hidden rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-500 shadow-xl">
                    <Image 
                        src="/helga.jpg" 
                        alt="Helga Reeves" 
                        fill 
                        className="object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
                </div>
                <div className="absolute bottom-6 left-6">
                    <h3 className="text-3xl font-bold text-white">Helga Reeves</h3>
                    <p className="text-brand-accent font-medium">Passionate Recruiter | Talent Scout</p>
                </div>
            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}
