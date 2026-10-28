"use client";

import { useState, useTransition } from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const buttonClassName = "h-13 w-full rounded-full px-6";

type ConfirmDialogProps = {
  // The button that opens the dialog.
  children: React.ReactNode;
  title: string;
  confirmLabel: string;
  cancelLabel: string;
  // The designs swap the styles: "Sign out" is the dark button, "Return" the light one.
  confirmVariant: "default" | "secondary";
  // Returns an error to show, or nothing when the action succeeded.
  onConfirm: () => Promise<string | void>;
};

// Asks before an action that can't be undone. A modal on desktop, a bottom sheet on phones.
export function ConfirmDialog({
  children,
  title,
  confirmLabel,
  cancelLabel,
  confirmVariant,
  onConfirm,
}: ConfirmDialogProps) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();

  function confirm() {
    startTransition(async () => {
      const result = await onConfirm();
      if (result) {
        setError(result);
      } else {
        setOpen(false);
      }
    });
  }

  const confirmButton = (
    <Button
      variant={confirmVariant}
      disabled={isPending}
      onClick={confirm}
      className={buttonClassName}
    >
      {confirmLabel}
    </Button>
  );
  const cancelButton = (
    <DialogClose asChild>
      <Button
        variant={confirmVariant === "default" ? "secondary" : "default"}
        disabled={isPending}
        className={buttonClassName}
      >
        {cancelLabel}
      </Button>
    </DialogClose>
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        setError(undefined);
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="bg-primary/30 supports-backdrop-filter:backdrop-blur-none" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className={cn(
            "fixed inset-x-0 bottom-0 z-50 flex flex-col items-center gap-4 rounded-t-[24px] bg-background px-4 pt-4 pb-6 outline-none",
            "md:inset-x-auto md:top-1/2 md:bottom-auto md:left-1/2 md:w-[544px] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-[24px] md:py-6",
          )}
        >
          <div className="hidden w-full justify-end md:flex">
            <DialogClose asChild>
              <Button variant="ghost" size="icon" className="size-10 rounded-lg">
                <X className="size-5" />
                <span className="sr-only">Close</span>
              </Button>
            </DialogClose>
          </div>
          <div className="flex w-full flex-col items-center gap-4 md:px-8">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden>
              <circle cx="40" cy="40" r="28" className="fill-primary" />
              <path
                d="M32 31.4097C32.6452 29.606 33.9188 28.0851 35.5951 27.1163C37.2714 26.1474 39.2422 25.7933 41.1586 26.1166C43.075 26.4398 44.8132 27.4196 46.0654 28.8823C47.3176 30.3451 48.0029 32.1965 48 34.1085C48 39.5061 39.7667 42.205 39.7667 42.205M39.9867 53H40.0141"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="stroke-primary-foreground"
              />
            </svg>
            <DialogTitle className="px-2 py-3 text-center text-2xl leading-8 font-bold">
              {title}
            </DialogTitle>
            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}
            <div className="flex w-full flex-col gap-4">
              {confirmVariant === "secondary" ? confirmButton : cancelButton}
              {confirmVariant === "secondary" ? cancelButton : confirmButton}
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
