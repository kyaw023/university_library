import React from "react";
import { Session } from "next-auth";

const Header = ({ session }: { session: Session }) => {
  return (
    <header className="admin-header">
      <div>
        <h2>{session?.user?.name}</h2>
        <p className="text-slate-500 text-base">
          Monitor all of your users and books here
        </p>
      </div>
    </header>
  );
};

export default Header;
