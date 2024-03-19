"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  // DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  // DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  // DropdownMenuSub,
  // DropdownMenuSubContent,
  // DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { useUserContext } from "@/context/auth-context";
import { account } from "@/auth/appwrite";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "AI Assistant",
    href: "/ryuk",
    description:
      "Ryuk is a software agent that can perform tasks or services for an individual. These tasks or services are based on user input. An AI assistant uses natural language processing (NLP) to understand and respond to user requests.",
  },
  {
    title: "Summarize",
    href: "/ryuk/summarize",
    description:
      "From a video or audio file, Ryuk can summarize the content and provide a brief overview of the content.",
  },
  {
    title: "Transcribe",
    href: "/ryuk/transcribe",
    description:
      "Ryuk can convert speech to text. This is useful for people who are unable to type or write.",
  },
  {
    title: "Translate",
    href: "/ryuk/translate",
    description: "Ryuk can translate text from one language to another.",
  },
];

export function Navbar() {
  const { isAuthenticated, user, setUser, setIsAuthenticated, checkAuthUser } =
    useUserContext();
  const logout = async () => {
    await account.deleteSession("current");
    setIsAuthenticated(false);
    setUser({
      id: "",
      name: "",
      email: "",
      imageUrl: "",
    });
  };
  useEffect(() => {
    checkAuthUser();
  }, []);

  return (
    <div className="flex justify-between">
      <NavigationMenu className="p-2 pl-8">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <Icons.logo className="h-6 w-6" />
                      <div className="mb-2 mt-4 text-lg font-medium">Ryuk</div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        AI Companion that can help you in your learning journey.
                        You can use Ryuk to learn new languages and boost your
                        confidence in speaking English.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/docs" title="Introduction">
                  Get started with Ryuk.
                </ListItem>
                <ListItem href="/docs/installation" title="Installation">
                  Install Ryuk on your device.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Features</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Documentation
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <NavigationMenu className="p-2 pr-8">
        <NavigationMenuList>
          {!isAuthenticated ? (
            <>
              <NavigationMenuItem>
                <Link href="/login" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={buttonVariants({
                      variant: "outline",
                      size: "sm",
                    })}
                  >
                    Log In
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/signup" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={buttonVariants({ size: "sm" })}
                  >
                    Sign Up
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className={cn("w-8 h-8")}>
                  <AvatarImage src={user.imageUrl} alt={user.name} />
                  <AvatarFallback>user.name</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  Log out
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
          href={String(href)}
        >
          <>
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
