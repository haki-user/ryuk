import { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/navbar";
import AuthProvider from "@/context/auth-context";
import { AwsRum, AwsRumConfig } from "aws-rum-web";

export const metadata: Metadata = {
  title: "Ryuk",
  description: "AI Companion",
};

try {
  const config: AwsRumConfig = {
    sessionSampleRate: 1,
    identityPoolId: "us-east-1:ab346f52-2a6f-45a8-a3ed-db97f1734c1d",
    endpoint: "https://dataplane.rum.us-east-1.amazonaws.com",
    telemetries: ["performance", "errors", "http"],
    allowCookies: true,
    enableXRay: false,
  };

  const APPLICATION_ID: string = "30974108-bf59-4372-92a2-d2e7065a739f";
  const APPLICATION_VERSION: string = "1.0.0";
  const APPLICATION_REGION: string = "us-east-1";

  const awsRum: AwsRum = new AwsRum(
    APPLICATION_ID,
    APPLICATION_VERSION,
    APPLICATION_REGION,
    config
  );
  console.log(awsRum);
} catch (error) {
  // Ignore errors thrown during CloudWatch RUM web client initialization
  console.log("error, rum", error);
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableColorScheme
          disableTransitionOnChange
        >
          <AuthProvider>
            <Navbar />
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
