import { VerifyOtpForm } from "@/components/forms";
import QrCode from "@/components/qrcode";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useSetup2FA } from "@/services/auth/hooks";
import { OTPSecret } from "@/types";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Setup2FA() {
  const [open, setOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [otpSecret, setOtpSecret] = useState<OTPSecret>({
    secret: "",
    qr_code_url: "",
  });

  const { mutateAsync, isPending } = useSetup2FA();

  const handleModalView = () => {
    setOpen((state) => !state);
  };

  const handle2FASetup = async () => {
    await mutateAsync("", {
      onSuccess: (response) => {
        const { secret, qr_code_url } = response;

        setOtpSecret({
          secret,
          qr_code_url,
        });
        handleModalView();
      },
      onError: () => {
        toast.error("Failed to setup2FA");
      },
    });
  };

  const handleSecretCopy = () => {
    window.navigator.clipboard.writeText(otpSecret.secret);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  return (
    <Dialog
      key="2FA-modal"
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger
        asChild
        disabled={isPending}
        onClick={(e) => {
          e.preventDefault();
          handle2FASetup();
        }}
      >
        <Button variant="secondary">Setup 2FA</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Setup Authenticator App</DialogTitle>
          <DialogDescription>
            Each time you log in, in addition to your password, you'll use an authenticator app to generate a one-time
            code.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {/* Step1 */}
          <div className="flex flex-col gap-3">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Badge
                  variant="tertiary"
                  className="text-xs"
                >
                  Step 1
                </Badge>
                <h3 className="font-body-semibold">Scan QR code</h3>
              </div>
              <p className="text-sm text-grey-400">
                Scan the QR code below or manually enter the secret key into your auhenticator app.
              </p>
            </div>
            <div className="flex items-center gap-4 p-2 rounded-lg bg-slate-50">
              <div className="size-36 rounded-lg bg-grey-100 p-2">
                <QrCode url={otpSecret.qr_code_url} />
              </div>
              <div className="flex-1 space-y-1">
                <div>
                  <h4 className="font-body-semibold">Can't scan QR code ?</h4>
                  <p>Enter this secret instead:</p>
                </div>
                <div className="w-full py-1.5 px-2 bg-slate-100 rounded-md flex items-center">
                  <p className="flex-1 text-sm">{otpSecret.secret}</p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={handleSecretCopy}
                        >
                          {isCopied ? <Check size={16} /> : <Copy size={16} />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{isCopied ? "Copied" : "Copy secret"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
          </div>
          {/* Step2 */}
          <div className="flex flex-col gap-2">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Badge
                  variant="tertiary"
                  className="text-xs"
                >
                  Step 2
                </Badge>
                <h3 className="font-body-semibold">Get verification code</h3>
              </div>
              <p className="text-sm text-grey-400">Enter the 6-digit code you see in your authenticator app.</p>
            </div>
            <VerifyOtpForm
              handleModalView={handleModalView}
              inputLabel="Enter verification code"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
