"use client";

import { navItems } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="remove-scrollbar hidden h-screen w-[90px] flex-col overflow-auto px-5 py-7 sm:flex lg:w-[280px] xl:w-[325px] !important p-4">
      <Link href="#">
        <Image
          src="/images/logo 1.svg"
          alt="logo"
          width={160}
          height={50}
          className="hidden h-auto lg:block"
        />
      </Link>
      <Link href="#">
        <Image
          src="/images/log.svg"
          alt="logo"
          width={52}
          height={52}
          className="lg:hidden"
        />
      </Link>

      <nav className="h5 mt-9">
        <ul className="flex flex-1 flex-col gap-6">
          {navItems.map(({ url, name, icon }) => (
            <Link key={name} href={url} className="lg:w-full text-zinc-600">
              <li
                className={cn(
                  "sidebar-nav-item flex items-center gap-3 p-4 w-64 justify-start rounded-full",
                  pathname === url &&
                    "shad-active bg-[#7288fa] text-white shadow-2xl shadow-blue-200"
                )}
              >
                <Image
                  src={icon}
                  alt={name}
                  width={24}
                  height={24}
                  className={cn(
                    "w-6 filter invert-50 opacity-75",
                    pathname === url && "invert opacity-100"
                  )}
                />
                <p className="hidden text-sm font-bold lg:block">{name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
