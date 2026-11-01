import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { ConfirmDialog } from "./confirm-dialog";
import { Button } from "./ui/button";

const meta = {
  component: ConfirmDialog,
  args: {
    title: "Are you sure you want to sign out?",
    confirmLabel: "Sign out",
    cancelLabel: "Cancel",
    confirmVariant: "default",
    onConfirm: fn(async (): Promise<string | void> => {}),
    children: <Button className="h-13 rounded-full px-6">Open dialog</Button>,
  },
} satisfies Meta<typeof ConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SignOut: Story = {};

export const ReturnTickets: Story = {
  args: {
    title: "Are you sure you want to return the tickets?",
    confirmLabel: "Return",
    confirmVariant: "secondary",
  },
};

export const WithError: Story = {
  args: { onConfirm: fn(async () => "Couldn't return the tickets. Please try again") },
};
