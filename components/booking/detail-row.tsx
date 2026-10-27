import { cn } from "@/lib/utils";

type DetailRowProps = {
  label: string;
  value: React.ReactNode;
  // The success screen uses a smaller value text than the booking steps.
  size?: "md" | "sm";
};

export function DetailRow({ label, value, size = "md" }: DetailRowProps) {
  return (
    <div className={cn("flex flex-col", size === "md" ? "gap-0.5" : "gap-1")}>
      <p className="text-sm leading-5.5 font-medium text-surface">{label}</p>
      <p
        className={cn(
          size === "md" ? "text-lg leading-6.5" : "text-base leading-6 font-medium",
        )}
      >
        {value}
      </p>
    </div>
  );
}
