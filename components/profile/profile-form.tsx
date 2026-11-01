"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, inputClassName, type FieldConfig } from "@/components/booking/form-field";
import { SignOutButton } from "@/components/sign-out-button";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { saveProfile } from "@/lib/actions/profile";
import { profileSchema, type ProfileForm as ProfileValues } from "@/lib/schemas/auth";

const buttonClassName = "h-13 w-full rounded-full px-6";

const nameFields: FieldConfig<keyof ProfileValues>[] = [
  { name: "lastName", label: "Last name", placeholder: "Smith", autoComplete: "family-name" },
  { name: "firstName", label: "First name", placeholder: "John", autoComplete: "given-name" },
  { name: "middleName", label: "Middle name", placeholder: "Robert", autoComplete: "additional-name" },
];

const emailField: FieldConfig<keyof ProfileValues> = {
  name: "email",
  label: "Email",
  type: "email",
  placeholder: "Email",
  autoComplete: "email",
};

const cityField: FieldConfig<keyof ProfileValues> = {
  name: "city",
  label: "City",
  placeholder: "Toronto",
  autoComplete: "address-level2",
};

type ProfileFormProps = {
  defaultValues: ProfileValues;
  // Shown, not edited: the phone is what the user signs in with.
  phone: string;
};

export function ProfileForm({ defaultValues, phone }: ProfileFormProps) {
  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });
  const [status, setStatus] = useState<{ ok: boolean; message: string }>();

  async function submit(values: ProfileValues) {
    const result = await saveProfile(values);
    setStatus(
      result.ok
        ? { ok: true, message: "Your details have been updated" }
        : { ok: false, message: result.error },
    );
  }

  const field = (config: FieldConfig<keyof ProfileValues>, className?: string) => (
    <FormField
      key={config.name}
      control={form.control}
      required={!profileSchema.shape[config.name].safeParse("").success}
      className={className}
      {...config}
    />
  );

  return (
    <form noValidate onSubmit={form.handleSubmit(submit)} className="flex flex-col gap-6">
      {/* Phones list city before the contacts; desktop puts the contacts in a second column. */}
      <div className="flex flex-col gap-4 md:grid md:grid-flow-col md:grid-cols-[342px_342px] md:grid-rows-3 md:gap-x-10">
        {nameFields.map((config) => field(config))}
        <Field className="order-1 gap-1 md:order-none">
          <FieldLabel htmlFor="phone" className="leading-5.5">
            Phone
          </FieldLabel>
          <Input id="phone" value={phone} readOnly className={inputClassName} />
        </Field>
        {field(emailField, "order-1 md:order-none")}
        {field(cityField)}
      </div>

      <div className="flex w-full flex-col gap-4 md:w-[343px]">
        <Button
          type="submit"
          variant="secondary"
          disabled={form.formState.isSubmitting}
          className={buttonClassName}
        >
          Update details
        </Button>
        <SignOutButton>
          <Button type="button" className={buttonClassName}>
            Sign out
          </Button>
        </SignOutButton>
        {status && (
          <p
            role={status.ok ? "status" : "alert"}
            className={status.ok ? "text-sm text-surface" : "text-sm text-destructive"}
          >
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}
