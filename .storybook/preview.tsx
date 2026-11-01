import type { Preview } from "@storybook/nextjs-vite";
import { Nunito } from "next/font/google";
import { sb } from "storybook/test";
import "../app/globals.css";

// Server Actions reach the real API; stories use the stand-ins in __mocks__ instead.
sb.mock("../lib/actions/orders.ts");

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

// The app sets the font on <html>, so dialogs rendered in a portal get it too.
document.documentElement.classList.add("font-sans", nunito.variable);

const preview: Preview = {
  parameters: {
    nextjs: { appDirectory: true },
    layout: "padded",
  },
};

export default preview;
