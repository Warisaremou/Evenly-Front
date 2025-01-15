"use client";

import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <div className="flex w-full cursor-pointer items-center py-[2px] font-medium text-destructive dark:text-red-500">
      <LogOut
        className="mr-2 size-4"
        aria-hidden="true"
      />
      <span>Se déconnecter</span>
    </div>
  );
}
