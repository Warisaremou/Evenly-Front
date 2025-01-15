import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { routes } from "@/lib/routes";
import { Link } from "react-router";

export default function RegisterForm() {
  return (
    <form className="flex flex-col gap-y-5 px-2 md:px-8">
      <div className="space-y-3">
        <div className="form-input">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="Your username"
          />
        </div>

        <div className="form-input">
          <Label htmlFor="surname">Surname</Label>
          <Input
            id="surname"
            placeholder="Your surname"
          />
        </div>

        <div className="form-input">
          <Label htmlFor="firstname">Firstname</Label>
          <Input
            id="firstname"
            placeholder="Your firstname"
          />
        </div>

        <div className="form-input">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Your email"
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
        Create account
      </Button>

      <div className="text-center text-sm">
        Already have an account ?
        <Link
          className="external-link ml-1"
          to={`/${routes.auth.login}`}
        >
          sign in
        </Link>
      </div>
    </form>
  );
}
