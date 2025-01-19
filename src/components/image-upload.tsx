import { Button } from "@/components/ui/button";
import { CloudUpload } from "lucide-react";
import { ChangeEvent, useRef } from "react";

export default function Imageupload() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
  };

  return (
    <div className="border border-dashed border-slate-400 w-full bg-grey-100 rounded-[18px] p-5 flex flex-col items-center gap-3">
      <div className="flex items-center justify-center p-1.5 bg-primary-100 rounded-md size-11">
        <CloudUpload
          size={20}
          className="text-primary-300"
        />
      </div>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleImageUpload}
      />
      <div className="text-sm font-body-medium text-center">
        <p className="text-grey-500">Click on the button below to upload event cover</p>
        <p className="text-grey-400">PNG, JPEG, JPG (up to 2MB)</p>
      </div>
      <Button
        variant="secondary"
        onClick={(e) => {
          fileInputRef.current?.click();
          e.preventDefault();
        }}
      >
        Upload image
      </Button>
    </div>
  );
}
