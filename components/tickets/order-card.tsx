import { Ban, CircleCheck, Ticket } from "lucide-react";
import { DetailRow } from "@/components/booking/detail-row";
import { CancelOrderButton } from "./cancel-order-button";
import { formatSeanceDateTime, formatSeatsByRow } from "@/lib/booking";
import { getOrderSeance, getOrderSeats } from "@/lib/orders";
import type { UserOrder } from "@/lib/types/cinema";
import { cn } from "@/lib/utils";

const statuses = {
  PAID: { label: "paid", icon: CircleCheck, className: "bg-green-light" },
  CANCELED: { label: "cancelled", icon: Ban, className: "bg-red-light" },
};

type OrderCardProps = {
  order: UserOrder;
  // Active orders can be returned; the history only shows them.
  canCancel: boolean;
};

// One card per order: the API returns and cancels tickets order by order.
export function OrderCard({ order, canCancel }: OrderCardProps) {
  const { date, time } = getOrderSeance(order);
  const status = statuses[order.status];

  return (
    <article className="flex flex-col gap-1 rounded-[24px] border border-primary p-4">
      <div className="flex items-start justify-between">
        <div className="flex flex-col font-medium">
          <p className="text-sm leading-5.5 text-surface">Order</p>
          <p className="text-2xl leading-8">{order.orderNumber}</p>
        </div>
        {canCancel && (
          <span className="flex rounded-full bg-pink-medium p-3.5 text-primary-foreground">
            <Ticket className="size-5" />
          </span>
        )}
      </div>
      <p
        className={cn(
          "flex min-h-6 items-center gap-2 self-start rounded-full px-4 py-2 text-xs leading-4 font-bold",
          status.className,
        )}
      >
        {status.label}
        <status.icon className="size-4" />
      </p>
      <DetailRow size="sm" label="Film" value={order.film.name} />
      <DetailRow size="sm" label="Date and time" value={formatSeanceDateTime(date, time)} />
      <DetailRow size="sm" label="Seats" value={formatSeatsByRow(getOrderSeats(order))} />
      {canCancel && (
        <CancelOrderButton
          orderId={order._id}
          filmId={order.film.id}
          ticketCount={order.tickets.length}
        />
      )}
    </article>
  );
}
