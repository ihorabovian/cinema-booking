import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

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

type FormFieldProps<Values extends FieldValues, Output> = FieldConfig<Path<Values>> & {
  control: Control<Values, unknown, Output>;
  required: boolean;
  className?: string;
};

export const inputClassName =
  "h-10 rounded-full bg-primary-foreground px-4 py-0 text-xl leading-6 text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.05)] md:text-xl";

// The Controller + Field pattern from the shadcn React Hook Form guide.
export function FormField<Values extends FieldValues, Output>({
  control,
  name,
  label,
  mask,
  required,
  className,
  ...inputProps
}: FormFieldProps<Values, Output>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={cn("gap-1", className)}>
          <FieldLabel htmlFor={field.name} className="leading-5.5">
            {required ? `${label}*` : label}
          </FieldLabel>
          <Input
            {...field}
            {...inputProps}
            id={field.name}
            aria-invalid={fieldState.invalid}
            aria-required={required}
            onChange={(event) =>
              field.onChange(mask ? mask(event.target.value) : event.target.value)
            }
            className={inputClassName}
          />
          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} className="leading-5.5" />
          )}
        </Field>
      )}
    />
  );
}
