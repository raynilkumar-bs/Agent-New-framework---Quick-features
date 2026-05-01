import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Eye, EyeOff, Pencil } from "lucide-react";
import svgPaths from "@/imports/svg-y1gexucine";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { cn } from "@/app/components/ui/utils";
import { checkEmailSSO } from "./loginSso";
import { LoginMarketingPanel } from "./LoginMarketingPanel";
import { SocialButton } from "./SocialButton";
import { MockGooglePage } from "./MockGooglePage";
import { MockFacebookPage } from "./MockFacebookPage";
import { MockMicrosoftPage } from "./MockMicrosoftPage";
import { MockSutterPage } from "./MockSutterPage";

export type BirdAILoginView =
  | "main"
  | "password"
  | "google_mock"
  | "facebook_mock"
  | "microsoft_mock"
  | "sutter_mock";

export interface BirdAILoginPageProps {
  onAuthenticated: () => void;
}

const pageMotion = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
};

export function BirdAILoginPage({ onAuthenticated }: BirdAILoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [view, setView] = useState<BirdAILoginView>("main");
  const [ssoState, setSsoState] = useState<{
    type: string;
    provider?: string;
    providers?: string[];
  }>({ type: "unknown" });
  const [loadingState, setLoadingState] = useState<
    "none" | "continue" | "google" | "facebook" | "microsoft" | "sso"
  >("none");

  useEffect(() => {
    if (view !== "main" && view !== "password") return;
    const id = view === "password" ? "bird-login-password" : "bird-login-email";
    const t = setTimeout(() => {
      document.getElementById(id)?.focus();
    }, view === "password" ? 50 : 0);
    return () => clearTimeout(t);
  }, [view]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (view === "password") {
      setView("main");
      setPassword("");
      setShowPassword(false);
    }
    if (ssoState.type !== "unknown") {
      setSsoState({ type: "unknown" });
    }
  };

  const finishAuth = () => {
    onAuthenticated();
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    if (loadingState !== "none") return;

    if (view === "password") {
      if (!password) return;
      setLoadingState("continue");
      setTimeout(() => {
        setLoadingState("none");
        finishAuth();
      }, 1500);
      return;
    }

    setLoadingState("continue");
    setTimeout(() => {
      const result = checkEmailSSO(email);
      setLoadingState("none");

      if (result.type === "single") {
        if (result.provider === "sutter") {
          setView("sutter_mock");
          return;
        }
        setView("google_mock");
      } else if (result.type === "multiple") {
        setSsoState(result);
      } else {
        setView("password");
      }
    }, 1500);
  };

  const handleSocialClick = (provider: "google" | "facebook" | "microsoft" | "sso") => {
    if (loadingState !== "none") return;
    setLoadingState(provider);
    setTimeout(() => {
      setLoadingState("none");
      if (provider === "google") setView("google_mock");
      else if (provider === "facebook") setView("facebook_mock");
      else if (provider === "microsoft") setView("microsoft_mock");
      else finishAuth();
    }, 1500);
  };

  const handleBack = () => {
    if (loadingState !== "none") return;
    setView("main");
    setShowPassword(false);
    setSsoState({ type: "unknown" });
  };

  const isProviderEnabled = (provider: string) => {
    if (ssoState.type === "unknown" || ssoState.type === "none") return true;
    if (ssoState.type === "single") return ssoState.provider === provider;
    if (ssoState.type === "multiple") return ssoState.providers?.includes(provider);
    return false;
  };

  const SocialSection = (
    <div className="flex w-full flex-col gap-2">
      <SocialButton
        provider="google"
        disabled={!isProviderEnabled("google") || loadingState !== "none"}
        isLoading={loadingState === "google"}
        onClick={() => handleSocialClick("google")}
      />
      <SocialButton
        provider="facebook"
        disabled={!isProviderEnabled("facebook") || loadingState !== "none"}
        isLoading={loadingState === "facebook"}
        onClick={() => handleSocialClick("facebook")}
      />
      <SocialButton
        provider="microsoft"
        disabled={!isProviderEnabled("microsoft") || loadingState !== "none"}
        isLoading={loadingState === "microsoft"}
        onClick={() => handleSocialClick("microsoft")}
      />
      <SocialButton
        provider="sso"
        disabled={!isProviderEnabled("sso") || loadingState !== "none"}
        isLoading={loadingState === "sso"}
        onClick={() => handleSocialClick("sso")}
      />
    </div>
  );

  const Divider = (
    <div className="flex w-full items-center gap-2">
      <div className="h-px flex-1 bg-border" />
      <span className="text-sm text-muted-foreground">Or continue with email</span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );

  const mockProps = {
    email,
    onBack: handleBack,
    onAuthenticated: finishAuth,
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-background font-sans text-foreground">
      <AnimatePresence mode="wait">
        {view === "google_mock" ? (
          <motion.div key="google" className="h-full w-full" {...pageMotion}>
            <MockGooglePage {...mockProps} />
          </motion.div>
        ) : view === "facebook_mock" ? (
          <motion.div key="facebook" className="h-full w-full" {...pageMotion}>
            <MockFacebookPage {...mockProps} />
          </motion.div>
        ) : view === "microsoft_mock" ? (
          <motion.div key="microsoft" className="h-full w-full" {...pageMotion}>
            <MockMicrosoftPage {...mockProps} />
          </motion.div>
        ) : view === "sutter_mock" ? (
          <motion.div key="sutter" className="h-full w-full" {...pageMotion}>
            <MockSutterPage {...mockProps} />
          </motion.div>
        ) : (
          <motion.div
            key="main"
            className="flex h-full w-full flex-col lg:flex-row"
            initial={pageMotion.initial}
            animate={pageMotion.animate}
            exit={pageMotion.exit}
            transition={pageMotion.transition}
          >
            <div className="relative flex min-h-0 w-full flex-col lg:w-1/2 lg:min-w-0 lg:shrink-0">
              <div className="absolute left-6 top-6">
                <svg
                  width="17.55"
                  height="16.875"
                  viewBox="0 0 19.5 18.75"
                  fill="none"
                  className="text-primary"
                  aria-hidden
                >
                  <path
                    clipRule="evenodd"
                    d={svgPaths.p23fcc000}
                    fill="currentColor"
                    fillRule="evenodd"
                  />
                </svg>
              </div>

              <div className="flex flex-1 flex-col items-center justify-center px-6 py-16">
                <div className="flex w-full max-w-[320px] flex-col items-center gap-6">
                  <h1 className="text-center text-2xl font-semibold tracking-tight text-foreground">
                    Log in to your account
                  </h1>

                  {SocialSection}
                  {Divider}

                  <form
                    onSubmit={handleContinue}
                    className="flex w-full flex-col items-stretch gap-4"
                  >
                    <div className="flex w-full flex-col gap-2">
                      <div className="relative">
                        <Label htmlFor="bird-login-email" className="sr-only">
                          Email
                        </Label>
                        <Input
                          id="bird-login-email"
                          autoComplete="email"
                          type="email"
                          value={email}
                          readOnly={view === "password" || loadingState !== "none"}
                          onClick={() => {
                            if (view === "password" && loadingState === "none") {
                              handleBack();
                            }
                          }}
                          onKeyDown={(e) => {
                            if (view === "password" && (e.key === "Enter" || e.key === " ")) {
                              e.preventDefault();
                              if (loadingState === "none") handleBack();
                            }
                          }}
                          onChange={handleEmailChange}
                          placeholder="Email"
                          disabled={loadingState !== "none"}
                          className={cn(
                            "h-10 pr-10",
                            view === "password" && "cursor-pointer",
                            loadingState !== "none" && "cursor-not-allowed opacity-70",
                          )}
                        />
                        {view === "password" && (
                          <button
                            type="button"
                            aria-label="Edit email"
                            disabled={loadingState !== "none"}
                            onClick={handleBack}
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            <Pencil className="size-4" />
                          </button>
                        )}
                      </div>

                      {view === "password" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="relative"
                        >
                          <Label htmlFor="bird-login-password" className="sr-only">
                            Password
                          </Label>
                          <Input
                            id="bird-login-password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            disabled={loadingState !== "none"}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            autoComplete="current-password"
                            className="h-10 pr-10"
                          />
                          <button
                            type="button"
                            disabled={loadingState !== "none"}
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                          </button>
                        </motion.div>
                      )}

                      {view === "password" && (
                        <div className="flex items-center justify-end">
                          <button
                            type="button"
                            disabled={loadingState !== "none"}
                            className="text-sm text-primary hover:underline disabled:opacity-50"
                          >
                            Forgot password?
                          </button>
                        </div>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={
                        !email ||
                        (view === "password" && !password) ||
                        loadingState !== "none"
                      }
                      className="h-12 w-full"
                    >
                      {loadingState === "continue"
                        ? view === "password"
                          ? "Signing in…"
                          : "Continuing…"
                        : view === "password"
                          ? "Sign in"
                          : "Continue"}
                    </Button>
                  </form>

                  <p className="text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <button
                      type="button"
                      className="font-medium text-primary underline-offset-4 hover:underline"
                    >
                      Sign up
                    </button>
                  </p>
                </div>
              </div>
            </div>

            <LoginMarketingPanel />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
