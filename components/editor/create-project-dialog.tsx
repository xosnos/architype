"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface CreateProjectDialogProps {
  open: boolean;
  name: string;
  loading: boolean;
  error: string | null;
  onNameChange: (value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export function CreateProjectDialog({
  open,
  name,
  loading,
  error,
  onNameChange,
  onSubmit,
  onClose,
}: CreateProjectDialogProps) {
  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => {
      const el = document.getElementById("create-project-name");
      el?.focus();
    }, 0);
    return () => window.clearTimeout(id);
  }, [open]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create project</DialogTitle>
          <DialogDescription>Give your architecture workspace a name.</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-5 py-6">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="create-project-name"
              className="text-xs font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              Project name
            </label>
            <Input
              id="create-project-name"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Payments Service"
              autoComplete="off"
              disabled={loading}
            />
          </div>
        </div>

        {error && (
          <p className="text-sm" style={{ color: "var(--state-error)" }}>
            {error}
          </p>
        )}

        <DialogFooter>
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={loading || !name.trim()}>
            {loading ? "Creating..." : "Create project"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
