import { StepForm, type StepFormHandlers } from "./step-form";
import type { FieldConfig } from "./form-field";
import { maskCardNumber, maskCvv, maskExpiry } from "@/lib/input-masks";
import { cardSchema, type CardDetails } from "@/lib/schemas/booking";

// The card number on its own row, expiry and CVV side by side under it.
const groups: FieldConfig<keyof CardDetails>[][] = [
  [
    {
      name: "pan",
      label: "Card number",
      inputMode: "numeric",
      placeholder: "0000 0000 0000 0000",
      autoComplete: "cc-number",
      mask: maskCardNumber,
    },
  ],
  [
    {
      name: "expireDate",
      label: "Expiry",
      inputMode: "numeric",
      placeholder: "00/00",
      autoComplete: "cc-exp",
      mask: maskExpiry,
    },
    {
      name: "cvv",
      label: "CVV",
      type: "password",
      inputMode: "numeric",
      placeholder: "0000",
      autoComplete: "cc-csc",
      mask: maskCvv,
    },
  ],
];

export function CardForm(props: StepFormHandlers<typeof cardSchema>) {
  return (
    <StepForm
      schema={cardSchema}
      groups={groups}
      layout="rows"
      submitLabel="Pay"
      {...props}
    />
  );
}
