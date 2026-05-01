import svgPaths from "./svg-aklztgzhil";
import imgJyskProfilePerformance17724527415078Chart1 from "figma:asset/65e6c1159ecfae396cecb0e51b02f35873df9382.png";
import imgJyskProfilePerformance17724527415077Table1 from "figma:asset/9d7bbfabce716475e8ebcd1c7b1a4ff09512ada8.png";
import imgJyskProfilePerformance17724527415076Table1 from "figma:asset/dee5cbfe496c36c8c0519ab93c24d583a84dc3ff.png";
import imgJyskProfilePerformance17724527415074Table1 from "figma:asset/0d916df5fe5f193444d1fcc37d6230fcfd59f017.png";
import imgJyskProfilePerformance17724527415075Table1 from "figma:asset/a354c9b2dcc9e1469f80aa5994f146789051ac86.png";
import imgJyskProfilePerformance17724527415073Table1 from "figma:asset/eaa0bbbefd8412f19964e9a78e78861f678c55c6.png";
import imgJyskProfilePerformance17724527415072Table1 from "figma:asset/0c57f8a87a947e60bf7b9dca32d63cafe2e4cac2.png";
import imgJyskProfilePerformance17724527415071Table1 from "figma:asset/97f52431a736eef2a6aa441bd1f1043481e35b77.png";
import imgBitmapCopy1 from "figma:asset/07f55cb4dc9076729807bf360ffceba0f970bd1f.png";
import { imgExpandMore, imgHome, imgBitmapCopy, imgAttachFile, imgFrame } from "./svg-qh5zf";

function Undo() {
  return (
    <div className="relative shrink-0 size-[20.079px]" data-name="undo">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.0794 20.0794">
        <g id="undo">
          <mask height="21" id="mask0_1_12774" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="21" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="20.0794" id="Bounding box" width="20.0794" />
          </mask>
          <g mask="url(#mask0_1_12774)">
            <path d={svgPaths.p8ea0200} fill="var(--fill-0, #CCCCCC)" id="undo_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#e0e5eb] content-stretch flex items-center justify-center p-[8.032px] relative rounded-[8.032px] shrink-0 size-[36.143px]" data-name="Button">
      <Undo />
    </div>
  );
}

