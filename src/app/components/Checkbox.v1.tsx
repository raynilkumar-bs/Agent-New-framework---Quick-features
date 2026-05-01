import svgPaths from "../../imports/svg-6e4l3xowlw";

interface CheckboxProps {
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: () => void;
  size?: number;
  className?: string;
}

export function Checkbox({
  checked = false,
  indeterminate = false,
  onChange,
  size = 16,
  className = "",
}: CheckboxProps) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative cursor-pointer shrink-0 flex items-center justify-center ${className}`}
      style={{ width: size + 8, height: size + 8 }}
      role="checkbox"
      aria-checked={indeterminate ? "mixed" : checked}
    >
      {indeterminate ? (
        /* ─── Indeterminate state ─── */
        <div className="relative" style={{ width: size, height: size }}>
          <svg
            className="absolute inset-0 block"
            width={size}
            height={size}
            viewBox="0 0 16 16"
            fill="none"
          >
            <path d={svgPaths.p2c69b00} fill="#2552ED" />
          </svg>
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
            style={{ width: size * 0.625, height: 2 }}
          />
        </div>
      ) : checked ? (
        /* ─── Selected state ─── */
        <svg
          width={size}
          height={size}
          viewBox="0 0 16 16"
          fill="none"
        >
          <path d={svgPaths.p2c69b00} fill="#2552ED" />
          <path d={svgPaths.p49bc300} fill="white" />
        </svg>
      ) : (
        /* ─── Unselected state ─── */
        <svg
          width={size}
          height={size}
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            clipRule="evenodd"
            d={svgPaths.p27f88a00}
            fill="#CCCCCC"
            fillRule="evenodd"
            className="dark:fill-[#555]"
          />
          <path d={svgPaths.p33f45380} fill="white" className="dark:fill-[#1e2229]" />
        </svg>
      )}
    </button>
  );
}
