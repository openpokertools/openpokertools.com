import React from "react";

import type { HeadFC, PageProps } from "gatsby";

import AppShell from "@/components/shell/app-shell";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <AppShell>
      <div className="text-center w-full text-white my-64">
        <h1 className="mx-auto text-5xl font-extrabold">404</h1>
        <h2 className="mx-auto text-2xl font-bold my-2">Page not found</h2>
        <p>The requested URL was not found on this server.</p>
      </div>
    </AppShell>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <title>Page not found</title>
    <meta name="language" content="english" />
  </>
);
