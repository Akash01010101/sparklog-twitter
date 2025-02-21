"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-96 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          {session ? (
            <>
              <p className="text-center text-gray-700">
                Welcome, <span className="font-semibold">{session.user?.name}</span>!
              </p>
              <img
                src={session.user?.image || "/default-avatar.png"}
                alt="User Avatar"
                className="h-16 w-16 rounded-full border"
              />
              <Button onClick={() => signOut()} className="w-full bg-red-500 hover:bg-red-600">
                Sign Out
              </Button>
            </>
          ) : (
            <Button onClick={() => signIn("twitter")} className="w-full">
              Sign In with Twitter
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
