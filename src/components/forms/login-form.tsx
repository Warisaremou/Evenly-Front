import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { routes } from "@/lib/routes";
import { Link } from "react-router";

export default function LoginForm() {
  return (
    <form className="flex flex-col gap-y-5 px-2 md:px-8">
      <div className="space-y-3">
        <div className="form-input">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Email"
          />
        </div>

        <div className="form-input">
          <Label htmlFor="password">Password</Label>
          <PasswordInput
            id="password"
            placeholder="Password"
          />
        </div>
      </div>

      <Button
        className="w-full"
        type="submit"
        size="lg"
      >
        Log in
      </Button>

      <div className="text-center text-sm">
        Don&apos;t have an account ?
        <Link
          className="external-link ml-1"
          to={`/${routes.auth.register}`}
        >
          sign up now
        </Link>
      </div>
    </form>
  );
}
