import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StepProgress } from "./step-progress";

const meta = {
  component: StepProgress,
  args: { step: 1 },
  argTypes: { step: { control: { type: "range", min: 1, max: 4 } } },
} satisfies Meta<typeof StepProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstStep: Story = {};

export const LastStep: Story = {
  args: { step: 4 },
};
