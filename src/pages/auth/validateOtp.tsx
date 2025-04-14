import { SharedFormCard } from "@/components/cards";
import { ValidateOtpForm } from "@/components/forms";

export default function ValidateOtp() {
  return (
    <SharedFormCard title="2FA Authentication">
      <ValidateOtpForm />
    </SharedFormCard>
  );
}
