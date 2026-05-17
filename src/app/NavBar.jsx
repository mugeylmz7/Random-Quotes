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
    <div className="sticky top-0 z-50gi dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 backdrop-blur-md transition-colors flex justify-between items-center px-4 w-full mx-auto">
      <NavigationMenu className="max-w-full mx-auto flex flex-col sm:flex-row justify-center p-4 shadow-sm">
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