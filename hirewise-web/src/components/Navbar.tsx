'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, ArrowRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About Us', href: '/about-us' },
    { name: 'Our Services', href: '/our-services' },
    { name: 'Testimonies', href: '/testimonies' },
    { name: 'Jobs', href: '/jobs' },
    { name: 'Rec+onnect', href: '/demo' },
  ];

  return (
    <>
      <nav 
        className={`fixed w-full z-[100] top-0 transition-all duration-500 ${
          isScrolled 
            ? 'glass-nav py-4' 
            : 'bg-transparent py-8'
        }`}
      >
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 flex justify-between items-center">
          <Link href="/" className="relative z-50">
            <div className="relative h-10 w-40 hover:opacity-80 transition-opacity">
              {/* Using CSS filter to invert the white logo to black for light theme */}
              <Image 
                src="/hirewise_logo_white.webp" 
                alt="HireWise Logo" 
                fill 
                className="object-contain object-left invert"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex gap-12 items-center text-sm font-medium tracking-widest uppercase">
            {navLinks.map((item) => (
              <li key={item.name} className="relative group overflow-hidden cursor-pointer">
                <Link href={item.href}>
                  <span className={`block transition-transform duration-300 group-hover:-translate-y-full ${pathname === item.href ? 'text-brand-primary' : 'text-brand-text'} group-hover:text-brand-primary`}>
                    {item.name}
                  </span>
                  <span className={`absolute top-0 left-0 block translate-y-full transition-transform duration-300 group-hover:translate-y-0 ${pathname === item.href ? 'text-brand-primary' : 'text-brand-primary'}`}>
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-6">
             <a href="mailto:info@hirewise.ie" className="hidden lg:flex items-center gap-2 px-6 py-2 border border-slate-300 rounded-full hover:bg-brand-primary hover:text-white text-brand-dark transition-all duration-300 group">
                <span className="text-sm font-bold tracking-wide">Let's Talk</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </a>
             
             {/* Mobile Menu Toggle */}
             <button 
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden text-brand-dark hover:text-brand-primary transition-colors"
              >
                <Menu size={32} strokeWidth={1.5} />
             </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-brand-cream z-[200] flex flex-col items-center justify-center transition-transform duration-700 cubic-bezier(0.7, 0, 0.3, 1) ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <button 
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-8 right-8 text-slate-400 hover:text-brand-dark transition-colors"
        >
          <span className="text-4xl">&times;</span>
        </button>
        <ul className="flex flex-col gap-8 text-center">
            <li className={`text-4xl font-light tracking-tighter text-brand-dark hover:text-brand-primary transition-colors duration-300`}>
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            </li>
            {navLinks.map((item, i) => (
                <li key={item.name} className={`text-4xl font-light tracking-tighter text-brand-dark hover:text-brand-primary transition-colors duration-300`}>
                    <Link href={item.href} onClick={() => setMobileMenuOpen(false)}>{item.name}</Link>
                </li>
            ))}
        </ul>
      </div>
    </>
  );
}
