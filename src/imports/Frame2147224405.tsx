import svgPaths from "./svg-317cpi2zmx";

function Frame() {
  return (
    <div className="bg-[#fefefe] content-stretch flex gap-px items-center justify-center px-[7px] py-[3px] relative rounded-[4px] shadow-[0px_1px_1px_0px_rgba(140,140,140,0.25)] shrink-0 w-[112px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#212121] text-[13px] whitespace-nowrap">{`Create with `}</p>
      <div className="relative shrink-0 size-[20px]" data-name="ai">
        <div className="absolute inset-[0_-0.15%_25.87%_16.67%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6975 14.8252">
            <g id="Vector">
              <path d={svgPaths.p33170700} fill="var(--fill-0, #6834B7)" />
              <path d={svgPaths.p2d8f3b80} fill="var(--fill-0, #6834B7)" />
              <path clipRule="evenodd" d={svgPaths.p1692000} fill="var(--fill-0, #6834B7)" fillRule="evenodd" />
              <path d={svgPaths.p4cf0c70} fill="var(--fill-0, #6834B7)" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[88px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic opacity-70 relative shrink-0 text-[#212121] text-[13px] w-[68px]">{` Manually `}</p>
    </div>
  );
}

export default function Frame2() {
  return (
    <div className="bg-[#f0f1f5] content-stretch flex gap-[8px] items-center pl-px pr-[13px] relative rounded-[5px] size-full">
      <Frame />
      <Frame1 />
    </div>
  );
}