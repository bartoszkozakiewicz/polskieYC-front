"use client";
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { AuthProvider } from "@/contexts/AuthContext";
import { CreditsProvider } from "@/contexts/creditsContext";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { SnackbarProvider } from "notistack";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { user } = useAuth();

  // const pathname = usePathname();
  useEffect(() => {
    console.log("Verify user: ", user);
    if (!user) {
      router.push("/auth/signin");
    }
  }, [user, router]);

  // if (!user) {
  //   console.log("Push to sign ", user);
  //   router.push("/auth/signin");
  // }

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en">
      <AuthProvider>
        <CreditsProvider>
          <body suppressHydrationWarning={true}>
            <SnackbarProvider maxSnack={3}>
              {loading ? <Loader /> : children}
            </SnackbarProvider>
          </body>
        </CreditsProvider>
      </AuthProvider>
    </html>
  );
}
