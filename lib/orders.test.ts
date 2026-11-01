import { expect, it } from "vitest";
import { filterOrders } from "./orders";
import type { UserOrder } from "./types/cinema";
import { order } from "@/.storybook/fixtures";

function makeOrder(orderNumber: number, status: UserOrder["status"], date: string): UserOrder {
  return {
    ...order,
    _id: String(orderNumber),
    orderNumber,
    status,
    tickets: order.tickets.map((ticket) => ({ ...ticket, seance: { date, time: "19:00" } })),
  };
}

const now = new Date(2026, 9, 20, 12, 0); // October 20, 2026, noon
const orders = [
  makeOrder(1, "PAID", "19.10.26"), // already shown
  makeOrder(2, "PAID", "21.10.26"),
  makeOrder(3, "CANCELED", "22.10.26"),
  makeOrder(4, "PAID", "20.10.26"), // tonight at 19:00
];

it("active shows paid orders that haven't started, newest first", () => {
  expect(filterOrders(orders, "active", now).map((o) => o.orderNumber)).toEqual([4, 2]);
});

it("history shows every order, newest first", () => {
  expect(filterOrders(orders, "history", now).map((o) => o.orderNumber)).toEqual([4, 3, 2, 1]);
});
