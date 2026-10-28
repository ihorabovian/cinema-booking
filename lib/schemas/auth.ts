import { z } from "zod";
import { emailSchema, personSchema, phoneSchema } from "./booking";

export const phoneFormSchema = z.object({ phone: phoneSchema });

export const codeFormSchema = z.object({
  code: z.string().regex(/^\d{4,6}$/, "Enter the code from the SMS"),
});

// The profile can't change the phone: it is the account's sign-in.
// Email and city may stay empty here, unlike at checkout.
export const profileSchema = personSchema.omit({ phone: true }).extend({
  city: z.string().trim(),
  email: z.union([z.literal(""), emailSchema]),
});

export type PhoneForm = z.output<typeof phoneFormSchema>;
export type CodeForm = z.output<typeof codeFormSchema>;
export type ProfileForm = z.output<typeof profileSchema>;
