import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export default function Loader({ className }: { className?: string }) {
  return (
    <Loader2
      className={cn("size-4 animate-spin text-primary-300", className)}
      aria-hidden="true"
    />
  );
}
