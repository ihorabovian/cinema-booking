"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  type DefaultValues,
  type FieldValues,
  type Path,
} from "react-hook-form";
import type { z } from "zod";
import { FormField, type FieldConfig } from "./form-field";
import { StepActions } from "./step-actions";

const layouts = {
  // Each group is a column; on desktop the columns sit side by side.
  columns: {
    fields: "grid gap-6 md:grid-cols-[328px_328px] md:justify-between",
    group: "flex flex-col gap-6",
  },
  // Each group is a row whose fields share its width.
  rows: {
    fields: "flex w-full flex-col gap-4 md:w-70",
    group: "flex gap-4 *:min-w-0 *:flex-1",
  },
};

// An object schema whose values are the same before and after parsing (text fields).
type FormSchema<Values extends FieldValues> = z.ZodType<Values, Values> & {
  shape: Record<string, z.ZodType>;
};

export type StepFormHandlers<Values extends FieldValues> = {
  defaultValues?: Partial<Values>;
  onBack: () => void;
  // While a returned promise is pending, the submit button stays disabled.
  onSubmit: (values: Values) => void | Promise<void>;
  // A form-wide error, such as a declined payment.
  error?: string;
};

type StepFormProps<Values extends FieldValues> = StepFormHandlers<Values> & {
  schema: FormSchema<Values>;
  groups: FieldConfig<Path<Values>>[][];
  layout: keyof typeof layouts;
  submitLabel: string;
};

// A booking step form: React Hook Form state, validated by a zod schema.
export function StepForm<Values extends FieldValues>({
  schema,
  groups,
  layout,
  submitLabel,
  defaultValues,
  onBack,
  onSubmit,
  error,
}: StepFormProps<Values>) {
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    // Every input is controlled, so each one starts from a string, never undefined.
    defaultValues: Object.fromEntries(
      groups.flat().map(({ name }) => [name, defaultValues?.[name] ?? ""]),
    ) as DefaultValues<Values>,
  });
  const classNames = layouts[layout];

  return (
    <form
      noValidate
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      <div className={classNames.fields}>
        {groups.map((group, index) => (
          <div key={index} className={classNames.group}>
            {group.map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                // The schema rejecting an empty value is what makes a field required.
                required={!schema.shape[field.name].safeParse("").success}
                {...field}
              />
            ))}
          </div>
        ))}
      </div>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
      <StepActions
        back={{ onClick: onBack }}
        submitLabel={submitLabel}
        submitDisabled={form.formState.isSubmitting}
      />
    </form>
  );
}
