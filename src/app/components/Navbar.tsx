'use client'

import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Image from 'next/image';
import logo from "@/app/assets/logo.png";
import { navItems } from "@/app/constants";

export default function Navbar() {

  // const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // const toogleNavbar = () => {
  //   setMobileDrawerOpen(!mobileDrawerOpen);
  // } 
  
  const [activeLink, setActiveLink] = useState(navItems[0].href.replace("#",""));
  const [isDark, setIsDark] = useState(false); // Track if the current section is dark

  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const linksList = document.querySelector('#linksList')?.getBoundingClientRect();
    if (linksList === undefined) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          
          if (entry.isIntersecting) {

            let sectionId = entry.target.getAttribute('id');
            let sectionBgColor = entry.target.getAttribute('data-bg');

            setIsDark(sectionBgColor === 'dark');

            if(sectionId != undefined && sectionId.length > 0)
              setActiveLink(sectionId);
          }

        });
      },
      { 
        threshold: 0,
        rootMargin: `-10% 0px -90% 0px`
      } 
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed w-full top-4 lg:top-10 z-50 py-3">
      <div className="container px-4 mx-auto relative text-sm">
        <div className="flex justify-center items-center">
          {/* 
            <div className="hidden lg:flex space-x-12">
              <Image className="h-auto w-20 mr-2 pl-10" src={logo} alt="logo" />
            </div> 
          */}
          <ul id="linksList" className="flex lg:space-x-12 backdrop-blur rounded-3xl px-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <a className={`block px-4 py-3 relative transition-colors
                  ${isDark ? 'hover:text-neutral-50':'hover:text-neutral-950' } 
                  ${activeLink === item.href.replace("#","") ? 
                    (isDark ? 'text-neutral-50':'text-neutral-950') : (isDark ? 'text-neutral-400':'text-neutral-600' )
                  }
                `} href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};