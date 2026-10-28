"use client";

import { ConfirmDialog } from "@/components/confirm-dialog";
import { Button } from "@/components/ui/button";
import { cancelOrder } from "@/lib/actions/orders";

type CancelOrderButtonProps = {
  orderId: string;
  filmId: string;
  ticketCount: number;
};

export function CancelOrderButton({ orderId, filmId, ticketCount }: CancelOrderButtonProps) {
  const tickets = ticketCount === 1 ? "ticket" : "tickets";

  return (
    <ConfirmDialog
      title={`Are you sure you want to return the ${tickets}?`}
      confirmLabel="Return"
      cancelLabel="Cancel"
      confirmVariant="secondary"
      onConfirm={async () => {
        const result = await cancelOrder(orderId, filmId);
        if (!result.ok) return result.error;
      }}
    >
      <Button variant="secondary" className="mt-3 h-13 w-full rounded-full px-6">
        Return {tickets}
      </Button>
    </ConfirmDialog>
  );
}
