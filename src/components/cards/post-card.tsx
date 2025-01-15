import postImage from "@/assets/images/blog-image.avif";
import userImage from "@/assets/images/user-avatar.png";
import { Badge } from "@/components/ui/badge";
import { routes } from "@/lib/routes";
import { Link } from "react-router";

export default function PostCard() {
  return (
    <Link
      to={`/${routes.posts.index}/123`}
      className="group relative flex flex-col gap-y-4 rounded-2xl border border-slate-200/50 bg-background p-2.5 transition-colors duration-200 ease-in-out hover:bg-secondary/70 focus-visible:outline-none"
    >
      <div className="h-56 overflow-hidden rounded-xl">
        <img
          src={postImage}
          alt="Blog Image"
          className="size-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
        />
      </div>
      <div className="flex flex-col gap-y-3">
        <div className="flex items-center gap-1">
          <Badge variant="secondary">Design</Badge>
          <Badge variant="secondary">Health</Badge>
          <Badge variant="secondary">+1</Badge>
        </div>
        <div className="flex flex-col gap-y-1">
          <h3 className="text-xl font-semibold line-clamp-2">Grid system for better design user interface</h3>
        </div>
        <div className="flex items-center gap-x-2.5 text-sm justify-between font-medium text-primary/60">
          <div className="flex items-center gap-1.5">
            <div className="size-8 overflow-hidden rounded-full bg-accent border">
              <img
                src={userImage}
                alt="user-avatar"
                className="size-full object-cover"
              />
            </div>
            <span>ikk08</span>
          </div>
          <span>19 Jun, 2024</span>
        </div>
      </div>
    </Link>
  );
}
