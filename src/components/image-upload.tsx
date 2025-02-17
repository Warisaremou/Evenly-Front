import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CloudUpload } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";

type Props = {
  maxSize?: number;
  disabled?: boolean;
  // eslint-disable-next-line no-unused-vars
  onUpload?: (file: File) => void;
  accept?: string;
};

export default function Imageupload({ maxSize, disabled, accept, onUpload, ...props }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [filePath, setFilePath] = useState<string | null>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    setFilePath(URL.createObjectURL(e.target.files![0]));
    onUpload?.(e.target.files![0]);
  };

  return (
    <div
      className={cn(
        "relative border overflow-hidden min-h-48  w-full bg-grey-100 rounded-2xl p-5 flex flex-col items-center gap-3",
        filePath ? "border-grey-200" : "border-dashed border-slate-400",
      )}
    >
      {filePath ? (
        <>
          <div className="size-full absolute inset-0 overflow-hidden">
            <img
              src={filePath}
              alt="Event cover"
              className="object-cover size-full"
            />
          </div>
          <Button
            variant="tertiary"
            className="absolute z-40 top-1/2 -translate-y-1/2 hover:bg-grey-100 hover:text-grey-500"
            disabled={disabled}
            onClick={(e) => {
              fileInputRef.current?.click();
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            Change
          </Button>
        </>
      ) : (
        <>
          <div className="flex items-center justify-center p-1.5 bg-primary-100 rounded-md size-11">
            <CloudUpload
              size={20}
              className="text-primary-300"
            />
          </div>
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: "none" }}
            onChange={handleImageUpload}
            accept={accept}
            size={maxSize}
            {...props}
          />
          <div className="text-sm font-body-medium text-center">
            <p className="text-grey-500">Click on the button below to upload event cover</p>
            <p className="text-grey-400">PNG, JPEG, JPG (up to 2MB)</p>
          </div>
          <Button
            variant="secondary"
            disabled={disabled}
            onClick={(e) => {
              fileInputRef.current?.click();
              e.preventDefault();
            }}
          >
            Upload image
          </Button>
        </>
      )}
    </div>
  );
}
