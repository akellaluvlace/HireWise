'use client';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ArrowUpRight, Zap, Target, Star } from 'lucide-react';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function OurServices() {
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
            className="relative z-10 text-7xl md:text-9xl font-black tracking-tighter text-brand-dark text-center"
        >
            OUR<br/>SERVICES
        </h1>
      </section>

      {/* Intro */}
      <section className="py-20 px-6 md:px-12 max-w-[1200px] mx-auto text-center">
        <h2 
            data-aos="fade-up"
            className="text-4xl md:text-7xl font-bold leading-tight text-brand-dark"
        >
            Whatever your needs are,<br/>
            <span className="text-brand-primary">HireWise has the solution</span>
        </h2>
      </section>

      {/* Services List */}
      <div className="flex flex-col gap-8 px-6 md:px-12 pb-32">
        
        {/* Service 1 */}
        <section 
            data-aos="fade-up"
            className="glass-panel p-8 md:p-16 rounded-[3rem] max-w-[1400px] mx-auto w-full group hover:border-brand-primary/30 transition-colors duration-500 border border-slate-100 shadow-lg bg-white"
        >
            <div className="grid md:grid-cols-12 gap-12">
                <div className="md:col-span-5">
                    <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-8">
                        <Zap className="w-10 h-10 text-brand-primary" />
                    </div>
                    <h3 className="text-4xl md:text-6xl font-bold mb-4 text-brand-dark">Recruitment as a Service</h3>
                    <p className="font-mono text-brand-primary uppercase tracking-widest">The Subscription Model</p>
                </div>
                <div className="md:col-span-7 space-y-6 text-lg text-brand-muted font-light leading-relaxed">
                    <p>
                        The Recruitment-as-a-Service (RaaS) model offers businesses the benefits of an in-house recruiter without the overhead or long-term commitment. It's designed to seamlessly integrate with your existing HR function, Talent Acquisition team, or directly with hiring managers and department leads—ensuring a collaborative, embedded recruitment experience. We don't just fill jobs; we partner with you to refine your hiring strategy, streamline processes, and deliver consistent, high-quality talent acquisition outcomes.
                    </p>
                    <p>
                        This model has been embraced by clients across Ireland, the UK, and the US due to its simplicity, flexibility, and cost transparency. RaaS operates on a flat monthly fee, giving you unlimited hires without any surprise fees or per-hire costs. You also benefit from the freedom to scale the service up or down as your hiring needs change, making it ideal for both high-growth companies and businesses navigating periods of transition.
                    </p>
                    <p>
                        There are no employment costs, no agency-style commission fees, and no long-term contracts—just expert recruitment support on your terms. It's a “no strings attached” approach that puts you in control while giving you access to senior recruitment expertise, talent market insights, and a process built to align with your business goals.
                    </p>
                </div>
            </div>
        </section>

        {/* Service 2 */}
        <section 
            data-aos="fade-up"
            className="glass-panel p-8 md:p-16 rounded-[3rem] max-w-[1400px] mx-auto w-full group hover:border-brand-accent/30 transition-colors duration-500 border border-slate-100 shadow-lg bg-white"
        >
            <div className="grid md:grid-cols-12 gap-12">
                <div className="md:col-span-5">
                     <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mb-8">
                        <Target className="w-10 h-10 text-brand-accent" />
                    </div>
                    <h3 className="text-4xl md:text-6xl font-bold mb-4 text-brand-dark">Contingent Solution</h3>
                    <p className="font-mono text-brand-accent uppercase tracking-widest">Results Driven</p>
                </div>
                <div className="md:col-span-7 space-y-6 text-lg text-brand-muted font-light leading-relaxed">
                    <p>
                        Contingent Recruitment is a flexible, results-driven solution best suited to businesses with occasional or ad hoc hiring needs—whether that's one strategic hire every few months or a handful of roles across the year. This model is ideal if you don't require ongoing recruitment support but still want access to top-tier talent and a professional, structured hiring process when you do need to grow your team.
                    </p>
                    <p>
                        At HireWise, our contingent service is based on a success fee model, meaning you only pay when we deliver—typically as a percentage of the candidate's starting salary. This makes it a cost-effective, low-risk option for companies that value results without upfront commitment.
                    </p>
                    <p>
                        Even for one-off roles, we don't compromise on quality. We apply our proven four-step recruitment process, which includes role scoping, strategic sourcing, behavioural screening, and cultural alignment, ensuring each hire is not only technically capable but also the right fit for your business. The result is a streamlined, high-impact recruitment experience that saves you time, reduces hiring risk, and delivers exceptional candidates—quickly and efficiently.
                    </p>
                    <p>
                        Whether you're looking to fill a specialist role, replace a key team member, or support a project-based hire, our contingent model gives you access to expert recruitment without any fixed cost or long-term obligation.
                    </p>
                </div>
            </div>
        </section>

        {/* Service 3 */}
        <section 
            data-aos="fade-up"
            className="glass-panel p-8 md:p-16 rounded-[3rem] max-w-[1400px] mx-auto w-full group hover:border-purple-500/30 transition-colors duration-500 border border-slate-100 shadow-lg bg-white"
        >
            <div className="grid md:grid-cols-12 gap-12">
                <div className="md:col-span-5">
                     <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mb-8">
                        <Star className="w-10 h-10 text-purple-600" />
                    </div>
                    <h3 className="text-4xl md:text-6xl font-bold mb-4 text-brand-dark">Exclusive Solution</h3>
                    <p className="font-mono text-purple-600 uppercase tracking-widest">Dedicated Partnership</p>
                </div>
                <div className="md:col-span-7 space-y-6 text-lg text-brand-muted font-light leading-relaxed">
                    <p>
                        The Exclusive Recruitment Model is a dedicated partnership designed to maximise your chances of making a truly outstanding hire. By committing to work exclusively with HireWise on a specific role, you unlock a deeper level of service, priority access to talent, and a more strategic approach to recruitment.
                    </p>
                    <p>
                        This upfront commitment allows us to invest additional time, focus, and resources into your search—giving your vacancy the attention it deserves. We act as an extension of your brand in the market, taking the time to fully understand your business, culture, and the unique requirements of the role. This enables us to craft a tailored search strategy and position your opportunity in a way that resonates with the right candidates.
                    </p>
                    <p>
                        Our team goes beyond standard sourcing methods, conducting a comprehensive deep dive into both active and passive talent pools. We proactively target high-calibre professionals who may not be actively job hunting but are open to the right opportunity—broadening your reach and improving the quality of your shortlist.
                    </p>
                    <p>
                        Throughout the process, we remain fully engaged and committed until the right hire is secured. This model is ideal for critical roles where quality, consistency, and alignment are non-negotiable. With HireWise as your exclusive partner, you benefit from dedicated focus, faster turnaround times, and a consultative, high-touch approach that delivers results.
                    </p>
                </div>
            </div>
        </section>

      </div>

      <Footer />
    </main>
  );
}
