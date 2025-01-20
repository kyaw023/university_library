import { auth } from "@/auth";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session) redirect("/sign-in");
  return (
    <main className="max-w-7xl mx-auto px-4 lg:px-0">
      <div className="flex flex-col min-h-screen ">
        <Header session={session} />
        <div>{children}</div>
      </div>
    </main>
  );
};

export default layout;
