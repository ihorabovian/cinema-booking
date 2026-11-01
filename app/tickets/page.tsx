import type { Metadata } from "next";
import Link from "next/link";
import { MobileHeader } from "@/components/mobile-header";
import { TabBar } from "@/components/tab-bar";
import { OrderCard } from "@/components/tickets/order-card";
import { OrderTabs } from "@/components/tickets/order-tabs";
import { requireUser } from "@/lib/auth";
import { getCinemaOrders } from "@/lib/cinema-api";
import { filterOrders, ORDER_TABS, type OrderTab } from "@/lib/orders";

export const metadata: Metadata = {
  title: "My tickets · Cinema",
};

const emptyMessages: Record<OrderTab, string> = {
  active: "You have no upcoming tickets.",
  history: "You haven't bought any tickets yet.",
};

export default async function TicketsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab: tabParam } = await searchParams;
  const tab = ORDER_TABS.find((t) => t === tabParam) ?? "active";
  const { token } = await requireUser(tab === "active" ? "/tickets" : `/tickets?tab=${tab}`);
  const orders = filterOrders(await getCinemaOrders(token), tab, new Date());

  return (
    <main>
      <MobileHeader title="Tickets" />

      {/* pb-28 on phones leaves room for the fixed tab bar */}
      <div className="mx-auto flex max-w-page flex-col gap-6 px-4 pt-6 pb-28 md:px-[120px] md:pt-12 md:pb-16">
        <h1 className="hidden text-2xl leading-8 font-bold md:block">Ticket history</h1>
        <OrderTabs current={tab} />

        {orders.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-3">
            {orders.map((order) => (
              <OrderCard key={order._id} order={order} canCancel={tab === "active"} />
            ))}
          </div>
        ) : (
          <p className="text-base leading-6 font-medium text-surface">
            {emptyMessages[tab]}{" "}
            <Link href="/" className="text-foreground underline underline-offset-4">
              Choose a film
            </Link>
          </p>
        )}
      </div>

      <TabBar />
    </main>
  );
}
