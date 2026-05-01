import { KeyRound } from "lucide-react";
import { cn } from "@/app/components/ui/utils";
import { FacebookIcon, GoogleIcon, MicrosoftIcon } from "./LoginProviderIcons";

type Provider = "google" | "facebook" | "microsoft" | "sso";

export interface SocialButtonProps {
  provider: Provider;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  className?: string;
}

export function SocialButton({
  provider,
  disabled = false,
  isLoading = false,
  onClick,
  className,
}: SocialButtonProps) {
  const getIcon = () => {
    switch (provider) {
      case "google":
        return <GoogleIcon disabled={disabled || isLoading} />;
      case "facebook":
        return <FacebookIcon disabled={disabled || isLoading} />;
      case "microsoft":
        return <MicrosoftIcon disabled={disabled || isLoading} />;
      case "sso":
        return (
          <KeyRound
            className={cn(
              "size-5",
              disabled || isLoading ? "text-[#B0B0B0]" : "text-[#5e5e5e]",
            )}
          />
        );
    }
  };

  const baseText = (() => {
    switch (provider) {
      case "google":
        return "Sign in with Google";
      case "facebook":
        return "Sign in with Facebook";
      case "microsoft":
        return "Sign in with Microsoft";
      case "sso":
        return "Sign in with SSO";
    }
  })();
  const text = isLoading ? `${baseText}…` : baseText;

  return (
    <button
      type="button"
      onClick={disabled || isLoading ? undefined : onClick}
      disabled={disabled || isLoading}
      className={cn(
        "relative flex h-10 w-full shrink-0 items-center justify-center rounded-lg transition-all",
        disabled || isLoading
          ? "cursor-not-allowed bg-muted"
          : "cursor-pointer border border-border bg-background hover:bg-muted/60",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        {getIcon()}
        <span
          className={cn(
            "text-base leading-6 whitespace-nowrap",
            disabled ? "text-muted-foreground opacity-60" : "text-foreground",
          )}
        >
          {text}
        </span>
      </div>
    </button>
  );
}
