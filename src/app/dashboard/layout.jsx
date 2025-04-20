import React from "react";
import Header from "./_components/Header";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="mx-5 md:mx-20 lg:mx-36">{children}</div>
      
    </div>
  );
  
};

export default DashboardLayout;
