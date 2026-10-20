"use client";

import type { z } from "zod";
import { FormField, type FieldConfig } from "./form-field";
import { StepActions } from "./step-actions";
import { useSchemaForm, type FieldName } from "@/lib/use-schema-form";

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

export type StepFormHandlers<Schema extends z.ZodObject> = {
  defaultValues?: Partial<Record<FieldName<Schema>, string>>;
  onBack: () => void;
  onSubmit: (values: z.output<Schema>) => void;
};

type StepFormProps<Schema extends z.ZodObject> = StepFormHandlers<Schema> & {
  schema: Schema;
  groups: FieldConfig<FieldName<Schema>>[][];
  layout: keyof typeof layouts;
  submitLabel: string;
};

// A booking step form built from a schema and a list of field groups.
export function StepForm<Schema extends z.ZodObject>({
  schema,
  groups,
  layout,
  submitLabel,
  defaultValues,
  onBack,
  onSubmit,
}: StepFormProps<Schema>) {
  const { handleSubmit, handleChange, getFieldProps } = useSchemaForm({
    schema,
    defaultValues,
    onSubmit,
  });
  const classNames = layouts[layout];

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      onChange={handleChange}
      className="flex flex-col gap-6"
    >
      <div className={classNames.fields}>
        {groups.map((group, index) => (
          <div key={index} className={classNames.group}>
            {group.map((field) => (
              <FormField key={field.name} {...field} {...getFieldProps(field.name)} />
            ))}
          </div>
        ))}
      </div>

      <StepActions back={{ onClick: onBack }} submitLabel={submitLabel} />
    </form>
  );
}
