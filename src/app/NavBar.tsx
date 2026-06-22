"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/button";

const appRoutes = [
  {
    name: "Home",
    url: "/",
    protectedPage: false,
  },
  {
    name: "My Liked Quotes",
    url: "/user/quotes/liked",
    protectedPage: true,
  },
  {
    name: "Add a Quote",
    url: "/user/quotes/new",
    protectedPage: true, // Sadece giriş yapınca görünecek
  },
];

interface TopNavProps {
  className?: string;
}

export function TopNav({ className }: TopNavProps) {
  const { user, isLoading } = useUser();
  return (
    <div
      className={`sticky top-0 z-50 w-full bg-background backdrop-blur-md transition-colors flex justify-between items-center px-4 ${className}`}
    >
      <NavigationMenu
        viewport={false}
        className="my-0 w-full max-w-none flex flex-col sm:flex-row justify-center p-0 shadow-none"
      >
        <NavigationMenuList className="flex-wrap justify-center gap-1 sm:gap-2">
          {!isLoading &&
            appRoutes.map(({ name, url, protectedPage }) => {
              if (protectedPage && !user) return null;
              return (
                <NavigationMenuItem key={name} className={undefined}>
                  <Link href={url}>
                    <Button
                      variant="ghost"
                      className="mx-1 border border-transparent hover:border-slate-400 dark:hover:border-slate-600 
                          hover:scale-105 hover:shadow-md hover:shadow-blue-100 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 dark:hover:shadow-lg dark:hover:shadow-blue-950/50"
                    >
                      {name}
                    </Button>
                  </Link>
                </NavigationMenuItem>
              );
            })}
          {!isLoading &&
            (user ? (
              <NavigationMenuItem className={undefined}>
                <Link href="/auth/logout">
                  <Button
                    variant="ghost"
                    className="mx-1 border border-transparent hover:border-slate-400 dark:hover:border-slate-600 hover:scale-105 hover:shadow-lg transition-all duration-200 hover:shadow-md hover:shadow-blue-100 dark:hover:shadow-lg dark:hover:shadow-blue-950/50"
                  >
                    Logout
                  </Button>
                </Link>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem className="px-3 py-2">
                <Link href="/auth/login">
                  <Button
                    variant="ghost"
                    className="mx-1 border border-transparent hover:border-slate-400 dark:hover:border-slate-600 hover:scale-105 hover:shadow-lg transition-all duration-200 hover:shadow-md hover:shadow-blue-100 dark:hover:shadow-lg dark:hover:shadow-blue-950/50"
                  >
                    Login
                  </Button>
                </Link>
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
