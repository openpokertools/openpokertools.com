import { Link } from "gatsby";
import React from "react";

export const ShellFooter = () => (
  <footer
    className="text-gray-500 border-gray-700 mt-5 border-t mx-auto"
    style={{ maxWidth: 1000 }}
  >
    <div className="flex flex-row py-5">
      <a href="/contact" className="block px-3 ml-auto text-gray-500 hover:text-gray-300">
        Contact Us
      </a>
      &bull;
      <a
        href="https://github.com/openpokertools/openpokertools.com/issues"
        className="block px-3 text-gray-500 hover:text-gray-300"
      >
        Report a Bug
      </a>
      &bull;
      <a
        href="https://github.com/openpokertools/openpokertools.com/issues"
        className="block px-3 mr-auto text-gray-500 hover:text-gray-300"
      >
        Suggest a Feature
      </a>
    </div>
  </footer>
);
