import Link from "next/link";
import { Button } from "@/components/ui/button";

const buttonClassName = "h-13 flex-1 rounded-full px-6";

type StepActionsProps = {
  // The first step goes back to the film page, the others to the previous step.
  back: { href: string } | { onClick: () => void };
  submitLabel: string;
  submitDisabled?: boolean;
  // Without onSubmit the button submits the surrounding form.
  onSubmit?: () => void;
};

export function StepActions({
  back,
  submitLabel,
  submitDisabled,
  onSubmit,
}: StepActionsProps) {
  return (
    <div className="flex gap-4">
      {"href" in back ? (
        <Button asChild variant="secondary" className={buttonClassName}>
          <Link href={back.href}>Back</Link>
        </Button>
      ) : (
        <Button
          type="button"
          variant="secondary"
          onClick={back.onClick}
          className={buttonClassName}
        >
          Back
        </Button>
      )}
      <Button
        type={onSubmit ? "button" : "submit"}
        onClick={onSubmit}
        disabled={submitDisabled}
        className={buttonClassName}
      >
        {submitLabel}
      </Button>
    </div>
  );
}
