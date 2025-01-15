import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordForm() {
  return (
    <form className="flex flex-col gap-y-5 px-2 md:px-8">
      <div className="space-y-3">
        <div className="form-input">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Your email"
          />
        </div>
      </div>

      <Button
        className="w-full"
        type="submit"
        size="lg"
      >
        Send reset link
      </Button>
    </form>
  );
}