function Redo() {
  return (
    <div className="relative shrink-0 size-[20.079px]" data-name="redo">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.0794 20.0794">
        <g id="redo">
          <mask height="21" id="mask0_1_12693" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="21" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="20.0794" id="Bounding box" width="20.0794" />
          </mask>
          <g mask="url(#mask0_1_12693)">
            <path d={svgPaths.p25960d10} fill="var(--fill-0, #CCCCCC)" id="redo_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#e0e5eb] content-stretch flex items-center justify-center p-[8.032px] relative rounded-[8.032px] shrink-0 size-[36.143px]" data-name="Button">
      <Redo />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex items-center pr-px relative shrink-0">
      <div className="content-stretch flex items-center mr-[-1px] relative shrink-0" data-name="Undo">
        <Button />
      </div>
      <div className="content-stretch flex items-center mr-[-1px] relative shrink-0" data-name="Redo">
        <Button1 />
      </div>
      <div className="bg-[#e0e5eb] content-stretch flex gap-[8.032px] h-[36.143px] items-center justify-center mr-[-1px] pl-[12.048px] pr-[8.032px] py-[8.032px] relative rounded-[8.032px] shrink-0" data-name="Zoom in & out">
        <div aria-hidden="true" className="absolute border-0 border-[#e5e9f0] border-solid inset-0 pointer-events-none rounded-[8.032px]" />
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20.159px] not-italic relative shrink-0 text-[#555] text-[14.11px] tracking-[-0.2822px] whitespace-nowrap">75%</p>
        <div className="relative shrink-0 size-[20.079px]" data-name="chevron_down">
          <div className="absolute inset-[37.46%_27.42%_37.45%_27.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.498px_-7.492px] mask-size-[20px_20px]" data-name="expand_more" style={{ maskImage: `url('${imgExpandMore}')` }}>
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.05364 5.03753">
              <path d={svgPaths.p3aa6a6f0} fill="var(--fill-0, #303030)" id="expand_more" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="absolute bg-[#e0e5eb] content-stretch flex h-[52px] items-center justify-end left-[834px] px-[16.064px] py-[24.095px] rounded-[8px] top-[149px] w-[183px]">
      <Frame11 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute bg-white content-stretch flex h-[881.13px] items-start justify-center left-[548px] pb-[12.375px] pt-[24.751px] px-[24.751px] shadow-[0px_14.677px_35.224px_0px_rgba(33,33,33,0.2)] top-[220px]">
      <div className="content-stretch flex flex-col gap-[1.721px] h-[838.226px] items-start overflow-clip relative shrink-0">
        <div className="h-[121.915px] relative shrink-0 w-[705.05px]" data-name="JYSK-ProfilePerformance-1772452741507-8-chart 1">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[122.98%] left-0 max-w-none top-0 w-full" src={imgJyskProfilePerformance17724527415078Chart1} />
          </div>
        </div>
        <div className="bg-[#d9d9d9] h-[53.858px] opacity-0 shrink-0 w-[705.05px]" />
        <div className="h-[535.153px] relative shrink-0 w-[705.05px]" data-name="JYSK-ProfilePerformance-1772452741507-7-table 1">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[105.08%] left-0 max-w-none top-[-0.04%] w-full" src={imgJyskProfilePerformance17724527415077Table1} />
          </div>
        </div>
        <div className="bg-[#d9d9d9] h-[84.214px] opacity-0 shrink-0 w-[707.498px]" />
        <div className="h-[36.232px] relative shrink-0 w-[705.05px]" data-name="JYSK-ProfilePerformance-1772452741507-7-table 2">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[1552.1%] left-0 max-w-none top-[-1464.67%] w-full" src={imgJyskProfilePerformance17724527415077Table1} />
          </div>
        </div>
        <div className="h-[562.353px] relative shrink-0 w-[705.05px]" data-name="JYSK-ProfilePerformance-1772452741507-6-table 1">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgJyskProfilePerformance17724527415076Table1} />
        </div>
        <div className="h-[562.353px] relative shrink-0 w-[705.05px]" data-name="JYSK-ProfilePerformance-1772452741507-4-table 1">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgJyskProfilePerformance17724527415074Table1} />
        </div>
        <div className="h-[562.353px] relative shrink-0 w-[705.05px]" data-name="JYSK-ProfilePerformance-1772452741507-5-table 1">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgJyskProfilePerformance17724527415075Table1} />
        </div>
        <div className="h-[562.353px] relative shrink-0 w-[705.05px]" data-name="JYSK-ProfilePerformance-1772452741507-3-table 1">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgJyskProfilePerformance17724527415073Table1} />
        </div>
        <div className="h-[562.353px] relative shrink-0 w-[705.05px]" data-name="JYSK-ProfilePerformance-1772452741507-2-table 1">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgJyskProfilePerformance17724527415072Table1} />
        </div>
        <div className="h-[562.353px] relative shrink-0 w-[705.05px]" data-name="JYSK-ProfilePerformance-1772452741507-1-table 1">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgJyskProfilePerformance17724527415071Table1} />
        </div>
      </div>
    </div>
  );
}

function Component() {
  return (
    <div className="absolute bg-[#e0e5eb] h-[900px] left-0 overflow-clip top-0 w-[2008px]" data-name="1301">
      <div className="absolute bg-[#f2f4f7] h-[769px] left-[56px] top-[130px] w-[1410px]" />
      <div className="absolute bg-black h-[900px] left-0 mix-blend-saturation top-[1012px] w-[1440px]" data-name="Grayscale filter" />
      <div className="absolute bg-black h-[900px] left-0 mix-blend-saturation top-[1912px] w-[1440px]" data-name="Grayscale filter" />
      <div className="absolute bg-black h-[900px] left-0 mix-blend-saturation top-[2812px] w-[1440px]" data-name="Grayscale filter" />
      <Frame7 />
      <Frame1 />
      <div className="absolute bg-[#e0e5eb] h-[89px] left-[1352px] top-[165px] w-[80px]" />
      <div className="absolute bg-white h-[89px] left-[1352px] top-[270px] w-[80px]" />
      <div className="absolute bg-white h-[89px] left-[1352px] top-[375px] w-[80px]" />
      <div className="absolute bg-white h-[89px] left-[1352px] top-[480px] w-[80px]" />
    </div>
  );
}

