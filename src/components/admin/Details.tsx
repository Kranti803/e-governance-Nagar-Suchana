"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Users, FileText } from "lucide-react";

/* ---------------- TYPES ---------------- */
type User = {
  _id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
};

/* ---------------- DUMMY DATA ---------------- */
const dummyUsers: User[] = [
  {
    _id: "u1",
    name: "Ram Sharma",
    email: "ram@gmail.com",
    role: "USER",
  },
  {
    _id: "u2",
    name: "Sita Rai",
    email: "sita@gmail.com",
    role: "USER",
  },
  {
    _id: "u3",
    name: "Admin",
    email: "admin@gmail.com",
    role: "ADMIN",
  },
];

const TOTAL_POSTS = 12; // dummy post count

/* ---------------- COMPONENT ---------------- */

export default function AdminDashboardDetails() {
  const [users, setUsers] = useState<User[]>(dummyUsers);

  const handleDeleteUser = (id: string) => {
    if (!confirm("Delete this user?")) return;
    setUsers((prev) => prev.filter((u) => u._id !== id));
  };

  return (
    <div className="space-y-6 m-4">
      {/* -------- TOP STATS -------- */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card className="rounded-xl">
          <CardContent className="flex items-center gap-4 p-4">
            <Users className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-2xl font-semibold">{users.length}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardContent className="flex items-center gap-4 p-4">
            <FileText className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-sm text-muted-foreground">Total Posts</p>
              <p className="text-2xl font-semibold">{TOTAL_POSTS}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* -------- USER LIST -------- */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl">All Users</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {users.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between rounded-xl border p-4"
            >
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <span className="text-xs font-medium text-blue-600">
                  {user.role}
                </span>
              </div>

              <Button
                size="icon"
                variant="destructive"
                onClick={() => handleDeleteUser(user._id)}
                disabled={user.role === "ADMIN"}
                title={user.role === "ADMIN" ? "Cannot delete admin" : "Delete user"}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
