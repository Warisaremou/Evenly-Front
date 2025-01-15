import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import React from "react";
import { NavigateFunction } from "react-router";

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  pageCount: number;
  page: string;
  per_page?: string;
  // createQueryString: (params: Record<string, string | number | null>) => string;
  navigate: NavigateFunction;
  pathname: string;
  isPending: boolean;
  startTransition: React.TransitionStartFunction;
  siblingCount?: number;
}

export default function Pagination({
  pageCount,
  page,
  per_page,
  navigate,
  pathname,
  isPending,
  startTransition,
  siblingCount = 1,
  className,
  ...props
}: Props) {
  console.log(per_page, pathname, siblingCount);
  return (
    <div
      className={cn("flex flex-wrap items-center justify-center gap-2", className)}
      {...props}
    >
      <Button
        aria-label="Go to first page"
        variant="outline"
        size="icon"
        disabled={Number(page) === 1 || isPending}
        className="rounded-xl hidden md:flex"
        onClick={() => {
          startTransition(() => {
            //  navigate(
            //    `${pathname}?${createQueryString({
            //      page: 1,
            //      per_page: per_page ?? null,
            //    })}`,
            //  );
            navigate("/");
          });
        }}
      >
        <DoubleArrowLeftIcon
          className="size-4"
          aria-hidden="true"
        />
      </Button>

      <Button
        aria-label="Go to last page"
        variant="outline"
        size="icon"
        disabled={Number(page) === (pageCount ?? 10) || isPending}
        className="rounded-xl hidden md:flex"
        onClick={() => {
          navigate("/");
        }}
      >
        <DoubleArrowRightIcon
          className="size-4"
          aria-hidden="true"
        />
      </Button>
    </div>
  );
}
