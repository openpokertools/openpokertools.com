import React from "react";

const DisplayContainer = ({
  maxWidth,
  children,
}: {
  maxWidth: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className="container rounded analysisview my-3 px-xl-4 py-2 mx-auto"
      style={{ maxWidth: maxWidth }}
      data-nosnippet
    >
      {children}
    </div>
  );
};

export default DisplayContainer;
