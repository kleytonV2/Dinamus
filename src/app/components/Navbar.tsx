'use client'

import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Image from 'next/image';
import logo from "@/app/assets/logo.png";
import { navItems } from "@/app/constants";

export default function Navbar() {

  const [activeLink, setActiveLink] = useState(navItems[0].href.replace("#",""));

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 0 && rect.bottom >= 0) {
          setActiveLink(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toogleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  } 

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <Image className="h-20 w-auto mr-2 pl-10" src={logo} alt="logo" />
          </div>
          <ul className="hidden lg:flex ml-14 space-x-12 pr-10">
            {navItems.map((item, index) => (
              <li key={index}>
                <a className={`block relative text-lg transition-colors hover:text-orange-500 ${activeLink === item.href.replace("#","") ? 'text-orange-500' : 'text-gray-600'}`} href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toogleNavbar}>
              {mobileDrawerOpen ? <X/> : <Menu/>}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="w-full fixed right-0 z-20 bg-neutral-100 p-12 flex flex-col justify-center items-center lg:hidden">
            <ul className="w-full">
              {navItems.map((item, index) => (
                <li key={index} className="py-4 text-center">
                  <a className="block w-full" href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};