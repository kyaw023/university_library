
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { signOut } from "@/auth";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="flex items-center justify-between my-10">
      <Link className="flex items-center gap-2" href="/">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
        <h1 className="text-2xl font-bold text-light-100 hidden md:block ">
          Bookwise
        </h1>
      </Link>
      <ul className="flex items-center gap-8">
        <li>
          <form
            action={async () => {
              "use server";

              await signOut();
            }}
            className="mb-10"
          >
            <Button>Logout</Button>
          </form>
          {/* <Link
            href="/my-profile"
            className="cursor-pointer text-base capitalize"
          >
            <Avatar>
              <AvatarFallback>
                {getInitials(session?.user?.name || "IN")}
              </AvatarFallback>
            </Avatar>
          </Link> */}
        </li>
      </ul>
    </header>
  );
};

export default Header;
