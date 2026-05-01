import { svgPaths } from "./svgPaths";

export function GoogleIcon({ disabled = false }: { disabled?: boolean }) {
  const fill = disabled ? "var(--fill-0, #B0B0B0)" : undefined;
  return (
    <div className="relative size-[34px] shrink-0">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
        <path d={svgPaths.p13be4800} fill={fill || "var(--fill-0, #4285F4)"} />
        <path d={svgPaths.p10cc7b80} fill={fill || "var(--fill-0, #34A853)"} />
        <path d={svgPaths.p1d827240} fill={fill || "var(--fill-0, #FBBC05)"} />
        <path d={svgPaths.p366a3f00} fill={fill || "var(--fill-0, #EB4335)"} />
      </svg>
    </div>
  );
}

export function FacebookIcon({ disabled = false }: { disabled?: boolean }) {
  return (
    <div className="relative size-[20px] shrink-0">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <path
          d={svgPaths.p1338b200}
          fill={disabled ? "var(--fill-0, #B0B0B0)" : "var(--fill-0, #0866FF)"}
        />
      </svg>
    </div>
  );
}

export function MicrosoftIcon({ disabled = false }: { disabled?: boolean }) {
  const fill = disabled ? "var(--fill-0, #B0B0B0)" : undefined;
  return (
    <div className="relative size-[19px] shrink-0">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
        <path d={svgPaths.microsoft_vector1} fill={fill || "var(--fill-0, #F25022)"} />
        <path d={svgPaths.microsoft_vector2} fill={fill || "var(--fill-0, #00A4EF)"} />
        <path d={svgPaths.microsoft_vector3} fill={fill || "var(--fill-0, #7FBA00)"} />
        <path d={svgPaths.microsoft_vector4} fill={fill || "var(--fill-0, #FFB900)"} />
      </svg>
    </div>
  );
}
