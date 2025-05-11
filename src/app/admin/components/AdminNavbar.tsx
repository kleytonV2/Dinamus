'use client'

import { adminNavItems } from "@/app/constants";

export default function AdminNavbar() {
  return (
    <nav className="fixed w-full z-50">
      <div id="linksList" className="flex justify-center items-center backdrop-blur">
        <ul className="flex lg:space-x-12 px-2">
          {adminNavItems.map((item, index) => (
            <li key={index}>
              <a className="block px-4 py-3 relative transition-colors hover:text-neutral-950" 
              href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};