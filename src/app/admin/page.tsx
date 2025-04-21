
"use client";

import { useSession } from "next-auth/react";
import { DBCollections } from "@/app/constants";
import Image from 'next/image';

import Link from "next/link";

export default function Admin() {

  const {data: session} = useSession();

  return (
    <>
      <div className="fixed w-full z-0">
        <div id="linksList" className="flex justify-center items-center backdrop-blur">
          <p className="block px-4 py-3 relative">Menú principal</p>
        </div>
      </div>
          
      <div>
        {session?.user ? (
          <div className="max-w-6xl mx-auto px-4 py-6 pt-24">
              
              <div className="grid grid-cols-2 gap-4 justify-center items-center lg:flex lg:flex-row">
                {DBCollections.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="w-full h-full py-4 lg:w-40 lg:h-40 lg:py-auto flex justify-center items-center border rounded hover:shadow text-center"
                  >
                    <div className="w-1/2">
                      <Image className="w-full h-auto" src={item.icon} alt="icon" />
                      <p className="text-gray-600">{item.label}</p>
                    </div>
                  </Link>
                ))}
              </div>

          </div>
          
        ) : (
          <div>Você não tem autorização</div>
        )}
      </div>
    </>
  );
}
