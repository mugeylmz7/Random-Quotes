import { Geist, Geist_Mono } from "next/font/google";
import { QuotesProvider } from "@/app/QuotesContext";
import { TopNav } from "./NavBar";
import { ThemeProvider } from "@/app/theme-provider";
import "./globals.css";
import { Auth0Provider } from '@auth0/nextjs-auth0/client';

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

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} min-h-full`}
    >
      <body className="min-h-screen w-full">
        <Auth0Provider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <QuotesProvider>
              <TopNav />
              {children}
            </QuotesProvider>
          </ThemeProvider>
        </Auth0Provider>
      </body>
    </html>
  );
}