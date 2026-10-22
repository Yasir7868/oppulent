import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { delay } from "@/lib/motion";

/** Glassy jump-link card that sits beside an inner-page headline. */
export function HeroLinkCard({
  num,
  title,
  text,
  href,
  wait,
}: {
  num: string;
  title: string;
  text: string;
  href: string;
  wait: number;
}) {
  return (
    <Link
      href={href}
      style={delay(wait)}
      className="rise card-lift spotlight group flex flex-col gap-2 rounded-[20px] border border-[rgba(120,170,255,0.24)] bg-[linear-gradient(160deg,rgba(20,38,72,0.78),rgba(9,17,34,0.85))] p-6 text-fg shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_30px_70px_rgba(0,0,0,0.45)] backdrop-blur-[14px] sm:p-7"
    >
      <span className="flex items-center justify-between">
        <span className="font-tech text-[0.6875rem] text-brand-light">{num}</span>
        <Icon
          name="arrowRight"
          size={18}
          className="rotate-90 text-brand-light transition-transform duration-300 group-hover:translate-y-0.5"
        />
      </span>
      <span className="font-display text-[1.375rem] font-semibold">{title}</span>
      <span className="text-[0.9rem] text-fg-3">{text}</span>
    </Link>
  );
}
