'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedPage({ children, token }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {

      if (!token) {
        console.log('Token not found, redirecting to login');
        router.push("/login");
      } else {
        try {
          const response = await fetch("http://localhost:5000/api/users/verify-token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            setIsAuthenticated(true);
          } else {
            Cookies.remove("authToken");
            router.push("/login");
          }
        } catch (error) {
          console.error("Error during token validation", error);
          router.push("/login");
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading screen
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}