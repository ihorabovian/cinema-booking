import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { OrderCard } from "./order-card";
import { order } from "@/.storybook/fixtures";

const meta = {
  component: OrderCard,
  args: { order, canCancel: false },
  decorators: [(Story) => <div className="max-w-[384px]"><Story /></div>],
} satisfies Meta<typeof OrderCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: { canCancel: true },
};

export const Paid: Story = {};

export const Cancelled: Story = {
  args: { order: { ...order, status: "CANCELED" } },
};
