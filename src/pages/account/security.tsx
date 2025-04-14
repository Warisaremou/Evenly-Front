import Disable2FA from "@/components/disable-2fa";
import Setup2FA from "@/components/setup2FA";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/auth/hook";

export default function AccountSecurity() {
  const { userData } = useAuth();

  return (
    <div className="space-y-5">
      <div>
        <h3 className="section-header-title">Account security</h3>
        <p className="text-grey-400">Set up security measure for better protection</p>
      </div>

      <div className="flex md:items-center max-md:flex-col gap-2 md:justify-between">
        <div className="flex gap-2 items-center">
          <h5>2-step verification</h5>
          <Badge
            variant={userData?.two_factor_enabled ? "tertiary" : "destructive"}
            className="text-xs"
          >
            {userData?.two_factor_enabled ? "Enabled" : "Not enabled"}
          </Badge>
        </div>
        {userData?.two_factor_enabled ? <Disable2FA /> : <Setup2FA />}
      </div>
    </div>
  );
}
