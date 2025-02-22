import CategoriesSelection from "@/components/categories-selection";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { searchParamsType } from "@/types";
import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function HeroSection() {
  const navigate = useNavigate();
  const [query, setQuery] = useState<searchParamsType>({
    place: "",
    category: "",
  });

  const handleSearchWithParams = () => {
    if (!query.place || !query.category) return;
    navigate({
      pathname: "/events",
      search: `?place=${query.place}&category=${query.category}`,
    });
  };

  return (
    <div className="h-64 md:h-96 rounded-3xl bg-hero relative bg-center bg-cover p-5 flex items-center justify-center">
      <div className="overlay" />
      <h1 className="max-md:text-3xl heading1 text-grey-100 z-10 text-center">
        Discover & Book Amazing Events Near You!
      </h1>
      <div className="flex p-4 bg-grey-100 gap-3 absolute -bottom-9 rounded-xl w-full max-w-xs md:max-w-[37rem] shadow-[0_4px_4px_0_rgba(167,167,167,0.16)] items-center">
        <Select
          onValueChange={(value) => {
            setQuery((prev) => ({ ...prev, place: value }));
          }}
        >
          <SelectTrigger
            aria-label="Select place"
            className="flex-1"
          >
            <SelectValue placeholder="Select place" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="paris">Paris</SelectItem>
            <SelectItem value="montreuil">Montreuil</SelectItem>
          </SelectContent>
        </Select>
        <CategoriesSelection
          onChange={(value) => setQuery((prev) => ({ ...prev, category: value }))}
          className="flex-1"
        />
        <Button
          aria-label="Search events"
          size="icon"
          onClick={handleSearchWithParams}
        >
          <Search size={18} />
        </Button>
      </div>
    </div>
  );
}
