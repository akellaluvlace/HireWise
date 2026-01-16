'use client';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Quote } from 'lucide-react';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Testimonies() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  const testimonies = [
    {
        company: 'Cyber Security Startup',
        role: 'Director of HR',
        text: 'Our experience with HireWise has been exceptional. The team is highly responsive, hands-on, and consistently provides great value for money. Their dedication to understanding our needs and finding top-quality candidates has truly made the hiring process much easier for us.',
        date: '2025-08-25'
    },
    {
        company: 'Construction Company',
        role: 'HR Manager',
        text: 'What really stood out to me about Hirewise compared to other recruitment services was their personalized approach and genuine commitment to understanding both the candidate and the employer\'s needs. They didn’t just focus on filling a position quickly—they took the time to ensure a strong match for the long term. The communication was always transparent and timely, which set them apart from others. Additionally, their attention to detail and ability to provide well-suited candidates made the hiring process far smoother than I’ve experienced with other agencies',
        date: '2025-08-25'
    },
    {
        company: 'SaaS Startup',
        role: 'HR Manager',
        text: 'HireWise exceeded our expectations. They were able to use their expertise and deep knowledge of the Talent market, and specifically in our case the Irish Tech market to first identify our business needs, then advise on market norms and expectations and finally to find a suitable candidate.',
        date: '2025-08-25'
    },
    {
        company: 'Head of HR',
        role: 'Financial Industry',
        text: 'Working with HireWise has been a game-changer for our business. From the very first interaction, their team demonstrated exceptional professionalism, expertise, and dedication, a solutions-driven mindset, and a true commitment to helping us achieve our goals. They took the time to understand our unique challenges and provided innovative strategies that delivered measurable results. Thanks to their expertise, we’ve built a stronger, more talented team. We would recommend HireWise to any business looking for a dedicated and results-oriented partner.',
        date: '2025-08-25'
    }
  ];

  return (
    <main className="min-h-screen bg-brand-cream text-brand-dark selection:bg-brand-primary selection:text-white overflow-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
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
            className="relative z-10 text-6xl md:text-8xl font-black tracking-tighter text-brand-dark text-center uppercase"
        >
            Testimonies
        </h1>
      </section>

      {/* Intro */}
      <section className="py-20 px-6 md:px-12 max-w-[1200px] mx-auto text-center">
        <h2 
            data-aos="fade-up"
            className="text-4xl md:text-6xl font-bold mb-16 text-brand-dark"
        >
            What Our <span className="text-brand-primary">Clients Say</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {testimonies.map((t, i) => (
                <div 
                    key={i} 
                    data-aos="fade-up"
                    data-aos-delay={i * 100}
                    className="glass-panel p-10 rounded-3xl hover:-translate-y-2 transition-transform duration-300 flex flex-col border border-slate-100 shadow-lg bg-white"
                >
                    <Quote className="w-12 h-12 text-brand-primary mb-6 opacity-50" />
                    <p className="text-brand-muted text-lg leading-relaxed mb-8 flex-grow">
                        "{t.text}"
                    </p>
                    <div className="border-t border-slate-100 pt-6">
                        <h3 className="text-xl font-bold text-brand-dark">{t.company}</h3>
                        <p className="text-brand-accent font-mono text-sm uppercase tracking-wider">{t.role}</p>
                    </div>
                </div>
            ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
