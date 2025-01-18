"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <Button variant="destructive-secondary">
      <LogOut
        className="size-4"
        aria-hidden="true"
      />
      <span>Logout</span>
    </Button>
  );
}
