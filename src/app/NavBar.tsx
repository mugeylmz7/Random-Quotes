"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
<<<<<<< HEAD
import { useUser } from "@auth0/nextjs-auth0/client";

=======
>>>>>>> 3d3b1781190c21085f48de7653297c3cd7d19cd5
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

interface TopNavProps {
  className?: string;
}

export function TopNav({ className }: TopNavProps) {

  const { user, isLoading } = useUser();
  return (
    <div className={`sticky top-0 z-50 w-full bg-background backdrop-blur-md transition-colors flex justify-between items-center px-4 ${className}`}>
      <NavigationMenu viewport={false}
        className="my-0 w-full max-w-none flex flex-col sm:flex-row justify-center p-0 shadow-none"
      >
        <NavigationMenuList className="flex-wrap justify-center gap-1 sm:gap-2">
<<<<<<< HEAD
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
=======
          {appRoutes.map(({ name, url }) => (
            <NavigationMenuItem key={name} className={undefined}>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href={url} className="text-sm sm:text-base font-medium hover:text-slate-500 transition-colors">
                  {name}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
            {!isLoading && (
            user ? (
              <NavigationMenuItem className={undefined}>
>>>>>>> 3d3b1781190c21085f48de7653297c3cd7d19cd5
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="/auth/logout" className="text-sm sm:text-base font-medium hover:text-slate-500 transition-colors">
                    Logout
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
<<<<<<< HEAD
            ))}

          {/* Giriş / Çıkış Butonları */}
          {!!user ? (
            <>
              <NavigationMenuItem className="px-3 py-2">
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link
                    href={'/user/quotes/new'}
                    className="text-sm sm:text-base font-medium hover:text-slate-500 transition-colors"
                  >
                    Add a Quote
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem className="px-3 py-2">
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <a
                    href="/auth/logout"
                    className="text-sm sm:text-base font-medium hover:text-slate-500 transition-colors"
                  >
                    Logout
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </>
          ) : (
=======
              ) : (
>>>>>>> 3d3b1781190c21085f48de7653297c3cd7d19cd5
            <NavigationMenuItem className="px-3 py-2">
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
<<<<<<< HEAD
                <a
                  href="/auth/login"
                  className="text-sm sm:text-base font-medium hover:text-slate-500 transition-colors"
                >
=======
                <Link href="/auth/login" className="text-sm sm:text-base font-medium hover:text-slate-500 transition-colors">
>>>>>>> 3d3b1781190c21085f48de7653297c3cd7d19cd5
                  Login
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
<<<<<<< HEAD
          )}
        </NavigationMenuList>
      </NavigationMenu>

=======
              )
            )}
        </NavigationMenuList>
      </NavigationMenu>
>>>>>>> 3d3b1781190c21085f48de7653297c3cd7d19cd5
      <div className="py-2 sm:py-4">
        <ThemeToggle />
      </div>
    </div>
  );
}
