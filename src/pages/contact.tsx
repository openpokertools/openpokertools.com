import React, { useState } from "react";
import type { HeadFC, PageProps } from "gatsby";
import AppShell from "@/components/shell/app-shell";

const ContactPage: React.FC<PageProps> = () => {
  const [message, setMessage] = useState();
  const alpha = [
    "x",
    "y",
    "v",
    "u",
    "d",
    "g",
    "b",
    "j",
    "k",
    "m",
    "s",
    "o",
    "t",
    "l",
    "f",
    "p",
    "c",
    "@",
    "i",
    "e",
    "z",
    "n",
    "r",
    "h",
    "w",
    ".",
    "q",
    "a",
    "x",
  ];
  const code = [
    11, 15, 19, 21, 15, 11, 8, 19, 22, 12, 11, 11, 13, 10, 17, 5, 9, 27, 18, 13,
    25, 16, 11, 9,
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const selectedValue = formData.get("pokertest");

    if (selectedValue === "flush") {
      let decodedMessage = "";
      for (let i = 0; i < code.length; i++) {
        decodedMessage += alpha[code[i]];
      }
      setMessage(
        <a className="mx-auto" href={`mailto:${decodedMessage}`}>
          {decodedMessage}
        </a>,
      );
    } else {
      setMessage(
        <div className="my-2 alert alert-danger" role="alert">
          Incorrect. Please try again.
        </div>,
      );
    }
  };

  return (
    <AppShell>
      <div
        className="container rounded analysisview my-3 p-4 mx-auto"
        style={{ maxWidth: "380px" }}
      >
        <form onSubmit={handleSubmit}>
          <p>Which of the following is the best hand?</p>
          <input type="radio" id="pair" name="pokertest" value="pair" />
          <label htmlFor="pair">Pair</label>
          <br />
          <input type="radio" id="straight" name="pokertest" value="straight" />
          <label htmlFor="straight">Straight</label>
          <br />
          <input type="radio" id="flush" name="pokertest" value="flush" />
          <label htmlFor="flush">Flush</label>
          <br />
          <input type="radio" id="trips" name="pokertest" value="trips" />
          <label htmlFor="trips">Three of a kind</label>
          <br />
          <input type="submit" value="Submit" />
        </form>
        {message}
      </div>
    </AppShell>
  );
};

export default ContactPage;

export const Head: HeadFC = () => (
  <>
    <title>OpenPokerTools.com - Contact Information</title>
    <meta
      name="description"
      content="Contact us, report a bug, suggest a feature."
    />
    <meta name="keywords" content="contact" />
    <meta name="language" content="english" />
  </>
);
