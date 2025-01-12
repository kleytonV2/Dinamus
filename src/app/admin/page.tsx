
"use client";

import { useSession, signOut } from "next-auth/react";

export default function Admin() {

  const {data: session} = useSession();

  return (
    <>
      <div>
        {session?.user ? (
          <div>Bem-vindo {session.user.name}</div>
        ) : (
          <div>Quem é você?</div>
        )}
        <button
          onClick={() => signOut({callbackUrl:"/"})}>
            signOut
          </button>
      </div>
    </>
  );
}
