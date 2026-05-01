import { useState, useEffect, useRef } from "react";
import { MicrosoftIcon } from "./LoginProviderIcons";

export function MockMicrosoftPage({
  email,
  onBack,
  onAuthenticated,
}: {
  email: string;
  onBack: () => void;
  onAuthenticated: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onAuthenticated();
    }, 1500);
  };

  const displayEmail = email || "user@example.com";

  return (
    <div
      ref={containerRef}
      tabIndex={-1}
      className="flex min-h-screen w-full flex-col items-center justify-center bg-[#f0f2f5] font-sans focus:outline-none"
      style={{
        backgroundImage:
          "url('https://logincdn.msauth.net/shared/1.0/content/images/backgrounds/2_bc3d32a696895f78c19df6c717586a5d.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <button
        type="button"
        onClick={onBack}
        className="absolute left-6 top-6 text-sm text-[#0067b8] hover:underline"
      >
        Back
      </button>
      <div className="flex w-full max-w-[440px] flex-col bg-white p-11 shadow-lg">
        <div className="mb-2 flex items-center gap-2">
          <MicrosoftIcon />
          <span className="ml-2 text-[19px] font-semibold text-[#737373]">Microsoft</span>
        </div>

        <h1 className="mb-2 text-2xl font-semibold text-[#1b1b1b]">Sign in</h1>

        <div className="mb-4 text-[15px] text-[#1b1b1b]">{displayEmail}</div>

        <div className="mb-8 text-2xl font-semibold text-[#1b1b1b]">Use your password</div>

        <div className="w-full">
          <input
            type="password"
            placeholder="Password"
            className="w-full border-b border-[#666] pb-2 text-[15px] outline-none focus:border-[#0067b8]"
          />
        </div>

        <div className="mb-8 mt-4 cursor-pointer text-[13px] text-[#0067b8] hover:underline">
          Forgot password?
        </div>

        <div className="flex w-full justify-end">
          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className="min-w-[108px] bg-[#0067b8] px-8 py-2 text-[15px] font-semibold text-white hover:bg-[#005da6] disabled:opacity-70"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
