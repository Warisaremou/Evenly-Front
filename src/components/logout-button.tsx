"use client";

import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/use-localstorage";
import { LogOut } from "lucide-react";
import { useState } from "react";

export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  const { removeItem } = useLocalStorage();

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      removeItem("accessToken");
      setIsLoading(false);
      window.location.reload();
    }, 1500);
  };

  return (
    <Button
      variant="destructive-secondary"
      className="w-full justify-start"
      disabled={isLoading}
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
