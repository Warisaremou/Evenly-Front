import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { OrganizerProfile, updateOrganizerProfileSchema } from "@/lib/schemas/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function OrganizerProfileForm() {
  const form = useForm<OrganizerProfile>({
    resolver: zodResolver(updateOrganizerProfileSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  const onSubmit = (data: OrganizerProfile) => {
    console.log(data);
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <Input
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Organization name field */}
          <FormField
            control={form.control}
            name="name"
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
        >
          Update profile
          <span className="sr-only">Update profile</span>
        </Button>
      </form>
    </Form>
  );
}
