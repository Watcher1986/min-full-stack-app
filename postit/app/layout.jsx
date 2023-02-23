import { Roboto } from "@next/font/google";

import "./globals.css";
import Nav from "./auth/Nav";

import QueryWrapper from "./auth/QueryWrapper";
import RequireAuth from "./components/RequireAuth";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body
        className={`mx-4 md:mx-48 xl:mx-96 ${roboto.variable} font-sans tracking-wide bg-gray-200`}
      >
        <QueryWrapper>
          <Nav />
          <RequireAuth>{children}</RequireAuth>
        </QueryWrapper>
      </body>
    </html>
  );
}
