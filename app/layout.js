import "./globals.css";

import { Young_Serif } from "next/font/google";
import { Crushed } from "next/font/google";
import { Damion } from "next/font/google";

const youngSerif = Young_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: "--font-young-serif",
})

const crushed = Crushed({
  subsets: ['latin'],
  weight: '400',
  variable: "--font-crushed",
})

const damion = Damion({
  subsets: ['latin'],
  weight: '400',
  variable: "--font-damion",
})

export const metadata = {
  title: "For Book's Sake",
  description: "A book tracker",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${youngSerif.variable} ${crushed.variable} ${damion.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
