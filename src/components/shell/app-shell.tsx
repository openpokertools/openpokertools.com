import React from "react";

import { FourColorDeckProvider } from "../playing-card/four-color-deck-context";
import { Toaster } from "../ui/toaster";
import { ShellFooter } from "./shell-footer";
import { ShellNavbar } from "./shell-navbar";

const AppShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <FourColorDeckProvider>
      <div className="layout-container">
        <ShellNavbar />
        <main className="main-content">{children}</main>
        <ShellFooter />
        <Toaster />
      </div>
    </FourColorDeckProvider>
  );
};

export default AppShell;
