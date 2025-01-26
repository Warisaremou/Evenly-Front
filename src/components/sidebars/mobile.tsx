import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { forwardRef, Ref } from "react";
import DesktopSidebar from "./desktop";

const MobileSidebar = forwardRef(function MobileSidebar(props, ref) {
  return (
    <Sheet>
      <SheetTrigger
        className="hidden"
        ref={ref as Ref<HTMLButtonElement>}
        {...props}
      >
        Open
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-72"
      >
        <SheetHeader className="hidden">
          <SheetTitle>Title</SheetTitle>
          <SheetDescription>Description</SheetDescription>
        </SheetHeader>
        <DesktopSidebar />
      </SheetContent>
    </Sheet>
  );
});

export default MobileSidebar;
