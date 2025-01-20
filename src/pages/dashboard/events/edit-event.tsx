import { AddEditEventForm } from "@/components/forms";
import { useParams } from "react-router";

export default function DashboardEditEvent() {
  const { id_event } = useParams();
  console.log(id_event);
  return (
    <>
      <AddEditEventForm />
    </>
  );
}
