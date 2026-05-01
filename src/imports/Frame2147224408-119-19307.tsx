import svgPaths from "./svg-ncmgjyn8sg";
import imgBitmapCopy1 from "figma:asset/07f55cb4dc9076729807bf360ffceba0f970bd1f.png";
import { imgPlayArrow, imgClose, imgExpandMore, imgBitmapCopy, imgMoreVert, imgMoreVert1, imgExpandMore1 } from "./svg-32wcb";

function Frame80() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#555] text-[12px] w-full">Trigger</p>
    </div>
  );
}

function ExpandAll() {
  return (
    <div className="relative size-[24px]" data-name="expand_all">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="expand_all">
          <mask height="24" id="mask0_119_22784" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_119_22784)">
            <path d={svgPaths.p4156c00} fill="var(--fill-0, #303030)" id="expand_all_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame81() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="relative rounded-[4px] shrink-0 size-[24px]" data-name="play_arrow">
        <div className="absolute inset-[27.72%_27.96%_27.72%_35.42%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.667px_-4.435px] mask-size-[16px_16px]" data-name="play_arrow" style={{ maskImage: `url('${imgPlayArrow}')` }}>
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.7885 10.696">
            <path d={svgPaths.p1a38c480} fill="var(--fill-0, #303030)" id="play_arrow" />
          </svg>
        </div>
      </div>
      <div className="flex items-center justify-center relative shrink-0 size-[24px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <ExpandAll />
        </div>
      </div>
      <div className="relative shrink-0 size-[24px]" data-name="close">
        <div className="absolute inset-[27.42%_27.42%_27.49%_27.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-6.598px_-6.581px] mask-size-[24px_24px]" data-name="close" style={{ maskImage: `url('${imgPlayArrow}')` }}>
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.8214 10.8214">
            <path d={svgPaths.p12d177f0} fill="var(--fill-0, #303030)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame61() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] h-[54px] items-center shrink-0 sticky top-0 w-[328px]">
      <Frame80 />
      <Frame81 />
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex font-normal gap-[4px] h-[18px] items-center leading-[1.5] relative shrink-0 text-[12px] whitespace-nowrap" data-name="Label">
      <p className="font-['Inter:Regular',sans-serif] not-italic relative shrink-0 text-[#212121]">Trigger name</p>
      <p className="font-['Roboto:Regular',sans-serif] relative shrink-0 text-[#de1b0c]" style={{ fontVariationSettings: "'wdth' 100" }}>
        *
      </p>
    </div>
  );
}

function Field() {
  return (
    <div className="bg-[#f5f5f5] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Field">
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative size-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px not-italic relative text-[#555] text-[12px]">When a new review is received or updated</p>
        </div>
      </div>
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] font-normal gap-[4px] items-center leading-[1.5] min-h-px min-w-px relative text-[12px] whitespace-nowrap" data-name="Label">
      <p className="font-['Inter:Regular',sans-serif] not-italic relative shrink-0 text-[#212121]">Description</p>
      <p className="font-['Roboto:Regular',sans-serif] relative shrink-0 text-[#de1b0c]" style={{ fontVariationSettings: "'wdth' 100" }}>
        *
      </p>
    </div>
  );
}

function LabelCharacterCount() {
  return (
    <div className="content-stretch flex gap-[4px] h-[18px] items-center relative shrink-0 w-full" data-name="Label + Character count">
      <Label1 />
    </div>
  );
}

function IconsAndCta() {
  return <div className="absolute bottom-0 content-stretch flex items-center justify-between left-[0.23%] right-[-0.23%]" data-name="Icons and CTA" />;
}

function IconsResizeCta() {
  return (
    <div className="absolute bottom-[20px] content-stretch flex flex-col h-[32px] items-end justify-center left-[2.73%] right-[0.23%]" data-name="Icons, Resize CTA">
      <IconsAndCta />
    </div>
  );
}

function Field1() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] w-full" data-name="Field">
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[4px] items-start justify-center px-[12px] py-[6px] relative size-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px not-italic relative text-[#212121] text-[12px] w-full">Agent triggers on new or updated reviews across all sources and locations</p>
          <IconsResizeCta />
        </div>
      </div>
    </div>
  );
}

function Frame69() {
  return (
    <div className="col-1 content-stretch flex gap-[3px] items-center ml-0 mt-0 relative row-1 w-[98px]">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#8f8f8f] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Create with AI
      </p>
      <div className="relative shrink-0 size-[12px]" data-name="AI agent">
        <div className="absolute aspect-[29/29] bg-[rgba(217,217,217,0)] left-0 right-0 top-0" />
        <div className="-translate-y-1/2 absolute aspect-[19/23] left-[8.33%] right-[8.33%] top-1/2" data-name="􀆿">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 12.1053">
            <path d={svgPaths.p17b75900} fill="var(--fill-0, #6834B7)" id="ô¿" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ControlToggleOn() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[16px] left-1/2 top-1/2 w-[32px]" data-name="control/toggle/on">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 16">
        <g id="control/toggle/on">
          <g clipPath="url(#clip0_119_22977)">
            <path clipRule="evenodd" d={svgPaths.p10f89500} fill="var(--fill-0, #CCCCCC)" fillRule="evenodd" id="Rectangle 1 Copy" />
            <g filter="url(#filter0_d_119_22977)" id="Rectangle 1 Copy_2">
              <rect fill="var(--fill-0, white)" height="12" rx="6" width="12" x="2" y="2" />
            </g>
          </g>
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="26" id="filter0_d_119_22977" width="26" x="-5" y="-3">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feMorphology in="SourceAlpha" operator="dilate" radius="2" result="effect1_dropShadow_119_22977" />
            <feOffset dy="2" />
            <feGaussianBlur stdDeviation="2.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.129412 0 0 0 0 0.129412 0 0 0 0 0.129412 0 0 0 0.1 0" />
            <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_119_22977" />
            <feBlend in="SourceGraphic" in2="effect1_dropShadow_119_22977" mode="normal" result="shape" />
          </filter>
          <clipPath id="clip0_119_22977">
            <rect fill="white" height="16" rx="8" width="32" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Group4() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] opacity-0 place-items-start relative shrink-0">
      <Frame69 />
      <button className="block col-1 cursor-pointer h-[16px] ml-[89px] mt-px overflow-clip relative row-1 w-[32px]" data-name="Toggle switch">
        <ControlToggleOn />
      </button>
    </div>
  );
}

