import { DesktopSidebar, MobileSidebar } from "@/components/sidebars";
import { Button } from "@/components/ui/button";
import { PanelLeft } from "lucide-react";
import { useRef } from "react";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  const sheetTriggerRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <DesktopSidebar className="max-lg:hidden w-60 py-6 px-3.5 border-r border-grey-300" />

      <div className="h-screen flex-1 overflow-y-scroll">
        {/* Header */}
        <header className="sticky top-0 flex items-center justify-between gap-3 border-b border-grey-300 bg-grey-100 px-5 py-3">
          <Button
            variant="tertiary"
            size="icon"
            className="lg:hidden"
            onClick={() => {
              sheetTriggerRef.current?.click();
            }}
          >
            <PanelLeft size={20} />
          </Button>
          <h3 className="font-heading-semibold text-grey-500">Empire Group</h3>
        </header>
        <MobileSidebar ref={sheetTriggerRef} />

        {/* Children */}
        <div className="w-full mx-auto max-w-[50rem] max-lg:container max-lg:py-5 py-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
