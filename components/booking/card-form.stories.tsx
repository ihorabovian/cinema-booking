import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { CardForm } from "./card-form";

const meta = {
  component: CardForm,
  args: { onBack: fn(), onSubmit: fn() },
} satisfies Meta<typeof CardForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const PaymentFailed: Story = {
  args: { error: "Payment failed. Please try again" },
};
