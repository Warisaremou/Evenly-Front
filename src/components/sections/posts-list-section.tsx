import PostCard from "@/components/cards/post-card";
import { Pagination } from "@/components/pagers";
import PostsFilter from "@/components/posts-filter";
import { useTransition } from "react";
import { useNavigate } from "react-router";

export default function PostsListSection() {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex flex-col space-y-8">
      {/* Posts Filter */}
      <PostsFilter />
      {/* Posts List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <PostCard key={index} />
        ))}
      </div>
      {/* Pagination */}
      <Pagination
        pageCount={6}
        page="1"
        navigate={navigate}
        pathname="/"
        isPending={isPending}
        startTransition={startTransition}
      />
    </div>
  );
}
