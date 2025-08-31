// src/components/Layout.tsx
import Sidebar from "@/components/mycomponents/Sidebar";
import Header from "@/components/mycomponents/Header";
import { Toaster } from "../ui/sonner";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full h-screen overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">{children}</main>
        <Toaster position="top-center"/>
      </div>
    </div>
  );
}

export default Layout;
