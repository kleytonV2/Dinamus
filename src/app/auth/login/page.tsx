"use client";

import { signIn } from "next-auth/react";
import { useEffect } from "react";

export default function Login() {
  useEffect(() => {
    signIn("google", { callbackUrl: "/admin" });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-xl font-medium">Redirecionando para login com Google...</h1>
    </div>
  );
}