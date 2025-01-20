import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { routes } from "@/lib/routes";
import { CreateAndUpdateEvent, createAndUpdateEventSchema } from "@/lib/schemas/events";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import FieldErrorMessage from "../field-error-message";
import Imageupload from "../image-upload";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

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

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    setError,
  } = useForm<CreateAndUpdateEvent>({
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
    reset({
      categories: selectedCategories,
    });
  }, [selectedCategories, reset]);

  const onSubmit = (data: CreateAndUpdateEvent) => {
    if (data.cover == null) {
      return setError("cover", {
        type: "manual",
        message: "Please upload an image",
      });
    }
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-8"
    >
      <div className="space-y-4">
        {/* Image uploader */}
        <div>
          <div className="form-input">
            <Imageupload
              maxSize={2}
              accept="image/png, image/jpeg, image/jpg"
              onUpload={(file) => {
                setValue("cover", file);
              }}
            />
          </div>
          {errors.cover && <FieldErrorMessage errorMessage={errors.cover.message} />}
        </div>

        {/* Categories field */}
        <div>
          <div className="form-input">
            <Label htmlFor="categories">Choose categories</Label>
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
          </div>
          {errors.categories && <FieldErrorMessage errorMessage={errors.categories.message} />}
        </div>

        {/* Event title field */}
        <div>
          <div className="form-input">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Event title"
              {...register("title")}
            />
          </div>
          {errors.title && <FieldErrorMessage errorMessage={errors.title.message} />}
        </div>

        {/* Event description field */}
        <div>
          <div className="form-input">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Event description"
              rows={5}
              className="resize-none"
              {...register("description")}
            />
          </div>
          {errors.description && <FieldErrorMessage errorMessage={errors.description.message} />}
        </div>

        {/* Event location field */}
        <div>
          <div className="form-input">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="Event location"
              {...register("location")}
            />
          </div>
          {errors.location && <FieldErrorMessage errorMessage={errors.location.message} />}
        </div>

        {/* Event date & time field */}
        <div>
          <div className="form-input">
            <Label htmlFor="date_time">Date and Time</Label>
            <Input
              id="date_time"
              placeholder="Event date and time"
              {...register("date_time")}
            />
          </div>
          {errors.date_time && <FieldErrorMessage errorMessage={errors.date_time.message} />}
        </div>
        {/* <Input placeholder="Date & time" /> */}
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
  );
}
