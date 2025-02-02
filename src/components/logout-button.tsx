"use client";

import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/use-localstorage";
import { useLogout } from "@/services/auth/hooks";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

export default function LogoutButton() {
  const { removeItem } = useLocalStorage();
  const { mutateAsync, isPending } = useLogout();

  const handleLogout = async () => {
    await mutateAsync("nope", {
      onSuccess: (response) => {
        removeItem("accessToken");
        toast.success(response.message ?? "Logged out successfully");
        window.location.reload();
      },
      onError: () => {
        toast.error("Failed to logout");
      },
    });
  };

  return (
    <Button
      variant="destructive-secondary"
      className="w-full justify-start"
      disabled={isPending}
      onClick={handleLogout}
    >
      <LogOut
        className="size-4"
        aria-hidden="true"
      />
      <span>Logout</span>
    </Button>
  );
}
