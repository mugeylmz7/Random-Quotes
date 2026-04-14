import { Geist, Geist_Mono } from "next/font/google";
import {QuotesProvider} from "@/app/QuotesContext";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Random Quotes Application",
  description: "Random Quotes Application 130625",
};

export default function RootLayout({children}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
      <QuotesProvider>
        <nav className="bg-gray-400 text-slate-100 p-4 flex">
        <ul className="flex gap-8 w-full px-4">
          <li className="hover:text-blue-900">
            <Link href='/'>Home</Link>
          </li>
          <li className="hover:text-blue-900">
            <Link href='/user/quotes/liked'>Liked Quotes</Link>
          </li>
        </ul>
      </nav>
        {children}
      
      </QuotesProvider>
      </body>
    </html>
  );

}
