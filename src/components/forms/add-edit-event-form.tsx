import Imageupload from "@/components/image-upload";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { routes } from "@/lib/routes";
import { CreateAndUpdateEvent, createAndUpdateEventSchema } from "@/lib/schemas/events";
import { cn } from "@/lib/utils";
import { useCategories } from "@/services/categories/hooks";
import { useAddEvent } from "@/services/events/hooks";
import { eventsKeys } from "@/services/events/keys";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import Loader from "../loaders/loader";
import { Calendar } from "../ui/calendar";
import { Skeleton } from "../ui/skeleton";

export default function AddEditEventForm() {
  const navigate = useNavigate();
  const { data: categoriesList, isLoading, isSuccess } = useCategories();
  const { mutateAsync, isPending } = useAddEvent();
  const queryClient = useQueryClient();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const form = useForm<CreateAndUpdateEvent>({
    resolver: zodResolver(createAndUpdateEventSchema),
    defaultValues: {
      cover: null,
      title: "",
      categories: [],
      description: "",
      location: "",
      date: new Date(),
      time: "",
    },
  });

  // Function to handle multiple categories selection and deselection
  const handleAddToSelectedCategories = (id_category: string) => {
    if (selectedCategories.includes(id_category)) {
      setSelectedCategories(selectedCategories.filter((category) => category !== id_category));
    } else {
      setSelectedCategories([...selectedCategories, id_category]);
    }
  };

  useEffect(() => {
    form.setValue("categories", selectedCategories);
  }, [selectedCategories, form]);

  const onSubmit = async (data: CreateAndUpdateEvent) => {
    if (data.cover == null) {
      return form.setError("cover", {
        type: "manual",
        message: "Please upload an image",
      });
    }

    await mutateAsync(data, {
      onSuccess: (response) => {
        toast.success(response.message ?? "Event added successfully");
        queryClient.invalidateQueries({
          queryKey: eventsKeys.organizerEvents,
        });

        setTimeout(() => {
          // Redirect to the add tickets page with the event ID sended from the backend
          navigate(`/dashboard/events/${response.data.id}/add-tickets`);
        }, 1000);
      },
      onError: () => {
        // toast.error(error.message);
        toast.error("Failed to add event");
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8"
      >
        <div className="space-y-4">
          {/* Image uploader */}
          <FormField
            control={form.control}
            name="cover"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Imageupload
                    maxSize={2}
                    accept="image/png, image/jpeg, image/jpg"
                    onUpload={(file) => {
                      field.onChange(file);
                    }}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Categories field */}
          {isLoading ? (
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="w-20 h-8 rounded-full"
                />
              ))}
            </div>
          ) : (
            isSuccess && (
              <FormField
                control={form.control}
                name="categories"
                render={() => (
                  <FormItem>
                    <FormLabel>Choose categories</FormLabel>
                    <FormControl className="flex flex-wrap">
                      <div className="flex flex-wrap gap-2">
                        {categoriesList.map((category) => (
                          <Badge
                            variant={selectedCategories.includes(category.id) ? "default" : "secondary"}
                            key={category.id}
                            className="cursor-pointer"
                            onClick={() => handleAddToSelectedCategories(category.id)}
                          >
                            {category.name}
                          </Badge>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )
          )}

          {/* Event title field */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Event title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Event description field */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    id="description"
                    placeholder="Event description"
                    rows={5}
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Event location field */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Event location"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Event date field */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="tertiary-outline"
                        className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Event time field */}
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Event time (HH:mm)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-2.5 justify-end">
          <Button
            disabled={isPending}
            variant="secondary"
            onClick={(e) => {
              e.preventDefault();
              navigate(`/dashboard/${routes.dashboard.events.index}`);
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isPending}
          >
            {isPending && <Loader className="text-grey-100" />}
            Add event
            <span className="sr-only"> Add event</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}
