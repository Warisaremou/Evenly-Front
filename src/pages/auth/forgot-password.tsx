import { SharedFormCard } from "@/components/cards";
import { ForgotPasswordForm } from "@/components/forms";

export default function ForgotPassword() {
  return (
    <SharedFormCard
      title="Forgot your password ?"
      description="Don't worry, we'll send you a link to reset your password"
    >
      <ForgotPasswordForm />
    </SharedFormCard>
  );
}
