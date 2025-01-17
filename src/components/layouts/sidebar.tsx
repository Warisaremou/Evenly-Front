import { Outlet } from "react-router";

export default function SidebarLayout() {
  return (
    <div className="flex h-screen">
      <div className="border border-red-500 w-52">sidebar</div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
