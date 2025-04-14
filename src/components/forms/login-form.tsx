import Loader from "@/components/loaders/loader";
import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLocalStorage } from "@/hooks/use-localstorage";
import { routes } from "@/lib/routes";
import { Login, loginSchema } from "@/lib/schemas/auth";
import { useLogin } from "@/services/auth/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

export default function LoginForm() {
  const navigate = useNavigate();
  const { setItem } = useLocalStorage();
  const { isPending, mutateAsync } = useLogin();

  const form = useForm<Login>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (credentials: Login) => {
    await mutateAsync(credentials, {
      onSuccess: (data) => {
        const { message, requires_2fa, token, data: userData } = data;

        if (requires_2fa) {
          navigate(`/validateOtp/${userData.id}`);
        } else {
          setItem("accessToken", token);
          toast.success(message ?? "Logged in successfully");
          setTimeout(() => {
            navigate("/");
            window.location.reload();
          }, 1500);
        }
      },
      onError: (error) => {
        toast.error(error.message ?? "An error occurred");
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-5"
      >
        <div className="space-y-5">
          <div className="space-y-2">
            {/* Email field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="account@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="**********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            disabled={isPending}
            className="w-full"
            type="submit"
            size="lg"
          >
            {isPending && <Loader className="text-grey-100" />}
            Log in
            <span className="sr-only">Log in</span>
          </Button>
        </div>

        <div className="text-center text-sm text-grey-400">
          Don't have an account ?
          <Link
            className="underline text-primary-300 ml-1"
            to={`/${routes.auth.register}`}
          >
            Register
          </Link>
        </div>
      </form>
    </Form>
  );
}
