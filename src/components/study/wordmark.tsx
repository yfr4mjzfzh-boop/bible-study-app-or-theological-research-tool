import { t } from "@/lib/i18n";
import { useStudy } from "@/lib/study-store";
import { cn } from "@/lib/utils";

export function Wordmark({
  compact = false,
  active = false,
}: {
  compact?: boolean;
  active?: boolean;
}) {
  const locale = useStudy((s) => s.locale);
  return (
    <span className="flex min-w-0 items-center gap-2.5">
      <img
        src="/seal.png"
        alt=""
        width={36}
        height={36}
        className={cn(
          "tl-seal size-9 shrink-0 object-cover",
          active && "ring-1 ring-oxblood/40",
        )}
        draggable={false}
      />
      <span className={compact ? "hidden min-w-0 text-left sm:block" : "min-w-0 text-left"}>
        <span className="font-display block text-sm font-semibold leading-none tracking-tight text-ink">
          Theos Logos
        </span>
        <span className="mt-0.5 block text-2xs font-medium tracking-[0.16em] text-faint uppercase">
          {t(locale, "scriptureFirst")}
        </span>
      </span>
    </span>
  );
}
