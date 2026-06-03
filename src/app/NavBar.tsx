"use client";

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
  const isLoggedIn = false;

  return (
    <div className={`sticky top-0 z-50 w-full bg-background backdrop-blur-md transition-colors flex justify-between items-center px-4 ${className}`}>
      <NavigationMenu viewport={false}
        className="my-0 w-full max-w-none flex flex-col sm:flex-row justify-center p-0 shadow-none"
      >
        <NavigationMenuList className="flex-wrap justify-center gap-1 sm:gap-2">
  
  {/* 1. ADIM: Menü linklerini (Home, Liked) döngüyle ekrana basıyoruz */}
  {appRoutes.map(({ name, url }) => (
    <NavigationMenuItem key={name} className={undefined}>
      <NavigationMenuLink
        asChild
        className={navigationMenuTriggerStyle()}
      >
        <a href={url} className="text-sm sm:text-base font-medium hover:text-slate-500 transition-colors">
          {name}
        </a>
      </NavigationMenuLink>
    </NavigationMenuItem>
  ))}

  {/* 2. ADIM: Giriş yapılmış mı yapılmamış mı kontrolü (Auth Feature) */}
  {/* NOT: Alttaki 'isLoggedIn' değişkenini kendi projendeki auth durumuna (user, session vb.) göre değiştirmelisin */}
  {isLoggedIn ? (
    <NavigationMenuItem className={undefined}>
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
    <NavigationMenuItem className={undefined}>
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