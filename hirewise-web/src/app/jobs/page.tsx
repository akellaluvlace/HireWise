'use client';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { MapPin, Calendar, CreditCard, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

type Job = {
    title: string;
    location: string;
    salary?: string;
    date: string;
    desc: string;
    link: string;
};

type JobCategory = {
    name: string;
    jobs: Job[];
};

export default function Jobs() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  const categories: JobCategory[] = [
    {
        name: 'Construction',
        jobs: [
            {
                title: 'Architectural Technologist',
                location: 'London SW19',
                salary: '£35,000 - £37,000 / year',
                date: '2 Feb 2026',
                desc: 'Our Architectural Industry Sector Client who specialise in delivering design projects both commercial and Residential, are looking to attract an Architectural Technologist to join their team...',
                link: '#'
            }
        ]
    },
    {
        name: 'Finance',
        jobs: [
            {
                title: 'Financial Advisor',
                location: 'Dublin',
                salary: '€42,000 - €50,000 / year',
                date: '26 Nov 2025',
                desc: 'Our client is an independent financial planning and insurance brokerage with a strong presence in the online Protection Insurance market. The company has been in business since 1982...',
                link: '#'
            },
            {
                title: 'Financial Accountant',
                location: 'Dublin 12',
                salary: '€60,000 / year',
                date: '19 Jan 2026',
                desc: 'Our Client privately owned Irish business providing a comprehensive range of building materials and DIY products to the construction industry and DIY trade are looking to attract a Financial Accountant...',
                link: '#'
            }
        ]
    },
    {
        name: 'Operations',
        jobs: [
            {
                title: 'Project Manager',
                location: 'Mayo (Hybrid)',
                salary: '€80,000 - €85,000 / year',
                date: '15 Sep 2025',
                desc: 'Our Client a leading supplier Packaging and Labelling Solutions to the Manufacturing Sector including Pharma and Medical Device are looking for a Project Manager to join their Team...',
                link: '#'
            },
            {
                title: 'Technical Buyer',
                location: 'Limerick',
                date: '5 Jan 2026',
                desc: 'Our Client a leading provider of Maintenance, Repairs and Operations Services to the Manufacturing Industry Sector are looking to attract a Technical Buyer...',
                link: '#'
            },
            {
                title: 'Business Automation Manager',
                location: 'London',
                salary: '€70,000 - €80,000 / year',
                date: '13 Jan 2026',
                desc: 'Our clients Digital Resilience Platform solves for the greatest vulnerabilities across the complete attack surface. By providing comprehensive coverage...',
                link: '#'
            }
        ]
    },
    {
        name: 'Sales',
        jobs: [
            {
                title: 'Business Development Manager',
                location: 'Galway',
                date: '17 Sep 2025',
                desc: 'Our Client is a leading provider of a comprehensive range of building materials and DIY products to the construction industry and DIY trade...',
                link: '#'
            },
            {
                title: 'Sales Representative (Bristol)',
                location: 'Bristol',
                salary: '£31,000 - £50,000 / year',
                date: '5 Jan 2026',
                desc: 'Our client is an award-winning sales and marketing company with a mission to champion some of the UK’s most vital causes...',
                link: '#'
            },
            {
                title: 'Team Manager - Fundraising',
                location: 'Cork',
                salary: '€55,000 / year',
                date: '5 Jan 2026',
                desc: 'Our client is looking for a passionate, results-driven Team Manager to lead and inspire a high-performing face-to-face fundraising team...',
                link: '#'
            }
        ]
    },
    {
        name: 'Tech',
        jobs: [
            {
                title: 'Senior Full Stack Engineer (IAM)',
                location: 'London',
                salary: '€90,000 - €100,000 / year',
                date: '5 Jan 2026',
                desc: 'Our client is a cybersecurity SaaS company on a mission to help businesses stay ahead of emerging threats. Our platform provides innovative security solutions...',
                link: '#'
            },
            {
                title: 'Software Engineer',
                location: 'Budapest, Hungary',
                salary: '€30,000 - €40,000 / year',
                date: '12 Jan 2026',
                desc: 'Our client is building the future of intelligent financial infrastructure — transforming how modern businesses handle Agent and AI payments...',
                link: '#'
            },
            {
                title: 'Senior Database Administrator',
                location: 'Dublin',
                salary: '€90,000 - €100,000 / year',
                date: '2 Feb 2026',
                desc: 'Our Client a global payments provider, offers a range of cost-effective and efficient end-to-end payment solutions across the online gaming...',
                link: '#'
            },
            {
                title: 'Technology Security Manager',
                location: 'Newbridge, Co Kildare',
                salary: '€115,000 / year',
                date: '2 Feb 2026',
                desc: 'Our Energy Sector Client is seeking an experienced Technology Security Manager to lead and manage the Technology Security function...',
                link: '#'
            }
        ]
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
            className="relative z-10 text-7xl md:text-9xl font-black tracking-tighter text-brand-dark text-center uppercase"
        >
            JOBS
        </h1>
      </section>

      {/* Intro */}
      <section className="py-20 px-6 md:px-12 max-w-[1200px] mx-auto">
        <div className="space-y-32">
            {categories.map((cat, i) => (
                <div key={i} className="relative">
                    <div 
                        data-aos="fade-right"
                        className="sticky top-24 z-10 py-4 bg-brand-cream/95 backdrop-blur-sm border-b border-slate-200 mb-8"
                    >
                        <h2 className="text-4xl md:text-6xl font-bold text-brand-primary">{cat.name}</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {cat.jobs.map((job, j) => (
                            <div 
                                key={j} 
                                data-aos="fade-up"
                                data-aos-delay={j * 100}
                                className="glass-panel p-8 rounded-2xl hover:border-brand-primary/50 transition-all group flex flex-col h-full bg-white border border-slate-100 shadow-lg"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-bold text-brand-dark group-hover:text-brand-primary transition-colors">{job.title}</h3>
                                    <span className="text-xs font-mono text-slate-500 border border-slate-200 px-2 py-1 rounded">{job.date}</span>
                                </div>
                                
                                <div className="flex flex-wrap gap-4 text-sm text-brand-muted mb-6 font-mono">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        {job.location}
                                    </div>
                                    {job.salary && (
                                        <div className="flex items-center gap-2 text-brand-primary">
                                            <CreditCard className="w-4 h-4" />
                                            {job.salary}
                                        </div>
                                    )}
                                </div>

                                <p className="text-brand-muted mb-8 flex-grow line-clamp-3 leading-relaxed">
                                    {job.desc}
                                </p>

                                <Link href={job.link} className="mt-auto w-full">
                                    <button className="w-full py-4 border border-slate-200 rounded-xl hover:bg-brand-primary hover:text-white transition-all flex items-center justify-center gap-2 font-bold uppercase tracking-wider group-hover:border-brand-primary text-brand-dark">
                                        View Role <ArrowRight className="w-4 h-4" />
                                    </button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}