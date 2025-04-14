import Loader from "@/components/loaders/loader";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLocalStorage } from "@/hooks/use-localstorage";
import { Otp, otpSchema } from "@/lib/schemas/auth";
import { useValidate2FA } from "@/services/auth/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

export default function ValidateOtpForm() {
  const { id_user } = useParams();

  const navigate = useNavigate();
  const { setItem } = useLocalStorage();
  const { isPending, mutateAsync: validate2FA } = useValidate2FA();

  const form = useForm<Otp>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
    mode: "all",
  });

  const onSubmit = useCallback(async ({ otp }: Otp) => {
    await validate2FA(
      {
        otp,
        user_id: id_user!,
      },
      {
        onSuccess: (data) => {
          setItem("accessToken", data.token);
          toast.success(data.message ?? "Logged in successfully");
          setTimeout(() => {
            navigate("/");
            window.location.reload();
          }, 1500);
        },
        onError: (error) => {
          toast.error(error.message ?? "An error occurred");
        },
      },
    );
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
                <FormLabel>Open your authenticator app to get your verification code</FormLabel>
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
          <Button
            className="w-full"
            disabled={isPending}
            type="submit"
          >
            {isPending && <Loader className="text-grey-100" />}
            Authenticate
            <span className="sr-only">Authenticate</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}
