import { SharedFormCard } from "@/components/cards";
import { RegisterForm } from "@/components/forms";

export default function Register() {
  return (
    <SharedFormCard
      title="Create Account"
      description="Get started by creating an account"
    >
      <RegisterForm />
    </SharedFormCard>
  );
}
