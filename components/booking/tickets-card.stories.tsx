import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TicketsCard } from "./tickets-card";
import { seance, selectedSeats } from "@/.storybook/fixtures";

const meta = {
  component: TicketsCard,
  args: { seance, seats: selectedSeats },
} satisfies Meta<typeof TicketsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithSeats: Story = {};

export const NoSeats: Story = {
  args: { seats: [] },
};
