import svgPaths from "./svg-6e4l3xowlw";

function Frame() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <button className="block cursor-pointer relative shrink-0 size-[24px]" data-name="Checkbox">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[16px] top-1/2" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            <g id="Vector">
              <path clipRule="evenodd" d={svgPaths.p27f88a00} fill="#CCCCCC" fillRule="evenodd" />
              <path d={svgPaths.p33f45380} fill="var(--fill-0, white)" />
            </g>
          </svg>
        </div>
      </button>
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-black tracking-[-0.28px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Unselected
      </p>
    </div>
  );
}

function Checkmark() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[16px] top-1/2" data-name="Checkmark">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Checkmark">
          <path d={svgPaths.p2c69b00} fill="var(--fill-0, #1976D2)" id="Path" />
          <path d={svgPaths.p49bc300} fill="var(--fill-0, white)" id="Path_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <button className="block cursor-pointer relative shrink-0 size-[24px]" data-name="Checkbox">
        <Checkmark />
      </button>
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-black tracking-[-0.28px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Selected
      </p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <div className="relative shrink-0 size-[24px]" data-name="Checkbox">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[16px] top-1/2" data-name="Path">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            <path d={svgPaths.p2c69b00} fill="var(--fill-0, #1976D2)" id="Path" />
          </svg>
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-white h-[2px] left-1/2 rounded-[9999px] top-1/2 w-[10px]" />
      </div>
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-black tracking-[-0.28px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Indeterminate
      </p>
    </div>
  );
}

export default function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[18px] items-start relative size-full">
      <Frame />
      <Frame2 />
      <Frame1 />
    </div>
  );
}