"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { signInAccount } from "@/auth/api";
import { useUserContext } from "@/context/auth-context";
import { useToast } from "@/components/ui/use-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { toast } = useToast();
  const {
    isAuthenticated,
    checkAuthUser,
    isLoading: isUserLoading,
  } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && isAuthenticated) {
      router.back();
    }
  }, [isUserLoading, isAuthenticated]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    const session = await signInAccount({ email, password });
    console.log(session);
    if (!session) {
      toast({ title: "Sign in failed." });
      return;
    }
    const isLoggedIn = await checkAuthUser();
    console.log(isLoggedIn);
    if (!isLoggedIn) {
      toast({ title: "Sign in failed." });
      return;
    }
    // reset form
    // navigate to home
  };

  return (
    <Card className="mx-auto max-w-sm mt-8">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Enter your email and password to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={login}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button className="w-full" type="submit">
              Login
            </Button>
          </div>
        </form>
      </CardContent>
      <div className="absolute bg-[#2db963] radius-[24px] rotate-[35deg] w-[100px] h-[350px] top-[200px] sm:w-[260px] sm:top-[70px] md:top-[70px] sm:h-[400px] blur-3xl sm:blur-[150px] animate-shadow-slide "></div>
    </Card>
  );
};

export default LoginPage;
