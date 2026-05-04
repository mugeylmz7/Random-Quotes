"use client";

import Link from "next/link";
import { useUser } from '@auth0/nextjs-auth0/client';

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
    protectedPage: false,
  },
  {
    name: "My Liked Quotes",
    url: "/user/quotes/liked",
    protectedPage: true,
  },
];

export function TopNav() {
  const { user, isLoading } = useUser();

  if (isLoading) return null;

  return (
    <div className="sticky top-0 z-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 backdrop-blur-md transition-colors flex justify-between items-center px-4 w-full mx-auto">
      <NavigationMenu className="max-w-full mx-auto flex flex-col sm:flex-row justify-center p-4 shadow-sm">
        <NavigationMenuList className="flex-wrap justify-center gap-1 sm:gap-2">
          
          {/* Süzgeç ve Ekrana Çizme Kısmı */}
          {appRoutes
            .filter((route) => {
              if (route.protectedPage && !user) {
                return false;
              }
              return true;
            })
            .map(({ name, url }) => (
              <NavigationMenuItem key={name} className="px-3 py-2">
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

          {/* Giriş / Çıkış Butonları */}
          {!!user ? (
            <NavigationMenuItem className="px-3 py-2">
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <a href="/auth/logout" className="text-sm sm:text-base font-medium hover:text-slate-500 transition-colors">
                  Logout
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem className="px-3 py-2">
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <a href="/auth/login" className="text-sm sm:text-base font-medium hover:text-slate-500 transition-colors">
                  Login
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}

        </NavigationMenuList>
      </NavigationMenu>
      
      <div className="py-2 sm:py-4">
        <ThemeToggle />
      </div>
    </div>
  );
}