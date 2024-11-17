"use client";

import { useAdmin } from "@/hooks/useAdmin";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [password, setPassword] = useState("");
  
  const { setAdmin } = useAdmin()
  const router = useRouter();

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD as string) {
      router.push("/panel");
      setAdmin(true);
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <div className="flex min-h-screen h-full w-full flex-col items-center justify-center gap-10">
      <section>
        <div className="relative mx-auto w-full max-w-7xl items-center bg-white px-5 py-12 md:px-12 lg:px-20">
          <div className="mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0">
            <div className="flex flex-col">
              <div>
                <h2 className="pb-10 text-center text-3xl text-black">
                  ENTRAR AL PANEL 
                </h2>
              </div>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                value="https://jamstacker.studio/thankyou"
                type="hidden"
                name="_redirect"
              />
              <div className="mt-4 space-y-6">
                <div className="col-span-full">
                  <label className="mb-3 block text-sm font-medium text-gray-600">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    placeholder="******"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="flex h-full w-full appearance-none rounded-full border border-gray-200 bg-white px-6 py-3 text-black placeholder:text-gray-400 focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                  />
                </div>

                <div className="col-span-full">
                  <button
                    type="submit"
                    onClick={handleLogin}
                    className="nline-flex w-full items-center justify-center rounded-full border-2 border-black bg-black px-6 py-2.5 text-center text-sm text-white duration-200 hover:border-black hover:bg-transparent hover:text-black focus:outline-none focus-visible:outline-black focus-visible:ring-black"
                  >
                    E N T R A R
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
