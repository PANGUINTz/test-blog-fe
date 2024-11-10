"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Edit, LogOut, Menu } from "react-feather";
import { HomeIcon } from "lucide-react";
import { Button } from "../ui/button";
import useMount from "@/lib/useMount";
import { destroyUserSession, getAuthInfo, logout } from "@/services";
import WriterPerson from "./WriterPerson";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { User } from "@/lib/types";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState<User>();

  console.log(isMobileMenuOpen);

  const getAuth = async () => {
    try {
      const { data } = await getAuthInfo();
      setUserData(data);
    } catch (error) {
      console.log(error);
      destroyUserSession();
    }
  };

  const logOut = async () => {
    await logout();
    window.location.reload();
  };

  useMount(() => void getAuth());

  return (
    <div>
      {/* Mobile Responsive */}
      <div className={`sm:hidden`}>
        <div
          className={`fixed bg-gray-600 bg-opacity-75 z-50 ${
            isMobileMenuOpen && "inset-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`bg-green500 w-2/3 h-screen  fixed z-50 rounded-s-3xl p-5   ${
            isMobileMenuOpen
              ? "right-0 ease-out duration-300"
              : "-right-[30rem] ease-in-out duration-300"
          }
            `}
        >
          <ArrowRight
            className="text-white cursor-pointer"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="flex flex-col justify-between h-full py-5">
            <nav className="flex flex-col p-5 mt-5 gap-5 sm:hidden">
              <Link href="/" className={`mb-4 text-white flex gap-2.5 `}>
                <HomeIcon className="" />
                Home
              </Link>
              <Link href="/blogs" className={`text-white flex gap-2.5 `}>
                <Edit /> Our Blog
              </Link>
            </nav>

            {!userData ? (
              <Link href="/sign-in" className="text-white">
                <Button className="bg-success hover:bg-green300 px-5 py-2 rounded w-full">
                  Sign in
                </Button>
              </Link>
            ) : (
              <WriterPerson
                image="https://github.com/shadcn.png"
                name={userData.username}
              />
            )}
          </div>
        </div>
      </div>

      {/* PC */}
      <header className="flex items-center justify-between p-4 bg-green500 text-white z-20">
        <p className="font-castoro italic text-xl">a Board</p>
        <Menu
          className="sm:hidden cursor-pointer"
          onClick={() => setIsMobileMenuOpen(true)}
        />
        {!userData ? (
          <Button className="bg-success hover:bg-green300 px-5 py-2 rounded hidden sm:block">
            <Link href="/sign-in">Sign in</Link>
          </Button>
        ) : (
          <div className=" hidden sm:block">
            <Popover>
              <PopoverTrigger>
                <WriterPerson
                  image="https://github.com/shadcn.png"
                  name={userData.username}
                  className="flex-row-reverse"
                  color="text-white font-light capitalize"
                />
              </PopoverTrigger>
              <PopoverContent className="w-48 h-fit p-1">
                <Button
                  variant={"outline"}
                  className="bg-transparent border-none hover:bg-transparent flex justify-start h-fit w-full"
                  onClick={() => logOut()}
                >
                  <div className="flex items-center gap-2.5">
                    <LogOut /> Logout
                  </div>
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </header>
    </div>
  );
}
