import Loader from "@/components/loaders/loader";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth/hook";
import { AccountProfile, updateAccountProfileSchema } from "@/lib/schemas/users";
import { useUpdateProfile } from "@/services/auth/hooks";
import { authKeys } from "@/services/auth/keys";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function AccountProfileForm() {
  const { userData } = useAuth();
  const { isPending, mutateAsync } = useUpdateProfile();
  const queryClient = useQueryClient();

  const form = useForm<AccountProfile>({
    resolver: zodResolver(updateAccountProfileSchema),
    defaultValues: {
      email: "",
      firstname: "",
      lastname: "",
    },
  });

  useEffect(() => {
    const fetchData = () => {
      form.reset({
        email: userData?.email ?? "",
        firstname: userData?.firstname ?? "",
        lastname: userData?.lastname ?? "",
      });
    };

    fetchData();
  }, [userData, form]);

  const onSubmit = async (data: AccountProfile) => {
    await mutateAsync(data, {
      onSuccess: (response) => {
        toast.success(response.message ?? "Profile updated successfully");
        queryClient.invalidateQueries({
          queryKey: authKeys.profile,
        });
      },
      onError: () => {
        toast.error("Failed to update profile");
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 max-w-xl"
      >
        <div className="space-y-2">
          {/* User email field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    placeholder="Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Lastname field */}
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lastname</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Lastname"
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
                    placeholder="Firstname"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-3">
          <Button
            type="submit"
            disabled={isPending}
          >
            {isPending && <Loader className="text-grey-100" />}
            Update profile
            <span className="sr-only">Update profile</span>
          </Button>
          {/* <Button
            variant="destructive"
            disabled={isPending}
          >
            {isPending && <Loader className="text-grey-100" />}
            Delete account
          </Button> */}
        </div>
      </form>
    </Form>
  );
}
