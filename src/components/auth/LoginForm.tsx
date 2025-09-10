"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogIn, Shield } from "lucide-react";
import { useState } from "react";

export function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(event.currentTarget);
      const identifier = String(formData.get("identifier") || "");
      const password = String(formData.get("password") || "");
      // Placeholder auth flow – replace with real API call
      await new Promise((r) => setTimeout(r, 600));
      console.log({ identifier, password });
      // Redirect or toast here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md p-4">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-xl p-2 flex items-center justify-center gap-2">
            <span className="p-2 bg-[#0f2b66] inline-flex items-center justify-center rounded-xl">
              <Shield className="text-white" />
            </span>
            Ward Notice Board
          </CardTitle>
          <CardTitle className="text-center font-bold text-2xl">
            Login to Ward Notice Board
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="identifier">Email</Label>
              <Input
                id="identifier"
                name="identifier"
                placeholder="e.g. you@example.com"
                required
                type="text"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>
            <Button className="w-full h-12 rounded-xl bg-[#0f2b66]" type="submit" disabled={isSubmitting}>
              <LogIn className="mr-2 h-4 w-4" />{" "}
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm md:text-md font-semibold text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link className="underline" href="/register">
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginForm;
