import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    // Fixed to the viewport so the spinner sits in the middle of the screen, under the header too
    <div
      role="status"
      className="pointer-events-none fixed inset-0 flex items-center justify-center"
    >
      <LoaderCircle className="size-10 animate-spin text-primary" />
      <span className="sr-only">Loading</span>
    </div>
  );
}
