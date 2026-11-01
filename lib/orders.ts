import { parseScheduleDate } from "./booking";
import type { UserOrder } from "./types/cinema";

export const ORDER_TABS = ["active", "history"] as const;
export type OrderTab = (typeof ORDER_TABS)[number];

// All tickets of an order are for one seance.
export function getOrderSeance(order: UserOrder) {
  return order.tickets[0].seance;
}

function getSeanceStart(order: UserOrder) {
  const { date, time } = getOrderSeance(order);
  const [hours, minutes] = time.split(":").map(Number);
  const start = parseScheduleDate(date);
  start.setHours(hours, minutes);
  return start;
}

// Active: paid and not started yet, so it can still be returned.
// History: every order, the way the design lists paid and cancelled ones together.
export function filterOrders(orders: UserOrder[], tab: OrderTab, now: Date) {
  const sorted = orders.toSorted((a, b) => b.orderNumber - a.orderNumber);
  return tab === "history"
    ? sorted
    : sorted.filter((order) => order.status === "PAID" && getSeanceStart(order) > now);
}

export function getOrderSeats(order: UserOrder) {
  return order.tickets.map((ticket) => ({ row: ticket.row, seat: ticket.column }));
}
