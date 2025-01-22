import Imageupload from "@/components/image-upload";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { routes } from "@/lib/routes";
import { CreateAndUpdateEvent, createAndUpdateEventSchema } from "@/lib/schemas/events";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const categories = [
  {
    id: "1",
    name: "Music",
  },
  {
    id: "2",
    name: "Sports",
  },
  {
    id: "3",
    name: "Arts",
  },
];

export default function AddEditEventForm() {
  const navigate = useNavigate();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const form = useForm<CreateAndUpdateEvent>({
    resolver: zodResolver(createAndUpdateEventSchema),
    defaultValues: {
      cover: null,
      title: "",
      categories: [],
      description: "",
      location: "",
      date_time: "",
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
    form.reset({
      categories: selectedCategories,
    });
  }, [selectedCategories, form]);

  const onSubmit = (data: CreateAndUpdateEvent) => {
    if (data.cover == null) {
      return form.setError("cover", {
        type: "manual",
        message: "Please upload an image",
      });
    }
    console.log(data);
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
                      // field.setValue("cover", file);
                      field.onChange(file);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Categories field */}
          <FormField
            control={form.control}
            name="categories"
            render={() => (
              <FormItem>
                <FormLabel>Choose categories</FormLabel>
                <FormControl>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
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

          {/* Event date & time field */}
          <FormField
            control={form.control}
            name="date_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date and Time</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Event date and time"
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
            variant="secondary"
            onClick={(e) => {
              e.preventDefault();
              navigate(`/dashboard/${routes.dashboard.events.index}`);
            }}
          >
            Cancel
          </Button>
          <Button type="submit">
            Add event
            <span className="sr-only"> Add event</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}
