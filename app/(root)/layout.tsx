import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex h-screen">
      <Sidebar />
      <section className="flex h-screen flex-1 flex-col">
        <Header />
        <div className="h-screen overflow-auto bg-white sm:mr-7 sm:rounded-[30px] md:mb-7">
          {children}
        </div>
      </section>
    </main>
  );
};

export default Layout;
