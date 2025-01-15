import { Button } from "@/components/ui/button";
import { CommentIcon, LikeIcon } from "@/icons";
import { ShareIcon } from "lucide-react";

export default function PostActionSection() {
  return (
    <div className="fixed bottom-[7%] right-1/2 flex translate-x-1/2 items-center rounded-full border border-slate-200/80 bg-background px-4 py-3 text-sm font-medium shadow-sm lg:bottom-[10%]">
      <Button
        variant="ghost"
        size="xs"
        className="gap-x-1"
      >
        <LikeIcon />
        <span>23</span>
      </Button>
      <Button
        variant="ghost"
        size="xs"
        className="gap-x-1"
      >
        <CommentIcon />
        <span>5</span>
      </Button>
      <Button
        variant="ghost"
        size="xs"
        className="gap-x-1"
      >
        <ShareIcon />
        <span>Share</span>
      </Button>
    </div>
  );
}
