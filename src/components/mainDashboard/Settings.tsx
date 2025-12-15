"use client";

import React, { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface FormData {
  fullName: string;
  phoneNumber: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const Settings: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phoneNumber: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/me");
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || "Failed to load profile");

        setFormData((prev) => ({
          ...prev,
          fullName: data.user?.fullName || "",
          phoneNumber: data.user?.phone || "",
        }));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setMessage(null);
    setError(null);

    if (formData.newPassword || formData.confirmPassword || formData.oldPassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        setError("New password and confirm password do not match");
        return;
      }
    }

    try {
      setSaving(true);
      const payload: {
        fullName: string;
        phoneNumber: string;
        newPassword?: string;
        oldPassword?: string;
      } = {
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
      };
      if (formData.newPassword) {
        payload.newPassword = formData.newPassword;
        payload.oldPassword = formData.oldPassword;
      }

      const res = await fetch("/api/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "Failed to save settings");

      setMessage("Profile updated successfully");
      setFormData((prev) => ({
        ...prev,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Citizen: Settings</h1>
          <p className="text-sm text-gray-500 mt-1">User Settings</p>
        </div>

        {loading && <p className="text-sm text-muted-foreground">Loading profile...</p>}
        {error && (
          <p className="text-sm text-red-600" aria-live="polite">
            {error}
          </p>
        )}

        {!loading && (
          <div className="space-y-6">
            {/* Full Name and Phone Number Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  placeholder="98XXXXXXXX"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Old Password and New Password Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="oldPassword">Old Password</Label>
                <Input
                  id="oldPassword"
                  name="oldPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.oldPassword}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  placeholder="Create a new password"
                  value={formData.newPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Re-enter new password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-4">
              <Button
                onClick={handleSubmit}
                className="gap-2 bg-green-600 hover:bg-green-700 text-white"
                disabled={saving}
              >
                <Save size={16} />
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>

            {(message || error) && (
              <p
                className={`text-sm ${error ? "text-red-600" : "text-green-600"}`}
                aria-live="polite"
              >
                {error || message}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
