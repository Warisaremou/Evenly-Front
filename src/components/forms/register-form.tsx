import Loader from "@/components/loader";
import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { routes } from "@/lib/routes";
import { Register, registerSchema } from "@/lib/schemas/auth";
import { useRegister } from "@/services/auth/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

export default function RegisterForm() {
  const [isOrganizer, setIsOrganizer] = useState(false);

  const navigate = useNavigate();
  const { isPending, mutateAsync } = useRegister();

  const form = useForm<Register>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      is_Organizer: false,
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    setIsOrganizer(form.getValues("is_Organizer"));
  }, [form.watch("is_Organizer")]);

  const onSubmit = async (credentials: Register) => {
    mutateAsync(credentials, {
      onSuccess: (data) => {
        toast.success(data.message ?? "Account created successfully");
        setTimeout(() => {
          navigate(`/${routes.auth.login}`);
        }, 1500);
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
            {/* Role field */}
            <FormField
              control={form.control}
              name="is_Organizer"
              render={({ field }) => (
                <FormItem className="flex gap-4 items-center space-y-0">
                  <FormLabel>Register as Organizer ?</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {isOrganizer ? (
              <>
                {/* Organization name field */}
                <FormField
                  control={form.control}
                  name="organizer_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization's name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Example Inc."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            ) : (
              <>
                {/* Lastname field */}
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lastname</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Doe"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Firstname field */}
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Firstname</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

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
            Create account
            <span className="sr-only">Create account</span>
          </Button>
        </div>

        <div className="text-center text-sm text-grey-400">
          Already have an account ?
          <Link
            className="underline text-primary-300 ml-1"
            to={`/${routes.auth.login}`}
          >
            Login
          </Link>
        </div>
      </form>
    </Form>
  );
}
