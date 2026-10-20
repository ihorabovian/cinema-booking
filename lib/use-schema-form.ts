import { useState } from "react";
import type { z } from "zod";

export type FieldName<Schema extends z.ZodObject> = keyof z.input<Schema> & string;

type FieldValues = Partial<Record<string, string>>;

type UseSchemaFormOptions<Schema extends z.ZodObject> = {
  schema: Schema;
  defaultValues?: FieldValues;
  onSubmit: (values: z.output<Schema>) => void;
};

// Uncontrolled form validated by a zod schema on submit.
export function useSchemaForm<Schema extends z.ZodObject>({
  schema,
  defaultValues,
  onSubmit,
}: UseSchemaFormOptions<Schema>) {
  const [errors, setErrors] = useState<FieldValues>({});

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = schema.safeParse(
      Object.fromEntries(new FormData(event.currentTarget)),
    );

    if (result.success) {
      setErrors({});
      onSubmit(result.data);
      return;
    }

    // One message per field: the first rule it breaks.
    const nextErrors: FieldValues = {};
    for (const issue of result.error.issues) {
      nextErrors[String(issue.path[0])] ??= issue.message;
    }
    setErrors(nextErrors);
  }

  // Listens on the form, so a field's error clears as soon as the user edits it.
  function handleChange(event: React.FormEvent<HTMLFormElement>) {
    const { name } = event.target as HTMLInputElement;

    setErrors((current) =>
      current[name] ? { ...current, [name]: undefined } : current,
    );
  }

  function getFieldProps(name: FieldName<Schema>) {
    const rule: z.ZodType = schema.shape[name];

    return {
      // A field is required when the schema rejects an empty value.
      required: !rule.safeParse("").success,
      error: errors[name],
      defaultValue: defaultValues?.[name],
    };
  }

  return { handleSubmit, handleChange, getFieldProps };
}
