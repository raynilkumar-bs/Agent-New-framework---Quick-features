import svgPaths from "./svg-ps6vzxz3zm";
import imgImage10 from "figma:asset/cf41ec9f747e1d47078180a05f5f2ca35443cb9a.png";

function Notes() {
  return <div className="absolute h-[66.706px] left-0 top-[692.38px] w-[1269.882px]" data-name="Notes" />;
}

function Notes1() {
  return <div className="absolute h-[77.824px] left-0 top-[759.09px] w-[1269.882px]" data-name="Notes" />;
}

function Frame() {
  return <div className="h-[1130px] w-[749px]" />;
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col h-[634px] items-center justify-center overflow-clip relative w-[840px]">
      <div className="h-[559px] relative shrink-0 w-[839px]" data-name="image 10">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage10} />
      </div>
    </div>
  );
}

function NavigationTopLogo() {
  return (
    <div className="h-[41.403px] relative shrink-0 w-[199.768px]" data-name="navigation/top/logo">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 199.768 41.4">
        <g id="navigation/top/logo">
          <path clipRule="evenodd" d={svgPaths.p2cc68880} fill="var(--fill-0, #1976D2)" fillRule="evenodd" id="Fill 1" />
          <g id="Group 1116601115">
            <path d={svgPaths.pfe99e80} fill="var(--fill-0, #212121)" id="Shape" />
            <path d={svgPaths.p36edaf80} fill="var(--fill-0, #212121)" id="Path" />
            <path d={svgPaths.pa24ff80} fill="var(--fill-0, #212121)" id="Path_2" />
            <path d={svgPaths.p33cce400} fill="var(--fill-0, #212121)" id="Path_3" />
            <path d={svgPaths.p16db6100} fill="var(--fill-0, #212121)" id="Shape_2" />
            <path d={svgPaths.p2b617580} fill="var(--fill-0, #212121)" id="Combined Shape" />
            <path d={svgPaths.p11bbd0f1} fill="var(--fill-0, #212121)" id="Path_4" />
            <path d={svgPaths.p3b3711e0} fill="var(--fill-0, #212121)" id="Combined Shape_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col h-[100px] items-start justify-center relative shrink-0 w-[200px]">
      <NavigationTopLogo />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.1] relative shrink-0 text-[#212121] text-[61.765px] tracking-[-2.4706px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Section cover title
      </p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <div className="flex flex-col font-['Roboto:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#555] text-[22.235px] tracking-[-0.6671px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[27.701px]">July 10, 2025</p>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[9.882px] items-center relative shrink-0 w-full">
      <Frame2 />
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[27.701px] relative shrink-0 text-[#555] text-[22.235px] tracking-[-0.6671px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        30 locations
      </p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[19.765px] items-start relative shrink-0 w-full">
      <Frame1 />
      <Frame5 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[25px] h-[638px] items-center justify-center p-[60px] relative w-[840px]">
      <Frame7 />
      <Frame3 />
    </div>
  );
}

export default function Report() {
  return (
    <div className="bg-white relative size-full" data-name="Report">
      <Notes />
      <Notes1 />
      <div className="absolute flex h-[749px] items-center justify-center left-[73px] top-[49px] w-[1130px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <Frame />
        </div>
      </div>
      <div className="absolute flex h-[840px] items-center justify-center left-[638px] top-0 w-[634px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <Frame4 />
        </div>
      </div>
      <div className="absolute flex h-[840px] items-center justify-center left-0 top-0 w-[638px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "76" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <Frame6 />
        </div>
      </div>
    </div>
  );
}