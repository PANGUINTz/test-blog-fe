"use client";

import { useState } from "react";
import { Edit } from "react-feather";
import { HomeIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Sidebar() {
  const pathname = usePathname().slice(1, usePathname().length);
  const [onActive, setOnActive] = useState(pathname == "" ? "home" : pathname);

  return (
    <div>
      <nav className="sm:flex flex-col p-5 text-white mt-5 gap-2.5 hidden w-52 ">
        <Link
          href="/"
          className={`mb-4 text-green500 flex gap-2.5 ${
            onActive == "home" && "font-bold text-black"
          }`}
          onClick={() => setOnActive("home")}
        >
          <HomeIcon className="" />
          Home
        </Link>
        <Link
          href="/blogs"
          className={`text-green500 flex gap-2.5 ${
            onActive == "blogs" && "font-bold text-black"
          }`}
          onClick={() => setOnActive("blogs")}
        >
          <Edit /> Our Blog
        </Link>
      </nav>
    </div>
  );
}