function CheckboxWithLabel() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Checkbox - with label">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#212121] text-[12px] whitespace-nowrap">Filter conditions</p>
      <Group4 />
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[12px] pr-[8px] py-[8px] relative w-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px not-italic relative text-[#212121] text-[12px]">Review source</p>
          <div className="opacity-0 relative shrink-0 size-[20px]" data-name="close">
            <div className="absolute inset-[27.42%_27.42%_27.49%_27.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.498px_-5.484px] mask-size-[20px_20px]" data-name="close" style={{ maskImage: `url('${imgClose}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.01783 9.01783">
                <path d={svgPaths.p84a1972} fill="var(--fill-0, #303030)" />
              </svg>
            </div>
          </div>
          <div className="relative shrink-0 size-[20px]" data-name="chevron_down">
            <div className="absolute inset-[37.46%_27.42%_37.45%_27.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.498px_-7.492px] mask-size-[20px_20px]" data-name="expand_more" style={{ maskImage: `url('${imgClose}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.01782 5.0176">
                <path d={svgPaths.p5ccaa80} fill="var(--fill-0, #303030)" id="expand_more" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[12px] pr-[8px] py-[8px] relative w-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px not-italic relative text-[#212121] text-[12px]">is equal to</p>
          <div className="opacity-0 relative shrink-0 size-[20px]" data-name="close">
            <div className="absolute inset-[27.42%_27.42%_27.49%_27.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.498px_-5.484px] mask-size-[20px_20px]" data-name="close" style={{ maskImage: `url('${imgClose}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.01783 9.01783">
                <path d={svgPaths.p84a1972} fill="var(--fill-0, #303030)" />
              </svg>
            </div>
          </div>
          <div className="relative shrink-0 size-[20px]" data-name="chevron_down">
            <div className="absolute inset-[37.46%_27.42%_37.45%_27.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.498px_-7.492px] mask-size-[20px_20px]" data-name="expand_more" style={{ maskImage: `url('${imgClose}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.01782 5.0176">
                <path d={svgPaths.p5ccaa80} fill="var(--fill-0, #303030)" id="expand_more" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[12px] pr-[8px] py-[8px] relative w-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px not-italic relative text-[#212121] text-[12px]">Google</p>
          <div className="opacity-0 relative shrink-0 size-[20px]" data-name="close">
            <div className="absolute inset-[27.42%_27.42%_27.49%_27.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.498px_-5.484px] mask-size-[20px_20px]" data-name="close" style={{ maskImage: `url('${imgClose}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.01783 9.01783">
                <path d={svgPaths.p84a1972} fill="var(--fill-0, #303030)" />
              </svg>
            </div>
          </div>
          <div className="relative shrink-0 size-[20px]" data-name="chevron_down">
            <div className="absolute inset-[37.46%_27.42%_37.45%_27.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.498px_-7.492px] mask-size-[20px_20px]" data-name="expand_more" style={{ maskImage: `url('${imgClose}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.01782 5.0176">
                <path d={svgPaths.p5ccaa80} fill="var(--fill-0, #303030)" id="expand_more" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame52() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Dropdown - Regular">
        <Frame />
      </div>
      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Dropdown - Regular">
        <Frame1 />
      </div>
      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Dropdown - Regular">
        <Frame2 />
      </div>
    </div>
  );
}

function Frame51() {
  return (
    <div className="col-1 content-stretch flex items-center justify-between ml-0 mt-0 relative row-1 w-[304px]">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#8f8f8f] text-[12px] text-ellipsis whitespace-nowrap">
        <p className="leading-[1.5] overflow-hidden">AND</p>
      </div>
      <div className="opacity-0 relative shrink-0 size-[20px]" data-name="edit">
        <div className="absolute inset-[14.58%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.917px_-2.917px] mask-size-[20px_20px]" data-name="edit" style={{ maskImage: `url('${imgClose}')` }}>
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.1667 14.1667">
            <path d={svgPaths.p21380e00} fill="var(--fill-0, #303030)" id="edit" />
          </svg>
        </div>
      </div>
      <div className="absolute left-[26px] size-[16px] top-[2px]" data-name="chevron_down">
        <div className="absolute inset-[37.46%_27.42%_37.45%_27.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4.399px_-5.994px] mask-size-[16px_16px]" data-name="expand_more" style={{ maskImage: `url('${imgExpandMore}')` }}>
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.21426 4.01408">
            <path d={svgPaths.p568fa80} fill="var(--fill-0, #303030)" id="expand_more" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 w-full">
      <Frame51 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[12px] pr-[8px] py-[8px] relative w-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px not-italic relative text-[#212121] text-[12px]">Review source</p>
          <div className="opacity-0 relative shrink-0 size-[20px]" data-name="close">
            <div className="absolute inset-[27.42%_27.42%_27.49%_27.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.498px_-5.484px] mask-size-[20px_20px]" data-name="close" style={{ maskImage: `url('${imgClose}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.01783 9.01783">
                <path d={svgPaths.p84a1972} fill="var(--fill-0, #303030)" />
              </svg>
            </div>
          </div>
          <div className="relative shrink-0 size-[20px]" data-name="chevron_down">
            <div className="absolute inset-[37.46%_27.42%_37.45%_27.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.498px_-7.492px] mask-size-[20px_20px]" data-name="expand_more" style={{ maskImage: `url('${imgClose}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.01782 5.0176">
                <path d={svgPaths.p5ccaa80} fill="var(--fill-0, #303030)" id="expand_more" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[12px] pr-[8px] py-[8px] relative w-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px not-italic relative text-[#212121] text-[12px]">is equal to</p>
          <div className="opacity-0 relative shrink-0 size-[20px]" data-name="close">
            <div className="absolute inset-[27.42%_27.42%_27.49%_27.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.498px_-5.484px] mask-size-[20px_20px]" data-name="close" style={{ maskImage: `url('${imgClose}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.01783 9.01783">
                <path d={svgPaths.p84a1972} fill="var(--fill-0, #303030)" />
              </svg>
            </div>
          </div>
          <div className="relative shrink-0 size-[20px]" data-name="chevron_down">
            <div className="absolute inset-[37.46%_27.42%_37.45%_27.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.498px_-7.492px] mask-size-[20px_20px]" data-name="expand_more" style={{ maskImage: `url('${imgClose}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.01782 5.0176">
                <path d={svgPaths.p5ccaa80} fill="var(--fill-0, #303030)" id="expand_more" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[12px] pr-[8px] py-[8px] relative w-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px not-italic relative text-[#212121] text-[12px]">Birdeye</p>
          <div className="opacity-0 relative shrink-0 size-[20px]" data-name="close">
            <div className="absolute inset-[27.42%_27.42%_27.49%_27.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.498px_-5.484px] mask-size-[20px_20px]" data-name="close" style={{ maskImage: `url('${imgClose}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.01783 9.01783">
                <path d={svgPaths.p84a1972} fill="var(--fill-0, #303030)" />
              </svg>
            </div>
          </div>
          <div className="relative shrink-0 size-[20px]" data-name="chevron_down">
            <div className="absolute inset-[37.46%_27.42%_37.45%_27.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.498px_-7.492px] mask-size-[20px_20px]" data-name="expand_more" style={{ maskImage: `url('${imgClose}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.01782 5.0176">
                <path d={svgPaths.p5ccaa80} fill="var(--fill-0, #303030)" id="expand_more" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame53() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Group1 />
      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Dropdown - Regular">
        <Frame3 />
      </div>
      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Dropdown - Regular">
        <Frame4 />
      </div>
      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Dropdown - Regular">
        <Frame5 />
      </div>
    </div>
  );
}

function Frame55() {
  return (
    <div className="col-1 content-stretch flex items-center justify-between ml-0 mt-0 relative row-1 w-[271px]">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] overflow-hidden relative shrink-0 text-[#f2f4f7] text-[12px] text-ellipsis tracking-[-0.24px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[18px] overflow-hidden">OR</p>
      </div>
      <div className="opacity-0 relative shrink-0 size-[20px]" data-name="edit">
        <div className="absolute inset-[14.58%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.917px_-2.917px] mask-size-[20px_20px]" data-name="edit" style={{ maskImage: `url('${imgClose}')` }}>
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.1667 14.1667">
            <path d={svgPaths.p21380e00} fill="var(--fill-0, #303030)" id="edit" />
          </svg>
        </div>
      </div>
      <div className="absolute left-[304px] size-[16px] top-[9px]" data-name="chevron_down">
        <div className="absolute inset-[37.46%_27.42%_37.45%_27.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4.399px_-5.994px] mask-size-[16px_16px]" data-name="expand_more" style={{ maskImage: `url('${imgExpandMore}')` }}>
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.21426 4.01408">
            <path d={svgPaths.p568fa80} fill="var(--fill-0, #303030)" id="expand_more" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
      <Frame55 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[12px] pr-[8px] py-[8px] relative w-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px not-italic relative text-[#212121] text-[12px]">Review rating</p>
          <div className="opacity-0 relative shrink-0 size-[20px]" data-name="close">
            <div className="absolute inset-[27.42%_27.42%_27.49%_27.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.498px_-5.484px] mask-size-[20px_20px]" data-name="close" style={{ maskImage: `url('${imgClose}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.01783 9.01783">
                <path d={svgPaths.p84a1972} fill="var(--fill-0, #303030)" />
              </svg>
            </div>
          </div>
          <div className="relative shrink-0 size-[20px]" data-name="chevron_down">
            <div className="absolute inset-[37.46%_27.42%_37.45%_27.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.498px_-7.492px] mask-size-[20px_20px]" data-name="expand_more" style={{ maskImage: `url('${imgClose}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.01782 5.0176">
                <path d={svgPaths.p5ccaa80} fill="var(--fill-0, #303030)" id="expand_more" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[12px] pr-[8px] py-[8px] relative w-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px not-italic relative text-[#212121] text-[12px]">is equal to</p>
          <div className="opacity-0 relative shrink-0 size-[20px]" data-name="close">
            <div className="absolute inset-[27.42%_27.42%_27.49%_27.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.498px_-5.484px] mask-size-[20px_20px]" data-name="close" style={{ maskImage: `url('${imgClose}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.01783 9.01783">
                <path d={svgPaths.p84a1972} fill="var(--fill-0, #303030)" />
              </svg>
            </div>
          </div>
          <div className="relative shrink-0 size-[20px]" data-name="chevron_down">
            <div className="absolute inset-[37.46%_27.42%_37.45%_27.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.498px_-7.492px] mask-size-[20px_20px]" data-name="expand_more" style={{ maskImage: `url('${imgClose}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.01782 5.0176">
                <path d={svgPaths.p5ccaa80} fill="var(--fill-0, #303030)" id="expand_more" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[12px] pr-[8px] py-[8px] relative w-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px not-italic relative text-[#212121] text-[12px]">4 star</p>
          <div className="opacity-0 relative shrink-0 size-[20px]" data-name="close">
            <div className="absolute inset-[27.42%_27.42%_27.49%_27.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.498px_-5.484px] mask-size-[20px_20px]" data-name="close" style={{ maskImage: `url('${imgClose}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.01783 9.01783">
                <path d={svgPaths.p84a1972} fill="var(--fill-0, #303030)" />
              </svg>
            </div>
          </div>
          <div className="relative shrink-0 size-[20px]" data-name="chevron_down">
            <div className="absolute inset-[37.46%_27.42%_37.45%_27.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.498px_-7.492px] mask-size-[20px_20px]" data-name="expand_more" style={{ maskImage: `url('${imgClose}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.01782 5.0176">
                <path d={svgPaths.p5ccaa80} fill="var(--fill-0, #303030)" id="expand_more" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Group7() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Group2 />
      <div className="col-1 content-stretch flex flex-col gap-[4px] items-start ml-0 mt-[28px] relative row-1 w-[271px]" data-name="Dropdown - Regular">
        <Frame6 />
      </div>
      <div className="col-1 content-stretch flex flex-col gap-[4px] items-start ml-0 mt-[72px] relative row-1 w-[271px]" data-name="Dropdown - Regular">
        <Frame7 />
      </div>
      <div className="col-1 content-stretch flex flex-col gap-[4px] items-start ml-0 mt-[116px] relative row-1 w-[271px]" data-name="Dropdown - Regular">
        <Frame8 />
      </div>
    </div>
  );
}

function Frame56() {
  return (
    <div className="col-1 content-stretch flex items-center justify-between ml-0 mt-0 relative row-1 w-[271px]">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#8f8f8f] text-[12px] text-ellipsis whitespace-nowrap">
        <p className="leading-[1.5] overflow-hidden">AND</p>
      </div>
      <div className="opacity-0 relative shrink-0 size-[20px]" data-name="edit">
        <div className="absolute inset-[14.58%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.917px_-2.917px] mask-size-[20px_20px]" data-name="edit" style={{ maskImage: `url('${imgClose}')` }}>
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.1667 14.1667">
            <path d={svgPaths.p21380e00} fill="var(--fill-0, #303030)" id="edit" />
          </svg>
        </div>
      </div>
      <div className="absolute left-[304px] size-[16px] top-[9px]" data-name="chevron_down">
        <div className="absolute inset-[37.46%_27.42%_37.45%_27.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4.399px_-5.994px] mask-size-[16px_16px]" data-name="expand_more" style={{ maskImage: `url('${imgExpandMore}')` }}>
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.21426 4.01408">
            <path d={svgPaths.p568fa80} fill="var(--fill-0, #303030)" id="expand_more" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group3() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
      <Frame56 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[12px] pr-[8px] py-[8px] relative w-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px not-italic relative text-[#212121] text-[12px]">Review rating</p>
          <div className="opacity-0 relative shrink-0 size-[20px]" data-name="close">
            <div className="absolute inset-[27.42%_27.42%_27.49%_27.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.498px_-5.484px] mask-size-[20px_20px]" data-name="close" style={{ maskImage: `url('${imgClose}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.01783 9.01783">
                <path d={svgPaths.p84a1972} fill="var(--fill-0, #303030)" />
              </svg>
            </div>
          </div>
          <div className="relative shrink-0 size-[20px]" data-name="chevron_down">
            <div className="absolute inset-[37.46%_27.42%_37.45%_27.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.498px_-7.492px] mask-size-[20px_20px]" data-name="expand_more" style={{ maskImage: `url('${imgClose}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.01782 5.0176">
                <path d={svgPaths.p5ccaa80} fill="var(--fill-0, #303030)" id="expand_more" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[12px] pr-[8px] py-[8px] relative w-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px not-italic relative text-[#212121] text-[12px]">is equal to</p>
          <div className="opacity-0 relative shrink-0 size-[20px]" data-name="close">
            <div className="absolute inset-[27.42%_27.42%_27.49%_27.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.498px_-5.484px] mask-size-[20px_20px]" data-name="close" style={{ maskImage: `url('${imgClose}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.01783 9.01783">
                <path d={svgPaths.p84a1972} fill="var(--fill-0, #303030)" />
              </svg>
            </div>
          </div>
          <div className="relative shrink-0 size-[20px]" data-name="chevron_down">
            <div className="absolute inset-[37.46%_27.42%_37.45%_27.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.498px_-7.492px] mask-size-[20px_20px]" data-name="expand_more" style={{ maskImage: `url('${imgClose}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.01782 5.0176">
                <path d={svgPaths.p5ccaa80} fill="var(--fill-0, #303030)" id="expand_more" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[12px] pr-[8px] py-[8px] relative w-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px not-italic relative text-[#212121] text-[12px]">5 star</p>
          <div className="opacity-0 relative shrink-0 size-[20px]" data-name="close">
            <div className="absolute inset-[27.42%_27.42%_27.49%_27.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.498px_-5.484px] mask-size-[20px_20px]" data-name="close" style={{ maskImage: `url('${imgClose}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.01783 9.01783">
                <path d={svgPaths.p84a1972} fill="var(--fill-0, #303030)" />
              </svg>
            </div>
          </div>
          <div className="relative shrink-0 size-[20px]" data-name="chevron_down">
            <div className="absolute inset-[37.46%_27.42%_37.45%_27.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.498px_-7.492px] mask-size-[20px_20px]" data-name="expand_more" style={{ maskImage: `url('${imgClose}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.01782 5.0176">
                <path d={svgPaths.p5ccaa80} fill="var(--fill-0, #303030)" id="expand_more" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Group8() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Group3 />
      <div className="col-1 content-stretch flex flex-col gap-[4px] items-start ml-0 mt-[28px] relative row-1 w-[271px]" data-name="Dropdown - Regular">
        <Frame9 />
      </div>
      <div className="col-1 content-stretch flex flex-col gap-[4px] items-start ml-0 mt-[72px] relative row-1 w-[271px]" data-name="Dropdown - Regular">
        <Frame10 />
      </div>
      <div className="col-1 content-stretch flex flex-col gap-[4px] items-start ml-0 mt-[116px] relative row-1 w-[271px]" data-name="Dropdown - Regular">
        <Frame11 />
      </div>
    </div>
  );
}

function AddCircle() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="add_circle">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="add_circle">
          <mask height="20" id="mask0_1_7175" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="20" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="20" id="Bounding box" width="20" />
          </mask>
          <g mask="url(#mask0_1_7175)">
            <path d={svgPaths.p109c6400} fill="var(--fill-0, #1976D2)" id="add_circle_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function AddCircle1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="add_circle">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="add_circle">
          <mask height="20" id="mask0_1_7175" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="20" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="20" id="Bounding box" width="20" />
          </mask>
          <g mask="url(#mask0_1_7175)">
            <path d={svgPaths.p109c6400} fill="var(--fill-0, #1976D2)" id="add_circle_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame68() {
  return (
    <div className="content-stretch flex gap-[141px] items-start relative shrink-0">
      <div className="content-stretch flex gap-[4px] h-[40px] items-center relative shrink-0">
        <AddCircle />
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#1976d2] text-[12px] whitespace-nowrap">Add condition</p>
      </div>
      <div className="content-stretch flex gap-[4px] h-[40px] items-center opacity-0 relative shrink-0">
        <AddCircle1 />
        <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#1976d2] text-[14px] tracking-[-0.28px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Edit logic
        </p>
      </div>
    </div>
  );
}

function Frame57() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame68 />
    </div>
  );
}

function Frame54() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-end relative shrink-0 w-full">
      <Group7 />
      <Group8 />
      <Frame57 />
      <div className="absolute left-[21px] size-[16px] top-[4px]" data-name="chevron_down">
        <div className="absolute inset-[37.46%_27.42%_37.45%_27.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4.399px_-5.994px] mask-size-[16px_16px]" data-name="expand_more" style={{ maskImage: `url('${imgExpandMore}')` }}>
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.21426 4.01408">
            <path d={svgPaths.p568fa80} fill="var(--fill-0, #303030)" id="expand_more" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ConditionCard() {
  return (
    <div className="bg-[#f2f4f7] relative rounded-[8px] shrink-0 w-full" data-name="Condition card">
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[12px] relative w-full">
        <Frame52 />
        <Frame53 />
        <Frame54 />
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-[14px] not-italic overflow-hidden text-[#8f8f8f] text-[12px] text-ellipsis top-[324px] whitespace-nowrap">
          <p className="leading-[1.5] overflow-hidden">OR</p>
        </div>
      </div>
    </div>
  );
}

function TextArea() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[706px] items-start relative shrink-0 w-[328px]" data-name="Text area">
      <CheckboxWithLabel />
      <ConditionCard />
      <div className="absolute h-[279.5px] left-[22px] top-[364px] w-0">
        <div className="absolute inset-[-0.18%_-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 280.5">
            <path d="M0.5 0.5V280" id="Vector 378" stroke="var(--stroke-0, #CCCCCC)" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame59() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[251px]">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#8f8f8f] text-[12px] text-ellipsis whitespace-nowrap">
        <p className="leading-[1.5] overflow-hidden">IF</p>
      </div>
      <div className="opacity-0 relative shrink-0 size-[20px]" data-name="edit">
        <div className="absolute inset-[14.58%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.917px_-2.917px] mask-size-[20px_20px]" data-name="edit" style={{ maskImage: `url('${imgClose}')` }}>
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.1667 14.1667">
            <path d={svgPaths.p21380e00} fill="var(--fill-0, #303030)" id="edit" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame58() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame59 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#212121] text-[12px] w-[309px]">Review.source == (“Google” || “Birdeye”);</p>
    </div>
  );
}

function ConditionCard1() {
  return (
    <div className="bg-[#f2f4f7] relative rounded-[8px] shrink-0 w-full" data-name="Condition card">
      <div className="content-stretch flex flex-col items-start px-[9px] py-[8px] relative w-full">
        <Frame58 />
      </div>
    </div>
  );
}

function Frame66() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-[328px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#212121] text-[12px] w-full">Preview</p>
      <ConditionCard1 />
    </div>
  );
}

function Frame67() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0">
      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Text field - Standard">
        <Label />
        <Field />
      </div>
      <div className="content-stretch flex flex-col gap-[4px] h-[100px] items-start relative shrink-0 w-[328px]" data-name="Text area">
        <LabelCharacterCount />
        <Field1 />
      </div>
      <TextArea />
      <Frame66 />
    </div>
  );
}

function AiAgentUi() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[1153px] items-start overflow-clip pb-[24px] pt-[2px] px-[16px] right-0 top-[121px] w-[360px]" data-name="AI agent UI">
      <Frame61 />
      <div className="absolute bg-white bottom-[531px] content-stretch flex gap-[8px] items-center left-[16px] pb-[20px] pt-[12px] w-[320px]" data-name="Right panel buttons" />
      <Frame67 />
      <div className="absolute bottom-0 content-stretch flex gap-[8px] items-center left-[18px] py-[20px] w-[325px]" data-name="Right panel buttons">
        <div className="bg-[#1976d2] flex-[1_0_0] h-[36px] min-h-px min-w-px relative rounded-[8px]" data-name="Button">
          <div className="flex flex-row items-center justify-center size-full">
            <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[8px] relative size-full">
              <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-white tracking-[-0.28px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                Save
              </p>
            </div>
          </div>
        </div>
      </div>
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

function Frame12() {
  return (
    <div className="bg-[#e0e5eb] content-stretch flex h-[52px] items-center justify-center px-[12px] py-[8px] relative shrink-0 w-[56px]">
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
    <div className="bg-[#e0e5eb] flex-[1_0_0] min-h-px min-w-px relative w-[56px]" data-name="Main Nav">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-center px-[12px] py-[8px] relative size-full">
          <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[28px]" data-name="Navigation buttons">
            <div className="relative shrink-0 size-[20px]" data-name="Overview">
              <div className="absolute inset-[19.2%_22.08%_17.08%_22.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4.417px_-3.84px] mask-size-[20px_20px]" data-name="home" style={{ maskImage: `url('${imgClose}')` }}>
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.1666 12.7435">
                  <path d={svgPaths.p3c83e900} fill="var(--fill-0, #303030)" id="home" />
                </svg>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[28px]" data-name="Navigation buttons">
            <div className="relative shrink-0 size-[20px]" data-name="Inbox">
              <div className="absolute inset-[12.08%_12.08%_18.67%_12.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.417px_-2.417px] mask-size-[20px_20px]" data-name="sms" style={{ maskImage: `url('${imgClose}')` }}>
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.1666 13.85">
                  <path d={svgPaths.p16687400} fill="var(--fill-0, #303030)" id="sms" />
                </svg>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[28px]" data-name="Navigation buttons">
            <div className="relative shrink-0 size-[20px]" data-name="Listings">
              <div className="absolute inset-[12.08%_19.38%_14%_19.38%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-3.877px_-2.417px] mask-size-[20px_20px]" data-name="location_on" style={{ maskImage: `url('${imgClose}')` }}>
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.2467 14.7836">
                  <path d={svgPaths.p1db22180} fill="var(--fill-0, #303030)" id="location_on" />
                </svg>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[28px]" data-name="Component 63">
            <button className="block cursor-pointer relative shrink-0 size-[20px]" data-name="Reviews">
              <div className="absolute inset-[16.82%_15.88%_18.2%_15.88%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-3.175px_-3.363px] mask-size-[20px_20px]" data-name="grade" style={{ maskImage: `url('${imgClose}')` }}>
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.6492 12.9968">
                  <path d={svgPaths.p97a8100} fill="var(--fill-0, #303030)" id="grade" />
                </svg>
              </div>
            </button>
          </div>
          <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[28px]" data-name="Component 64">
            <div className="relative shrink-0 size-[20px]" data-name="Referrals">
              <div className="absolute inset-[7.16%_12.08%_12.08%_12.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.417px_-1.433px] mask-size-[20px_20px]" data-name="featured_seasonal_and_gifts" style={{ maskImage: `url('${imgClose}')` }}>
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.1666 16.1506">
                  <path d={svgPaths.p3bb91c80} fill="var(--fill-0, #303030)" id="featured_seasonal_and_gifts" />
                </svg>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[28px]" data-name="Component 65">
            <div className="relative shrink-0 size-[20px]" data-name="Payments">
              <div className="absolute inset-[12.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.417px_-2.417px] mask-size-[20px_20px]" data-name="monetization_on" style={{ maskImage: `url('${imgClose}')` }}>
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.1666 15.1666">
                  <path d={svgPaths.p3d180f80} fill="var(--fill-0, #303030)" id="monetization_on" />
                </svg>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[28px]" data-name="Component 66">
            <div className="relative shrink-0 size-[20px]" data-name="Appointments">
              <div className="absolute inset-[11.6%_17.08%_12.08%_17.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-3.417px_-2.321px] mask-size-[20px_20px]" data-name="calendar_month" style={{ maskImage: `url('${imgClose}')` }}>
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1666 15.2628">
                  <path d={svgPaths.p1e88cfb0} fill="var(--fill-0, #303030)" id="calendar_month" />
                </svg>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[28px]" data-name="Component 67">
            <div className="relative shrink-0 size-[20px]" data-name="Social">
              <div className="absolute inset-[16.6%_11.6%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.321px_-3.321px] mask-size-[20px_20px]" data-name="workspaces" style={{ maskImage: `url('${imgClose}')` }}>
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.3589 13.3589">
                  <path d={svgPaths.p210b2470} fill="var(--fill-0, #303030)" id="workspaces" />
                </svg>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[28px]" data-name="Component 68">
            <div className="relative shrink-0 size-[20px]" data-name="Surveys">
              <div className="absolute inset-[9.58%_17.08%_17.08%_17.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-3.417px_-1.917px] mask-size-[20px_20px]" data-name="assignment_turned_in" style={{ maskImage: `url('${imgClose}')` }}>
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1666 14.6666">
                  <path d={svgPaths.p1271780} fill="var(--fill-0, #303030)" id="assignment_turned_in" />
                </svg>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[28px]" data-name="Component 69">
            <div className="relative shrink-0 size-[20px]" data-name="Ticketing">
              <div className="absolute inset-[12.56%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.513px_-2.513px] mask-size-[20px_20px]" data-name="shapes" style={{ maskImage: `url('${imgClose}')` }}>
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.9743 14.9743">
                  <path d={svgPaths.p2af55f00} fill="var(--fill-0, #303030)" id="shapes" />
                </svg>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[28px]" data-name="Component 70">
            <div className="relative shrink-0 size-[20px]" data-name="Contacts">
              <div className="absolute inset-[22.87%_13.33%_22.88%_13.33%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.665px_-4.575px] mask-size-[20px_20px]" data-name="group" style={{ maskImage: `url('${imgClose}')` }}>
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6698 10.8485">
                  <path d={svgPaths.p1cc6aa00} fill="var(--fill-0, #303030)" id="group" />
                </svg>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[28px]" data-name="Component 71">
            <div className="relative shrink-0 size-[20px]" data-name="Campaigns">
              <div className="absolute inset-[20.51%_11.76%_20.67%_11.76%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.353px_-4.103px] mask-size-[20px_20px]" data-name="campaign" style={{ maskImage: `url('${imgClose}')` }}>
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.2948 11.7626">
                  <path d={svgPaths.p2cdd75c0} fill="var(--fill-0, #303030)" id="campaign" />
                </svg>
              </div>
            </div>
          </div>
          <div className="content-stretch flex items-center justify-center overflow-clip p-[8px] relative rounded-[4px] shrink-0 size-[28px]" data-name="Component 72">
            <div className="relative shrink-0 size-[20px]" data-name="Marketing Automation">
              <div className="absolute bg-[#d9d9d9] inset-0 opacity-0 rounded-[4px]" />
              <div className="-translate-y-1/2 absolute aspect-[18/18] left-[5%] right-[5%] top-1/2" data-name="Vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
                  <path d={svgPaths.p22a01700} fill="var(--fill-0, #303030)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[28px]" data-name="Component 76">
            <div className="relative shrink-0 size-[20px]" data-name="Reports">
              <div className="absolute inset-[12.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.417px_-2.417px] mask-size-[20px_20px]" data-name="pie_chart" style={{ maskImage: `url('${imgClose}')` }}>
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.1666 15.1666">
                  <path d={svgPaths.p3f11bb00} fill="var(--fill-0, #303030)" id="pie_chart" />
                </svg>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[28px]" data-name="Component 73">
            <div className="relative shrink-0 size-[20px]" data-name="Insights">
              <div className="absolute inset-[12.08%_22.08%_11.76%_22.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4.417px_-2.417px] mask-size-[20px_20px]" data-name="lightbulb" style={{ maskImage: `url('${imgClose}')` }}>
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.1667 15.2308">
                  <path d={svgPaths.p37c51900} fill="var(--fill-0, #303030)" id="lightbulb" />
                </svg>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[28px]" data-name="Component 74">
            <div className="relative shrink-0 size-[20px]" data-name="Competitors">
              <div className="absolute inset-[17.08%_14.58%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.917px_-3.417px] mask-size-[20px_20px]" data-name="leaderboard" style={{ maskImage: `url('${imgClose}')` }}>
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.1666 13.1666">
                  <path d={svgPaths.paf11800} fill="var(--fill-0, #303030)" id="leaderboard" />
                </svg>
              </div>
            </div>
          </div>
          <L1NavItem />
          <div className="bg-[#c7d6f6] content-stretch flex flex-col items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="Component 75">
            <div className="relative shrink-0 size-[20px]" data-name="Settings">
              <div className="absolute inset-[40%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-8px_-8px] mask-size-[20px_20px]" style={{ maskImage: `url('${imgClose}')` }}>
                <div className="absolute inset-[-12.5%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
                    <circle cx="2.5" cy="2.5" id="Ellipse 2352" r="2" stroke="var(--stroke-0, #303030)" />
                  </svg>
                </div>
              </div>
              <div className="absolute inset-[12.08%_14.79%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.959px_-2.417px] mask-size-[20px_20px]" data-name="settings" style={{ maskImage: `url('${imgClose}')` }}>
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

function Frame13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[26px] not-italic relative shrink-0 text-[#212121] text-[18px] whitespace-nowrap">Reviews AI</p>
    </div>
  );
}

function LogoAndTitle() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[80px] top-[13px] w-[229px]" data-name="logo and title">
      <Frame13 />
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="col-1 ml-0 mt-0 relative row-1 size-[17.5px]" data-name="Oval Copy 8">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.5 17.5">
          <circle cx="8.75" cy="8.75" fill="var(--fill-0, #D8D8D8)" id="Oval Copy 8" r="8.75" />
        </svg>
      </div>
      <div className="col-1 h-[29.531px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[1.094px_2.188px] mask-size-[17.5px_17.5px] ml-[-1.09px] mt-[-2.19px] relative row-1 w-[19.688px]" data-name="Bitmap Copy" style={{ maskImage: `url('${imgBitmapCopy}')` }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgBitmapCopy1} />
        </div>
      </div>
    </div>
  );
}

function Avatar1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Avatar">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Avatar">
          <g id="ô¿">
            <path d={svgPaths.p28830840} fill="var(--fill-0, #8350CE)" />
            <path d={svgPaths.p28830840} fill="url(#paint0_linear_1_12668)" />
          </g>
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_12668" x1="4.57812" x2="15.418" y1="9.98262" y2="9.98262">
            <stop stopColor="#9970D7" />
            <stop offset="1" stopColor="#1565B4" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function Avatar() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Avatar">
      <Avatar1 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="content-stretch flex flex-col items-center justify-center opacity-0 p-[8px] relative shrink-0 size-[28px]" data-name="Component 65">
        <div className="relative shrink-0 size-[20px]" data-name="Settings">
          <div className="absolute inset-[40%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-8px_-8px] mask-size-[20px_20px]" style={{ maskImage: `url('${imgClose}')` }}>
            <div className="absolute inset-[-12.5%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
                <circle cx="2.5" cy="2.5" id="Ellipse 2352" r="2" stroke="var(--stroke-0, #303030)" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-[12.08%_14.79%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.959px_-2.417px] mask-size-[20px_20px]" data-name="settings" style={{ maskImage: `url('${imgClose}')` }}>
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
          <div className="absolute inset-[12.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.417px_-2.417px] mask-size-[20px_20px]" data-name="help" style={{ maskImage: `url('${imgClose}')` }}>
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.1666 15.1666">
              <path d={svgPaths.p32bf4c0} fill="var(--fill-0, #303030)" id="help" />
            </svg>
          </div>
        </div>
      </div>
      <Group />
      <div className="h-[6px] shrink-0 w-[2px]" />
      <div className="content-stretch flex items-center pl-[4px] pr-[8px] py-[4px] relative rounded-[8px] shrink-0" data-name="Hover" style={{ backgroundImage: "linear-gradient(90deg, rgb(240, 241, 245) 0%, rgb(240, 241, 245) 100%), linear-gradient(90deg, rgb(131, 80, 206) 0%, rgb(131, 80, 206) 100%)" }}>
        <div aria-hidden="true" className="absolute border border-[#e8def6] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <Avatar />
        <div className="bg-clip-text flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[transparent] text-center tracking-[-0.24px] whitespace-nowrap" style={{ backgroundImage: "linear-gradient(90deg, rgb(153, 112, 215) 0%, rgb(21, 101, 180) 100%), linear-gradient(90deg, rgb(131, 80, 206) 0%, rgb(131, 80, 206) 100%)" }}>
          <p className="leading-[18px]">Ask BirdGPT</p>
        </div>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0 w-full">
      <Frame17 />
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute contents left-0 top-0">
      <div className="absolute content-stretch flex flex-col h-[1539px] items-start left-0 top-0 w-[56px]" data-name="Primary Rail Nav">
        <Frame12 />
        <MainNav />
      </div>
      <LogoAndTitle />
      <div className="absolute bg-[#e0e5eb] h-[56px] right-[-12px] top-0 w-[1152px]" data-name="Top Nav">
        <div className="content-stretch flex flex-col items-end justify-center overflow-clip px-[24px] py-[12px] relative rounded-[inherit] size-full">
          <Frame15 />
        </div>
        <div aria-hidden="true" className="absolute border-[#e9e9eb] border-b border-solid inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Frame22() {
  return <div className="bg-[#f2f4f7] h-[2108px] rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-[1400px]" />;
}

function Frame23() {
  return (
    <div className="absolute content-stretch flex items-start justify-end left-[88px] top-[120px] w-[1287px]">
      <Frame22 />
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

function Frame21() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13.53px] not-italic relative shrink-0 text-[#212121] text-[9.47px] tracking-[-0.1894px] whitespace-nowrap">Review response agent replying autonomously</p>
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex flex-col gap-[4.935px] items-start justify-center relative shrink-0">
      <Frame21 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[8.118px] not-italic relative shrink-0 text-[#555] text-[7.44px] whitespace-nowrap">All locations</p>
    </div>
  );
}

function ElectricBolt() {
  return (
    <div className="absolute inset-[8.33%]" data-name="electric_bolt">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.45 16.45">
        <g id="electric_bolt">
          <mask height="17" id="mask0_119_22823" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="18" x="-1" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="16.45" id="Bounding box" width="16.45" x="-0.000117302" y="4.76837e-06" />
          </mask>
          <g mask="url(#mask0_119_22823)">
            <path d={svgPaths.p14cfe9f0} fill="var(--fill-0, #F88078)" id="electric_bolt_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[3.29px] items-center min-h-px min-w-px relative">
      <div className="relative shrink-0 size-[19.74px]" data-name="Left icon">
        <div className="absolute aspect-[28/28] left-0 right-0 top-0">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <g id="Ellipse 2" />
          </svg>
        </div>
        <ElectricBolt />
      </div>
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[13.53px] min-h-px min-w-px not-italic relative text-[#212121] text-[9.47px] tracking-[-0.1894px]">Trigger</p>
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex gap-[6.58px] items-center relative shrink-0 w-full">
      <Frame35 />
      <div className="relative shrink-0 size-[19.74px]" data-name="more_vert">
        <div className="absolute inset-[23.05%_44.58%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-10.7px_-5.531px] mask-size-[24px_24px]" data-name="more_vert" style={{ maskImage: `url('${imgMoreVert}')` }}>
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.13846 10.6418">
            <path d={svgPaths.p266ebb00} fill="var(--fill-0, #303030)" id="more_vert" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame71() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pl-[16.45px] relative w-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[12.177px] min-h-px min-w-px not-italic relative text-[#8f8f8f] text-[8.12px] tracking-[-0.1624px]">Agent triggers on new or updated reviews across all sources and locations</p>
        </div>
      </div>
    </div>
  );
}

function Frame70() {
  return (
    <div className="content-stretch flex flex-col gap-[3.29px] items-start relative shrink-0 w-full">
      <ol className="block font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#555] text-[9.47px] tracking-[-0.1894px] w-full" start="1">
        <li className="ms-[14.205000000000002px] whitespace-pre-wrap">
          <span className="leading-[13.53px]">When a new review is received or updated</span>
        </li>
      </ol>
      <Frame71 />
    </div>
  );
}

function EditorCards() {
  return (
    <div className="bg-white relative rounded-[6.58px] shrink-0 w-full" data-name="Editor cards">
      <div aria-hidden="true" className="absolute border-[#1976d2] border-[0.822px] border-solid inset-0 pointer-events-none rounded-[6.58px] shadow-[0px_1.645px_9.87px_0px_rgba(33,33,33,0.06)]" />
      <div className="content-stretch flex flex-col gap-[16.45px] items-start p-[16.45px] relative w-full">
        <Frame32 />
        <Frame70 />
      </div>
    </div>
  );
}

function Ballot() {
  return (
    <div className="absolute left-0 size-[19.74px] top-0" data-name="ballot">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.74 19.74">
        <g id="ballot">
          <mask height="20" id="mask0_119_22861" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="20" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="19.74" id="Bounding box" width="19.74" />
          </mask>
          <g mask="url(#mask0_119_22861)">
            <path d={svgPaths.p26eb1380} fill="var(--fill-0, #37A248)" id="ballot_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[3.29px] items-center min-h-px min-w-px relative">
      <div className="relative shrink-0 size-[19.74px]" data-name="Icons">
        <div className="absolute aspect-[28/28] left-0 right-0 top-0">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <g id="Ellipse 2" />
          </svg>
        </div>
        <Ballot />
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13.53px] not-italic relative shrink-0 text-[#212121] text-[9.47px] tracking-[-0.1894px] w-[246.75px]">Task</p>
    </div>
  );
}

function Ai() {
  return (
    <div className="relative shrink-0 size-[19.74px]" data-name="ai">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="ai" opacity="0">
          <g id="Vector">
            <path d={svgPaths.p2e18ff00} fill="var(--fill-0, #6834B7)" />
            <path d={svgPaths.p329e3d00} fill="var(--fill-0, #6834B7)" />
            <path clipRule="evenodd" d={svgPaths.p3ceeff80} fill="var(--fill-0, #6834B7)" fillRule="evenodd" />
            <path d={svgPaths.pcb08700} fill="var(--fill-0, #6834B7)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function ControlToggle() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[13.16px] left-1/2 top-1/2 w-[26.32px]" data-name="control/toggle">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.32 13.16">
        <g id="control/toggle">
          <g clipPath="url(#clip0_119_22905)">
            <path clipRule="evenodd" d={svgPaths.p14b1f00} fill="var(--fill-0, #1976D2)" fillRule="evenodd" id="Rectangle 1 Copy" />
            <g filter="url(#filter0_d_119_22905)" id="Rectangle 1 Copy_2">
              <rect fill="var(--fill-0, white)" height="9.87" rx="4.935" width="9.87" x="14.805" y="2.065" />
            </g>
          </g>
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="21.385" id="filter0_d_119_22905" width="21.385" x="9.0475" y="-2.0475">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feMorphology in="SourceAlpha" operator="dilate" radius="1.645" result="effect1_dropShadow_119_22905" />
            <feOffset dy="1.645" />
            <feGaussianBlur stdDeviation="2.05625" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.129412 0 0 0 0 0.129412 0 0 0 0 0.129412 0 0 0 0.1 0" />
            <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_119_22905" />
            <feBlend in="SourceGraphic" in2="effect1_dropShadow_119_22905" mode="normal" result="shape" />
          </filter>
          <clipPath id="clip0_119_22905">
            <rect fill="white" height="13.16" rx="6.58" width="26.32" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex gap-[6.58px] items-center relative shrink-0 w-full">
      <Frame36 />
      <Ai />
      <div className="h-[19.74px] opacity-0 relative shrink-0 w-[24.675px]" data-name="more_vert">
        <div className="absolute inset-[23.05%_44.58%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-10.7px_-5.531px] mask-size-[24px_24px]" data-name="more_vert" style={{ maskImage: `url('${imgMoreVert1}')` }}>
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.67307 10.6418">
            <path d={svgPaths.p37707c00} fill="var(--fill-0, #303030)" id="more_vert" />
          </svg>
        </div>
      </div>
      <button className="absolute block cursor-pointer h-[13.16px] left-[245.1px] overflow-clip top-[3.29px] w-[26.32px]" data-name="Toggle switch">
        <ControlToggle />
      </button>
      <div className="relative shrink-0 size-[19.74px]" data-name="more_vert">
        <div className="absolute inset-[23.05%_44.58%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-10.7px_-5.531px] mask-size-[24px_24px]" data-name="more_vert" style={{ maskImage: `url('${imgMoreVert}')` }}>
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.13846 10.6418">
            <path d={svgPaths.p266ebb00} fill="var(--fill-0, #303030)" id="more_vert" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame73() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pl-[16.45px] relative w-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[12.177px] min-h-px min-w-px not-italic relative text-[#8f8f8f] text-[8.12px] tracking-[-0.1624px]">Extract product or service specific feedback from the review</p>
        </div>
      </div>
    </div>
  );
}

function Frame72() {
  return (
    <div className="content-stretch flex flex-col gap-[3.29px] items-start relative shrink-0 w-full">
      <ol className="block font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#212121] text-[9.47px] w-full" start="2">
        <li className="ms-[14.205000000000002px] whitespace-pre-wrap">
          <span className="leading-[13.53px]">Identify relevant mentions in the reivew</span>
        </li>
      </ol>
      <Frame73 />
    </div>
  );
}

function EditorCards1() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[16.45px] items-start p-[16.45px] relative rounded-[6.58px] shadow-[0px_1.645px_9.87px_0px_rgba(33,33,33,0.06)] shrink-0 w-[329px]" data-name="Editor cards">
      <Frame33 />
      <Frame72 />
    </div>
  );
}

function Ballot1() {
  return (
    <div className="absolute left-0 size-[19.74px] top-0" data-name="ballot">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.74 19.74">
        <g id="ballot">
          <mask height="20" id="mask0_119_22861" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="20" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="19.74" id="Bounding box" width="19.74" />
          </mask>
          <g mask="url(#mask0_119_22861)">
            <path d={svgPaths.p26eb1380} fill="var(--fill-0, #37A248)" id="ballot_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[3.29px] items-center min-h-px min-w-px relative">
      <div className="relative shrink-0 size-[19.74px]" data-name="Icons">
        <div className="absolute aspect-[28/28] left-0 right-0 top-0">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <g id="Ellipse 2" />
          </svg>
        </div>
        <Ballot1 />
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13.53px] not-italic relative shrink-0 text-[#212121] text-[9.47px] tracking-[-0.1894px] w-[246.75px]">Task</p>
    </div>
  );
}

function Ai1() {
  return (
    <div className="relative shrink-0 size-[19.74px]" data-name="ai">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="ai" opacity="0">
          <g id="Vector">
            <path d={svgPaths.p2e18ff00} fill="var(--fill-0, #6834B7)" />
            <path d={svgPaths.p329e3d00} fill="var(--fill-0, #6834B7)" />
            <path clipRule="evenodd" d={svgPaths.p3ceeff80} fill="var(--fill-0, #6834B7)" fillRule="evenodd" />
            <path d={svgPaths.pcb08700} fill="var(--fill-0, #6834B7)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function ControlToggle1() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[13.16px] left-1/2 top-1/2 w-[26.32px]" data-name="control/toggle">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.32 13.16">
        <g id="control/toggle">
          <g clipPath="url(#clip0_119_22905)">
            <path clipRule="evenodd" d={svgPaths.p14b1f00} fill="var(--fill-0, #1976D2)" fillRule="evenodd" id="Rectangle 1 Copy" />
            <g filter="url(#filter0_d_119_22905)" id="Rectangle 1 Copy_2">
              <rect fill="var(--fill-0, white)" height="9.87" rx="4.935" width="9.87" x="14.805" y="2.065" />
            </g>
          </g>
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="21.385" id="filter0_d_119_22905" width="21.385" x="9.0475" y="-2.0475">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feMorphology in="SourceAlpha" operator="dilate" radius="1.645" result="effect1_dropShadow_119_22905" />
            <feOffset dy="1.645" />
            <feGaussianBlur stdDeviation="2.05625" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.129412 0 0 0 0 0.129412 0 0 0 0 0.129412 0 0 0 0.1 0" />
            <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_119_22905" />
            <feBlend in="SourceGraphic" in2="effect1_dropShadow_119_22905" mode="normal" result="shape" />
          </filter>
          <clipPath id="clip0_119_22905">
            <rect fill="white" height="13.16" rx="6.58" width="26.32" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex gap-[6.58px] items-center relative shrink-0 w-full">
      <Frame37 />
      <Ai1 />
      <div className="h-[19.74px] opacity-0 relative shrink-0 w-[24.675px]" data-name="more_vert">
        <div className="absolute inset-[23.05%_44.58%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-10.7px_-5.531px] mask-size-[24px_24px]" data-name="more_vert" style={{ maskImage: `url('${imgMoreVert1}')` }}>
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.67307 10.6418">
            <path d={svgPaths.p37707c00} fill="var(--fill-0, #303030)" id="more_vert" />
          </svg>
        </div>
      </div>
      <button className="absolute block cursor-pointer h-[13.16px] left-[245.1px] overflow-clip top-[3.29px] w-[26.32px]" data-name="Toggle switch">
        <ControlToggle1 />
      </button>
      <div className="relative shrink-0 size-[19.74px]" data-name="more_vert">
        <div className="absolute inset-[23.05%_44.58%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-10.7px_-5.531px] mask-size-[24px_24px]" data-name="more_vert" style={{ maskImage: `url('${imgMoreVert}')` }}>
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.13846 10.6418">
            <path d={svgPaths.p266ebb00} fill="var(--fill-0, #303030)" id="more_vert" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame75() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pl-[16.45px] relative w-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[12.177px] min-h-px min-w-px not-italic relative text-[#8f8f8f] text-[8.12px] tracking-[-0.1624px]">Detect city, location, staff, address or any custom location data mentioned in the review</p>
        </div>
      </div>
    </div>
  );
}

function Frame74() {
  return (
    <div className="content-stretch flex flex-col gap-[3.29px] items-start relative shrink-0 w-full">
      <ol className="block font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#212121] text-[9.47px] w-full" start="3">
        <li className="ms-[14.205000000000002px] whitespace-pre-wrap">
          <span className="leading-[13.53px]">Identify custom tokens</span>
        </li>
      </ol>
      <Frame75 />
    </div>
  );
}

function EditorCards2() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[16.45px] items-start p-[16.45px] relative rounded-[6.58px] shadow-[0px_1.645px_9.87px_0px_rgba(33,33,33,0.06)] shrink-0 w-[329px]" data-name="Editor cards">
      <Frame34 />
      <Frame74 />
    </div>
  );
}

function Ballot2() {
  return (
    <div className="absolute left-0 size-[19.74px] top-0" data-name="ballot">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.74 19.74">
        <g id="ballot">
          <mask height="20" id="mask0_119_22861" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="20" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="19.74" id="Bounding box" width="19.74" />
          </mask>
          <g mask="url(#mask0_119_22861)">
            <path d={svgPaths.p26eb1380} fill="var(--fill-0, #37A248)" id="ballot_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[3.29px] items-center min-h-px min-w-px relative">
      <div className="relative shrink-0 size-[19.74px]" data-name="Icons">
        <div className="absolute aspect-[28/28] left-0 right-0 top-0">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <g id="Ellipse 2" />
          </svg>
        </div>
        <Ballot2 />
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13.53px] not-italic relative shrink-0 text-[#212121] text-[9.47px] tracking-[-0.1894px] w-[246.75px]">Task</p>
    </div>
  );
}

function Ai2() {
  return (
    <div className="relative shrink-0 size-[19.74px]" data-name="ai">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="ai" opacity="0">
          <g id="Vector">
            <path d={svgPaths.p2e18ff00} fill="var(--fill-0, #6834B7)" />
            <path d={svgPaths.p329e3d00} fill="var(--fill-0, #6834B7)" />
            <path clipRule="evenodd" d={svgPaths.p3ceeff80} fill="var(--fill-0, #6834B7)" fillRule="evenodd" />
            <path d={svgPaths.pcb08700} fill="var(--fill-0, #6834B7)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function ControlToggle2() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[13.16px] left-1/2 top-1/2 w-[26.32px]" data-name="control/toggle">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.32 13.16">
        <g id="control/toggle">
          <g clipPath="url(#clip0_119_22905)">
            <path clipRule="evenodd" d={svgPaths.p14b1f00} fill="var(--fill-0, #1976D2)" fillRule="evenodd" id="Rectangle 1 Copy" />
            <g filter="url(#filter0_d_119_22905)" id="Rectangle 1 Copy_2">
              <rect fill="var(--fill-0, white)" height="9.87" rx="4.935" width="9.87" x="14.805" y="2.065" />
            </g>
          </g>
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="21.385" id="filter0_d_119_22905" width="21.385" x="9.0475" y="-2.0475">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feMorphology in="SourceAlpha" operator="dilate" radius="1.645" result="effect1_dropShadow_119_22905" />
            <feOffset dy="1.645" />
            <feGaussianBlur stdDeviation="2.05625" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.129412 0 0 0 0 0.129412 0 0 0 0 0.129412 0 0 0 0.1 0" />
            <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_119_22905" />
            <feBlend in="SourceGraphic" in2="effect1_dropShadow_119_22905" mode="normal" result="shape" />
          </filter>
          <clipPath id="clip0_119_22905">
            <rect fill="white" height="13.16" rx="6.58" width="26.32" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame38() {
  return (
    <div className="content-stretch flex gap-[6.58px] items-center relative shrink-0 w-full">
      <Frame39 />
      <Ai2 />
      <div className="h-[19.74px] opacity-0 relative shrink-0 w-[24.675px]" data-name="more_vert">
        <div className="absolute inset-[23.05%_44.58%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-10.7px_-5.531px] mask-size-[24px_24px]" data-name="more_vert" style={{ maskImage: `url('${imgMoreVert1}')` }}>
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.67307 10.6418">
            <path d={svgPaths.p37707c00} fill="var(--fill-0, #303030)" id="more_vert" />
          </svg>
        </div>
      </div>
      <button className="absolute block cursor-pointer h-[13.16px] left-[245.1px] overflow-clip top-[3.29px] w-[26.32px]" data-name="Toggle switch">
        <ControlToggle2 />
      </button>
      <div className="relative shrink-0 size-[19.74px]" data-name="more_vert">
        <div className="absolute inset-[23.05%_44.58%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-10.7px_-5.531px] mask-size-[24px_24px]" data-name="more_vert" style={{ maskImage: `url('${imgMoreVert}')` }}>
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.13846 10.6418">
            <path d={svgPaths.p266ebb00} fill="var(--fill-0, #303030)" id="more_vert" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame77() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pl-[16.45px] relative w-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[12.177px] min-h-px min-w-px not-italic relative text-[#8f8f8f] text-[8.12px] tracking-[-0.1624px]">Generate a contextual response based on the review content, identified mentions and custom tokens</p>
        </div>
      </div>
    </div>
  );
}

function Frame76() {
  return (
    <div className="content-stretch flex flex-col gap-[3.29px] items-start relative shrink-0 w-full">
      <ol className="block font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#212121] text-[9.47px] w-full" start="4">
        <li className="ms-[14.205000000000002px] whitespace-pre-wrap">
          <span className="leading-[13.53px]">Generate response</span>
        </li>
      </ol>
      <Frame77 />
    </div>
  );
}

function EditorCards3() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[16.45px] items-start p-[16.45px] relative rounded-[6.58px] shadow-[0px_1.645px_9.87px_0px_rgba(33,33,33,0.06)] shrink-0 w-[329px]" data-name="Editor cards">
      <Frame38 />
      <Frame76 />
    </div>
  );
}

function Ballot3() {
  return (
    <div className="absolute left-0 size-[19.74px] top-0" data-name="ballot">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.74 19.74">
        <g id="ballot">
          <mask height="20" id="mask0_119_22861" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="20" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="19.74" id="Bounding box" width="19.74" />
          </mask>
          <g mask="url(#mask0_119_22861)">
            <path d={svgPaths.p26eb1380} fill="var(--fill-0, #37A248)" id="ballot_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[3.29px] items-center min-h-px min-w-px relative">
      <div className="relative shrink-0 size-[19.74px]" data-name="Icons">
        <div className="absolute aspect-[28/28] left-0 right-0 top-0">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <g id="Ellipse 2" />
          </svg>
        </div>
        <Ballot3 />
      </div>
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[16.45px] relative shrink-0 text-[#212121] text-[11.51px] tracking-[-0.2302px] w-[246.75px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Task
      </p>
    </div>
  );
}

function Ai3() {
  return (
    <div className="relative shrink-0 size-[19.74px]" data-name="ai">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="ai" opacity="0">
          <g id="Vector">
            <path d={svgPaths.p2e18ff00} fill="var(--fill-0, #6834B7)" />
            <path d={svgPaths.p329e3d00} fill="var(--fill-0, #6834B7)" />
            <path clipRule="evenodd" d={svgPaths.p3ceeff80} fill="var(--fill-0, #6834B7)" fillRule="evenodd" />
            <path d={svgPaths.pcb08700} fill="var(--fill-0, #6834B7)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function ControlToggle3() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[13.16px] left-1/2 top-1/2 w-[26.32px]" data-name="control/toggle">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.32 13.16">
        <g id="control/toggle">
          <g clipPath="url(#clip0_119_22905)">
            <path clipRule="evenodd" d={svgPaths.p14b1f00} fill="var(--fill-0, #1976D2)" fillRule="evenodd" id="Rectangle 1 Copy" />
            <g filter="url(#filter0_d_119_22905)" id="Rectangle 1 Copy_2">
              <rect fill="var(--fill-0, white)" height="9.87" rx="4.935" width="9.87" x="14.805" y="2.065" />
            </g>
          </g>
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="21.385" id="filter0_d_119_22905" width="21.385" x="9.0475" y="-2.0475">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feMorphology in="SourceAlpha" operator="dilate" radius="1.645" result="effect1_dropShadow_119_22905" />
            <feOffset dy="1.645" />
            <feGaussianBlur stdDeviation="2.05625" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.129412 0 0 0 0 0.129412 0 0 0 0 0.129412 0 0 0 0.1 0" />
            <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_119_22905" />
            <feBlend in="SourceGraphic" in2="effect1_dropShadow_119_22905" mode="normal" result="shape" />
          </filter>
          <clipPath id="clip0_119_22905">
            <rect fill="white" height="13.16" rx="6.58" width="26.32" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex gap-[6.58px] items-center relative shrink-0 w-full">
      <Frame41 />
      <Ai3 />
      <div className="h-[19.74px] opacity-0 relative shrink-0 w-[24.675px]" data-name="more_vert">
        <div className="absolute inset-[23.05%_44.58%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-10.7px_-5.531px] mask-size-[24px_24px]" data-name="more_vert" style={{ maskImage: `url('${imgMoreVert1}')` }}>
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.67307 10.6418">
            <path d={svgPaths.p37707c00} fill="var(--fill-0, #303030)" id="more_vert" />
          </svg>
        </div>
      </div>
      <button className="absolute block cursor-pointer h-[13.16px] left-[245.1px] overflow-clip top-[3.29px] w-[26.32px]" data-name="Toggle switch">
        <ControlToggle3 />
      </button>
      <div className="relative shrink-0 size-[19.74px]" data-name="more_vert">
        <div className="absolute inset-[23.05%_44.58%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-10.7px_-5.531px] mask-size-[24px_24px]" data-name="more_vert" style={{ maskImage: `url('${imgMoreVert}')` }}>
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.13846 10.6418">
            <path d={svgPaths.p266ebb00} fill="var(--fill-0, #303030)" id="more_vert" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame79() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pl-[16.45px] relative w-full">
          <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[14.805px] min-h-px min-w-px relative text-[#8f8f8f] text-[9.87px] tracking-[-0.1974px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Reply to the review using the generated response
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame78() {
  return (
    <div className="content-stretch flex flex-col gap-[3.29px] items-start relative shrink-0 w-full">
      <ol className="block font-['Roboto:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[#212121] text-[11.51px] w-full" start="5" style={{ fontVariationSettings: "'wdth' 100" }}>
        <li className="ms-[17.265px] whitespace-pre-wrap">
          <span className="leading-[16.45px]">Send a review response</span>
        </li>
      </ol>
      <Frame79 />
    </div>
  );
}

function EditorCards4() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[16.45px] items-start p-[16.45px] relative rounded-[6.58px] shadow-[0px_1.645px_9.87px_0px_rgba(33,33,33,0.06)] shrink-0 w-[329px]" data-name="Editor cards">
      <Frame40 />
      <Frame78 />
    </div>
  );
}

function Spam() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="SPAM">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.805px] relative shrink-0 text-[#555] text-[9.87px] text-center tracking-[-0.1974px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        End
      </p>
    </div>
  );
}

function ToggleIcons() {
  return (
    <div className="bg-[#e0e5eb] content-stretch flex items-center justify-center px-[8px] relative rounded-[4px] shrink-0 size-[24px]" data-name="Toggle icons">
      <div className="relative shrink-0 size-[16px]" data-name="arrow_right">
        <div className="absolute inset-[13.03%_24.84%_12.46%_24.86%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.085px_-3.974px] mask-size-[16px_16px]" data-name="arrow_cool_down" style={{ maskImage: `url('${imgExpandMore}')` }}>
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.04824 11.9217">
            <path d={svgPaths.p279a9d00} fill="var(--fill-0, #303030)" id="arrow_cool_down" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ToggleIcons1() {
  return (
    <div className="bg-[#e0e5eb] content-stretch flex items-center justify-center px-[8px] relative rounded-[4px] shrink-0 size-[24px]" data-name="Toggle icons">
      <div className="flex items-center justify-center relative shrink-0 size-[16px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <div className="relative size-[16px]" data-name="arrow_right">
            <div className="absolute inset-[13.03%_24.84%_12.46%_24.86%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.085px_-3.974px] mask-size-[16px_16px]" data-name="arrow_cool_down" style={{ maskImage: `url('${imgExpandMore}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.04824 11.9217">
                <path d={svgPaths.p279a9d00} fill="var(--fill-0, #303030)" id="arrow_cool_down" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToggleWebAndMobile() {
  return (
    <div className="bg-[#e0e5eb] content-stretch flex gap-[4px] h-[36px] items-center justify-center px-[8px] relative rounded-[4px] shrink-0" data-name="Toggle web and mobile">
      <ToggleIcons />
      <ToggleIcons1 />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#e0e5eb] content-stretch flex items-center justify-center p-[8px] relative rounded-[4px] shrink-0 size-[36px]" data-name="Button">
      <div className="relative shrink-0 size-[20px]" data-name="play_arrow">
        <div className="absolute inset-[27.72%_27.96%_27.72%_35.42%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.667px_-4.435px] mask-size-[16px_16px]" data-name="play_arrow" style={{ maskImage: `url('${imgClose}')` }}>
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.32375 8.91333">
            <path d={svgPaths.p2571c880} fill="var(--fill-0, #303030)" id="play_arrow" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame62() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[202px]">
      <ToggleWebAndMobile />
      <div className="bg-[#e0e5eb] content-stretch flex gap-[8px] h-[36px] items-center justify-center pl-[12px] pr-[8px] py-[8px] relative rounded-[4px] shrink-0" data-name="Zoom in & out">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#555] text-[14px] tracking-[-0.28px] whitespace-nowrap">100%</p>
        <div className="relative shrink-0 size-[20px]" data-name="chevron_down">
          <div className="absolute inset-[37.46%_27.42%_37.45%_27.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.498px_-7.492px] mask-size-[20px_20px]" data-name="expand_more" style={{ maskImage: `url('${imgClose}')` }}>
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.01782 5.0176">
              <path d={svgPaths.p5ccaa80} fill="var(--fill-0, #303030)" id="expand_more" />
            </svg>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="Configure">
        <Button />
      </div>
    </div>
  );
}

function Frame82() {
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

function Frame83() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[88px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic opacity-70 relative shrink-0 text-[#212121] text-[13px] w-[68px]">{` Manually `}</p>
    </div>
  );
}

function Frame16() {
  return <div className="absolute content-stretch flex gap-[4px] h-[32px] items-center justify-end right-0 top-[2px]" />;
}

function Field2() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] w-full" data-name="Field">
      <div aria-hidden="true" className="absolute border border-[#e5e9f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative size-full">
          <div className="relative shrink-0 size-[20px]" data-name="search">
            <div className="absolute inset-[16.6%_17.68%_17.84%_16.68%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-3.337px_-3.321px] mask-size-[20px_20px]" data-name="search" style={{ maskImage: `url('${imgClose}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1274 13.1105">
                <path d={svgPaths.p38b33c00} fill="var(--fill-0, #303030)" id="search" />
              </svg>
            </div>
          </div>
          <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#8f8f8f] text-[14px] tracking-[-0.28px]">
            <p className="leading-[20px]">Search</p>
          </div>
          <Frame16 />
        </div>
      </div>
    </div>
  );
}

function SearchFieldWeb() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[36px] items-start justify-center relative shrink-0 w-full" data-name="Search field / Web">
      <Field2 />
    </div>
  );
}

function Frame63() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#212121] text-[14px] tracking-[-0.28px] w-[269px]">Trigger</p>
      <div className="relative shrink-0 size-[20px]" data-name="chevron_up">
        <div className="absolute inset-[37.53%_27.44%_37.4%_27.42%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.484px_-7.506px] mask-size-[20px_20px]" data-name="expand_less" style={{ maskImage: `url('${imgClose}')` }}>
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.02811 5.01367">
            <path d={svgPaths.pddafd00} fill="var(--fill-0, #303030)" id="expand_less" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame43() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#212121] text-[14px] tracking-[-0.28px]">Schedule-based</p>
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative">
      <Frame43 />
    </div>
  );
}

function Frame44() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
      <div className="relative shrink-0 size-[24px]" data-name="Reviews">
        <div className="absolute inset-[16.82%_15.88%_18.2%_15.88%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.54px_-2.691px] mask-size-[16px_16px]" data-name="grade" style={{ maskImage: `url('${imgPlayArrow}')` }}>
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.379 15.5961">
            <path d={svgPaths.p29ed5200} fill="var(--fill-0, #303030)" id="grade" />
          </svg>
        </div>
      </div>
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#212121] text-[14px] tracking-[-0.28px]">Review event</p>
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative">
      <Frame44 />
    </div>
  );
}

function Cards() {
  return (
    <div className="h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Cards">
      <div aria-hidden="true" className="absolute border border-[#e5e9f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[10px] items-center justify-end px-[12px] py-[4px] relative size-full">
          <Frame25 />
          <div className="flex items-center justify-center relative shrink-0 size-[20px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none">
              <div className="relative size-[20px]" data-name="chevron_down">
                <div className="absolute inset-[37.46%_27.42%_37.45%_27.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.498px_-7.492px] mask-size-[20px_20px]" data-name="expand_more" style={{ maskImage: `url('${imgExpandMore1}')` }}>
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.01782 5.0176">
                    <path d={svgPaths.p5ccaa80} fill="var(--fill-0, #303030)" id="expand_more" />
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

function Frame45() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#212121] text-[14px] tracking-[-0.28px]">Inbox event</p>
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative">
      <Frame45 />
    </div>
  );
}

function Cards1() {
  return (
    <div className="bg-white h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Cards">
      <div aria-hidden="true" className="absolute border border-[#e5e9f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[10px] items-center px-[12px] py-[4px] relative size-full">
          <div className="relative shrink-0 size-[24px]" data-name="Inbox">
            <div className="absolute inset-[12.08%_12.08%_18.67%_12.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.933px_-1.933px] mask-size-[16px_16px]" data-name="sms" style={{ maskImage: `url('${imgPlayArrow}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.2 16.6201">
                <path d={svgPaths.p3acf0380} fill="var(--fill-0, #303030)" id="sms" />
              </svg>
            </div>
          </div>
          <Frame26 />
          <div className="flex items-center justify-center relative shrink-0 size-[20px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none">
              <div className="relative size-[20px]" data-name="chevron_down">
                <div className="absolute inset-[37.46%_27.42%_37.45%_27.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.498px_-7.492px] mask-size-[20px_20px]" data-name="expand_more" style={{ maskImage: `url('${imgClose}')` }}>
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.01782 5.0176">
                    <path d={svgPaths.p5ccaa80} fill="var(--fill-0, #303030)" id="expand_more" />
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

function Frame46() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#212121] text-[14px] tracking-[-0.28px]">Listing event</p>
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative">
      <Frame46 />
    </div>
  );
}

function Cards2() {
  return (
    <div className="bg-white h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Cards">
      <div aria-hidden="true" className="absolute border border-[#e5e9f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[10px] items-center px-[12px] py-[4px] relative size-full">
          <div className="relative shrink-0 size-[24px]" data-name="Listings">
            <div className="absolute inset-[12.08%_19.38%_14%_19.38%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-3.101px_-1.933px] mask-size-[16px_16px]" data-name="location_on" style={{ maskImage: `url('${imgPlayArrow}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6961 17.7403">
                <path d={svgPaths.p25562400} fill="var(--fill-0, #303030)" id="location_on" />
              </svg>
            </div>
          </div>
          <Frame27 />
          <div className="flex items-center justify-center relative shrink-0 size-[20px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none">
              <div className="relative size-[20px]" data-name="chevron_down">
                <div className="absolute inset-[37.46%_27.42%_37.45%_27.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.498px_-7.492px] mask-size-[20px_20px]" data-name="expand_more" style={{ maskImage: `url('${imgExpandMore1}')` }}>
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.01782 5.0176">
                    <path d={svgPaths.p5ccaa80} fill="var(--fill-0, #303030)" id="expand_more" />
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

function Frame47() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#212121] text-[14px] tracking-[-0.28px]">Social event</p>
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative">
      <Frame47 />
    </div>
  );
}

function Cards3() {
  return (
    <div className="bg-white h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Cards">
      <div aria-hidden="true" className="absolute border border-[#e5e9f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[10px] items-center px-[12px] py-[4px] relative size-full">
          <div className="relative shrink-0 size-[24px]" data-name="Social">
            <div className="absolute inset-[16.6%_11.6%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.856px_-2.656px] mask-size-[16px_16px]" data-name="workspaces" style={{ maskImage: `url('${imgPlayArrow}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.4307 16.0307">
                <path d={svgPaths.p17eafe80} fill="var(--fill-0, #303030)" id="workspaces" />
              </svg>
            </div>
          </div>
          <Frame28 />
          <div className="flex items-center justify-center relative shrink-0 size-[20px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none">
              <div className="relative size-[20px]" data-name="chevron_down">
                <div className="absolute inset-[37.46%_27.42%_37.45%_27.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.498px_-7.492px] mask-size-[20px_20px]" data-name="expand_more" style={{ maskImage: `url('${imgClose}')` }}>
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.01782 5.0176">
                    <path d={svgPaths.p5ccaa80} fill="var(--fill-0, #303030)" id="expand_more" />
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

function Frame48() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#212121] text-[14px] tracking-[-0.28px]">Survey event</p>
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative">
      <Frame48 />
    </div>
  );
}

function Cards4() {
  return (
    <div className="bg-white h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Cards">
      <div aria-hidden="true" className="absolute border border-[#e5e9f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[10px] items-center px-[12px] py-[4px] relative size-full">
          <div className="relative shrink-0 size-[24px]" data-name="Surveys">
            <div className="absolute inset-[9.58%_17.08%_17.08%_17.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.733px_-1.533px] mask-size-[16px_16px]" data-name="assignment_turned_in" style={{ maskImage: `url('${imgPlayArrow}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.8 17.6">
                <path d={svgPaths.p29921900} fill="var(--fill-0, #303030)" id="assignment_turned_in" />
              </svg>
            </div>
          </div>
          <Frame29 />
          <div className="flex items-center justify-center relative shrink-0 size-[20px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none">
              <div className="relative size-[20px]" data-name="chevron_down">
                <div className="absolute inset-[37.46%_27.42%_37.45%_27.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.498px_-7.492px] mask-size-[20px_20px]" data-name="expand_more" style={{ maskImage: `url('${imgClose}')` }}>
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.01782 5.0176">
                    <path d={svgPaths.p5ccaa80} fill="var(--fill-0, #303030)" id="expand_more" />
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

function Frame49() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#212121] text-[14px] tracking-[-0.28px]">Ticketing event</p>
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative">
      <Frame49 />
    </div>
  );
}

function Cards5() {
  return (
    <div className="bg-white h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Cards">
      <div aria-hidden="true" className="absolute border border-[#e5e9f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[10px] items-center px-[12px] py-[4px] relative size-full">
          <div className="relative shrink-0 size-[24px]" data-name="Ticketing">
            <div className="absolute inset-[12.56%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.01px_-2.01px] mask-size-[16px_16px]" data-name="shapes" style={{ maskImage: `url('${imgPlayArrow}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9692 17.9692">
                <path d={svgPaths.p2c177300} fill="var(--fill-0, #303030)" id="shapes" />
              </svg>
            </div>
          </div>
          <Frame30 />
          <div className="flex items-center justify-center relative shrink-0 size-[20px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none">
              <div className="relative size-[20px]" data-name="chevron_down">
                <div className="absolute inset-[37.46%_27.42%_37.45%_27.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.498px_-7.492px] mask-size-[20px_20px]" data-name="expand_more" style={{ maskImage: `url('${imgClose}')` }}>
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.01782 5.0176">
                    <path d={svgPaths.p5ccaa80} fill="var(--fill-0, #303030)" id="expand_more" />
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

function Frame50() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#212121] text-[14px] tracking-[-0.28px]">External event</p>
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative">
      <Frame50 />
    </div>
  );
}

function Cards6() {
  return (
    <div className="bg-white h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Cards">
      <div aria-hidden="true" className="absolute border border-[#e5e9f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[10px] items-center px-[12px] py-[4px] relative size-full">
          <div className="relative shrink-0 size-[24px]" data-name="dashboard">
            <div className="absolute inset-[17.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.733px_-2.733px] mask-size-[16px_16px]" data-name="grid_view" style={{ maskImage: `url('${imgPlayArrow}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.8 15.8">
                <path d={svgPaths.p9b4bf80} fill="var(--fill-0, #303030)" id="grid_view" />
              </svg>
            </div>
          </div>
          <Frame31 />
          <div className="flex items-center justify-center relative shrink-0 size-[20px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none">
              <div className="relative size-[20px]" data-name="chevron_down">
                <div className="absolute inset-[37.46%_27.42%_37.45%_27.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.498px_-7.492px] mask-size-[20px_20px]" data-name="expand_more" style={{ maskImage: `url('${imgClose}')` }}>
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.01782 5.0176">
                    <path d={svgPaths.p5ccaa80} fill="var(--fill-0, #303030)" id="expand_more" />
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

function TriggerLibrary() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-end relative shrink-0 w-full" data-name="Trigger library">
      <Frame63 />
      <div className="bg-white h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Cards">
        <div aria-hidden="true" className="absolute border border-[#e5e9f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[10px] items-center px-[12px] py-[4px] relative size-full">
            <div className="relative shrink-0 size-[20px]" data-name="schedule">
              <div className="absolute inset-[12.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.933px_-1.933px] mask-size-[16px_16px]" data-name="schedule" style={{ maskImage: `url('${imgClose}')` }}>
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.1666 15.1666">
                  <path d={svgPaths.p220f8c00} fill="var(--fill-0, #303030)" id="schedule" />
                </svg>
              </div>
            </div>
            <Frame24 />
            <div className="relative shrink-0 size-[20px]" data-name="drag_indicator">
              <div className="absolute inset-[18.27%_30.77%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-6.154px_-3.654px] mask-size-[20px_20px]" data-name="drag_indicator" style={{ maskImage: `url('${imgClose}')` }}>
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.69208 12.6921">
                  <path d={svgPaths.p1a443700} fill="var(--fill-0, #303030)" id="drag_indicator" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Cards />
      <Cards1 />
      <Cards2 />
      <Cards3 />
      <Cards4 />
      <Cards5 />
      <Cards6 />
    </div>
  );
}

function Frame64() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#212121] text-[14px] tracking-[-0.28px] w-[269px]">Tasks</p>
      <div className="relative shrink-0 size-[20px]" data-name="chevron_down">
        <div className="absolute inset-[37.46%_27.42%_37.45%_27.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.498px_-7.492px] mask-size-[20px_20px]" data-name="expand_more" style={{ maskImage: `url('${imgClose}')` }}>
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.01782 5.0176">
            <path d={svgPaths.p5ccaa80} fill="var(--fill-0, #303030)" id="expand_more" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group5() {
  return <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start shrink-0" />;
}

function TriggerLibrary1() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-end relative shrink-0 w-full" data-name="Trigger library">
      <Frame64 />
      <Group5 />
    </div>
  );
}

function Frame65() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#212121] text-[14px] tracking-[-0.28px] w-[269px]">Controls</p>
      <div className="relative shrink-0 size-[20px]" data-name="chevron_down">
        <div className="absolute inset-[37.46%_27.42%_37.45%_27.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.498px_-7.492px] mask-size-[20px_20px]" data-name="expand_more" style={{ maskImage: `url('${imgClose}')` }}>
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.01782 5.0176">
            <path d={svgPaths.p5ccaa80} fill="var(--fill-0, #303030)" id="expand_more" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group6() {
  return <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start shrink-0" />;
}

function TriggerLibrary2() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[24px] items-end relative shrink-0 w-[312px]" data-name="Trigger library">
      <Frame65 />
      <Group6 />
    </div>
  );
}

function Frame60() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
      <TriggerLibrary />
      <TriggerLibrary1 />
      <TriggerLibrary2 />
    </div>
  );
}

function Frame42() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
      <SearchFieldWeb />
      <Frame60 />
    </div>
  );
}

function CreateManually() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[20px] h-[1136px] items-start left-[56px] pb-[20px] pt-[11px] px-[24px] top-[121px] w-[360px]" data-name="Create manually">
      <div className="bg-[#f0f1f5] content-stretch flex gap-[8px] h-[28px] items-center pl-px pr-[13px] relative rounded-[5px] shrink-0 w-[196px]">
        <Frame82 />
        <Frame83 />
      </div>
      <Frame42 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[26px] not-italic relative shrink-0 text-[#212121] text-[18px] tracking-[-0.36px] whitespace-nowrap">Review response agent replying autonomously</p>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0">
      <Frame18 />
    </div>
  );
}

function Component() {
  return (
    <div className="-translate-y-1/2 absolute bg-[#e0e5eb] h-[1273px] left-0 overflow-clip top-1/2 w-[1448px]" data-name="4">
      <AiAgentUi />
      <Group9 />
      <div className="absolute bg-black h-[900px] left-0 mix-blend-saturation top-[1012px] w-[1440px]" data-name="Grayscale filter" />
      <div className="absolute bg-black h-[900px] left-0 mix-blend-saturation top-[1912px] w-[1440px]" data-name="Grayscale filter" />
      <div className="absolute bg-black h-[900px] left-0 mix-blend-saturation top-[2812px] w-[1440px]" data-name="Grayscale filter" />
      <Frame23 />
      <div className="absolute left-[1219px] overflow-clip size-[24px] top-[275px]" data-name="Cursor">
        <Cursor />
      </div>
      <div className="absolute content-stretch flex flex-col gap-[1.645px] items-center left-[555px] top-[221.5px] w-[329px]">
        <div className="bg-white content-stretch flex gap-[6.58px] items-center px-[26.32px] py-[13.16px] relative rounded-[200px] shadow-[0px_1.353px_8.118px_0px_rgba(33,33,33,0.06)] shrink-0" data-name="Cards">
          <div className="relative shrink-0 size-[19.74px]" data-name="AI agent">
            <div className="absolute aspect-[29/29] bg-[rgba(217,217,217,0)] left-0 right-0 top-0" />
            <div className="-translate-y-1/2 absolute aspect-[19/23] left-[8.33%] right-[8.33%] top-1/2" data-name="􀆿">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.45 19.9132">
                <path d={svgPaths.p17a46700} fill="var(--fill-0, #6834B7)" id="ô¿" />
              </svg>
            </div>
          </div>
          <Frame20 />
        </div>
        <div className="h-[65.8px] relative shrink-0 w-[17.272px]" data-name="End">
          <div className="absolute h-[65.8px] left-[9.05px] top-0 w-0">
            <div className="absolute inset-[-1.25%_-0.82px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.645 67.445">
                <path d="M0.8225 0.8225V66.6225" id="Vector 370" stroke="url(#paint0_linear_119_22929)" strokeLinecap="round" strokeWidth="1.645" />
                <defs>
                  <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_119_22929" x1="1.3225" x2="1.3225" y1="0.8225" y2="66.6225">
                    <stop stopColor="#AFBCDF" stopOpacity="0" />
                    <stop offset="0.162611" stopColor="#AFBCDF" />
                    <stop offset="1" stopColor="#AFBCDF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
        <EditorCards />
        <div className="content-stretch flex flex-col h-[118.44px] items-center relative shrink-0 w-[31.255px]" data-name="End">
          <div className="h-[49.35px] relative shrink-0 w-0">
            <div className="absolute inset-[-1.67%_-0.82px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.645 50.995">
                <path d="M0.8225 0.8225V50.1725" id="Vector 370" stroke="url(#paint0_linear_119_22833)" strokeLinecap="round" strokeWidth="1.645" />
                <defs>
                  <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_119_22833" x1="1.3225" x2="1.3225" y1="0.8225" y2="50.1725">
                    <stop stopColor="#AFBCDF" stopOpacity="0" />
                    <stop offset="0.162611" stopColor="#AFBCDF" />
                    <stop offset="1" stopColor="#AFBCDF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          <div className="bg-[#f4f6f7] relative rounded-[40px] shrink-0 size-[19.74px]" data-name="Add icon">
            <div className="absolute inset-[22.92%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.5px_-5.5px] mask-size-[24px_24px]" data-name="add" style={{ maskImage: `url('${imgMoreVert}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6925 10.6925">
                <path d={svgPaths.pe59fe00} fill="var(--fill-0, #AFBCDF)" id="add" />
              </svg>
            </div>
          </div>
          <div className="h-[49.35px] relative shrink-0 w-0">
            <div className="absolute inset-[-1.67%_-0.82px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.645 50.995">
                <path d="M0.8225 0.8225V50.1725" id="Vector 369" stroke="var(--stroke-0, #AFBCDF)" strokeLinecap="round" strokeWidth="1.645" />
              </svg>
            </div>
          </div>
        </div>
        <EditorCards1 />
        <div className="content-stretch flex flex-col h-[118.44px] items-center relative shrink-0 w-[31.255px]" data-name="End">
          <div className="h-[49.35px] relative shrink-0 w-0">
            <div className="absolute inset-[-1.67%_-0.82px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.645 50.995">
                <path d="M0.8225 0.8225V50.1725" id="Vector 370" stroke="url(#paint0_linear_119_22833)" strokeLinecap="round" strokeWidth="1.645" />
                <defs>
                  <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_119_22833" x1="1.3225" x2="1.3225" y1="0.8225" y2="50.1725">
                    <stop stopColor="#AFBCDF" stopOpacity="0" />
                    <stop offset="0.162611" stopColor="#AFBCDF" />
                    <stop offset="1" stopColor="#AFBCDF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          <div className="bg-[#f4f6f7] relative rounded-[40px] shrink-0 size-[19.74px]" data-name="Add icon">
            <div className="absolute inset-[22.92%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.5px_-5.5px] mask-size-[24px_24px]" data-name="add" style={{ maskImage: `url('${imgMoreVert}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6925 10.6925">
                <path d={svgPaths.pe59fe00} fill="var(--fill-0, #AFBCDF)" id="add" />
              </svg>
            </div>
          </div>
          <div className="h-[49.35px] relative shrink-0 w-0">
            <div className="absolute inset-[-1.67%_-0.82px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.645 50.995">
                <path d="M0.8225 0.8225V50.1725" id="Vector 369" stroke="var(--stroke-0, #AFBCDF)" strokeLinecap="round" strokeWidth="1.645" />
              </svg>
            </div>
          </div>
        </div>
        <EditorCards2 />
        <div className="content-stretch flex flex-col h-[118.44px] items-center relative shrink-0 w-[31.255px]" data-name="End">
          <div className="h-[49.35px] relative shrink-0 w-0">
            <div className="absolute inset-[-1.67%_-0.82px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.645 50.995">
                <path d="M0.8225 0.8225V50.1725" id="Vector 370" stroke="url(#paint0_linear_119_22833)" strokeLinecap="round" strokeWidth="1.645" />
                <defs>
                  <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_119_22833" x1="1.3225" x2="1.3225" y1="0.8225" y2="50.1725">
                    <stop stopColor="#AFBCDF" stopOpacity="0" />
                    <stop offset="0.162611" stopColor="#AFBCDF" />
                    <stop offset="1" stopColor="#AFBCDF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          <div className="bg-[#f4f6f7] relative rounded-[40px] shrink-0 size-[19.74px]" data-name="Add icon">
            <div className="absolute inset-[22.92%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.5px_-5.5px] mask-size-[24px_24px]" data-name="add" style={{ maskImage: `url('${imgMoreVert}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6925 10.6925">
                <path d={svgPaths.pe59fe00} fill="var(--fill-0, #AFBCDF)" id="add" />
              </svg>
            </div>
          </div>
          <div className="h-[49.35px] relative shrink-0 w-0">
            <div className="absolute inset-[-1.67%_-0.82px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.645 50.995">
                <path d="M0.8225 0.8225V50.1725" id="Vector 369" stroke="var(--stroke-0, #AFBCDF)" strokeLinecap="round" strokeWidth="1.645" />
              </svg>
            </div>
          </div>
        </div>
        <EditorCards3 />
        <div className="content-stretch flex flex-col h-[118.44px] items-center relative shrink-0 w-[31.255px]" data-name="End">
          <div className="h-[49.35px] relative shrink-0 w-0">
            <div className="absolute inset-[-1.67%_-0.82px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.645 50.995">
                <path d="M0.8225 0.8225V50.1725" id="Vector 370" stroke="url(#paint0_linear_119_22833)" strokeLinecap="round" strokeWidth="1.645" />
                <defs>
                  <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_119_22833" x1="1.3225" x2="1.3225" y1="0.8225" y2="50.1725">
                    <stop stopColor="#AFBCDF" stopOpacity="0" />
                    <stop offset="0.162611" stopColor="#AFBCDF" />
                    <stop offset="1" stopColor="#AFBCDF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          <div className="bg-[#f4f6f7] relative rounded-[40px] shrink-0 size-[19.74px]" data-name="Add icon">
            <div className="absolute inset-[22.92%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.5px_-5.5px] mask-size-[24px_24px]" data-name="add" style={{ maskImage: `url('${imgMoreVert}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6925 10.6925">
                <path d={svgPaths.pe59fe00} fill="var(--fill-0, #AFBCDF)" id="add" />
              </svg>
            </div>
          </div>
          <div className="h-[49.35px] relative shrink-0 w-0">
            <div className="absolute inset-[-1.67%_-0.82px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.645 50.995">
                <path d="M0.8225 0.8225V50.1725" id="Vector 369" stroke="var(--stroke-0, #AFBCDF)" strokeLinecap="round" strokeWidth="1.645" />
              </svg>
            </div>
          </div>
        </div>
        <EditorCards4 />
        <div className="content-stretch flex flex-col h-[118.44px] items-center relative shrink-0 w-[31.756px]" data-name="End">
          <div className="h-[49.35px] relative shrink-0 w-0">
            <div className="absolute inset-[-1.67%_-0.82px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.645 50.995">
                <path d="M0.8225 0.8225V50.1725" id="Vector 369" stroke="var(--stroke-0, #AFBCDF)" strokeLinecap="round" strokeWidth="1.645" />
              </svg>
            </div>
          </div>
          <div className="bg-[#f4f6f7] relative rounded-[40px] shrink-0 size-[19.74px]" data-name="Add icon">
            <div className="absolute inset-[22.92%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.5px_-5.5px] mask-size-[24px_24px]" data-name="add" style={{ maskImage: `url('${imgMoreVert}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6925 10.6925">
                <path d={svgPaths.pe59fe00} fill="var(--fill-0, #AFBCDF)" id="add" />
              </svg>
            </div>
          </div>
          <div className="h-[49.35px] relative shrink-0 w-0">
            <div className="absolute inset-[-1.67%_-0.82px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.645 50.995">
                <path d="M0.8225 0.8225V50.1725" id="Vector 369" stroke="var(--stroke-0, #AFBCDF)" strokeLinecap="round" strokeWidth="1.645" />
              </svg>
            </div>
          </div>
          <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Chips - Informative">
            <div className="bg-[#eaeaea] content-stretch flex items-center px-[6.58px] py-[1.645px] relative rounded-[4px] shrink-0" data-name="Tonal">
              <Spam />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bg-[#e0e5eb] content-stretch flex flex-col items-start left-[630px] p-[8px] rounded-[8px] top-[129px] w-[218px]">
        <Frame62 />
      </div>
      <CreateManually />
      <div className="absolute bg-white content-stretch flex gap-[8px] h-[64px] items-center left-[56px] px-[24px] py-[8px] rounded-tl-[8px] top-[56px] w-[1392px]" data-name="Header / Web">
        <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Header/Title">
          <div className="content-stretch flex items-center justify-center p-[8px] relative rounded-[4px] shrink-0 size-[36px]" data-name="Button">
            <div className="relative shrink-0 size-[20px]" data-name="arrow_left">
              <div className="absolute inset-[27.78%_17.91%_27.76%_19.41%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-3.883px_-5.557px] mask-size-[20px_20px]" data-name="arrow_left_alt" style={{ maskImage: `url('${imgClose}')` }}>
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.5352 8.89044">
                  <path d={svgPaths.p3ae4b800} fill="var(--fill-0, #303030)" id="arrow_left_alt" />
                </svg>
              </div>
            </div>
          </div>
          <Frame19 />
        </div>
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Header CTAs">
          <div className="content-stretch flex h-[36px] items-center justify-center p-[8px] relative rounded-[4px] shrink-0" data-name="Button">
            <div className="relative shrink-0 size-[20px]" data-name="arrow_backup">
              <div className="absolute inset-[18.75%_6.25%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.25px_-3.75px] mask-size-[20px_20px]" data-name="backup" style={{ maskImage: `url('${imgClose}')` }}>
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.5 12.5">
                  <path d={svgPaths.p3a887c00} fill="var(--fill-0, #303030)" id="backup" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-[#1976d2] content-stretch flex gap-[8px] h-[36px] items-center justify-center px-[12px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
            <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-white tracking-[-0.28px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
              Save
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="bg-[#e0e5eb] h-[56px] relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[12px] py-[8px] relative size-full">
          <div className="relative shrink-0 size-[24px]" data-name="32px/social/birdeye">
            <div className="absolute inset-[10.94%_9.38%]" data-name="Fill 1">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5 18.75">
                <path clipRule="evenodd" d={svgPaths.p23fcc000} fill="var(--fill-0, #1976D2)" fillRule="evenodd" id="Fill 1" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MainNav1() {
  return (
    <div className="bg-[#e0e5eb] flex-[1_0_0] min-h-px min-w-px relative" data-name="Main Nav">
      <div aria-hidden="true" className="absolute border-[#eaeaea] border-r border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col h-full items-start pb-[9px] pt-[8px] px-[12px] relative">
        <div className="content-stretch flex flex-col items-center justify-center mb-[-1px] p-[8px] relative shrink-0 size-[32px]" data-name="Navigation buttons">
          <div className="relative shrink-0 size-[20px]" data-name="Overview">
            <div className="absolute inset-[19.2%_22.08%_17.08%_22.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4.417px_-3.84px] mask-size-[20px_20px]" data-name="home" style={{ maskImage: `url('${imgClose}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.1666 12.7435">
                <path d={svgPaths.p3c83e900} fill="var(--fill-0, #303030)" id="home" />
              </svg>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center mb-[-1px] relative shrink-0 size-[32px]" data-name="Navigation buttons">
          <div className="relative shrink-0 size-[20px]" data-name="Inbox">
            <div className="absolute inset-[12.08%_12.08%_18.67%_12.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.417px_-2.417px] mask-size-[20px_20px]" data-name="sms" style={{ maskImage: `url('${imgClose}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.1666 13.85">
                <path d={svgPaths.p16687400} fill="var(--fill-0, #303030)" id="sms" />
              </svg>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center mb-[-1px] p-[8px] relative shrink-0 size-[32px]" data-name="Navigation buttons">
          <div className="relative shrink-0 size-[20px]" data-name="Listings">
            <div className="absolute inset-[12.08%_19.38%_14%_19.38%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-3.877px_-2.417px] mask-size-[20px_20px]" data-name="location_on" style={{ maskImage: `url('${imgClose}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.2467 14.7836">
                <path d={svgPaths.p1db22180} fill="var(--fill-0, #303030)" id="location_on" />
              </svg>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center mb-[-1px] p-[8px] relative shrink-0 size-[32px]" data-name="Component 63">
          <div className="relative shrink-0 size-[20px]" data-name="Reviews">
            <div className="absolute inset-[16.82%_15.88%_18.2%_15.88%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-3.175px_-3.363px] mask-size-[20px_20px]" data-name="grade" style={{ maskImage: `url('${imgClose}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.6492 12.9968">
                <path d={svgPaths.p97a8100} fill="var(--fill-0, #303030)" id="grade" />
              </svg>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center mb-[-1px] p-[8px] relative shrink-0 size-[32px]" data-name="Component 64">
          <div className="relative shrink-0 size-[20px]" data-name="Referrals">
            <div className="absolute inset-[7.16%_12.08%_12.08%_12.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.417px_-1.433px] mask-size-[20px_20px]" data-name="featured_seasonal_and_gifts" style={{ maskImage: `url('${imgClose}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.1666 16.1506">
                <path d={svgPaths.p3bb91c80} fill="var(--fill-0, #303030)" id="featured_seasonal_and_gifts" />
              </svg>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center mb-[-1px] p-[8px] relative shrink-0 size-[32px]" data-name="Component 65">
          <div className="relative shrink-0 size-[20px]" data-name="Payments">
            <div className="absolute inset-[12.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.417px_-2.417px] mask-size-[20px_20px]" data-name="monetization_on" style={{ maskImage: `url('${imgClose}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.1666 15.1666">
                <path d={svgPaths.p3d180f80} fill="var(--fill-0, #303030)" id="monetization_on" />
              </svg>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center mb-[-1px] p-[8px] relative shrink-0 size-[32px]" data-name="Component 66">
          <div className="relative shrink-0 size-[20px]" data-name="Appointments">
            <div className="absolute inset-[11.6%_17.08%_12.08%_17.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-3.417px_-2.321px] mask-size-[20px_20px]" data-name="calendar_month" style={{ maskImage: `url('${imgClose}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1666 15.2628">
                <path d={svgPaths.p1e88cfb0} fill="var(--fill-0, #303030)" id="calendar_month" />
              </svg>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center mb-[-1px] p-[8px] relative shrink-0 size-[32px]" data-name="Component 67">
          <div className="relative shrink-0 size-[20px]" data-name="Social">
            <div className="absolute inset-[16.6%_11.6%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.321px_-3.321px] mask-size-[20px_20px]" data-name="workspaces" style={{ maskImage: `url('${imgClose}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.3589 13.3589">
                <path d={svgPaths.p210b2470} fill="var(--fill-0, #303030)" id="workspaces" />
              </svg>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center mb-[-1px] p-[8px] relative shrink-0 size-[32px]" data-name="Component 68">
          <div className="relative shrink-0 size-[20px]" data-name="Surveys">
            <div className="absolute inset-[9.58%_17.08%_17.08%_17.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-3.417px_-1.917px] mask-size-[20px_20px]" data-name="assignment_turned_in" style={{ maskImage: `url('${imgClose}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1666 14.6666">
                <path d={svgPaths.p1271780} fill="var(--fill-0, #303030)" id="assignment_turned_in" />
              </svg>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center mb-[-1px] p-[8px] relative shrink-0 size-[32px]" data-name="Component 69">
          <div className="relative shrink-0 size-[20px]" data-name="Ticketing">
            <div className="absolute inset-[12.56%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.513px_-2.513px] mask-size-[20px_20px]" data-name="shapes" style={{ maskImage: `url('${imgClose}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.9743 14.9743">
                <path d={svgPaths.p2af55f00} fill="var(--fill-0, #303030)" id="shapes" />
              </svg>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center mb-[-1px] p-[8px] relative shrink-0 size-[32px]" data-name="Component 70">
          <div className="relative shrink-0 size-[20px]" data-name="Contacts">
            <div className="absolute inset-[22.87%_13.33%_22.88%_13.33%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.665px_-4.575px] mask-size-[20px_20px]" data-name="group" style={{ maskImage: `url('${imgClose}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6698 10.8485">
                <path d={svgPaths.p1cc6aa00} fill="var(--fill-0, #303030)" id="group" />
              </svg>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center mb-[-1px] p-[8px] relative shrink-0 size-[32px]" data-name="Component 71">
          <div className="relative shrink-0 size-[20px]" data-name="Campaigns">
            <div className="absolute inset-[20.51%_11.76%_20.67%_11.76%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.353px_-4.103px] mask-size-[20px_20px]" data-name="campaign" style={{ maskImage: `url('${imgClose}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.2948 11.7626">
                <path d={svgPaths.p2cdd75c0} fill="var(--fill-0, #303030)" id="campaign" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-[#dfe8f1] content-stretch flex flex-col items-center justify-center mb-[-1px] p-[8px] relative rounded-[24px] shrink-0 size-[32px]" data-name="Component 72">
          <div className="relative shrink-0 size-[20px]" data-name="Reports">
            <div className="absolute inset-[19.29%_19.29%_19.4%_19.34%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-3.867px_-3.859px] mask-size-[20px_20px]" data-name="pie_chart" style={{ maskImage: `url('${imgClose}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.274 12.2612">
                <path d={svgPaths.p376bbff0} fill="var(--fill-0, #1976D2)" id="pie_chart" />
              </svg>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center mb-[-1px] p-[8px] relative shrink-0 size-[32px]" data-name="Component 73">
          <div className="relative shrink-0 size-[20px]" data-name="Insights">
            <div className="absolute inset-[12.08%_22.08%_11.91%_22.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4.417px_-2.417px] mask-size-[20px_20px]" data-name="emoji_objects" style={{ maskImage: `url('${imgClose}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.1666 15.2018">
                <path d={svgPaths.p140b9400} fill="var(--fill-0, #303030)" id="emoji_objects" />
              </svg>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center mb-[-1px] p-[8px] relative shrink-0 size-[32px]" data-name="Component 74">
          <div className="relative shrink-0 size-[20px]" data-name="Competitors">
            <div className="absolute inset-[17.08%_14.58%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.917px_-3.417px] mask-size-[20px_20px]" data-name="leaderboard" style={{ maskImage: `url('${imgClose}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.1666 13.1666">
                <path d={svgPaths.paf11800} fill="var(--fill-0, #303030)" id="leaderboard" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Frame84() {
  return (
    <div className="relative size-full">
      <Component />
      <div className="absolute h-[1273px] inset-[0_96.12%_0_0] pointer-events-none">
        <div className="bg-[#e5e9f0] content-stretch flex flex-col items-start pointer-events-auto sticky top-0" data-name="Primary Rail Nav">
          <Frame14 />
          <MainNav1 />
        </div>
      </div>
    </div>
  );
}