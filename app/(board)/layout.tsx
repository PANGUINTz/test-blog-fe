import React from "react";
import Sidebar from "@/components/elements/Sidebar";
import Header from "@/components/elements/Header";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="flex bg-gray100">
        <Sidebar />
        <div className="container mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default layout;
