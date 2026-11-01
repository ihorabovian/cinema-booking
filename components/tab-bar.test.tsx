import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { expect, it, vi } from "vitest";
import { TabBar } from "./tab-bar";

vi.mock("next/navigation", () => ({ usePathname: vi.fn() }));

it("links to every section", () => {
  vi.mocked(usePathname).mockReturnValue("/");
  render(<TabBar />);

  expect(screen.getByRole("link", { name: "Films" })).toHaveAttribute("href", "/");
  expect(screen.getByRole("link", { name: "Tickets" })).toHaveAttribute("href", "/tickets");
  expect(screen.getByRole("link", { name: "Profile" })).toHaveAttribute("href", "/profile");
});

it.each(["Films", "Tickets", "Profile"])("marks %s as the current page", (label) => {
  const paths: Record<string, string> = { Films: "/", Tickets: "/tickets", Profile: "/profile" };
  vi.mocked(usePathname).mockReturnValue(paths[label]);
  render(<TabBar />);

  expect(screen.getByRole("link", { name: label })).toHaveAttribute("aria-current", "page");
  expect(screen.getAllByRole("link").filter((link) => link.hasAttribute("aria-current"))).toHaveLength(1);
});
