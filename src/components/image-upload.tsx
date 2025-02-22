import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CloudUpload } from "lucide-react";
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";

type Props = {
  maxSize?: number;
  disabled?: boolean;
  defaultImageURL?: string;
  // eslint-disable-next-line no-unused-vars
  onUpload?: (file: File) => void;
  accept?: string;
};

export default function Imageupload({ maxSize, disabled, defaultImageURL, accept, onUpload, ...props }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [filePath, setFilePath] = useState<string | null>(null);

  useEffect(() => {
    if (defaultImageURL) setFilePath(defaultImageURL);
  }, [defaultImageURL]);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    setFilePath(URL.createObjectURL(e.target.files![0]));
    onUpload?.(e.target.files![0]);
  };

  const triggerUpload = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    fileInputRef.current?.click();
    e.preventDefault();
  };

  return (
    <div
      className={cn(
        "relative border overflow-hidden min-h-48  w-full bg-grey-100 rounded-2xl p-5 flex flex-col items-center gap-3",
        filePath ? "border-grey-200" : "border-dashed border-slate-400",
      )}
    >
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: "none" }}
        onChange={handleImageUpload}
        accept={accept}
        size={maxSize}
        {...props}
      />
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
              triggerUpload(e);
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
          <div className="text-sm font-body-medium text-center">
            <p className="text-grey-500">Click on the button below to upload event cover</p>
            <p className="text-grey-400">PNG, JPEG, JPG (up to 2MB)</p>
          </div>
          <Button
            variant="secondary"
            disabled={disabled}
            onClick={(e) => {
              triggerUpload(e);
            }}
          >
            Upload image
          </Button>
        </>
      )}
    </div>
  );
}
