"use client";
import React from "react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MobileNav = ({ user }: MobileNavProps) => {
  const pathName = usePathname();
  return (
    <section>
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            alt="menu"
            height={30}
            width={30}
          ></Image>
        </SheetTrigger>
        <SheetContent side="left" className="border-none ">
          <Link
            href="/"
            className="cursor-pointer flex gap-1 items-center px-4"
          >
            <Image src="/icons/logo.svg" width={34} height={34} alt={""} />
            <h1 className="text-[26px] font-ibm-plex-serif font-bold text-black">
              Horizon
            </h1>
          </Link>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild className="mx-6">
              <nav className="h-full flex flex-col  gap-6 pt-16 text-white">
                {sidebarLinks.map((e, index) => {
                  const isActive =
                    pathName === e.route || pathName.startsWith(`${e.route}/`);
                  return (
                    <SheetClose asChild key={index}>
                      <Link
                        href={e.route}
                        about={e.label.toString()}
                        key={index}
                        className={cn(
                          "flex gap-3 items-center p-4 rounded-lg w-full max-w-60",
                          { "bg-blue-500": isActive }
                        )}
                      >
                        <Image
                          src={e.imgURL}
                          alt={e.label}
                          width={20}
                          height={20}
                          className={cn({
                            "brightness-[3] invert-0": isActive,
                          })}
                        ></Image>
                        <p
                          className={cn(
                            `text-[16px] font-semibold text-black`,
                            { "text-white": isActive }
                          )}
                        >
                          {e.label}
                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
