import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCategories } from "@/services/categories/hooks";
import { useEffect } from "react";
import { toast } from "sonner";

type Props = {
  className?: string;
  onChange?: () => void;
};

export default function CategoriesSelection({ className }: Props) {
  const { data, isLoading, isError } = useCategories();

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch categories");
    }
  }, [isError]);

  return (
    <Select>
      <SelectTrigger
        aria-label="Select category"
        className={className}
      >
        <SelectValue placeholder="Select category" />
      </SelectTrigger>
      <SelectContent>
        {isLoading ? (
          <p className="py-1.5 pl-8 pr-2 text-sm text-grey-400">Loading categories</p>
        ) : (
          <>
            {data &&
              data.map((category) => (
                <SelectItem
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </SelectItem>
              ))}
          </>
        )}
      </SelectContent>
    </Select>
  );
}
