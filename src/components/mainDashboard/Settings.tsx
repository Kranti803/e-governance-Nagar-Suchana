"use client";

import React, { useState } from "react";
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
    phoneNumber: "98XXXXXXXX",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (): void => {
    console.log("Form submitted:", formData);
    // Add your submit logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Citizen: Settings</h1>
          <p className="text-sm text-gray-500 mt-1">User Settings</p>
        </div>

        {/* Form Fields */}
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
            >
              <Save size={16} />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
