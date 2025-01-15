import { SharedFormCard } from "@/components/cards";
import { ResetPasswordForm } from "@/components/forms";

export default function ResetPassword() {
  return (
    <SharedFormCard
      title="Reset Your Password"
      description="Set your new password"
    >
      <ResetPasswordForm />
    </SharedFormCard>
  );
}
