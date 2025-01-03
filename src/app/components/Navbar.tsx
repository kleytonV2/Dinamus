'use client'

import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Image from 'next/image';
import logo from "@/app/assets/logo.png";
import { navItems } from "@/app/constants";

export default function Navbar() {

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toogleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  } 
  
  const [activeLink, setActiveLink] = useState(navItems[0].href.replace("#",""));
  const [isDark, setIsDark] = useState(false); // Track if the current section is dark

  // useEffect(() => {
  //   const linksList = document.querySelector('#linksList');
  //   if (linksList === null) return;

  //   const sections = document.querySelectorAll('section');

  //   const handleScroll = () => {
  //     const linksListRect = linksList.getBoundingClientRect();

  //     for (let i = 0; i < sections.length; i++) {
  //       const section = sections[i];
  //       const sectionRect = section.getBoundingClientRect();

  //       console.log("");
  //       console.log("***********************");
  //       console.log("sectionRect.top = ", sectionRect.top);
  //       console.log("sectionRect.bottom = ", sectionRect.bottom);
  //       console.log("linksListRect.bottom = ", linksListRect.bottom);
  //       console.log("");
        
  //       if (
  //         sectionRect.bottom >= linksListRect.bottom && // Navbar intersects with section
  //         sectionRect.top <= linksListRect.bottom // Ensure section is in view
  //       ) {
  //         const bgColor = section.getAttribute('data-bg');
  //         setIsDark(bgColor === 'dark');
  //         setActiveLink(section.id);
  //         break;
  //       }

  //       // If current section is not visible, check the next one
  //       if (sectionRect.bottom < linksListRect.bottom && i < sections.length - 1) {
  //         const nextSection = sections[i + 1];
  //         const nextBgColor = nextSection.getAttribute('data-bg');
  //         setIsDark(nextBgColor === 'dark');
  //         setActiveLink(section.id);
  //       }
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   // Cleanup the event listener on component unmount
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);
  
  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const linksList = document.querySelector('#linksList')?.getBoundingClientRect();
    if (linksList === undefined) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          
          console.log("");
          console.log("***** IntersectionObserver has been trigered! *****");
          console.log("Entry: ", entry);

          if (entry.isIntersecting) {

            console.log("section ", entry.target.getAttribute('id'), "is intersecting");
            console.log("entry.boundingClientRect.bottom: ", entry.boundingClientRect.bottom);
            console.log("entry parent linksList bottom: ", linksList.bottom);

            // if (entry.boundingClientRect.bottom >= linksList.bottom) {

              console.log("Section bottom is greater than linksList bottom! Triggering functions!");

              let sectionId = entry.target.getAttribute('id');
              let sectionBgColor = entry.target.getAttribute('data-bg');

              setIsDark(sectionBgColor === 'dark');

              if(sectionId != undefined && sectionId.length > 0)
                setActiveLink(sectionId);
            }
          // }

          console.log("");

        });
      },
      { 
        threshold: 0, //any part of the next section is visible
        rootMargin: `0px 0px -${window.innerHeight - (linksList.bottom + 20)}px 0px` // Trigger when the top reaches the viewport top
      } 
    );

    sections.forEach((section) => observer.observe(section));

    // Cleanup the observer on component unmount
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed w-full top-10 z-50 py-3">
      <div className="container px-4 mx-auto relative text-sm">
        <div className="flex justify-center items-center">
          <div className="hidden lg:flex space-x-12">
            <Image className="h-auto w-20 mr-2 pl-10" src={logo} alt="logo" />
          </div>
          <ul id="linksList" className="hidden lg:flex space-x-12 backdrop-blur rounded-3xl px-2">
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