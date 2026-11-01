import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { PersonForm } from "./person-form";

const meta = {
  component: PersonForm,
  args: { onBack: fn(), onSubmit: fn() },
} satisfies Meta<typeof PersonForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

// How the form opens for a signed-in user.
export const FromProfile: Story = {
  args: {
    defaultValues: {
      lastName: "Smith",
      firstName: "John",
      middleName: "Robert",
      phone: "(416) 555-0123",
      city: "Toronto",
      email: "john.smith@example.com",
    },
  },
};
