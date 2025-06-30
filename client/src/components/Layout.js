import React from "react";
import Navigation from "./Navigation";

const Layout = ({ children, className = "" }) => {
  return (
    <div className={`App ${className}`}>
      <Navigation />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
