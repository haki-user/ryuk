"use client";
// /**
//  * This code was generated by v0 by Vercel.
//  * @see https://v0.dev/t/1ADs2FRNaQg
//  */
// import {
//   CardTitle,
//   CardDescription,
//   CardHeader,
//   CardContent,
//   Card,
// } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
//
// export default function LoginCard() {
//   return (
//     <Card className="mx-auto max-w-sm mt-8">
//       <CardHeader className="space-y-1">
//         <CardTitle className="text-2xl font-bold">Register</CardTitle>
//         <CardDescription>
//           Enter your email and password to create your account
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="name">Name</Label>
//             <Input
//               id="name"
//               placeholder="Ryuk"
//               required
//               type="text"
//             />
//           </div>
//         </div>
//         <div className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="email">Email</Label>
//             <Input
//               id="email"
//               placeholder="m@example.com"
//               required
//               type="email"
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="password">Password</Label>
//             <Input id="password" required type="password" />
//           </div>
//           <Button className="w-full" type="submit">
//             Register
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/1ADs2FRNaQg
 */
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
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
import { createUserAccount, signInAccount } from "@/auth/api";
import { useUserContext } from "@/context/auth-context";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const login = async () => {
    // const session = await account.createEmailSession(email, password);
    const session = await signInAccount({ email, password });
    if (!session) {
      toast({ title: "Sign in failed." });
      return;
    }
    const isLoggedIn = await checkAuthUser();
    if (!isLoggedIn) {
      toast({ title: "Sign up failed." });
      return;
    }
    // reset form
    // navigate to home
  };

  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = await createUserAccount({
      name,
      email,
      password,
    });
    console.log(newUser);
    if (!newUser) {
      toast({ title: "Sign up failed" });
      return;
    }

    login();
  };

  return (
    <Card className="mx-auto max-w-sm mt-8">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Register</CardTitle>
        <CardDescription>
          Enter your details to Create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={register}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Full Name</Label>
              <Input
                id="name"
                placeholder="Ryuk"
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
              Signup
            </Button>
          </div>
        </form>
      </CardContent>
      <div className="absolute bg-[#2db963] radius-[24px] rotate-[35deg] w-[100px] h-[350px] top-[200px] sm:w-[260px] sm:top-[70px] md:top-[70px] sm:h-[400px] blur-3xl sm:blur-[150px] animate-shadow-slide "></div>
    </Card>
  );
}
