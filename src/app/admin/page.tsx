
"use client";

import { useSession, signOut } from "next-auth/react";
import { DBCollections } from "@/app/constants";
import Image from 'next/image';

import Link from "next/link";

export default function Admin() {

  const {data: session} = useSession();

  return (
    <>
      <div>
        {session?.user ? (
          <div className="max-w-7xl mx-auto p-6 text-center">

            <h1 className="text-3xl font-bold mb-4">Bem-vindo {session.user.name}</h1>
            
              <div className="flex flex-col lg:flex-row justify-center items-center">
                {DBCollections.map((item, index) => (
                    <Link key={index} href={item.href} className="w-40 h-40 m-5 flex justify-center items-center border rounded hover:shadow">
                      <div className="w-1/2">
                        <Image className="w-full h-auto" src={item.icon} alt="phone" />
                        <p className="text-gray-600">{item.label}</p>
                      </div>
                    </Link>
                ))}
              </div>

          </div>
          
        ) : (
          <div>Quem é você?</div>
        )}
        {/* <button
          onClick={() => signOut({callbackUrl:"/"})}>
            signOut
          </button> */}
      </div>
    </>
  );
}
