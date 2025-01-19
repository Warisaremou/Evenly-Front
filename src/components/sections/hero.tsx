import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="h-96 rounded-3xl bg-hero-background relative bg-center bg-cover p-5 flex items-center justify-center">
      <div className="overlay" />
      <h1 className="heading1 font-heading-bold text-grey-100 z-10 text-center">
        Discover & Book Amazing Events Near You!
      </h1>
      <div className="flex p-4 bg-grey-100 gap-3 absolute -bottom-9 rounded-xl w-full max-w-[37rem] shadow-[0_4px_4px_0_rgba(167,167,167,0.16)] items-center">
        <Select>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Select place" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <Button
          size="icon"
          className=""
        >
          <Search size={18} />
        </Button>
      </div>
    </div>
  );
}
