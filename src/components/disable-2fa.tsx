import { Loader } from "@/components/loaders";
import { Button } from "@/components/ui/button";
import { useDisable2FA } from "@/services/auth/hooks";
import { authKeys } from "@/services/auth/keys";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { toast } from "sonner";

export default function Disable2FA() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useDisable2FA();

  const handleDisabled2FA = useCallback(async () => {
    mutateAsync("", {
      onSuccess: ({ message }) => {
        toast.success(message ?? "2FA disabled successfully");
        queryClient.invalidateQueries({
          queryKey: authKeys.profile,
        });
      },
      onError: () => {
        toast.error("Failed to setup2FA");
      },
    });
  }, []);

  return (
    <Button
      variant="destructive"
      disabled={isPending}
      onClick={handleDisabled2FA}
    >
      {isPending && <Loader className="text-grey-100" />}
      Disable 2FA
      <span className="sr-only">Disable 2FA</span>
    </Button>
  );
}
