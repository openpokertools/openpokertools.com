import React from "react";
import { ShellNavbar } from "./shell-navbar";
import { ShellFooter } from "./shell-footer";

const AppShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="layout-container">
      <ShellNavbar />
      <main className="main-content">{children}</main>
      <ShellFooter />
    </div>
  );
};

export default AppShell;
