import imgImage1 from "figma:asset/77508790821b32c648917b35c1c711f5c8dd17f8.png";

export default function Frame() {
  return (
    <div className="relative size-full">
      <div className="absolute h-[992px] left-0 top-0 w-[1728px]" data-name="image 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1} />
      </div>
      <div className="absolute bg-white content-stretch flex items-center left-[1513px] px-[16px] py-[8px] rounded-[8px] shadow-[0px_20px_34px_0px_rgba(33,33,33,0.16)] top-[126px] w-[132px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#1e1e1e] text-[13px] tracking-[-0.26px] whitespace-nowrap">Share</p>
      </div>
    </div>
  );
}