import svgPaths from "./svg-9cf3hnfu8u";
import { imgFilterList } from "./svg-htljq";

export default function Button() {
  return (
    <div className="content-stretch flex items-center justify-center p-[8px] relative rounded-[8px] size-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e9f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="relative shrink-0 size-[20px]" data-name="filter_list">
        <div className="absolute inset-[27.08%_14.58%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.917px_-5.417px] mask-size-[20px_20px]" data-name="filter_list" style={{ maskImage: `url('${imgFilterList}')` }}>
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.1667 9.16667">
            <path d={svgPaths.p32d18bf0} fill="var(--fill-0, #303030)" id="filter_list" />
          </svg>
        </div>
      </div>
    </div>
  );
}