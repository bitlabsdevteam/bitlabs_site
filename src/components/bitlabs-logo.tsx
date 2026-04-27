import type { SVGProps } from "react";

type BitLabsLogoProps = {
  compact?: boolean;
  className?: string;
};

function LogoMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="1" y="1" width="42" height="42" rx="12" className="fill-[color:#10141a] stroke-[color:rgba(244,238,228,0.14)]" />
      <path
        d="M13 11V33M13 12.6H22.6C26.4 12.6 28.8 14.8 28.8 17.9C28.8 20.4 27.2 22.1 24.5 22.5C27.8 22.9 30.1 24.8 30.1 28.1C30.1 31.8 27.1 34 22.4 34H13"
        className="stroke-[color:#f4eee4]"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="31.7" cy="10.8" r="2.7" className="fill-[color:#d0ba96]" />
      <circle cx="10.3" cy="33.2" r="2.3" className="fill-[color:#8fb8c7]" />
      <path d="M24.5 22.5H31.4" className="stroke-[color:#d0ba96]" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export function BitLabsLogo({ compact = false, className = "" }: BitLabsLogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-9 w-9 shrink-0" aria-hidden />
      {!compact ? (
        <span className="inline-flex flex-col gap-0.5 leading-none text-[color:var(--ink)]">
          <span className="text-[1.05rem] font-semibold tracking-[0.04em]">BITLABS</span>
          <span className="text-[0.54rem] font-medium tracking-[0.18em] text-[color:var(--muted-ink)]">東京 AI研究開発</span>
        </span>
      ) : null}
    </span>
  );
}
