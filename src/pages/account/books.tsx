import { NoDataFoundCard } from "@/components/cards";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { BookmarkX } from "lucide-react";
import { Link } from "react-router";

export default function AccountBooks() {
  return (
    <div className="space-y-5">
      <h3 className="section-header-title">Reservations</h3>

      <NoDataFoundCard
        Icon={<BookmarkX />}
        message="No reservations made yet"
        cta={
          <Button asChild>
            <Link to={`/${routes.events.index}`}>Book a ticket</Link>
          </Button>
        }
      />
    </div>
  );
}
