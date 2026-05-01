import { useState, useEffect, useRef } from "react";
import { FacebookIcon } from "./LoginProviderIcons";

export function MockFacebookPage({
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
    >
      <button
        type="button"
        onClick={onBack}
        className="absolute left-6 top-6 text-sm text-[#1877f2] hover:underline"
      >
        Back
      </button>
      <div className="flex w-full max-w-[396px] flex-col items-center gap-4 rounded-lg bg-white p-5 shadow-lg md:border md:border-[#dddfe2]">
        <div className="mb-4 flex flex-col items-center gap-4">
          <FacebookIcon />
          <h1 className="text-xl font-bold text-[#1c1e21]">Log Into Facebook</h1>
        </div>

        <div className="w-full text-center text-sm text-[#606770]">
          Log in as <span className="font-semibold">{displayEmail}</span> to continue to Bird AI.
        </div>

        <div className="mt-4 w-full">
          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className="w-full rounded-md bg-[#1877f2] px-4 py-3 text-xl font-bold text-white transition-colors hover:bg-[#166fe5] disabled:opacity-70"
          >
            {loading ? "Logging in…" : "Log In"}
          </button>
        </div>

        <div className="mt-4 cursor-pointer text-sm text-[#1877f2] hover:underline">Forgot account?</div>
      </div>
    </div>
  );
}