function Frame2() {
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

function MainNav() {
  return (
    <div className="bg-[#e0e5eb] flex-[1_0_0] min-h-px min-w-px relative" data-name="Main Nav">
      <div className="content-stretch flex flex-col gap-[8px] h-full items-start px-[12px] py-[8px] relative">
        <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[32px]" data-name="Navigation buttons">
          <div className="relative shrink-0 size-[20px]" data-name="Overview">
            <div className="absolute inset-[19.2%_22.08%_17.08%_22.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4.417px_-3.84px] mask-size-[20px_20px]" data-name="home" style={{ maskImage: `url('${imgHome}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.1666 12.7435">
                <path d={svgPaths.p3c83e900} fill="var(--fill-0, #303030)" id="home" />
              </svg>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[32px]" data-name="Navigation buttons">
          <div className="relative shrink-0 size-[20px]" data-name="Inbox">
            <div className="absolute inset-[12.08%_12.08%_18.67%_12.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.417px_-2.417px] mask-size-[20px_20px]" data-name="sms" style={{ maskImage: `url('${imgHome}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.1666 13.85">
                <path d={svgPaths.p16687400} fill="var(--fill-0, #303030)" id="sms" />
              </svg>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[32px]" data-name="Navigation buttons">
          <div className="relative shrink-0 size-[20px]" data-name="Listings">
            <div className="absolute inset-[12.08%_19.38%_14%_19.38%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-3.877px_-2.417px] mask-size-[20px_20px]" data-name="location_on" style={{ maskImage: `url('${imgHome}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.2467 14.7836">
                <path d={svgPaths.p1db22180} fill="var(--fill-0, #303030)" id="location_on" />
              </svg>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[32px]" data-name="Component 63">
          <div className="relative shrink-0 size-[20px]" data-name="Reviews">
            <div className="absolute inset-[16.82%_15.88%_18.2%_15.88%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-3.175px_-3.363px] mask-size-[20px_20px]" data-name="grade" style={{ maskImage: `url('${imgHome}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.6492 12.9968">
                <path d={svgPaths.p97a8100} fill="var(--fill-0, #303030)" id="grade" />
              </svg>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[32px]" data-name="Component 64">
          <div className="relative shrink-0 size-[20px]" data-name="Referrals">
            <div className="absolute inset-[7.16%_12.08%_12.08%_12.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.417px_-1.433px] mask-size-[20px_20px]" data-name="featured_seasonal_and_gifts" style={{ maskImage: `url('${imgHome}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.1666 16.1506">
                <path d={svgPaths.p3bb91c80} fill="var(--fill-0, #303030)" id="featured_seasonal_and_gifts" />
              </svg>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[32px]" data-name="Component 65">
          <div className="relative shrink-0 size-[20px]" data-name="Payments">
            <div className="absolute inset-[12.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.417px_-2.417px] mask-size-[20px_20px]" data-name="monetization_on" style={{ maskImage: `url('${imgHome}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.1666 15.1666">
                <path d={svgPaths.p3d180f80} fill="var(--fill-0, #303030)" id="monetization_on" />
              </svg>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[32px]" data-name="Component 66">
          <div className="relative shrink-0 size-[20px]" data-name="Appointments">
            <div className="absolute inset-[11.6%_17.08%_12.08%_17.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-3.417px_-2.321px] mask-size-[20px_20px]" data-name="calendar_month" style={{ maskImage: `url('${imgHome}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1666 15.2628">
                <path d={svgPaths.p1e88cfb0} fill="var(--fill-0, #303030)" id="calendar_month" />
              </svg>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[32px]" data-name="Component 67">
          <div className="relative shrink-0 size-[20px]" data-name="Social">
            <div className="absolute inset-[16.6%_11.6%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.321px_-3.321px] mask-size-[20px_20px]" data-name="workspaces" style={{ maskImage: `url('${imgHome}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.3589 13.3589">
                <path d={svgPaths.p210b2470} fill="var(--fill-0, #303030)" id="workspaces" />
              </svg>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[32px]" data-name="Component 68">
          <div className="relative shrink-0 size-[20px]" data-name="Surveys">
            <div className="absolute inset-[9.58%_17.08%_17.08%_17.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-3.417px_-1.917px] mask-size-[20px_20px]" data-name="assignment_turned_in" style={{ maskImage: `url('${imgHome}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1666 14.6666">
                <path d={svgPaths.p1271780} fill="var(--fill-0, #303030)" id="assignment_turned_in" />
              </svg>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[32px]" data-name="Component 69">
          <div className="relative shrink-0 size-[20px]" data-name="Ticketing">
            <div className="absolute inset-[12.56%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.513px_-2.513px] mask-size-[20px_20px]" data-name="shapes" style={{ maskImage: `url('${imgHome}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.9743 14.9743">
                <path d={svgPaths.p2af55f00} fill="var(--fill-0, #303030)" id="shapes" />
              </svg>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[32px]" data-name="Component 70">
          <div className="relative shrink-0 size-[20px]" data-name="Contacts">
            <div className="absolute inset-[22.87%_13.33%_22.88%_13.33%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.665px_-4.575px] mask-size-[20px_20px]" data-name="group" style={{ maskImage: `url('${imgHome}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6698 10.8485">
                <path d={svgPaths.p1cc6aa00} fill="var(--fill-0, #303030)" id="group" />
              </svg>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[32px]" data-name="Component 71">
          <div className="relative shrink-0 size-[20px]" data-name="Campaigns">
            <div className="absolute inset-[20.51%_11.76%_20.67%_11.76%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.353px_-4.103px] mask-size-[20px_20px]" data-name="campaign" style={{ maskImage: `url('${imgHome}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.2948 11.7626">
                <path d={svgPaths.p2cdd75c0} fill="var(--fill-0, #303030)" id="campaign" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-[#dfe8f1] content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[24px] shrink-0 size-[32px]" data-name="Component 72">
          <div className="relative shrink-0 size-[20px]" data-name="Reports">
            <div className="absolute inset-[19.29%_19.29%_19.4%_19.34%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-3.867px_-3.859px] mask-size-[20px_20px]" data-name="pie_chart" style={{ maskImage: `url('${imgHome}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.274 12.2612">
                <path d={svgPaths.p376bbff0} fill="var(--fill-0, #1976D2)" id="pie_chart" />
              </svg>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[32px]" data-name="Component 73">
          <div className="relative shrink-0 size-[20px]" data-name="Insights">
            <div className="absolute inset-[12.08%_22.08%_11.91%_22.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4.417px_-2.417px] mask-size-[20px_20px]" data-name="emoji_objects" style={{ maskImage: `url('${imgHome}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.1666 15.2018">
                <path d={svgPaths.p140b9400} fill="var(--fill-0, #303030)" id="emoji_objects" />
              </svg>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[32px]" data-name="Component 74">
          <div className="relative shrink-0 size-[20px]" data-name="Competitors">
            <div className="absolute inset-[17.08%_14.58%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.917px_-3.417px] mask-size-[20px_20px]" data-name="leaderboard" style={{ maskImage: `url('${imgHome}')` }}>
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

function Frame3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[26px] not-italic relative shrink-0 text-[#212121] text-[18px] whitespace-nowrap">Reports</p>
    </div>
  );
}

function Title() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[0_80.25%_93.78%_3.87%] items-start overflow-clip px-[16px] py-[15px]" data-name="Title">
      <Frame3 />
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

function Frame6() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="content-stretch flex flex-col items-center justify-center opacity-0 p-[8px] relative shrink-0 size-[28px]" data-name="Component 65">
        <div className="relative shrink-0 size-[20px]" data-name="Settings">
          <div className="absolute inset-[40%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-8px_-8px] mask-size-[20px_20px]" style={{ maskImage: `url('${imgHome}')` }}>
            <div className="absolute inset-[-12.5%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
                <circle cx="2.5" cy="2.5" id="Ellipse 2352" r="2" stroke="var(--stroke-0, #303030)" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-[12.08%_14.79%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.959px_-2.417px] mask-size-[20px_20px]" data-name="settings" style={{ maskImage: `url('${imgHome}')` }}>
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
          <div className="absolute inset-[12.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.417px_-2.417px] mask-size-[20px_20px]" data-name="help" style={{ maskImage: `url('${imgHome}')` }}>
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

function Frame5() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0 w-full">
      <Frame6 />
    </div>
  );
}

function Frame19() {
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

function Frame20() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[88px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic opacity-70 relative shrink-0 text-[#212121] text-[13px] w-[68px]">{` Manually `}</p>
    </div>
  );
}

function Avatar2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Avatar">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Avatar">
          <path d={svgPaths.p1c83da00} fill="var(--fill-0, #E2D6F4)" />
          <path d={svgPaths.p4e91280} fill="var(--fill-0, #9970D7)" id="ô¿" />
        </g>
      </svg>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-h-px min-w-px relative">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] min-w-full relative shrink-0 text-[#212121] text-[14px] tracking-[-0.28px] w-[min-content] whitespace-pre-wrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        {`Hey there! 👋 `}
        <br aria-hidden="true" />
        {`Let's start with a few quick details. What’s the main goal for this project?`}
      </p>
    </div>
  );
}

function ChatBubble() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] items-start opacity-0 relative shrink-0 w-full" data-name="Chat bubble">
      <div className="bg-white content-stretch flex items-center relative shrink-0" data-name="Avatar">
        <Avatar2 />
      </div>
      <Frame8 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="bg-[#f5f5f5] content-stretch flex flex-col gap-[8px] items-center p-[8px] relative rounded-[4px] shrink-0">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#212121] text-[14px] tracking-[-0.28px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Promote a new product or service
      </p>
    </div>
  );
}

function ChatBubble1() {
  return (
    <div className="bg-white content-stretch flex items-center justify-end opacity-0 relative shrink-0 w-full" data-name="Chat bubble">
      <Frame9 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
      <ChatBubble />
      <ChatBubble1 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full">
      <div className="content-stretch flex flex-col items-start justify-between pt-[8px] relative size-full">
        <div className="bg-[#f0f1f5] content-stretch flex gap-[8px] h-[28px] items-center opacity-0 pl-px pr-[13px] relative rounded-[5px] shrink-0 w-[196px]">
          <Frame19 />
          <Frame20 />
        </div>
        <Frame18 />
      </div>
    </div>
  );
}

function Palette() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Palette">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Palette">
          <path d={svgPaths.p10284600} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[20.83%_14.17%]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.1994 13.9999">
        <g id="Group 1410080656">
          <path d={svgPaths.pdafdf80} fill="var(--fill-0, #CCCCCC)" id="Vector (Stroke)" />
          <path d={svgPaths.paa21a00} fill="var(--fill-0, #CCCCCC)" id="Vector (Stroke)_2" />
          <path d={svgPaths.p2b527480} fill="var(--fill-0, #CCCCCC)" id="Vector (Stroke)_3" />
          <path d={svgPaths.pdfe3c30} fill="var(--fill-0, #CCCCCC)" id="Vector (Stroke)_4" />
          <path d={svgPaths.p282ed800} fill="var(--fill-0, #CCCCCC)" id="Vector (Stroke)_5" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="col-1 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[24px_24px] ml-0 mt-0 overflow-clip relative rounded-[25px] row-1 size-[24px]" data-name="Frame" style={{ maskImage: `url('${imgFrame}')` }}>
      <Group1 />
    </div>
  );
}

function EditNote() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="edit_note">
      <Frame />
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-[152px]">
      <div className="relative shrink-0 size-[24px]" data-name="attach_file">
        <div className="absolute inset-[12.08%_28.86%_12.08%_29.66%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4.746px_-1.933px] mask-size-[16px_16px]" data-name="attach_file" style={{ maskImage: `url('${imgAttachFile}')` }}>
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.95378 18.2">
            <path d={svgPaths.p11b88080} fill="var(--fill-0, #303030)" id="attach_file" />
          </svg>
        </div>
      </div>
      <Palette />
      <EditNote />
    </div>
  );
}

function PaperPlaneRight() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="PaperPlaneRight">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="PaperPlaneRight">
          <path d={svgPaths.p171b1200} fill="var(--fill-0, #CCCCCC)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[280px]">
      <Frame16 />
      <PaperPlaneRight />
    </div>
  );
}

function PromptBox() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Prompt box">
      <div aria-hidden="true" className="absolute border border-[#e5e9f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-start flex flex-wrap gap-y-[12px] items-start justify-between p-[16px] relative w-full">
        <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#a3a3a3] text-[14px] tracking-[-0.28px] w-[281px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Ask me to edit, create, or style anything
        </p>
        <Frame10 />
      </div>
    </div>
  );
}

function AiAgentUi() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[20px] h-[768px] items-center left-[56px] pb-[20px] pt-[8px] px-[20px] top-[130px] w-[360px]" data-name="AI agent UI">
      <Frame17 />
      <PromptBox />
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex h-[26px] items-center relative shrink-0">
      <div className="relative shrink-0 size-[20px]" data-name="arrow_left">
        <div className="absolute inset-[27.78%_17.91%_27.76%_19.41%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-3.883px_-5.557px] mask-size-[20px_20px]" data-name="arrow_left_alt" style={{ maskImage: `url('${imgHome}')` }}>
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.5352 8.89044">
            <path d={svgPaths.p3ae4b800} fill="var(--fill-0, #303030)" id="arrow_left_alt" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#212121] text-[18px] tracking-[-0.36px] whitespace-nowrap">
        <p className="leading-[26px]">New share</p>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Frame12 />
      <div className="relative shrink-0 size-[20px]" data-name="edit">
        <div className="absolute inset-[14.58%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.917px_-2.917px] mask-size-[20px_20px]" data-name="edit" style={{ maskImage: `url('${imgHome}')` }}>
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.1667 14.1667">
            <path d={svgPaths.p21380e00} fill="var(--fill-0, #303030)" id="edit" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <Frame13 />
    </div>
  );
}

function L() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0" data-name="L">
      <Frame15 />
      <Frame14 />
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#1976d2] content-stretch flex gap-[8px] h-[36px] items-center justify-center min-w-[79px] p-[8px] relative rounded-bl-[8px] rounded-tl-[8px] shrink-0" data-name="Button">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Share</p>
    </div>
  );
}

function Split() {
  return (
    <div className="bg-[#1976d2] content-stretch flex items-center justify-center max-w-[40px] p-[8px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0 size-[36px]" data-name="Split">
      <div className="relative shrink-0 size-[20px]" data-name="chevron_down">
        <div className="absolute inset-[37.46%_27.42%_37.45%_27.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.498px_-7.492px] mask-size-[20px_20px]" data-name="expand_more" style={{ maskImage: `url('${imgHome}')` }}>
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.01782 5.0176">
            <path d={svgPaths.p5ccaa80} fill="var(--fill-0, white)" id="expand_more" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function MagGlass() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center justify-center relative rounded-[8px] size-[36px]" data-name="MagGlass">
      <div aria-hidden="true" className="absolute border border-[#e5e9f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex items-center justify-center relative shrink-0 size-[24px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="relative size-[24px]" data-name="more_vert">
            <div className="absolute inset-[23.05%_44.58%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-10.7px_-5.531px] mask-size-[24px_24px]" data-name="more_vert" style={{ maskImage: `url('${imgAttachFile}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.59995 12.9384">
                <path d={svgPaths.pb04ea00} fill="var(--fill-0, #303030)" id="more_vert" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function R() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0" data-name="R">
      <div className="content-stretch flex h-[36px] items-start relative rounded-[8px] shrink-0 w-[116px]" data-name="Button">
        <Button2 />
        <div className="flex items-center justify-center relative shrink-0">
          <div className="-scale-y-100 flex-none rotate-180">
            <div className="bg-[#d1e5f9] h-[36px] w-px" />
          </div>
        </div>
        <Split />
      </div>
      <div className="flex items-center justify-center relative shrink-0 size-[36px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <MagGlass />
        </div>
      </div>
    </div>
  );
}

function ContentBar() {
  return (
    <div className="absolute bg-white content-stretch flex items-center justify-between left-[56px] px-[24px] py-[14px] rounded-tl-[8px] rounded-tr-[8px] top-[65px] w-[1410px]" data-name="Content bar">
      <L />
      <R />
    </div>
  );
}

function Frame4() {
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
            <div className="absolute inset-[19.2%_22.08%_17.08%_22.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4.417px_-3.84px] mask-size-[20px_20px]" data-name="home" style={{ maskImage: `url('${imgHome}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.1666 12.7435">
                <path d={svgPaths.p3c83e900} fill="var(--fill-0, #303030)" id="home" />
              </svg>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center mb-[-1px] relative shrink-0 size-[32px]" data-name="Navigation buttons">
          <div className="relative shrink-0 size-[20px]" data-name="Inbox">
            <div className="absolute inset-[12.08%_12.08%_18.67%_12.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.417px_-2.417px] mask-size-[20px_20px]" data-name="sms" style={{ maskImage: `url('${imgHome}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.1666 13.85">
                <path d={svgPaths.p16687400} fill="var(--fill-0, #303030)" id="sms" />
              </svg>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center mb-[-1px] p-[8px] relative shrink-0 size-[32px]" data-name="Navigation buttons">
          <div className="relative shrink-0 size-[20px]" data-name="Listings">
            <div className="absolute inset-[12.08%_19.38%_14%_19.38%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-3.877px_-2.417px] mask-size-[20px_20px]" data-name="location_on" style={{ maskImage: `url('${imgHome}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.2467 14.7836">
                <path d={svgPaths.p1db22180} fill="var(--fill-0, #303030)" id="location_on" />
              </svg>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center mb-[-1px] p-[8px] relative shrink-0 size-[32px]" data-name="Component 63">
          <div className="relative shrink-0 size-[20px]" data-name="Reviews">
            <div className="absolute inset-[16.82%_15.88%_18.2%_15.88%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-3.175px_-3.363px] mask-size-[20px_20px]" data-name="grade" style={{ maskImage: `url('${imgHome}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.6492 12.9968">
                <path d={svgPaths.p97a8100} fill="var(--fill-0, #303030)" id="grade" />
              </svg>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center mb-[-1px] p-[8px] relative shrink-0 size-[32px]" data-name="Component 64">
          <div className="relative shrink-0 size-[20px]" data-name="Referrals">
            <div className="absolute inset-[7.16%_12.08%_12.08%_12.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.417px_-1.433px] mask-size-[20px_20px]" data-name="featured_seasonal_and_gifts" style={{ maskImage: `url('${imgHome}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.1666 16.1506">
                <path d={svgPaths.p3bb91c80} fill="var(--fill-0, #303030)" id="featured_seasonal_and_gifts" />
              </svg>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center mb-[-1px] p-[8px] relative shrink-0 size-[32px]" data-name="Component 65">
          <div className="relative shrink-0 size-[20px]" data-name="Payments">
            <div className="absolute inset-[12.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.417px_-2.417px] mask-size-[20px_20px]" data-name="monetization_on" style={{ maskImage: `url('${imgHome}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.1666 15.1666">
                <path d={svgPaths.p3d180f80} fill="var(--fill-0, #303030)" id="monetization_on" />
              </svg>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center mb-[-1px] p-[8px] relative shrink-0 size-[32px]" data-name="Component 66">
          <div className="relative shrink-0 size-[20px]" data-name="Appointments">
            <div className="absolute inset-[11.6%_17.08%_12.08%_17.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-3.417px_-2.321px] mask-size-[20px_20px]" data-name="calendar_month" style={{ maskImage: `url('${imgHome}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1666 15.2628">
                <path d={svgPaths.p1e88cfb0} fill="var(--fill-0, #303030)" id="calendar_month" />
              </svg>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center mb-[-1px] p-[8px] relative shrink-0 size-[32px]" data-name="Component 67">
          <div className="relative shrink-0 size-[20px]" data-name="Social">
            <div className="absolute inset-[16.6%_11.6%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.321px_-3.321px] mask-size-[20px_20px]" data-name="workspaces" style={{ maskImage: `url('${imgHome}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.3589 13.3589">
                <path d={svgPaths.p210b2470} fill="var(--fill-0, #303030)" id="workspaces" />
              </svg>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center mb-[-1px] p-[8px] relative shrink-0 size-[32px]" data-name="Component 68">
          <div className="relative shrink-0 size-[20px]" data-name="Surveys">
            <div className="absolute inset-[9.58%_17.08%_17.08%_17.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-3.417px_-1.917px] mask-size-[20px_20px]" data-name="assignment_turned_in" style={{ maskImage: `url('${imgHome}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1666 14.6666">
                <path d={svgPaths.p1271780} fill="var(--fill-0, #303030)" id="assignment_turned_in" />
              </svg>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center mb-[-1px] p-[8px] relative shrink-0 size-[32px]" data-name="Component 69">
          <div className="relative shrink-0 size-[20px]" data-name="Ticketing">
            <div className="absolute inset-[12.56%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.513px_-2.513px] mask-size-[20px_20px]" data-name="shapes" style={{ maskImage: `url('${imgHome}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.9743 14.9743">
                <path d={svgPaths.p2af55f00} fill="var(--fill-0, #303030)" id="shapes" />
              </svg>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center mb-[-1px] p-[8px] relative shrink-0 size-[32px]" data-name="Component 70">
          <div className="relative shrink-0 size-[20px]" data-name="Contacts">
            <div className="absolute inset-[22.87%_13.33%_22.88%_13.33%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.665px_-4.575px] mask-size-[20px_20px]" data-name="group" style={{ maskImage: `url('${imgHome}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6698 10.8485">
                <path d={svgPaths.p1cc6aa00} fill="var(--fill-0, #303030)" id="group" />
              </svg>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center mb-[-1px] p-[8px] relative shrink-0 size-[32px]" data-name="Component 71">
          <div className="relative shrink-0 size-[20px]" data-name="Campaigns">
            <div className="absolute inset-[20.51%_11.76%_20.67%_11.76%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.353px_-4.103px] mask-size-[20px_20px]" data-name="campaign" style={{ maskImage: `url('${imgHome}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.2948 11.7626">
                <path d={svgPaths.p2cdd75c0} fill="var(--fill-0, #303030)" id="campaign" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-[#dfe8f1] content-stretch flex flex-col items-center justify-center mb-[-1px] p-[8px] relative rounded-[24px] shrink-0 size-[32px]" data-name="Component 72">
          <div className="relative shrink-0 size-[20px]" data-name="Reports">
            <div className="absolute inset-[19.29%_19.29%_19.4%_19.34%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-3.867px_-3.859px] mask-size-[20px_20px]" data-name="pie_chart" style={{ maskImage: `url('${imgHome}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.274 12.2612">
                <path d={svgPaths.p376bbff0} fill="var(--fill-0, #1976D2)" id="pie_chart" />
              </svg>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center mb-[-1px] p-[8px] relative shrink-0 size-[32px]" data-name="Component 73">
          <div className="relative shrink-0 size-[20px]" data-name="Insights">
            <div className="absolute inset-[12.08%_22.08%_11.91%_22.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4.417px_-2.417px] mask-size-[20px_20px]" data-name="emoji_objects" style={{ maskImage: `url('${imgHome}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.1666 15.2018">
                <path d={svgPaths.p140b9400} fill="var(--fill-0, #303030)" id="emoji_objects" />
              </svg>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center mb-[-1px] p-[8px] relative shrink-0 size-[32px]" data-name="Component 74">
          <div className="relative shrink-0 size-[20px]" data-name="Competitors">
            <div className="absolute inset-[17.08%_14.58%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.917px_-3.417px] mask-size-[20px_20px]" data-name="leaderboard" style={{ maskImage: `url('${imgHome}')` }}>
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

export default function Frame21() {
  return (
    <div className="relative size-full">
      <Component />
      <div className="absolute h-[900px] left-0 top-0 w-[1487px]" data-name="Component 153">
        <div className="absolute h-[900px] inset-[0_96.13%_0_0] pointer-events-none">
          <div className="bg-[#e5e9f0] content-stretch flex flex-col items-start pointer-events-auto sticky top-0" data-name="Primary Rail Nav">
            <Frame2 />
            <MainNav />
          </div>
        </div>
        <Title />
        <div className="absolute bg-[#e0e5eb] inset-[0_0_93.78%_19.75%]" data-name="Top Nav">
          <div className="content-stretch flex flex-col items-end justify-center overflow-clip px-[24px] py-[12px] relative rounded-[inherit] size-full">
            <Frame5 />
          </div>
          <div aria-hidden="true" className="absolute border-[#e9e9eb] border-b border-solid inset-0 pointer-events-none" />
        </div>
      </div>
      <AiAgentUi />
      <ContentBar />
      <div className="absolute h-[900px] inset-[0_97.2%_0_0] pointer-events-none">
        <div className="bg-[#e5e9f0] content-stretch flex flex-col items-start pointer-events-auto sticky top-0" data-name="Primary Rail Nav">
          <Frame4 />
          <MainNav1 />
        </div>
      </div>
    </div>
  );
}