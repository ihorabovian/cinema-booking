import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SeatMap } from "./seat-map";
import { sortSeats, type SelectedSeat } from "@/lib/booking";
import { places, selectedSeats } from "@/.storybook/fixtures";

const meta = {
  component: SeatMap,
  args: { places, selectedSeats, onToggle: () => {} },
  // Seats toggle the way they do on the booking page.
  render: function Render(args) {
    const [seats, setSeats] = useState(args.selectedSeats);

    function toggle(seat: SelectedSeat) {
      const isSame = (s: SelectedSeat) => s.row === seat.row && s.seat === seat.seat;
      setSeats(seats.some(isSame) ? seats.filter((s) => !isSame(s)) : sortSeats([...seats, seat]));
    }

    return <SeatMap {...args} selectedSeats={seats} onToggle={toggle} />;
  },
} satisfies Meta<typeof SeatMap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithSelection: Story = {};

export const Empty: Story = {
  args: { selectedSeats: [] },
};
