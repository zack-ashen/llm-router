"use client";

import { useSignUp, useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "../../Inputs/Button/Button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../../Inputs/InputOTP/InputOTP";
import { Label } from "../../Inputs/Label/Label";
import { Form, FormControl, FormField, FormMessage } from "../Base/Form/Form";
import FormItem from "../Base/FormItem/FormItem";
import { onboard } from "./actions";

const schema = z.object({
  code: z.string().length(6),
});

type VerifyEmailSchema = z.infer<typeof schema>;

export default function VerifyEmailForm() {
  const { push } = useRouter();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const { signUp, setActive, isLoaded } = useSignUp();
  const form = useForm<VerifyEmailSchema>({
    defaultValues: { code: "" },
    resolver: zodResolver(schema),
  });

  if (!isLoaded) return null;

  const submit = async (data: VerifyEmailSchema) => {
    setLoading(true);
    try {
      const attempt = await signUp.attemptEmailAddressVerification({
        code: data.code,
      });

      if (attempt.status === "complete") {
        await setActive({ session: attempt.createdSessionId });
        const userId = await onboard();
        if (!user) throw new Error("User not found");
        const userDetails = await user.reload();
        push("/dashboard");
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
    setLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)}>
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="code">Enter code</Label>
              <FormControl>
                <InputOTP
                  {...field}
                  maxLength={6}
                  render={({ slots }) => (
                    <>
                      <InputOTPGroup>
                        {slots.slice(0, 6).map((slot, index) => (
                          <InputOTPSlot key={index} {...slot} />
                        ))}
                      </InputOTPGroup>
                    </>
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="form-actions">
          <Button
            variant="primary"
            type="submit"
            width="full"
            loading={loading}
          >
            Verify Code
          </Button>
        </div>
      </form>
    </Form>
  );
}
