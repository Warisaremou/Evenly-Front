import { NoDataFoundCard } from "@/components/cards";
import { Button } from "@/components/ui/button";
import { Tickets } from "lucide-react";

export default function DashboardAddTickets() {
  return (
    <div>
      <NoDataFoundCard
        Icon={<Tickets />}
        message="Let's add some tickets"
        cta={<Button>Add ticket</Button>}
      />
    </div>
  );
}
