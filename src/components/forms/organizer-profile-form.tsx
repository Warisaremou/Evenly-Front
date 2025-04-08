import Loader from "@/components/loaders/loader";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth/hook";
import { OrganizerProfile, updateOrganizerProfileSchema } from "@/lib/schemas/users";
import { useUpdateProfile } from "@/services/auth/hooks";
import { authKeys } from "@/services/auth/keys";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function OrganizerProfileForm() {
  const { userData } = useAuth();
  const { isPending, mutateAsync } = useUpdateProfile();
  const queryClient = useQueryClient();

  const form = useForm<OrganizerProfile>({
    resolver: zodResolver(updateOrganizerProfileSchema),
    defaultValues: {
      email: "",
      organizer_name: "",
    },
  });

  useEffect(() => {
    const fetchData = () => {
      form.reset({
        email: userData?.email ?? "",
        organizer_name: userData?.organizer_name ?? "",
      });
    };

    fetchData();
  }, [userData, form]);

  const onSubmit = async (data: OrganizerProfile) => {
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
          {/* Organization email field */}
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

          {/* Organization name field */}
          <FormField
            control={form.control}
            name="organizer_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Organization name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="w-fit"
          disabled={isPending}
        >
          {isPending && <Loader className="text-grey-100" />}
          Update profile
          <span className="sr-only">Update profile</span>
        </Button>
      </form>
    </Form>
  );
}
