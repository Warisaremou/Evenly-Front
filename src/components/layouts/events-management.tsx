import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { routes } from "@/lib/routes";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";

export default function EventsManagementLayout() {
  const location = useLocation();
  const [isAddTicketPath, setisAddTicketPath] = useState(false);

  useEffect(() => {
    if (location.pathname.includes("add-tickets")) {
      setisAddTicketPath(true);
    } else {
      setisAddTicketPath(false);
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-col gap-y-5 items-start">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/dashboard/${routes.dashboard.events.index}`}>Events</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            {isAddTicketPath ? (
              <BreadcrumbLink href={`/dashboard/events/${routes.dashboard.events.addEvent}`}>Add event</BreadcrumbLink>
            ) : (
              <BreadcrumbPage>Add event</BreadcrumbPage>
            )}
          </BreadcrumbItem>
          {isAddTicketPath && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Add tickets</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}
