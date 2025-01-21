import { auth } from "@/auth";
import Header from "@/components/Header";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { after } from "next/server";
import React, { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session) redirect("/sign-in");

  after(async () => {
    if (!session?.user?.id) return;

    //  get the user and see if the last activity date is today

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, session?.user?.id))
      .limit(1);

    if (user[0]?.lastActivityData === new Date().toISOString().slice(0, 10))
      return;

    await db
      .update(users)
      .set({
        lastActivityData: new Date().toISOString().slice(0, 10),
      })
      .where(eq(users.id, session?.user?.id));
  });

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
