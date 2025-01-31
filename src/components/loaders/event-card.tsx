import { Skeleton } from "@/components/ui/skeleton";

export default function EventCardLoader() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="w-full aspect-[5/4] rounded-lg" />
      <div className="space-y-1.5">
        <Skeleton className="w-3/4 h-5" />
        <Skeleton className="w-full h-5" />
      </div>
    </div>
  );
}
