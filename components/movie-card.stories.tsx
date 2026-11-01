import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MovieCard } from "./movie-card";
import { film } from "@/.storybook/fixtures";

const meta = {
  component: MovieCard,
  args: { film },
} satisfies Meta<typeof MovieCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  decorators: [(Story) => <div className="w-[282px]"><Story /></div>],
};

export const LargeWithActors: Story = {
  args: { size: "large", showActors: true },
  decorators: [(Story) => <div className="w-[580px]"><Story /></div>],
};
