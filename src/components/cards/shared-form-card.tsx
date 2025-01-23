import Logo from "@/components/logo";
import { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export default function SharedFormCard({ title, children }: Props) {
  return (
    <div className="flex w-full items-center max-w-[29.5rem] flex-col gap-y-12 max-lg:p-4">
      <Logo />
      <div className="flex flex-col items-center gap-y-5 w-full">
        <h1 className="heading2 font-heading-bold">{title}</h1>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
