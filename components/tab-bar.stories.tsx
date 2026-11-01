import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TabBar } from "./tab-bar";

// The tab bar shows only on phones.
const meta = {
  component: TabBar,
  globals: { viewport: { value: "mobile1" } },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof TabBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Films: Story = {
  parameters: { nextjs: { navigation: { pathname: "/" } } },
};

export const Tickets: Story = {
  parameters: { nextjs: { navigation: { pathname: "/tickets" } } },
};
