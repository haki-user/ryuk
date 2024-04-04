import { AuthCheck } from "../auth-check";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthCheck>{children}</AuthCheck>;
}
