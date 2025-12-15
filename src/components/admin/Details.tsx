"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Users, FileText } from "lucide-react";

/* ---------------- TYPES ---------------- */
type User = {
  _id: string;
  fullName: string;
  email: string;
  role: "admin" | "citizen";
};

/* ---------------- COMPONENT ---------------- */

export default function AdminDashboardDetails() {
  const [users, setUsers] = useState<User[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const [usersRes, noticesRes] = await Promise.all([
          fetch("/api/users"),
          fetch("/api/notices"),
        ]);

        const usersData = await usersRes.json().catch(() => ({}));
        const noticesData = await noticesRes.json().catch(() => ({}));

        if (!usersRes.ok) throw new Error(usersData?.message || "Failed to load users");
        if (!noticesRes.ok) throw new Error(noticesData?.message || "Failed to load posts");

        setUsers(usersData.users || []);
        setTotalPosts((noticesData.notices || []).length);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleDeleteUser = (id: string) => {
    if (!confirm("Delete this user?")) return;
    const user = users.find((u) => u._id === id);
    if (user?.role === "admin") {
      alert("Cannot delete admin user");
      return;
    }

    const deleteUser = async () => {
      try {
        setSubmitting(true);
        const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data?.message || "Failed to delete user");
        setUsers((prev) => prev.filter((u) => u._id !== id));
      } catch (err) {
        alert(err instanceof Error ? err.message : "Failed to delete user");
      } finally {
        setSubmitting(false);
      }
    };

    deleteUser();
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
              <p className="text-2xl font-semibold">{totalPosts}</p>
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
          {loading && <p className="text-sm text-muted-foreground">Loading users...</p>}
          {error && (
            <p className="text-sm text-red-600" aria-live="polite">
              {error}
            </p>
          )}
          {!loading && !error && users.length === 0 && (
            <p className="text-sm text-muted-foreground">No users found.</p>
          )}
          {users.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between rounded-xl border p-4"
            >
              <div>
                <p className="font-medium">{user.fullName}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <span className="text-xs font-medium text-blue-600">
                  {user.role.toUpperCase()}
                </span>
              </div>

              <Button
                size="icon"
                variant="destructive"
                onClick={() => handleDeleteUser(user._id)}
                disabled={user.role === "admin" || submitting}
                title={user.role === "admin" ? "Cannot delete admin" : "Delete user"}
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
