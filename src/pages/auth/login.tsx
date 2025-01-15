import { SharedFormCard } from "@/components/cards";
import { LoginForm } from "@/components/forms";

export default function Login() {
  return (
    <SharedFormCard
      title="Login"
      description="Sign in to your account"
    >
      <LoginForm />
    </SharedFormCard>
  );
}
