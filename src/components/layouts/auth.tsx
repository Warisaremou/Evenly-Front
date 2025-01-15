import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="container flex min-h-screen items-center justify-center">
      <div className="flex w-full justify-center">
        <Outlet />
      </div>
    </div>
  );
}
