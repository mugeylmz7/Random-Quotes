"use client";

import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { ThemeToggle } from "@/components/ui/ThemeToggle";

const appRoutes = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "My Liked Quotes",
    url: "/user/quotes/liked",
  },
];

export function TopNav() {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-background backdrop-blur-md transition-colors flex justify-between items-center px-4">
      <NavigationMenu  viewport={false}
        className="my-0 w-full max-w-none flex flex-col sm:flex-row justify-center p-0 shadow-none"
      >
        <NavigationMenuList className="flex-wrap justify-center gap-1 sm:gap-2">
          {appRoutes.map(({ name, url }) => (
            <NavigationMenuItem key={name}>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link
                  href={url}
                  className="px-3 py-2 text-sm sm:text-base font-medium"
                >
                  {name}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="py-2 sm:py-4">
        <ThemeToggle />
      </div>
    </div>
  );
}