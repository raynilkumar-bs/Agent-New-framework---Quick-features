import svgPaths from "./svg-1t12oz98p0";
import imgBitmapCopy1 from "figma:asset/07f55cb4dc9076729807bf360ffceba0f970bd1f.png";
import { imgExpandMore, imgBitmapCopy } from "./svg-lpubt";

function Frame108() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[36px] relative shrink-0 text-[#212121] text-[24px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        45,867 contacts
      </p>
    </div>
  );
}

function Frame109() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0">
      <Frame108 />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#1976d2] content-stretch flex gap-[8px] h-[36px] items-center justify-center px-[12px] py-[8px] relative rounded-[4px] shrink-0" data-name="Button">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Add contacts
      </p>
      <div className="relative shrink-0 size-[20px]" data-name="chevron_down">
        <div className="absolute inset-[37.46%_27.42%_37.45%_27.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.498px_-7.492px] mask-size-[20px_20px]" data-name="expand_more" style={{ maskImage: `url('${imgExpandMore}')` }}>
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.01782 5.0176">
            <path d={svgPaths.p5ccaa80} fill="var(--fill-0, white)" id="expand_more" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function HeaderCtAs() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Header CTAs">
      <Button />
      <div className="content-stretch flex items-center justify-center p-[8px] relative rounded-[4px] shrink-0 size-[36px]" data-name="Button">
        <div aria-hidden="true" className="absolute border border-[#757575] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="relative shrink-0 size-[20px]" data-name="more_vert">
          <div className="absolute inset-[23.05%_44.58%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-8.917px_-4.609px] mask-size-[20px_20px]" data-name="more_vert" style={{ maskImage: `url('${imgExpandMore}')` }}>
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.16663 10.782">
              <path d={svgPaths.p1b297900} fill="var(--fill-0, #303030)" id="more_vert" />
            </svg>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-center justify-center p-[8px] relative rounded-[4px] shrink-0 size-[36px]" data-name="Button">
        <div aria-hidden="true" className="absolute border border-[#757575] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="relative shrink-0 size-[20px]" data-name="filter_alt">
          <div className="absolute inset-[22.08%_23.11%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4.622px_-4.417px] mask-size-[20px_20px]" data-name="filter_alt" style={{ maskImage: `url('${imgExpandMore}')` }}>
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.7564 11.1666">
              <path d={svgPaths.p2f577e80} fill="var(--fill-0, #303030)" id="filter_alt" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeaderWeb() {
  return (
    <div className="bg-white h-[68px] relative shrink-0 w-full" data-name="Header / Web">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[24px] py-[16px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-h-px min-w-px relative" data-name="Header/Title">
            <Frame109 />
          </div>
          <HeaderCtAs />
        </div>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col h-[48px] items-start justify-center pl-[4px] pr-[12px] py-[20.5px] relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-[#e3f4e0] content-stretch flex isolate items-center px-[8px] py-[6px] relative rounded-[4px] shrink-0" data-name="NewChip">
        <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#377e2c] text-[10px] whitespace-nowrap z-[1]" style={{ fontVariationSettings: "'wdth' 100" }}>
          4
        </p>
      </div>
    </div>
  );
}

function Frame18() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[48px] items-start justify-center pl-[4px] pr-[12px] py-[20.5px] relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-[#fef6e0] content-stretch flex isolate items-center px-[8px] py-[6px] relative rounded-[4px] shrink-0" data-name="NewChip">
        <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#c69204] text-[10px] whitespace-nowrap z-[1]" style={{ fontVariationSettings: "'wdth' 100" }}>
          1
        </p>
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[48px] items-start justify-center pl-[4px] pr-[12px] py-[20.5px] relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-[#fddad7] content-stretch flex isolate items-center px-[8px] py-[6px] relative rounded-[4px] shrink-0" data-name="NewChip">
        <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#de1b0c] text-[10px] whitespace-nowrap z-[1]" style={{ fontVariationSettings: "'wdth' 100" }}>
          6
        </p>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="bg-[#f2f4f7] content-stretch flex flex-col h-[48px] items-start justify-center pl-[4px] pr-[12px] py-[20.5px] relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-[#fddad7] content-stretch flex isolate items-center px-[8px] py-[6px] relative rounded-[4px] shrink-0" data-name="NewChip">
        <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#de1b0c] text-[10px] whitespace-nowrap z-[1]" style={{ fontVariationSettings: "'wdth' 100" }}>
          6
        </p>
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[48px] items-start justify-center pl-[4px] pr-[12px] py-[20.5px] relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-[#e3f4e0] content-stretch flex isolate items-center px-[8px] py-[6px] relative rounded-[4px] shrink-0" data-name="NewChip">
        <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#377e2c] text-[10px] whitespace-nowrap z-[1]" style={{ fontVariationSettings: "'wdth' 100" }}>
          4
        </p>
      </div>
    </div>
  );
}

function Frame16() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[48px] items-start justify-center pl-[4px] pr-[12px] py-[20.5px] relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-[#fddad7] content-stretch flex isolate items-center px-[8px] py-[6px] relative rounded-[4px] shrink-0" data-name="NewChip">
        <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#de1b0c] text-[10px] whitespace-nowrap z-[1]" style={{ fontVariationSettings: "'wdth' 100" }}>
          6
        </p>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[48px] items-start justify-center pl-[4px] pr-[12px] py-[20.5px] relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-[#e3f4e0] content-stretch flex isolate items-center px-[8px] py-[6px] relative rounded-[4px] shrink-0" data-name="NewChip">
        <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#377e2c] text-[10px] whitespace-nowrap z-[1]" style={{ fontVariationSettings: "'wdth' 100" }}>
          4
        </p>
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[48px] items-start justify-center pl-[4px] pr-[12px] py-[20.5px] relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-[#e3f4e0] content-stretch flex isolate items-center px-[8px] py-[6px] relative rounded-[4px] shrink-0" data-name="NewChip">
        <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#377e2c] text-[10px] whitespace-nowrap z-[1]" style={{ fontVariationSettings: "'wdth' 100" }}>
          4
        </p>
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[48px] items-start justify-center pl-[4px] pr-[12px] py-[20.5px] relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-[#fddad7] content-stretch flex isolate items-center px-[8px] py-[6px] relative rounded-[4px] shrink-0" data-name="NewChip">
        <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#de1b0c] text-[10px] whitespace-nowrap z-[1]" style={{ fontVariationSettings: "'wdth' 100" }}>
          6
        </p>
      </div>
    </div>
  );
}

function Frame21() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[48px] items-start justify-center pl-[4px] pr-[12px] py-[20.5px] relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-[#e3f4e0] content-stretch flex isolate items-center px-[8px] py-[6px] relative rounded-[4px] shrink-0" data-name="NewChip">
        <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#377e2c] text-[10px] whitespace-nowrap z-[1]" style={{ fontVariationSettings: "'wdth' 100" }}>
          8
        </p>
      </div>
    </div>
  );
}

function Frame22() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[48px] items-start justify-center pl-[4px] pr-[12px] py-[20.5px] relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-[#fef6e0] content-stretch flex isolate items-center px-[8px] py-[6px] relative rounded-[4px] shrink-0" data-name="NewChip">
        <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#c69204] text-[10px] whitespace-nowrap z-[1]" style={{ fontVariationSettings: "'wdth' 100" }}>
          1
        </p>
      </div>
    </div>
  );
}

function Frame23() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[48px] items-start justify-center pl-[4px] pr-[12px] py-[20.5px] relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-[#fddad7] content-stretch flex isolate items-center px-[8px] py-[6px] relative rounded-[4px] shrink-0" data-name="NewChip">
        <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#de1b0c] text-[10px] whitespace-nowrap z-[1]" style={{ fontVariationSettings: "'wdth' 100" }}>
          6
        </p>
      </div>
    </div>
  );
}

function Frame24() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[48px] items-start justify-center pl-[4px] pr-[12px] py-[20.5px] relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-[#e3f4e0] content-stretch flex isolate items-center px-[8px] py-[6px] relative rounded-[4px] shrink-0" data-name="NewChip">
        <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#377e2c] text-[10px] whitespace-nowrap z-[1]" style={{ fontVariationSettings: "'wdth' 100" }}>
          4
        </p>
      </div>
    </div>
  );
}

function Frame25() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[48px] items-start justify-center pl-[4px] pr-[12px] py-[20.5px] relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-[#fef6e0] content-stretch flex isolate items-center px-[8px] py-[6px] relative rounded-[4px] shrink-0" data-name="NewChip">
        <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#c69204] text-[10px] whitespace-nowrap z-[1]" style={{ fontVariationSettings: "'wdth' 100" }}>
          1
        </p>
      </div>
    </div>
  );
}

