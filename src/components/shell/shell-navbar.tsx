import React, { useEffect, useState } from "react";
import { Github } from "lucide-react";

export const ShellNavbar = () => {
  const [currentPath, setCurrentPath] = useState<string>("");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const isActive = (path: string) => currentPath === path;

  return (
    <div data-nosnippet>
      <nav className="border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="https://openpokertools.com/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="/logo.png"
              className="h-8"
              alt="OpenPokerTools.com Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              OpenPokerTools.com
            </span>
          </a>
          <div className="hidden w-full md:block md:w-auto">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
              <li>
                <a
                  href="/"
                  className={`block py-2 px-3 rounded md:p-0 ${
                    isActive("/")
                      ? "text-gray-50"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                  aria-current={isActive("/") ? "page" : undefined}
                >
                  Range Analyser
                </a>
              </li>
              <li>
                <a
                  href="/equity"
                  className={`block py-2 px-3 rounded md:p-0 ${
                    isActive("/equity/")
                      ? "text-gray-50"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                  aria-current={isActive("/equity/") ? "page" : undefined}
                >
                  Range vs Range Equity
                </a>
              </li>
              <li>
                <a
                  href="/odds"
                  className={`block py-2 px-3 rounded md:p-0 ${
                    isActive("/odds/")
                      ? "text-gray-50"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                  aria-current={isActive("/odds/") ? "page" : undefined}
                >
                  Odds Calculator
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/openpokertools/openpokertools.com"
                  className="block py-2 px-3 text-gray-500 rounded hover:text-gray-300 md:p-0"
                >
                  <div className="flex">
                    <Github className="mr-1" />
                    Contribute
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
