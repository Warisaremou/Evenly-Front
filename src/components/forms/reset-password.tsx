import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function ResetPasswordForm() {
  return (
    <form className="flex flex-col gap-y-5 px-2 md:px-8">
      <div className="space-y-3">
        <div className="form-input">
          <Label htmlFor="password">Password</Label>
          <PasswordInput
            id="password"
            placeholder="Password"
          />
        </div>

        <div className="form-input">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <PasswordInput
            id="confirm-password"
            placeholder="Confirm Password"
          />
        </div>
      </div>

      <Button
        className="w-full"
        type="submit"
        size="lg"
      >
        Reset Password
      </Button>
    </form>
  );
}
