import Sidebar from "@/components/Sidebar";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const logedIn = { firstName: "Tirth", lastName: "Jani" };
  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar user={logedIn} />
      {children}
    </main>
  );
}
