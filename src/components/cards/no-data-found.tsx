import { ReactNode } from "react";

type Props = {
  Icon: ReactNode;
  message: string;
  cta?: ReactNode;
};

export default function NoDataFoundCard({ Icon, message, cta }: Props) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="text-grey-400 flex flex-col gap-1.5 items-center">
        {Icon}
        <p className="text-sm">{message}</p>
      </div>
      {cta}
    </div>
  );
}