function Frame26() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[48px] items-start justify-center pl-[4px] pr-[12px] py-[20.5px] relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-[#e3f4e0] content-stretch flex isolate items-center px-[8px] py-[6px] relative rounded-[4px] shrink-0" data-name="NewChip">
        <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#377e2c] text-[10px] whitespace-nowrap z-[1]" style={{ fontVariationSettings: "'wdth' 100" }}>
          4
        </p>
      </div>
    </div>
  );
}

function TableItemsCompact() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Table items Compact">
      <Frame9 />
      <Frame18 />
      <Frame17 />
      <Frame15 />
      <Frame14 />
      <Frame16 />
      <Frame13 />
      <Frame19 />
      <Frame20 />
      <Frame21 />
      <Frame22 />
      <Frame23 />
      <Frame24 />
      <Frame25 />
      <Frame26 />
    </div>
  );
}

function Frame96() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[36px]">
      <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="Tittle">
        <div aria-hidden="true" className="absolute border-[#e9e9eb] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center px-[4px] py-[16px] size-full" />
        </div>
      </div>
      <TableItemsCompact />
    </div>
  );
}

function Frame102() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#555] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Name
      </p>
      <div className="relative shrink-0 size-[20px]" data-name="chevron_down">
        <div className="absolute inset-[37.46%_27.42%_37.45%_27.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4.399px_-5.994px] mask-size-[16px_16px]" data-name="expand_more" style={{ maskImage: `url('${imgExpandMore}')` }}>
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.01782 5.0176">
            <path d={svgPaths.p355b5100} fill="var(--fill-0, #555555)" id="expand_more" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[4px] py-[18px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#212121] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Emma Reynolds
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[4px] py-[18px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#212121] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Liam Mitchell
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[4px] py-[18px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#212121] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Ava Simmons
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="bg-[#f2f4f7] h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[4px] py-[18px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#1976d2] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Noah Hayes
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[4px] py-[18px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#212121] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Isabella Cooper
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[2px] items-center px-[4px] py-[18px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#212121] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Ethan Brooks
          </p>
          <div className="relative shrink-0 size-[20px]" data-name="Lead">
            <div className="absolute inset-[23.37%_22.08%_12.08%_22.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4.417px_-4.673px] mask-size-[20px_20px]" data-name="local_fire_department" style={{ maskImage: `url('${imgExpandMore}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.1666 12.9099">
                <path d={svgPaths.p3c00ee00} fill="var(--fill-0, #4CAE3D)" id="local_fire_department" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame27() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[4px] py-[18px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#212121] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Mia Campbell
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame28() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[2px] items-center px-[4px] py-[18px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#212121] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Jackson Rivera
          </p>
          <div className="relative shrink-0 size-[20px]" data-name="Lead">
            <div className="absolute inset-[23.37%_22.08%_12.08%_22.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4.417px_-4.673px] mask-size-[20px_20px]" data-name="local_fire_department" style={{ maskImage: `url('${imgExpandMore}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.1666 12.9099">
                <path d={svgPaths.p3c00ee00} fill="var(--fill-0, #4CAE3D)" id="local_fire_department" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame29() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[2px] items-center px-[4px] py-[18px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#212121] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Harper Lewis
          </p>
          <div className="relative shrink-0 size-[20px]" data-name="Lead">
            <div className="absolute inset-[23.37%_22.08%_12.08%_22.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4.417px_-4.673px] mask-size-[20px_20px]" data-name="local_fire_department" style={{ maskImage: `url('${imgExpandMore}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.1666 12.9099">
                <path d={svgPaths.p3c00ee00} fill="var(--fill-0, #4CAE3D)" id="local_fire_department" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame30() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[4px] py-[18px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#212121] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Benjamin Foster
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame31() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[2px] items-center px-[4px] py-[18px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#212121] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Chloe Bennett
          </p>
          <div className="relative shrink-0 size-[20px]" data-name="Lead">
            <div className="absolute inset-[23.37%_22.08%_12.08%_22.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4.417px_-4.673px] mask-size-[20px_20px]" data-name="local_fire_department" style={{ maskImage: `url('${imgExpandMore}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.1666 12.9099">
                <path d={svgPaths.p3c00ee00} fill="var(--fill-0, #4CAE3D)" id="local_fire_department" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame32() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[4px] py-[18px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#212121] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Caleb Morris
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame33() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[4px] py-[18px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#212121] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Zoey Parker
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame34() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[4px] py-[18px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#212121] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Harper Lewis
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame35() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[4px] py-[18px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#212121] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            User name
          </p>
        </div>
      </div>
    </div>
  );
}

function TableItemsCompact1() {
  return (
    <div className="content-stretch flex flex-col items-start min-w-[240px] relative shrink-0 w-full" data-name="Table items Compact">
      <Frame10 />
      <Frame11 />
      <Frame7 />
      <Frame6 />
      <Frame8 />
      <Frame12 />
      <Frame27 />
      <Frame28 />
      <Frame29 />
      <Frame30 />
      <Frame31 />
      <Frame32 />
      <Frame33 />
      <Frame34 />
      <Frame35 />
    </div>
  );
}

function Frame99() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[372px]">
      <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="Tittle">
        <div aria-hidden="true" className="absolute border-[#e9e9eb] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[4px] items-center px-[4px] py-[16px] relative size-full">
            <Frame102 />
          </div>
        </div>
      </div>
      <TableItemsCompact1 />
    </div>
  );
}

function Frame103() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#555] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Phone/email
      </p>
    </div>
  );
}

function Frame36() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[4px] py-[10px] relative size-full">
          <div className="relative shrink-0 size-[20px]" data-name="call">
            <div className="absolute inset-[17.08%_17.08%_17.16%_17.06%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.729px_-2.733px] mask-size-[16px_16px]" data-name="call" style={{ maskImage: `url('${imgExpandMore}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1717 13.1509">
                <path d={svgPaths.p117af780} fill="var(--fill-0, #303030)" id="call" />
              </svg>
            </div>
          </div>
          <div className="relative shrink-0 size-[20px]" data-name="mail">
            <div className="absolute inset-[22.08%_12.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.933px_-3.533px] mask-size-[16px_16px]" data-name="mail" style={{ maskImage: `url('${imgExpandMore}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.1666 11.1666">
                <path d={svgPaths.p1f27fcf0} fill="var(--fill-0, #303030)" id="mail" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame37() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[4px] py-[10px] relative size-full">
          <div className="relative shrink-0 size-[20px]" data-name="call">
            <div className="absolute inset-[17.08%_17.08%_17.16%_17.06%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.729px_-2.733px] mask-size-[16px_16px]" data-name="call" style={{ maskImage: `url('${imgExpandMore}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1717 13.1509">
                <path d={svgPaths.p117af780} fill="var(--fill-0, #303030)" id="call" />
              </svg>
            </div>
          </div>
          <div className="relative shrink-0 size-[20px]" data-name="mail">
            <div className="absolute inset-[22.08%_12.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.933px_-3.533px] mask-size-[16px_16px]" data-name="mail" style={{ maskImage: `url('${imgExpandMore}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.1666 11.1666">
                <path d={svgPaths.p1f27fcf0} fill="var(--fill-0, #303030)" id="mail" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame38() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[4px] py-[10px] relative size-full">
          <div className="relative shrink-0 size-[20px]" data-name="call">
            <div className="absolute inset-[17.08%_17.08%_17.16%_17.06%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.729px_-2.733px] mask-size-[16px_16px]" data-name="call" style={{ maskImage: `url('${imgExpandMore}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1717 13.1509">
                <path d={svgPaths.p117af780} fill="var(--fill-0, #303030)" id="call" />
              </svg>
            </div>
          </div>
          <div className="relative shrink-0 size-[20px]" data-name="mail">
            <div className="absolute inset-[22.08%_12.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.933px_-3.533px] mask-size-[16px_16px]" data-name="mail" style={{ maskImage: `url('${imgExpandMore}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.1666 11.1666">
                <path d={svgPaths.p1f27fcf0} fill="var(--fill-0, #303030)" id="mail" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame39() {
  return (
    <div className="bg-[#f2f4f7] h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[4px] py-[10px] relative size-full">
          <div className="relative shrink-0 size-[20px]" data-name="call">
            <div className="absolute inset-[17.08%_17.08%_17.16%_17.06%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.729px_-2.733px] mask-size-[16px_16px]" data-name="call" style={{ maskImage: `url('${imgExpandMore}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1717 13.1509">
                <path d={svgPaths.p117af780} fill="var(--fill-0, #303030)" id="call" />
              </svg>
            </div>
          </div>
          <div className="relative shrink-0 size-[20px]" data-name="mail">
            <div className="absolute inset-[22.08%_12.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.933px_-3.533px] mask-size-[16px_16px]" data-name="mail" style={{ maskImage: `url('${imgExpandMore}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.1666 11.1666">
                <path d={svgPaths.p1f27fcf0} fill="var(--fill-0, #303030)" id="mail" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame40() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[4px] py-[10px] relative size-full">
          <div className="relative shrink-0 size-[20px]" data-name="call">
            <div className="absolute inset-[17.08%_17.08%_17.16%_17.06%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.729px_-2.733px] mask-size-[16px_16px]" data-name="call" style={{ maskImage: `url('${imgExpandMore}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1717 13.1509">
                <path d={svgPaths.p117af780} fill="var(--fill-0, #303030)" id="call" />
              </svg>
            </div>
          </div>
          <div className="relative shrink-0 size-[20px]" data-name="mail">
            <div className="absolute inset-[22.08%_12.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.933px_-3.533px] mask-size-[16px_16px]" data-name="mail" style={{ maskImage: `url('${imgExpandMore}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.1666 11.1666">
                <path d={svgPaths.p1f27fcf0} fill="var(--fill-0, #303030)" id="mail" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame41() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[4px] py-[10px] relative size-full">
          <div className="relative shrink-0 size-[20px]" data-name="call">
            <div className="absolute inset-[17.08%_17.08%_17.16%_17.06%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.729px_-2.733px] mask-size-[16px_16px]" data-name="call" style={{ maskImage: `url('${imgExpandMore}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1717 13.1509">
                <path d={svgPaths.p117af780} fill="var(--fill-0, #CCCCCC)" id="call" />
              </svg>
            </div>
          </div>
          <div className="relative shrink-0 size-[20px]" data-name="mail">
            <div className="absolute inset-[22.08%_12.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.933px_-3.533px] mask-size-[16px_16px]" data-name="mail" style={{ maskImage: `url('${imgExpandMore}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.1666 11.1666">
                <path d={svgPaths.p1f27fcf0} fill="var(--fill-0, #CCCCCC)" id="mail" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame42() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[4px] py-[10px] relative size-full">
          <div className="relative shrink-0 size-[20px]" data-name="call">
            <div className="absolute inset-[17.08%_17.08%_17.16%_17.06%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.729px_-2.733px] mask-size-[16px_16px]" data-name="call" style={{ maskImage: `url('${imgExpandMore}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1717 13.1509">
                <path d={svgPaths.p117af780} fill="var(--fill-0, #303030)" id="call" />
              </svg>
            </div>
          </div>
          <div className="relative shrink-0 size-[20px]" data-name="mail">
            <div className="absolute inset-[22.08%_12.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.933px_-3.533px] mask-size-[16px_16px]" data-name="mail" style={{ maskImage: `url('${imgExpandMore}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.1666 11.1666">
                <path d={svgPaths.p1f27fcf0} fill="var(--fill-0, #303030)" id="mail" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame43() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[4px] py-[10px] relative size-full">
          <div className="relative shrink-0 size-[20px]" data-name="call">
            <div className="absolute inset-[17.08%_17.08%_17.16%_17.06%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.729px_-2.733px] mask-size-[16px_16px]" data-name="call" style={{ maskImage: `url('${imgExpandMore}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1717 13.1509">
                <path d={svgPaths.p117af780} fill="var(--fill-0, #303030)" id="call" />
              </svg>
            </div>
          </div>
          <div className="relative shrink-0 size-[20px]" data-name="mail">
            <div className="absolute inset-[22.08%_12.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.933px_-3.533px] mask-size-[16px_16px]" data-name="mail" style={{ maskImage: `url('${imgExpandMore}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.1666 11.1666">
                <path d={svgPaths.p1f27fcf0} fill="var(--fill-0, #303030)" id="mail" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame44() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[4px] py-[10px] relative size-full">
          <div className="relative shrink-0 size-[20px]" data-name="call">
            <div className="absolute inset-[17.08%_17.08%_17.16%_17.06%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.729px_-2.733px] mask-size-[16px_16px]" data-name="call" style={{ maskImage: `url('${imgExpandMore}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1717 13.1509">
                <path d={svgPaths.p117af780} fill="var(--fill-0, #CCCCCC)" id="call" />
              </svg>
            </div>
          </div>
          <div className="relative shrink-0 size-[20px]" data-name="mail">
            <div className="absolute inset-[22.08%_12.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.933px_-3.533px] mask-size-[16px_16px]" data-name="mail" style={{ maskImage: `url('${imgExpandMore}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.1666 11.1666">
                <path d={svgPaths.p1f27fcf0} fill="var(--fill-0, #CCCCCC)" id="mail" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame45() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[4px] py-[10px] relative size-full">
          <div className="relative shrink-0 size-[20px]" data-name="call">
            <div className="absolute inset-[17.08%_17.08%_17.16%_17.06%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.729px_-2.733px] mask-size-[16px_16px]" data-name="call" style={{ maskImage: `url('${imgExpandMore}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1717 13.1509">
                <path d={svgPaths.p117af780} fill="var(--fill-0, #303030)" id="call" />
              </svg>
            </div>
          </div>
          <div className="relative shrink-0 size-[20px]" data-name="mail">
            <div className="absolute inset-[22.08%_12.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.933px_-3.533px] mask-size-[16px_16px]" data-name="mail" style={{ maskImage: `url('${imgExpandMore}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.1666 11.1666">
                <path d={svgPaths.p1f27fcf0} fill="var(--fill-0, #303030)" id="mail" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame46() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[4px] py-[10px] relative size-full">
          <div className="relative shrink-0 size-[20px]" data-name="call">
            <div className="absolute inset-[17.08%_17.08%_17.16%_17.06%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.729px_-2.733px] mask-size-[16px_16px]" data-name="call" style={{ maskImage: `url('${imgExpandMore}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1717 13.1509">
                <path d={svgPaths.p117af780} fill="var(--fill-0, #CCCCCC)" id="call" />
              </svg>
            </div>
          </div>
          <div className="relative shrink-0 size-[20px]" data-name="mail">
            <div className="absolute inset-[22.08%_12.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.933px_-3.533px] mask-size-[16px_16px]" data-name="mail" style={{ maskImage: `url('${imgExpandMore}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.1666 11.1666">
                <path d={svgPaths.p1f27fcf0} fill="var(--fill-0, #CCCCCC)" id="mail" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame47() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[4px] py-[10px] relative size-full">
          <div className="relative shrink-0 size-[20px]" data-name="call">
            <div className="absolute inset-[17.08%_17.08%_17.16%_17.06%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.729px_-2.733px] mask-size-[16px_16px]" data-name="call" style={{ maskImage: `url('${imgExpandMore}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1717 13.1509">
                <path d={svgPaths.p117af780} fill="var(--fill-0, #303030)" id="call" />
              </svg>
            </div>
          </div>
          <div className="relative shrink-0 size-[20px]" data-name="mail">
            <div className="absolute inset-[22.08%_12.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.933px_-3.533px] mask-size-[16px_16px]" data-name="mail" style={{ maskImage: `url('${imgExpandMore}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.1666 11.1666">
                <path d={svgPaths.p1f27fcf0} fill="var(--fill-0, #303030)" id="mail" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame48() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[4px] py-[10px] relative size-full">
          <div className="relative shrink-0 size-[20px]" data-name="call">
            <div className="absolute inset-[17.08%_17.08%_17.16%_17.06%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.729px_-2.733px] mask-size-[16px_16px]" data-name="call" style={{ maskImage: `url('${imgExpandMore}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1717 13.1509">
                <path d={svgPaths.p117af780} fill="var(--fill-0, #303030)" id="call" />
              </svg>
            </div>
          </div>
          <div className="relative shrink-0 size-[20px]" data-name="mail">
            <div className="absolute inset-[22.08%_12.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.933px_-3.533px] mask-size-[16px_16px]" data-name="mail" style={{ maskImage: `url('${imgExpandMore}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.1666 11.1666">
                <path d={svgPaths.p1f27fcf0} fill="var(--fill-0, #303030)" id="mail" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame49() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[4px] py-[10px] relative size-full">
          <div className="relative shrink-0 size-[20px]" data-name="call">
            <div className="absolute inset-[17.08%_17.08%_17.16%_17.06%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.729px_-2.733px] mask-size-[16px_16px]" data-name="call" style={{ maskImage: `url('${imgExpandMore}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1717 13.1509">
                <path d={svgPaths.p117af780} fill="var(--fill-0, #303030)" id="call" />
              </svg>
            </div>
          </div>
          <div className="relative shrink-0 size-[20px]" data-name="mail">
            <div className="absolute inset-[22.08%_12.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.933px_-3.533px] mask-size-[16px_16px]" data-name="mail" style={{ maskImage: `url('${imgExpandMore}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.1666 11.1666">
                <path d={svgPaths.p1f27fcf0} fill="var(--fill-0, #303030)" id="mail" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame50() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[4px] py-[10px] relative size-full">
          <div className="relative shrink-0 size-[20px]" data-name="call">
            <div className="absolute inset-[17.08%_17.08%_17.16%_17.06%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.729px_-2.733px] mask-size-[16px_16px]" data-name="call" style={{ maskImage: `url('${imgExpandMore}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1717 13.1509">
                <path d={svgPaths.p117af780} fill="var(--fill-0, #303030)" id="call" />
              </svg>
            </div>
          </div>
          <div className="relative shrink-0 size-[20px]" data-name="mail">
            <div className="absolute inset-[22.08%_12.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.933px_-3.533px] mask-size-[16px_16px]" data-name="mail" style={{ maskImage: `url('${imgExpandMore}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.1666 11.1666">
                <path d={svgPaths.p1f27fcf0} fill="var(--fill-0, #303030)" id="mail" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableItemsCompact2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Table items Compact">
      <Frame36 />
      <Frame37 />
      <Frame38 />
      <Frame39 />
      <Frame40 />
      <Frame41 />
      <Frame42 />
      <Frame43 />
      <Frame44 />
      <Frame45 />
      <Frame46 />
      <Frame47 />
      <Frame48 />
      <Frame49 />
      <Frame50 />
    </div>
  );
}

function Frame101() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative">
      <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="Tittle">
        <div aria-hidden="true" className="absolute border-[#e9e9eb] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[4px] items-center px-[4px] py-[16px] relative size-full">
            <Frame103 />
          </div>
        </div>
      </div>
      <TableItemsCompact2 />
    </div>
  );
}

function Frame104() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#555] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Locations
      </p>
    </div>
  );
}

function Frame51() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[4px] py-[18px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#212121] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Atlanta, GA
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame52() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[4px] py-[18px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#212121] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            2
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame53() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[4px] py-[18px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#212121] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            3
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame54() {
  return (
    <div className="bg-[#f2f4f7] h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[4px] py-[18px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#212121] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            3
          </p>
          <div className="relative shrink-0 size-[20px]" data-name="chevron_down">
            <div className="absolute inset-[37.46%_27.42%_37.45%_27.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4.399px_-5.994px] mask-size-[16px_16px]" data-name="expand_more" style={{ maskImage: `url('${imgExpandMore}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.01782 5.0176">
                <path d={svgPaths.p355b5100} fill="var(--fill-0, #555555)" id="expand_more" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame55() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[4px] py-[18px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#212121] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            New York City, NY
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame56() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[4px] py-[18px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#212121] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            3
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame57() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[4px] py-[18px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#212121] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Chicago, IL
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame58() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[4px] py-[18px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#212121] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            3
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame59() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[4px] py-[18px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#212121] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            San Diego, CA
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame60() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[4px] py-[18px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#212121] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            3
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame61() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[4px] py-[18px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#212121] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            2
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame62() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[4px] py-[18px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#212121] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            8
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame63() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[4px] py-[18px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#212121] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            3
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame64() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[4px] py-[18px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#212121] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            10
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame65() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[4px] py-[18px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#212121] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            3 locations
          </p>
          <div className="relative shrink-0 size-[20px]" data-name="chevron_down">
            <div className="absolute inset-[37.46%_27.42%_37.45%_27.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4.399px_-5.994px] mask-size-[16px_16px]" data-name="expand_more" style={{ maskImage: `url('${imgExpandMore}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.01782 5.0176">
                <path d={svgPaths.p355b5100} fill="var(--fill-0, #555555)" id="expand_more" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableItemsCompact3() {
  return (
    <div className="content-stretch flex flex-col items-start min-w-[100px] relative shrink-0 w-full" data-name="Table items Compact">
      <Frame51 />
      <Frame52 />
      <Frame53 />
      <Frame54 />
      <Frame55 />
      <Frame56 />
      <Frame57 />
      <Frame58 />
      <Frame59 />
      <Frame60 />
      <Frame61 />
      <Frame62 />
      <Frame63 />
      <Frame64 />
      <Frame65 />
    </div>
  );
}

function Frame100() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative">
      <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="Tittle">
        <div aria-hidden="true" className="absolute border-[#e9e9eb] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[4px] items-center px-[4px] py-[16px] relative size-full">
            <Frame104 />
          </div>
        </div>
      </div>
      <TableItemsCompact3 />
    </div>
  );
}

function Frame105() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative">
      <p className="font-['Roboto:Medium',sans-serif] font-medium leading-[18px] relative shrink-0 text-[#212121] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Last activity
      </p>
      <div className="relative shrink-0 size-[20px]" data-name="chevron_down">
        <div className="absolute inset-[37.46%_27.42%_37.45%_27.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4.399px_-5.994px] mask-size-[16px_16px]" data-name="expand_more" style={{ maskImage: `url('${imgExpandMore}')` }}>
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.01782 5.0176">
            <path d={svgPaths.p355b5100} fill="var(--fill-0, #555555)" id="expand_more" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame66() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[4px] py-[18px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#212121] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Jul 05, 2024
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame67() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[4px] py-[18px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#212121] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Jul 05, 2024
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame68() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[4px] py-[18px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#212121] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Jul 05, 2024
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame69() {
  return (
    <div className="bg-[#f2f4f7] h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[4px] py-[18px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#212121] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Jul 05, 2024
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame70() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[4px] py-[18px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#212121] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Jul 05, 2024
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame71() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[4px] py-[18px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#212121] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Jul 05, 2024
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame72() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[4px] py-[18px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#212121] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Jul 05, 2024
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame73() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[4px] py-[18px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#212121] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Jul 05, 2024
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame74() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[4px] py-[18px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#212121] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Jul 05, 2024
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame75() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[4px] py-[18px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#212121] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Jul 05, 2024
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame76() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[4px] py-[18px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#212121] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Jul 05, 2024
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame77() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[4px] py-[18px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#212121] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Jul 05, 2024
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame78() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[4px] py-[18px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#212121] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Jul 05, 2024
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame79() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[4px] py-[18px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#212121] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Jul 05, 2024
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame80() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[4px] py-[18px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#212121] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Jul 05, 2024
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame97() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative">
      <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="Tittle">
        <div aria-hidden="true" className="absolute border-[#e9e9eb] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[4px] items-center px-[4px] py-[16px] relative size-full">
            <Frame105 />
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-start min-w-[100px] relative shrink-0 w-full" data-name="Table items Compact">
        <Frame66 />
        <Frame67 />
        <Frame68 />
        <Frame69 />
        <Frame70 />
        <Frame71 />
        <Frame72 />
        <Frame73 />
        <Frame74 />
        <Frame75 />
        <Frame76 />
        <Frame77 />
        <Frame78 />
        <Frame79 />
        <Frame80 />
      </div>
    </div>
  );
}

function Frame81() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function Frame82() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[4px] size-full" />
      </div>
    </div>
  );
}

function Frame83() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[4px] size-full" />
      </div>
    </div>
  );
}

function Frame84() {
  return (
    <div className="bg-[#f2f4f7] h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[4px] items-center justify-end p-[4px] relative size-full">
          <div className="bg-white content-stretch flex items-center justify-center p-[2px] relative rounded-[4px] shrink-0 size-[36px]" data-name="Button">
            <div aria-hidden="true" className="absolute border border-[#e5e9f0] border-solid inset-0 pointer-events-none rounded-[4px]" />
            <div className="relative shrink-0 size-[20px]" data-name="Inbox">
              <div className="absolute inset-[12.08%_12.08%_18.67%_12.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.933px_-1.933px] mask-size-[16px_16px]" data-name="sms" style={{ maskImage: `url('${imgExpandMore}')` }}>
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.1666 13.85">
                  <path d={svgPaths.p16687400} fill="var(--fill-0, #303030)" id="sms" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-[#eaeaea] content-stretch flex items-center justify-center p-[2px] relative rounded-[4px] shrink-0 size-[36px]" data-name="Button">
            <div aria-hidden="true" className="absolute border border-[#e5e9f0] border-solid inset-0 pointer-events-none rounded-[4px]" />
            <div className="relative shrink-0 size-[20px]" data-name="more_vert">
              <div className="absolute inset-[23.05%_44.58%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-7.133px_-3.687px] mask-size-[16px_16px]" data-name="more_vert" style={{ maskImage: `url('${imgExpandMore}')` }}>
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.16663 10.782">
                  <path d={svgPaths.p1b297900} fill="var(--fill-0, #303030)" id="more_vert" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame85() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[4px] size-full" />
      </div>
    </div>
  );
}

function Frame86() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[4px] size-full" />
      </div>
    </div>
  );
}

function Frame87() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[4px] size-full" />
      </div>
    </div>
  );
}

function Frame88() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[4px] size-full" />
      </div>
    </div>
  );
}

function Frame89() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[4px] size-full" />
      </div>
    </div>
  );
}

function Frame90() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[4px] size-full" />
      </div>
    </div>
  );
}

function Frame91() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[4px] size-full" />
      </div>
    </div>
  );
}

function Frame92() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[4px] size-full" />
      </div>
    </div>
  );
}

function Frame93() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[4px] size-full" />
      </div>
    </div>
  );
}

function Frame94() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[4px] size-full" />
      </div>
    </div>
  );
}

function Frame95() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e5e9f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[4px] size-full" />
      </div>
    </div>
  );
}

function TableItems() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="Table items">
      <Frame81 />
      <Frame82 />
      <Frame83 />
      <Frame84 />
      <Frame85 />
      <Frame86 />
      <Frame87 />
      <Frame88 />
      <Frame89 />
      <Frame90 />
      <Frame91 />
      <Frame92 />
      <Frame93 />
      <Frame94 />
      <Frame95 />
    </div>
  );
}

function Frame98() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[58px]">
      <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="Tittle">
        <div aria-hidden="true" className="absolute border-[#e9e9eb] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center px-[4px] py-[16px] size-full" />
        </div>
      </div>
      <TableItems />
    </div>
  );
}

function Frame111() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative">
      <Frame96 />
      <Frame99 />
      <Frame101 />
      <Frame100 />
      <Frame97 />
      <Frame98 />
    </div>
  );
}

function Table() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Table">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[24px] relative size-full">
          <Frame111 />
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[773px] items-start left-[270px] top-[52px] w-[1169px]">
      <HeaderWeb />
      <Table />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[6.25%]">
      <div className="absolute inset-[6.25%]" data-name="Oval Copy 8">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.5 17.5">
          <circle cx="8.75" cy="8.75" fill="var(--fill-0, #D8D8D8)" id="Oval Copy 8" r="8.75" />
        </svg>
      </div>
      <div className="absolute inset-[-4.69%_0.78%_-42.97%_0.78%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[1.094px_2.188px] mask-size-[17.5px_17.5px]" data-name="Bitmap Copy" style={{ maskImage: `url('${imgBitmapCopy}')` }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgBitmapCopy1} />
        </div>
      </div>
    </div>
  );
}

function Frame107() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="content-stretch flex flex-col items-center justify-center opacity-0 p-[8px] relative shrink-0 size-[28px]" data-name="Component 65">
        <div className="relative shrink-0 size-[20px]" data-name="Settings">
          <div className="absolute inset-[40%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-8px_-8px] mask-size-[20px_20px]" style={{ maskImage: `url('${imgExpandMore}')` }}>
            <div className="absolute inset-[-12.5%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
                <circle cx="2.5" cy="2.5" id="Ellipse 2352" r="2" stroke="var(--stroke-0, #303030)" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-[12.08%_14.79%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.959px_-2.417px] mask-size-[20px_20px]" data-name="settings" style={{ maskImage: `url('${imgExpandMore}')` }}>
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.0821 15.1666">
              <path d={svgPaths.p177c8400} fill="var(--fill-0, #303030)" id="settings" />
            </svg>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[28px]" data-name="Component 63">
        <div className="relative shrink-0 size-[20px]" data-name="add_circle">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <path d={svgPaths.p256eec00} fill="var(--fill-0, #1976D2)" id="add_circle" />
          </svg>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[28px]" data-name="Component 64">
        <div className="relative shrink-0 size-[20px]" data-name="Help">
          <div className="absolute inset-[12.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.417px_-2.417px] mask-size-[20px_20px]" data-name="help" style={{ maskImage: `url('${imgExpandMore}')` }}>
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.1666 15.1666">
              <path d={svgPaths.p32bf4c0} fill="var(--fill-0, #303030)" id="help" />
            </svg>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[28px]" data-name="Component 66">
        <div className="relative shrink-0 size-[20px]" data-name="Avatar">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <circle cx="10" cy="10" fill="var(--fill-0, white)" id="Oval Copy 5" r="9.5" stroke="var(--stroke-0, #F4F6F7)" />
          </svg>
          <Group />
        </div>
      </div>
      <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[28px]" data-name="Component 67">
        <div className="relative shrink-0 size-[20px]" data-name="Menu">
          <div className="absolute inset-[29.02%_17.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-3.417px_-5.805px] mask-size-[20px_20px]" data-name="menu" style={{ maskImage: `url('${imgExpandMore}')` }}>
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1666 8.391">
              <path d={svgPaths.pb2a9c70} fill="var(--fill-0, #303030)" id="menu" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0 w-full">
      <Frame107 />
    </div>
  );
}

function Component32PxSocialBirdeye() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="32px/social/birdeye">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="32px/social/birdeye">
          <g id="Rectangle" />
          <path clipRule="evenodd" d={svgPaths.p2ddf8700} fill="var(--fill-0, #1976D2)" fillRule="evenodd" id="Fill 1" />
        </g>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-[#e5e9f0] content-stretch flex h-[52px] items-center justify-center px-[12px] py-[8px] relative shrink-0 w-[40px]">
      <div aria-hidden="true" className="absolute border-[#eaeaea] border-r border-solid inset-0 pointer-events-none" />
      <Component32PxSocialBirdeye />
    </div>
  );
}

function L1NavItem() {
  return (
    <div className="h-px relative rounded-[4px] shrink-0 w-full" data-name="L1_NAV_ITEM">
      <div className="flex flex-row items-end justify-center size-full">
        <div className="content-stretch flex items-end justify-center px-[4px] relative size-full">
          <div className="h-0 relative shrink-0 w-[20px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 1">
                <line id="Line 1" stroke="var(--stroke-0, #C7D6F6)" x2="20" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MainNav() {
  return (
    <div className="bg-[#e5e9f0] flex-[1_0_0] min-h-px min-w-px relative w-[40px]" data-name="Main Nav">
      <div aria-hidden="true" className="absolute border-[#eaeaea] border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-center px-[12px] py-[8px] relative size-full">
          <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[28px]" data-name="Navigation buttons">
            <div className="relative shrink-0 size-[20px]" data-name="Overview">
              <div className="absolute inset-[19.2%_22.08%_17.08%_22.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4.417px_-3.84px] mask-size-[20px_20px]" data-name="home" style={{ maskImage: `url('${imgExpandMore}')` }}>
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.1666 12.7435">
                  <path d={svgPaths.p3c83e900} fill="var(--fill-0, #303030)" id="home" />
                </svg>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[28px]" data-name="Navigation buttons">
            <div className="relative shrink-0 size-[20px]" data-name="Inbox">
              <div className="absolute inset-[12.08%_12.08%_18.67%_12.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.417px_-2.417px] mask-size-[20px_20px]" data-name="sms" style={{ maskImage: `url('${imgExpandMore}')` }}>
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.1666 13.85">
                  <path d={svgPaths.p16687400} fill="var(--fill-0, #303030)" id="sms" />
                </svg>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[28px]" data-name="Navigation buttons">
            <div className="relative shrink-0 size-[20px]" data-name="Listings">
              <div className="absolute inset-[12.08%_19.38%_14%_19.38%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-3.877px_-2.417px] mask-size-[20px_20px]" data-name="location_on" style={{ maskImage: `url('${imgExpandMore}')` }}>
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.2467 14.7836">
                  <path d={svgPaths.p1db22180} fill="var(--fill-0, #303030)" id="location_on" />
                </svg>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[28px]" data-name="Component 63">
            <div className="relative shrink-0 size-[20px]" data-name="Reviews">
              <div className="absolute inset-[16.82%_15.88%_18.2%_15.88%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-3.175px_-3.363px] mask-size-[20px_20px]" data-name="grade" style={{ maskImage: `url('${imgExpandMore}')` }}>
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.6492 12.9968">
                  <path d={svgPaths.p97a8100} fill="var(--fill-0, #303030)" id="grade" />
                </svg>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[28px]" data-name="Component 64">
            <div className="relative shrink-0 size-[20px]" data-name="Referrals">
              <div className="absolute inset-[7.16%_12.08%_12.08%_12.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.417px_-1.433px] mask-size-[20px_20px]" data-name="featured_seasonal_and_gifts" style={{ maskImage: `url('${imgExpandMore}')` }}>
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.1666 16.1506">
                  <path d={svgPaths.p3bb91c80} fill="var(--fill-0, #303030)" id="featured_seasonal_and_gifts" />
                </svg>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[28px]" data-name="Component 65">
            <div className="relative shrink-0 size-[20px]" data-name="Payments">
              <div className="absolute inset-[12.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.417px_-2.417px] mask-size-[20px_20px]" data-name="monetization_on" style={{ maskImage: `url('${imgExpandMore}')` }}>
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.1666 15.1666">
                  <path d={svgPaths.p3d180f80} fill="var(--fill-0, #303030)" id="monetization_on" />
                </svg>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[28px]" data-name="Component 66">
            <div className="relative shrink-0 size-[20px]" data-name="Appointments">
              <div className="absolute inset-[11.6%_17.08%_12.08%_17.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-3.417px_-2.321px] mask-size-[20px_20px]" data-name="calendar_month" style={{ maskImage: `url('${imgExpandMore}')` }}>
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1666 15.2628">
                  <path d={svgPaths.p1e88cfb0} fill="var(--fill-0, #303030)" id="calendar_month" />
                </svg>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[28px]" data-name="Component 67">
            <div className="relative shrink-0 size-[20px]" data-name="Social">
              <div className="absolute inset-[16.6%_11.6%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.321px_-3.321px] mask-size-[20px_20px]" data-name="workspaces" style={{ maskImage: `url('${imgExpandMore}')` }}>
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.3589 13.3589">
                  <path d={svgPaths.p210b2470} fill="var(--fill-0, #303030)" id="workspaces" />
                </svg>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[28px]" data-name="Component 68">
            <div className="relative shrink-0 size-[20px]" data-name="Surveys">
              <div className="absolute inset-[9.58%_17.08%_17.08%_17.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-3.417px_-1.917px] mask-size-[20px_20px]" data-name="assignment_turned_in" style={{ maskImage: `url('${imgExpandMore}')` }}>
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1666 14.6666">
                  <path d={svgPaths.p1271780} fill="var(--fill-0, #303030)" id="assignment_turned_in" />
                </svg>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[28px]" data-name="Component 69">
            <div className="relative shrink-0 size-[20px]" data-name="Ticketing">
              <div className="absolute inset-[12.56%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.513px_-2.513px] mask-size-[20px_20px]" data-name="shapes" style={{ maskImage: `url('${imgExpandMore}')` }}>
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.9743 14.9743">
                  <path d={svgPaths.p2af55f00} fill="var(--fill-0, #303030)" id="shapes" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-[#c7d6f6] content-stretch flex flex-col items-center justify-center overflow-clip p-[8px] relative rounded-[4px] shrink-0 size-[28px]" data-name="Component 70">
            <div className="relative shrink-0 size-[20px]" data-name="Contacts">
              <div className="absolute inset-[22.87%_13.33%_22.88%_13.33%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.665px_-4.575px] mask-size-[20px_20px]" data-name="group" style={{ maskImage: `url('${imgExpandMore}')` }}>
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6698 10.8485">
                  <path d={svgPaths.p1cc6aa00} fill="var(--fill-0, #303030)" id="group" />
                </svg>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[28px]" data-name="Component 71">
            <div className="relative shrink-0 size-[20px]" data-name="Campaigns">
              <div className="absolute inset-[20.51%_11.76%_20.67%_11.76%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.353px_-4.103px] mask-size-[20px_20px]" data-name="campaign" style={{ maskImage: `url('${imgExpandMore}')` }}>
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.2948 11.7626">
                  <path d={svgPaths.p2cdd75c0} fill="var(--fill-0, #303030)" id="campaign" />
                </svg>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[28px]" data-name="Component 72">
            <div className="relative shrink-0 size-[20px]" data-name="Reports">
              <div className="absolute inset-[12.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.417px_-2.417px] mask-size-[20px_20px]" data-name="pie_chart" style={{ maskImage: `url('${imgExpandMore}')` }}>
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.1666 15.1666">
                  <path d={svgPaths.p3f11bb00} fill="var(--fill-0, #303030)" id="pie_chart" />
                </svg>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[28px]" data-name="Component 73">
            <div className="relative shrink-0 size-[20px]" data-name="Insights">
              <div className="absolute inset-[12.08%_22.08%_11.76%_22.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4.417px_-2.417px] mask-size-[20px_20px]" data-name="lightbulb" style={{ maskImage: `url('${imgExpandMore}')` }}>
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.1667 15.2308">
                  <path d={svgPaths.p37c51900} fill="var(--fill-0, #303030)" id="lightbulb" />
                </svg>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[28px]" data-name="Component 74">
            <div className="relative shrink-0 size-[20px]" data-name="Competitors">
              <div className="absolute inset-[17.08%_14.58%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.917px_-3.417px] mask-size-[20px_20px]" data-name="leaderboard" style={{ maskImage: `url('${imgExpandMore}')` }}>
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.1666 13.1666">
                  <path d={svgPaths.paf11800} fill="var(--fill-0, #303030)" id="leaderboard" />
                </svg>
              </div>
            </div>
          </div>
          <L1NavItem />
          <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[28px]" data-name="Component 75">
            <div className="relative shrink-0 size-[20px]" data-name="Settings">
              <div className="absolute inset-[40%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-8px_-8px] mask-size-[20px_20px]" style={{ maskImage: `url('${imgExpandMore}')` }}>
                <div className="absolute inset-[-12.5%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
                    <circle cx="2.5" cy="2.5" id="Ellipse 2352" r="2" stroke="var(--stroke-0, #303030)" />
                  </svg>
                </div>
              </div>
              <div className="absolute inset-[12.08%_14.79%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.959px_-2.417px] mask-size-[20px_20px]" data-name="settings" style={{ maskImage: `url('${imgExpandMore}')` }}>
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.0821 15.1666">
                  <path d={svgPaths.p177c8400} fill="var(--fill-0, #303030)" id="settings" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[26px] relative shrink-0 text-[#212121] text-[18px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Contacts
      </p>
    </div>
  );
}

function Title() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip px-[24px] py-[13px] relative shrink-0 w-[230px]" data-name="Title">
      <Frame4 />
    </div>
  );
}

function Frame106() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative w-full">
          <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#212121] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Settings
          </p>
          <div className="relative shrink-0 size-[20px]" data-name="chevron_up">
            <div className="absolute inset-[37.53%_27.44%_37.4%_27.42%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.484px_-7.506px] mask-size-[20px_20px]" data-name="expand_less" style={{ maskImage: `url('${imgExpandMore}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.02811 5.01367">
                <path d={svgPaths.pddafd00} fill="var(--fill-0, #303030)" id="expand_less" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame110() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-full">
      <div className="relative shrink-0 w-full" data-name="Expanded tabs">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative w-full">
            <p className="flex-[1_0_0] font-['Roboto:Light',sans-serif] font-light leading-[20px] min-h-px min-w-px relative text-[#212121] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Custom fields
            </p>
          </div>
        </div>
      </div>
      <div className="relative shrink-0 w-full" data-name="Expanded tabs">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative w-full">
            <p className="flex-[1_0_0] font-['Roboto:Light',sans-serif] font-light leading-[20px] min-h-px min-w-px relative text-[#212121] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Tags
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavigationTabs() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-full" data-name="Navigation tabs">
      <Frame106 />
      <Frame110 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full">
      <div className="content-stretch flex flex-col gap-[4px] items-start px-[16px] py-[8px] relative size-full">
        <div className="bg-[#e5e9f0] relative rounded-[4px] shrink-0 w-full" data-name="Navigation tabs">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative w-full">
              <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#212121] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                All contacts
              </p>
            </div>
          </div>
        </div>
        <div className="relative shrink-0 w-full" data-name="Navigation tabs">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative w-full">
              <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#212121] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Lists & segments`}</p>
            </div>
          </div>
        </div>
        <NavigationTabs />
        <div className="bg-[#f2f4f7] opacity-0 relative rounded-[4px] shrink-0 w-full" data-name="Navigation tabs">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative w-full">
              <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#212121] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                Reports
              </p>
              <div className="relative shrink-0 size-[20px]" data-name="Size=20">
                <div className="absolute inset-[17.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-3.417px_-3.417px] mask-size-[20px_20px]" data-name="open_in_new" style={{ maskImage: `url('${imgExpandMore}')` }}>
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1666 13.1666">
                    <path d={svgPaths.p34162000} fill="var(--fill-0, #303030)" id="open_in_new" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SecondaryRailNav() {
  return (
    <div className="absolute bg-[#fafafa] content-stretch flex flex-col h-[900px] items-start left-[40px] top-0" data-name="Secondary Rail Nav">
      <div aria-hidden="true" className="absolute border-[#eaeaea] border-r border-solid inset-0 pointer-events-none" />
      <Title />
      <Frame2 />
    </div>
  );
}

function CursorPointinghand() {
  return (
    <div className="absolute inset-[2.98%_1.69%_1.59%_2.92%]" data-name="cursor / pointinghand">
      <div className="absolute inset-[-9.01%_-23.59%_-35.2%_-23.59%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.0582 22.0181">
          <g filter="url(#filter0_d_93_9969)" id="cursor / pointinghand">
            <path clipRule="evenodd" d={svgPaths.p2102dd00} fill="var(--fill-0, white)" fillRule="evenodd" id="cursor" />
            <path clipRule="evenodd" d={svgPaths.p11e58260} fillRule="evenodd" id="cursor_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
            <path d="M14.5027 13.632V10.173" id="cursor_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="0.75" />
            <path d={svgPaths.p387012c0} id="cursor_4" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="0.75" />
            <path d={svgPaths.pf538e00} id="cursor_5" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="0.75" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="22.0181" id="filter0_d_93_9969" width="21.0582" x="-5.96046e-08" y="5.96046e-08">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="2" />
              <feGaussianBlur stdDeviation="1.5" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.402655 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_93_9969" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_93_9969" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Cursor() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[16px] left-[calc(50%-0.5px)] top-1/2 w-[15px]" data-name="Cursor">
      <CursorPointinghand />
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[4px] items-center px-[12px] relative w-full">
          <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="Single select tile">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex items-center justify-center pl-[12px] pr-[8px] py-[4px] relative w-full">
                <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#555] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  View details
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="Single select tile">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex items-center justify-center pl-[12px] pr-[8px] py-[4px] relative w-full">
                <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#555] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  Quick send
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="Single select tile">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex items-center justify-center pl-[12px] pr-[8px] py-[4px] relative w-full">
                <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#555] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  Edit
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[#f5f5f5] relative rounded-[4px] shrink-0 w-full" data-name="Single select tile">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex items-center justify-center pl-[12px] pr-[8px] py-[4px] relative w-full">
                <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#555] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  Add to List
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="Single select tile">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex items-center justify-center pl-[12px] pr-[8px] py-[4px] relative w-full">
                <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#555] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  Contact journey
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="Single select tile">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex items-center justify-center pl-[12px] pr-[8px] py-[4px] relative w-full">
                <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#555] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  Delete
                </p>
              </div>
            </div>
          </div>
          <div className="absolute left-[106px] overflow-clip size-[24px] top-[100px]" data-name="Cursor">
            <Cursor />
          </div>
        </div>
      </div>
    </div>
  );
}

function DropdownMenus() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[4px] items-center left-[1261px] overflow-clip py-[12px] rounded-[4px] shadow-[0px_4px_8px_0px_rgba(33,33,33,0.18)] top-[358px] w-[150px]" data-name="Dropdown menus">
      <Frame />
    </div>
  );
}

export default function ContactsLandingPage() {
  return (
    <div className="relative size-full" data-name="Contacts landing page">
      <Frame1 />
      <div className="absolute bg-white h-[52px] left-[270px] top-0 w-[1169px]" data-name="Top Nav">
        <div className="content-stretch flex flex-col items-end justify-center overflow-clip px-[24px] py-[12px] relative rounded-[inherit] size-full">
          <Frame5 />
        </div>
        <div aria-hidden="true" className="absolute border-[#e9e9eb] border-b border-solid inset-0 pointer-events-none" />
      </div>
      <div className="absolute content-stretch flex flex-col h-[900px] items-start left-0 top-0 w-[40px]" data-name="Primary Rail Nav">
        <Frame3 />
        <MainNav />
      </div>
      <SecondaryRailNav />
      <DropdownMenus />
    </div>
  );
}