import Imageupload from "@/components/image-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AddEditEventForm() {
  return (
    <>
      {/* <Form></Form> */}
      <form className="flex flex-col gap-8">
        <div className="space-y-4">
          {/* Image uploader */}
          <Imageupload />

          {/* Categories field */}
          <div></div>

          {/* Event title field */}
          <Input placeholder="Event title" />

          {/* Event description field */}
          <Textarea
            placeholder="Event description"
            rows={5}
            className="resize-none"
          />

          {/* Event location field */}
          <Input placeholder="Enter location" />

          {/* Event date & time field */}
          <Input placeholder="Date & time" />
        </div>
        <div className="flex gap-2.5 justify-end">
          <Button variant="secondary">Cancel</Button>
          <Button>Add event</Button>
        </div>
      </form>
    </>
  );
}
