"use client";
import { useEffect } from "react";
import { useUserContext } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "@/components/ui/loadingSpinner";
export const AuthCheck = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useUserContext();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading]);

  if (!isAuthenticated ||  isLoading) {
    return (
      <div className="w-full h-full flex justify-center -mt-10 items-center">
        <LoadingSpinner />
      </div>
    );
  }
  return <>{children}</>;
};
