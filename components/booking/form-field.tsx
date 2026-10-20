import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

// Static description of a field. Forms keep these in arrays and render them in a loop.
export type FieldConfig<Name extends string = string> = {
  name: Name;
  label: string;
  // Formats the value while the user types, e.g. a phone number.
  mask?: (value: string) => string;
} & Pick<
  React.ComponentProps<"input">,
  "type" | "inputMode" | "autoComplete" | "placeholder"
>;

type FormFieldProps = FieldConfig & {
  required: boolean;
  error?: string;
  defaultValue?: string;
};

export function FormField({
  name,
  label,
  mask,
  required,
  error,
  ...inputProps
}: FormFieldProps) {
  const invalid = Boolean(error);

  return (
    <Field data-invalid={invalid} className="gap-1">
      <FieldLabel htmlFor={name} className="leading-5.5">
        {required ? `${label}*` : label}
      </FieldLabel>
      <Input
        id={name}
        name={name}
        aria-invalid={invalid}
        aria-required={required}
        // The input is uncontrolled, so the mask rewrites its value in place.
        onChange={
          mask &&
          ((event) => {
            event.currentTarget.value = mask(event.currentTarget.value);
          })
        }
        className="h-10 rounded-full bg-primary-foreground px-4 py-0 text-xl leading-6 text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.05)] md:text-xl"
        {...inputProps}
      />
      <FieldError className="leading-5.5">{error}</FieldError>
    </Field>
  );
}
