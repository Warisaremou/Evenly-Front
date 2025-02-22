import { AddEditEventForm } from "@/components/forms";
import { useEvent } from "@/services/events/hooks";
import { useParams } from "react-router";

export default function DashboardEditEvent() {
  const { id_event } = useParams();

  const { data } = useEvent(id_event!);

  return (
    <>
      <AddEditEventForm
        id_event={id_event!}
        eventDetails={data}
      />
    </>
  );
}
