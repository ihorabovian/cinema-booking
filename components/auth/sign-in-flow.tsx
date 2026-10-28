"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import icon from "@/app/icon.svg";
import { FormField } from "@/components/booking/form-field";
import { Button } from "@/components/ui/button";
import { requestOtp, verifyOtp } from "@/lib/actions/auth";
import { maskPhone } from "@/lib/input-masks";
import {
  codeFormSchema,
  phoneFormSchema,
  type CodeForm,
  type PhoneForm,
} from "@/lib/schemas/auth";
import { cn } from "@/lib/utils";

const buttonClassName = "h-13 w-full rounded-full px-6";
// Phones leave more room above the buttons than desktop.
const formClassName = "flex flex-col gap-10 md:gap-6";

// Sign-in in two steps: the phone gets a one-time code by SMS, the code signs in.
export function SignInFlow({ returnTo }: { returnTo?: string }) {
  const [sent, setSent] = useState<SentCode>();
  const phone = sent?.phone;

  return (
    // The desktop design has no site header here, so the screen covers it. Next hides a
    // page it leaves instead of removing it, and a hidden page covers nothing.
    <main className="flex min-h-svh flex-col md:fixed md:inset-0 md:z-40 md:items-center md:justify-center md:gap-12 md:overflow-y-auto md:bg-background md:px-[120px] md:py-16">
      <Link href="/" className="hidden items-center gap-1 md:flex">
        <Image src={icon} alt="logo" width={24} height={24} />
        <span className="text-base leading-6 font-extrabold">CINEMA</span>
      </Link>

      <div className="flex w-full flex-col gap-4 md:w-70">
        <div className="flex h-14 items-center gap-4 px-4 md:h-auto md:gap-6 md:px-0">
          {phone && (
            <button type="button" aria-label="Back" onClick={() => setSent(undefined)}>
              <ChevronLeft className="size-6" />
            </button>
          )}
          <h1
            className={cn(
              "flex-1 text-2xl leading-8 font-bold",
              !phone && "md:text-center",
            )}
          >
            {phone ? "Verification code" : "Sign in"}
          </h1>
        </div>

        <div className="px-4 pt-6 md:px-0 md:pt-0">
          {sent ? (
            <CodeStep sent={sent} returnTo={returnTo} />
          ) : (
            <PhoneStep onCodeSent={setSent} />
          )}
        </div>
      </div>
    </main>
  );
}

// The phone the code went to, and how long to wait before asking for another, in ms.
type SentCode = { phone: string; retryDelay: number };

function PhoneStep({ onCodeSent }: { onCodeSent: (sent: SentCode) => void }) {
  const form = useForm<PhoneForm>({
    resolver: zodResolver(phoneFormSchema),
    defaultValues: { phone: "" },
  });

  async function submit({ phone }: PhoneForm) {
    const result = await requestOtp(phone);
    if (result.ok) {
      onCodeSent({ phone, retryDelay: result.retryDelay });
    } else {
      form.setError("phone", { message: result.error });
    }
  }

  return (
    <form noValidate onSubmit={form.handleSubmit(submit)} className={formClassName}>
      <div className="flex flex-col gap-4">
        <p className="text-base leading-6 font-medium">
          Enter your phone number to sign in to your profile
        </p>
        <FormField
          control={form.control}
          name="phone"
          label="Phone"
          required={false}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="(416) 555-0123"
          mask={maskPhone}
        />
      </div>
      <Button type="submit" disabled={form.formState.isSubmitting} className={buttonClassName}>
        Continue
      </Button>
    </form>
  );
}

function toSeconds(ms: number) {
  return Math.ceil(ms / 1000);
}

function CodeStep({ sent, returnTo }: { sent: SentCode; returnTo?: string }) {
  const { phone } = sent;
  const form = useForm<CodeForm>({
    resolver: zodResolver(codeFormSchema),
    defaultValues: { code: "" },
  });
  const [secondsLeft, setSecondsLeft] = useState(toSeconds(sent.retryDelay));
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setTimeout(() => setSecondsLeft((seconds) => seconds - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  async function submit({ code }: CodeForm) {
    // On success the action redirects, so only a failure comes back.
    const { error } = await verifyOtp(phone, code, returnTo);
    form.setError("code", { message: error });
  }

  async function resend() {
    setIsResending(true);
    const result = await requestOtp(phone);
    setIsResending(false);

    if (result.ok) {
      setSecondsLeft(toSeconds(result.retryDelay));
      form.clearErrors();
    } else {
      form.setError("code", { message: result.error });
    }
  }

  return (
    <form noValidate onSubmit={form.handleSubmit(submit)} className={formClassName}>
      <div className="flex flex-col gap-4">
        <p className="text-base leading-6 font-medium">
          We sent a verification code to <span className="whitespace-nowrap">{phone}</span>
        </p>
        <FormField
          control={form.control}
          name="code"
          label="Code"
          required={false}
          inputMode="numeric"
          autoComplete="one-time-code"
          placeholder="Verification code"
          mask={(value) => value.replace(/\D/g, "").slice(0, 6)}
        />
      </div>
      <div className="flex flex-col gap-4">
        <Button type="submit" disabled={form.formState.isSubmitting} className={buttonClassName}>
          Sign in
        </Button>
        {secondsLeft > 0 ? (
          <p className="flex h-13 items-center justify-center text-sm leading-5 font-medium">
            Resend the code in {secondsLeft} s
          </p>
        ) : (
          <Button
            type="button"
            variant="secondary"
            disabled={isResending}
            onClick={resend}
            className={buttonClassName}
          >
            Resend the code
          </Button>
        )}
      </div>
    </form>
  );
}
