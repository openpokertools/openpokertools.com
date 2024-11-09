import React from "react";
import { Toaster } from "../ui/toaster";
import { ShellFooter } from "./shell-footer";
import { ShellNavbar } from "./shell-navbar";

const AppShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="layout-container">
      <ShellNavbar />
      <main className="main-content">{children}</main>
      <ShellFooter />
      <Toaster />
    </div>
  );
};

export default AppShell;
