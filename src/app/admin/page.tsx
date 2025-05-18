
"use client";

import { useSession } from "next-auth/react";
import { DBCollections } from "@/app/constants";
import Image from 'next/image';
import TotalAbsencesCard from "@/app/admin/components/TotalAbsencesCard";
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
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {DBCollections.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="w-full lg:h-56 group bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 flex flex-col items-center justify-center text-center"
                  >
                    <div className="mb-2 flex items-center justify-center">
                      <Image src={item.icon} alt={item.label} className="w-16 h-16 lg:w-32 lg:h-32" />
                    </div>
                    <p className="text-sm font-medium text-neutral-600 group-hover:text-neutral-950">{item.label}</p>
                  </Link>
                ))}

                <TotalAbsencesCard />

              </div>

          </div>
          
        ) : (
          <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
          </div>
        )}
      </div>
    </>
  );
}
