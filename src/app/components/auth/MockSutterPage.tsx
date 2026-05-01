import { useEffect, useRef } from "react";

export function MockSutterPage({
  email,
  onBack,
  onAuthenticated,
}: {
  email: string;
  onBack: () => void;
  onAuthenticated: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  return (
    <div
      ref={containerRef}
      tabIndex={-1}
      className="relative flex min-h-screen w-full flex-col items-center justify-center bg-[#1D5E66] font-sans text-[#333] focus:outline-none"
    >
      <button
        type="button"
        onClick={onBack}
        className="absolute left-6 top-6 z-20 text-sm text-white/90 hover:underline"
      >
        Back
      </button>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-[10%] -top-[20%] h-[80vh] w-[80vh] rounded-full bg-[#2A6E77] opacity-50 blur-3xl" />
        <div className="absolute left-0 top-0 p-8">
          <div className="flex items-center gap-2 text-white">
            <div className="h-10 w-10 bg-white/20 p-1">
              <svg viewBox="0 0 24 24" fill="white" className="h-full w-full">
                <path d="M11 2h2v9h9v2h-9v9h-2v-9H2v-2h9z" />
              </svg>
            </div>
            <span className="text-2xl font-bold">Sutter Health</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-[440px] overflow-hidden rounded-sm bg-white shadow-xl">
        <div className="p-10">
          <div className="mb-6 flex items-center gap-2">
            <div className="h-6 w-6 text-[#006978]">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
                <path d="M11 2h2v9h9v2h-9v9h-2v-9H2v-2h9z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-[#005863]">Sutter Health</span>
          </div>

          <h2 className="mb-1 text-2xl font-bold text-gray-800">Sign in</h2>

          <div className="mt-4 flex flex-col gap-4">
            <input
              type="email"
              value={email}
              readOnly
              className="w-full border-b border-gray-400 bg-transparent py-2 text-[15px] text-gray-700 focus:border-[#0067b8] focus:outline-none"
            />

            <div className="cursor-pointer text-[13px] text-[#0067b8] hover:underline">
              Can&apos;t access your account?
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={onBack}
                className="px-4 py-2 text-[15px] font-semibold text-gray-600 hover:underline"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => onAuthenticated()}
                className="bg-[#0067b8] px-8 py-2 text-[15px] font-semibold text-white transition-colors hover:bg-[#005da6]"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        <div className="bg-[#f2f2f2] px-10 py-4 text-xs text-gray-600">
          <p>Demo SSO screen for Bird AI (Sutter-style mock).</p>
        </div>
      </div>
    </div>
  );
}
