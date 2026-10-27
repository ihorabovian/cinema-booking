import { cn } from "@/lib/utils";

const widthByStep = ["w-1/4", "w-1/2", "w-3/4", "w-full"];

type StepProgressProps = {
  // Counted from 1.
  step: number;
};

export function StepProgress({ step }: StepProgressProps) {
  const total = widthByStep.length;

  return (
    <div className="flex flex-col">
      <p className="pb-1 text-sm leading-5.5 font-medium">
        Step {step} of {total}
      </p>
      <div
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={step}
        aria-label="Booking progress"
        className="h-1 rounded-2xl bg-muted"
      >
        <div
          className={cn("h-full rounded-2xl bg-pink-medium", widthByStep[step - 1])}
        />
      </div>
    </div>
  );
}
