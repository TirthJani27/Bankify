"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Sidebar = ({ user }: SiderbarProps) => {
  const pathName = usePathname();

  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col  justify-between border-r border-gray-200 bg-white pt-8 text-white max-md:hidden sm:p-4 xl:p-6 2xl:w-[355px]">
      <nav className="flex  flex-col gap-4">
        <Link
          href="/"
          className="cursor-pointer flex items-center mb-12 gap-2"
        >
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt={""}
            className="size=[24px] max-xl:size-14"
          />
          <h1 className="text-[#101828] 2xl:text-26 font-ibm-plex-serif text-[26px] font-bold text-black-1 max-xl:hidden">
            Horizon
          </h1>
        </Link>
        {sidebarLinks.map((e, index) => {
          const isActive =
            pathName === e.route || pathName.startsWith(`${e.route}/`);
          return (
            <Link
              href={e.route}
              about={e.label.toString()}
              key={index}
              className={cn(
                "flex gap-3 items-center justify-center py-1 md:p-3 2xl:p-4 rounded-lg  xl:justify-start text-center",
                { "bg-blue-500": isActive }
              )}
            >
              <Image
                src={e.imgURL}
                alt={e.label}
                width={25}
                height={25}
                className={cn({ "brightness-[3] invert-0": isActive })}
              ></Image>
              <p
                className={cn(
                  `text-16 font-semibold text-black-2 max-xl:hidden`,
                  { "!text-white": isActive }
                )}
              >
                {e.label}
              </p>
            </Link>
          );
        })}
        User 
      </nav>
      Footer
    </section>
  );
};

export default Sidebar;
