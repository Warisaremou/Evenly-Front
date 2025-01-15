import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-y-8">
        <div className="text-center">
          <h1 className="text-[6rem] font-bh-bold leading-none text-muted-foreground/30 lg:text-[9rem]">404</h1>
          <span className="font-bh-medium text-muted-foreground">Page Not Found</span>
        </div>
        <Button
          variant="outline"
          asChild
        >
          <Link to={routes.index}>Go back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
