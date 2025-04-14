import Loader from "@/components/loaders/loader";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Otp, otpSchema } from "@/lib/schemas/auth";
import { useVerifyOTP } from "@/services/auth/hooks";
import { authKeys } from "@/services/auth/keys";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Props = {
  handleModalView: () => void;
  inputLabel: string;
};

export default function VerifyOtpForm({ inputLabel, handleModalView }: Props) {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync: verifyOtp } = useVerifyOTP();

  const form = useForm<Otp>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
    mode: "all",
  });

  const onSubmit = useCallback(async (credentials: Otp) => {
    await verifyOtp(credentials, {
      onSuccess: ({ message }) => {
        toast.success(message ?? "OTP setup successfully");
        queryClient.invalidateQueries({
          queryKey: authKeys.profile,
        });
        handleModalView();
      },
      onError: () => {
        toast.error("Failed to setup2FA");
      },
    });
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-5"
      >
        <div className="space-y-5">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{inputLabel}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Authentication code"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="secondary"
              disabled={isPending}
              onClick={handleModalView}
            >
              Cancel
              <span className="sr-only">Cancel</span>
            </Button>
            <Button
              disabled={isPending}
              type="submit"
            >
              {isPending && <Loader className="text-grey-100" />}
              Verify and Activate
              <span className="sr-only">Verify and Activate</span>
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
