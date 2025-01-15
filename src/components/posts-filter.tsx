import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2 } from "lucide-react";

export default function PostsFilter() {
  return (
    <div className="flex items-center justify-between gap-2 sm:gap-5">
      <div className="w-full">
        <Select>
          <SelectTrigger className="w-48 gap-x-2 max-sm:w-[13rem] lg:w-52">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="health">Health</SelectItem>
            <SelectItem value="crypto">Crypto</SelectItem>
            <SelectItem value="business">Business</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="destructive"
        className="gap-x-1"
      >
        <Trash2 className="size-4" />
        Clear filters
      </Button>
    </div>
  );
}
