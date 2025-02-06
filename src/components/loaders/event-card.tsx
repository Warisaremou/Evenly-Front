import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function EventCardLoader({ className }: { className?: string }) {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className={cn("w-full aspect-[5/4] rounded-lg", className)} />
      <div className="space-y-1.5">
        <Skeleton className="w-3/4 h-5" />
        <Skeleton className="w-full h-5" />
      </div>
    </div>
  );
}
