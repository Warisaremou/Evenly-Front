import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { routes } from "@/lib/routes";
import { Outlet } from "react-router";

export default function EventsManagementLayout() {
  return (
    <div className="flex flex-col gap-y-5 items-start">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/dashboard/${routes.dashboard.events.index}`}>Events</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {/* <BreadcrumbItem>
            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator /> */}
          <BreadcrumbItem>
            <BreadcrumbPage>Add event</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}
