import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = { title: string; description: string; children?: ReactNode; className?: string };

export default function Header({ title, description, children, className }: Props) {
  return (
    <div className={cn(className)}>
      <div className="flex flex-col items-center max-w-2xl mx-auto gap-8">
        <div className="flex flex-col items-center gap-y-3">
          <h1 className="text-center text-4xl font-body-semibold md:text-5xl">{title}</h1>
          <p className="text-grey-500 max-md:text-sm text-center">{description}</p>
        </div>
        {children}
      </div>
    </div>
  );
}
