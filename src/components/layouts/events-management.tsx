import { Outlet } from "react-router";

export default function EventsManagementLayout() {
  return (
    <div className="flex flex-col gap-y-5 items-start">
      <div>
        <p className="text-sm text-grey-500">breadcrumb here</p>
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}
