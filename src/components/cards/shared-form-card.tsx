import Logo from "@/components/logo";
import { ReactNode } from "react";

type Props = {
  title: string;
  description: string;
  children: ReactNode;
};

export default function SharedFormCard({ title, description, children }: Props) {
  return (
    <div className="flex w-full max-w-lg flex-col gap-y-3 rounded-2xl border border-slate-200 bg-background p-4">
      <div className="flex flex-col items-center gap-y-5">
        <Logo />
        <div className="text-center">
          <h1 className="text-2xl font-bh-bold">{title}</h1>
          <p className="font-bh-medium text-muted-foreground">{description}</p>
        </div>
      </div>

      <div>{children}</div>
    </div>
  );
}
