import Image from 'next/image';
import { Linkedin, Facebook, Instagram, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white pt-32 pb-12 px-6 md:px-12 border-t border-slate-100">
        <div className="max-w-[1920px] mx-auto">
            <div className="grid md:grid-cols-2 gap-20 mb-32">
                <div>
                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 text-brand-dark">
                        READY TO <br/>
                        <span className="text-brand-primary uppercase">Scale?</span>
                    </h2>
                    <a href="mailto:info@hirewise.ie" className="inline-flex items-center gap-4 text-2xl border-b border-brand-dark pb-2 hover:border-brand-primary hover:text-brand-primary text-brand-dark transition-all">
                        Start a Conversation <ArrowRight />
                    </a>
                </div>
                <div className="grid grid-cols-2 gap-12">
                    <div>
                        <h4 className="font-mono text-slate-400 uppercase mb-6 tracking-[0.2em] font-bold text-xs">Connect</h4>
                        <ul className="space-y-4">
                            <li>
                                <a href="https://www.linkedin.com/company/hirewise-ie/" target="_blank" className="flex items-center gap-3 text-lg text-brand-muted hover:text-brand-primary transition-colors group">
                                    <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-indigo-50"><Linkedin size={20} className="text-brand-dark group-hover:text-brand-primary" /></div>
                                    LinkedIn
                                </a>
                            </li>
                            <li>
                                <a href="https://www.facebook.com/hirewisefb" target="_blank" className="flex items-center gap-3 text-lg text-brand-muted hover:text-brand-primary transition-colors group">
                                    <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-indigo-50"><Facebook size={20} className="text-brand-dark group-hover:text-brand-primary" /></div>
                                    Facebook
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/hirewiseig/" target="_blank" className="flex items-center gap-3 text-lg text-brand-muted hover:text-brand-primary transition-colors group">
                                    <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-indigo-50"><Instagram size={20} className="text-brand-dark group-hover:text-brand-primary" /></div>
                                    Instagram
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                         <h4 className="font-mono text-slate-400 uppercase mb-6 tracking-[0.2em] font-bold text-xs">Contact</h4>
                         <ul className="space-y-4">
                            <li>
                                <a href="tel:0857435732" className="flex items-center gap-3 text-lg text-brand-muted hover:text-brand-primary transition-colors">
                                    085 743 5732
                                </a>
                            </li>
                            <li>
                                <a href="mailto:info@hirewise.ie" className="flex items-center gap-3 text-lg text-brand-muted hover:text-brand-primary transition-colors">
                                    info@hirewise.ie
                                </a>
                            </li>
                         </ul>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-end border-t border-slate-100 pt-12">
                <div className="relative h-12 w-48 opacity-30 mb-8 md:mb-0 grayscale invert">
                  <Image 
                    src="/hirewise_logo_white.webp" 
                    alt="HireWise" 
                    fill 
                    className="object-contain object-left"
                  />
                </div>
                <div className="text-slate-400 text-sm font-mono tracking-wider uppercase font-medium">
                    &copy; 2026 HIREWISE RECRUITMENT. DUBLIN.
                </div>
            </div>
        </div>
      </footer>
  );
}
