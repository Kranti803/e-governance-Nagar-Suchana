"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Shield, UserPlus } from "lucide-react";
import { municipalities, Municipality } from "@/constants";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

 const RegisterForm=() => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedMunicipality, setSelectedMunicipality] = useState<Municipality | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.get("fullName"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          password: formData.get("password"),
          municipality: (formData.get("municipality") as string) || selectedMunicipality?.id,
          ward: formData.get("ward"),
        }),
      })
      if (!res.ok) {
        const data = await res.json()
        toast.error(data.message || "Registration failed")
        return
      }
      toast.success("Registration successful!")
      router.replace("/dashboard") //user cannot go back to login after registering using router.replace instead of router.push
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-xl p-2 flex items-center justify-center gap-2">
            <span className="p-2 bg-[#0f2b66] inline-flex items-center justify-center rounded-xl">
              <Shield className="text-white" />
            </span>
            Ward Notice Board
          </CardTitle>
          <CardTitle className="text-center font-bold text-2xl">
            Create Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid grid-cols-1 gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" name="fullName" placeholder="Enter your full name" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" type="tel" placeholder="98XXXXXXXX" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="Create a strong password" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="Re-enter password" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="municipality">Municipality</Label>
              <select
                id="municipality"
                name="municipality"
                className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                onChange={(e) => {
                  const selected = municipalities.find((municipality) => municipality.id === e.target.value) || null;
                  setSelectedMunicipality(selected);
                }}
              >
                <option value="">Select Municipality</option>
                {municipalities.map((municipality) => (
                  <option key={municipality.id} value={municipality.id}>
                    {municipality.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ward">Ward Number</Label>
              <WardSelect selectedMunicipality={selectedMunicipality} />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <input className="size-4 rounded border" type="checkbox" name="terms" required />
                I agree to the Terms and Conditions
              </label>
            </div>

            <div className="md:col-span-2">
              <Button className="w-full bg-[#0f2b66] h-12 rounded-xl" type="submit" disabled={isSubmitting}>
                <UserPlus className="mr-2 h-4 w-4" /> {isSubmitting ? "Registering..." : "Register"}
              </Button>
            </div>
          </form>

          <p className="mt-4 text-center text-sm md:text-md font-semibold text-muted-foreground">
            Already have an account?{" "}
            <Link className="underline" href="/login">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default RegisterForm;

const WardSelect = ({ selectedMunicipality }: { selectedMunicipality: Municipality | null }) => {
  return (
    <select
      id="ward"
      name="ward"
      disabled={!selectedMunicipality}
      className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm outline-none disabled:opacity-50 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
    >
      <option value="">Select Ward</option>
      {selectedMunicipality?.wards.map((ward) => (
        <option key={ward} value={ward}>
          {ward}
        </option>
      ))}
    </select>
  );
};
