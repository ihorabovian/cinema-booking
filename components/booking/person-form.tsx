import { StepForm, type StepFormHandlers } from "./step-form";
import type { FieldConfig } from "./form-field";
import { maskPhone } from "@/lib/input-masks";
import { personSchema, type PersonDetails } from "@/lib/schemas/booking";

// Name on the left, contacts on the right.
const groups: FieldConfig<keyof PersonDetails>[][] = [
  [
    { name: "lastName", label: "Last name", placeholder: "Smith", autoComplete: "family-name" },
    { name: "firstName", label: "First name", placeholder: "John", autoComplete: "given-name" },
    { name: "middleName", label: "Middle name", placeholder: "Robert", autoComplete: "additional-name" },
  ],
  [
    {
      name: "phone",
      label: "Phone",
      type: "tel",
      placeholder: "(416) 555-0123",
      autoComplete: "tel-national",
      mask: maskPhone,
    },
    { name: "city", label: "City", placeholder: "Toronto", autoComplete: "address-level2" },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "john.smith@example.com",
      autoComplete: "email",
    },
  ],
];

export function PersonForm(props: StepFormHandlers<typeof personSchema>) {
  return (
    <StepForm
      schema={personSchema}
      groups={groups}
      layout="columns"
      submitLabel="Continue"
      {...props}
    />
  );
}
