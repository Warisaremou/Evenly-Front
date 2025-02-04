import { AddEditEventForm } from "@/components/forms";
import { APIProvider } from "@vis.gl/react-google-maps";

export default function DashboardAddEvent() {
  return (
    <APIProvider
      apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      onLoad={() => console.log("Maps API has loaded.")}
    >
      <AddEditEventForm />
    </APIProvider>
  );
}
