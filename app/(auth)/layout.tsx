import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (session) redirect("/");

  return (
    <main className=" auth-container">
      <section className="auth-form">
        <div className="auth-box">
          <div className="flex flex-row gap-3">
            <Image src={"/icons/logo.svg"} alt="logo" width={40} height={40} />
            <h1 className="text-2xl font-semibold text-light-100"></h1>
          </div>
          <div>{children}</div>
        </div>
      </section>
      <section className="auth-illustration">
        <Image
          src="/images/auth-illustration.png"
          alt="auth-illustration"
          height={1000}
          width={1000}
          className="object-cover size-full"
        />
      </section>
    </main>
  );
};

export default layout;
