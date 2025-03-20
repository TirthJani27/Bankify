import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import Image from "next/image";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const logedIn = await getLoggedInUser();
  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar user={logedIn} />
      <div className="flex size-full flex-col">
        <div className="flex h-16 items-center justify-between p-5 shadow-creditCard sm:p-8 md:hidden">
          <Image src="/icons/logo.svg" width={30} height={30} alt="" />
          <div>
            <MobileNav user={logedIn}></MobileNav>
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
