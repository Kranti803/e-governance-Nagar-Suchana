"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2, Pencil } from "lucide-react";

/* ---------------- TYPES ---------------- */

type Notice = {
  _id: string;
  title: string;
  summary: string;
  content: string;
  category: "GENERAL" | "TAX" | "HEALTH" | "EVENTS";
  publishDate: string;
};

/* ---------------- DUMMY DATA ---------------- */

const dummyNotices: Notice[] = [
  {
    _id: "dummy-1",
    title: "Road Maintenance Notice",
    summary: "Main road will be closed from 10 AM to 5 PM.",
    content:
      "The municipality informs all citizens that the main road will remain closed due to maintenance work. Please use alternative routes.",
    category: "GENERAL",
    publishDate: new Date().toISOString(),
  },
];

/* ---------------- COMPONENT ---------------- */

export default function ManageNoticeAdmin() {
  const [notices, setNotices] = useState<Notice[]>(dummyNotices);
  const [selected, setSelected] = useState<Notice | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ---------- DELETE ---------- */
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this notice?")) return;
    setNotices((prev) => prev.filter((n) => n._id !== id));
  };

  /* ---------- UPDATE ---------- */
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selected) return;

    setLoading(true);
    const formData = new FormData(e.currentTarget);

    const payload = {
      title: String(formData.get("title")),
      summary: String(formData.get("summary")),
      content: String(formData.get("content")),
      category: formData.get("category") as Notice["category"],
      publishDate: String(formData.get("publishDate")),
    };

    setNotices((prev) =>
      prev.map((n) =>
        n._id === selected._id ? { ...n, ...payload } : n
      )
    );

    setLoading(false);
    setOpen(false);
  };

  return (
    <Card className="rounded-2xl m-4">
      <CardHeader>
        <CardTitle className="text-xl">Manage Notices</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {notices.map((notice) => (
          <div
            key={notice._id}
            className="flex items-start justify-between rounded-xl border p-4"
          >
            <div className="space-y-1">
              <p className="font-medium">{notice.title}</p>
              <p className="text-sm text-muted-foreground">
                {notice.summary}
              </p>
              <span className="text-xs font-medium text-green-600">
                {notice.category}
              </span>
            </div>

            <div className="flex gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={() => {
                  setSelected(notice);
                  setOpen(true);
                }}
              >
                <Pencil className="h-4 w-4" />
              </Button>

              <Button
                size="icon"
                variant="destructive"
                onClick={() => handleDelete(notice._id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>

      {/* ---------- EDIT DIALOG ---------- */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Edit Notice</DialogTitle>
          </DialogHeader>

          {selected && (
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="space-y-1">
                <Label>Title</Label>
                <Input
                  name="title"
                  defaultValue={selected.title}
                  required
                />
              </div>

              <div className="space-y-1">
                <Label>Category</Label>
                <NativeSelect
                  name="category"
                  defaultValue={selected.category}
                >
                  <NativeSelectOptGroup>
                    Select category
                  </NativeSelectOptGroup>
                  <NativeSelectOption value="GENERAL">
                    General
                  </NativeSelectOption>
                  <NativeSelectOption value="TAX">
                    Tax
                  </NativeSelectOption>
                  <NativeSelectOption value="HEALTH">
                    Health
                  </NativeSelectOption>
                  <NativeSelectOption value="EVENTS">
                    Events
                  </NativeSelectOption>
                </NativeSelect>
              </div>

              <div className="space-y-1">
                <Label>Summary</Label>
                <Textarea
                  name="summary"
                  defaultValue={selected.summary}
                  required
                />
              </div>

              <div className="space-y-1">
                <Label>Content</Label>
                <Textarea
                  name="content"
                  rows={5}
                  defaultValue={selected.content}
                  required
                />
              </div>

              <div className="space-y-1">
                <Label>Publish Date</Label>
                <Input
                  type="date"
                  name="publishDate"
                  defaultValue={selected.publishDate.split("T")[0]}
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button type="submit" disabled={loading}>
                  {loading ? "Updating..." : "Update Notice"}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
