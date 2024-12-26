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
    <nav className="fixed w-full top-10 z-50 py-3">
      <div className="container px-4 mx-auto relative text-sm">
        <div className="flex justify-center items-center">
          <div className="hidden lg:flex space-x-12">
            <Image className="h-auto w-20 mr-2 pl-10" src={logo} alt="logo" />
          </div>
          <ul className="hidden lg:flex space-x-12 backdrop-blur rounded-3xl px-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <a className={`block px-4 py-3 relative transition-colors text-gray-400 hover:text-gray-800 ${activeLink === item.href.replace("#","") ? 'text-gray-800' : 'text-gray-400'}`} href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:hidden fixed top-0 right-0lg:hidden fixed top-0 right-0 mr-4 p-4">
          <button onClick={toogleNavbar}>
            {mobileDrawerOpen ? <X/> : <Menu/>}
          </button>
        </div>
        {mobileDrawerOpen && (
          <div className="top-10 w-full fixed right-0 z-20 bg-neutral-100 p-12 flex flex-col justify-center items-center lg:hidden">
            <ul className="w-full">
              {navItems.map((item, index) => (
                <li key={index} className="py-4 text-center">
                  <a onClick={toogleNavbar} className="block w-full" href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};