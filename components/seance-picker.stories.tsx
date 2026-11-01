import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SeancePicker } from "./seance-picker";
import { film, schedules } from "@/.storybook/fixtures";

const meta = {
  component: SeancePicker,
  args: { filmId: film.id, schedules },
} satisfies Meta<typeof SeancePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
