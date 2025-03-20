import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import BankCard from "./BankCard";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const RightSidebar = ({ user, transactions, banks }: RightSidebarProps) => {
  return (
    <aside className=" hidden h-screen max-h-screen flex-col border-l border-gray-200 xl:flex w-[355px] xl:overflow-y-scroll !important">
      <section className="flex flex-col pb-8">
        <div
          className={cn("h-[120px] w-full bg-cover bg-no-repeat")}
          style={{ backgroundImage: "url('/icons/gradient-mesh.svg')" }}
        />
        <div className="relative flex px-6 max-xl:justify-center">
          <div className="flex-center absolute -top-8 size-24 rounded-full bg-gray-100 border-8 border-white p-2 shadow-profile flex justify-center">
            <span className="text-5xl font-bold text-blue-500 ">
              {user?.name[0] || "ABC"}
            </span>
          </div>
          <div className="flex flex-col pt-24">
            <h1>{user?.name}</h1>
            <div className="text-[16px] font-normal text-gray-600">
              {user.email}
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col justify-between gap-8 px-6 py-8">
        <div className="flex w-full justify-between">
          <h2 className="text-[18px] font-semibold text-gray-900">My Banks</h2>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/icons/plus.svg"
              width={20}
              height={20}
              alt="plus"
            ></Image>
            <p className="text-[14px] font-semibold text-gray-600">Add Bank</p>
          </Link>
        </div>
        {banks.length > 0 && (
          <div className="relative flex flex-1 flex-col items-center justify-center gap-5">
            <div className="relative z-10">
              <BankCard
                key={banks[0].id}
                account={banks[0]}
                userName={`${user.name}`}
                showBalance={false}
              />
            </div>
            {banks[1] && (
              <div className="absolute right-0 top-8 z-0 w-[90%]">
                <BankCard
                  key={banks[1].id}
                  account={banks[1]}
                  userName={`${user.firstName} ${user.lastName}`}
                  showBalance={false}
                />
              </div>
            )}
          </div>
        )}
      </section>
    </aside>
  );
};

export default RightSidebar;
