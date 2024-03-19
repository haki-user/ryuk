"use client";
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
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const login = async () => {
    // const session = await account.createEmailSession(email, password);
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
          <Button className="w-full" type="submit" onClick={login}>
            Login
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginPage;
