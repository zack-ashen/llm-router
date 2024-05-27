"use client";

import { toast } from "@/app/hooks/useToast/useToast";
import { GoogleLogo } from "@/assets";
import { useSignIn } from "@clerk/nextjs";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Divider from "../../Divider/Divider";
import { Button } from "../../Inputs/Button/Button";
import { Label } from "../../Inputs/Label/Label";
import { TextInput } from "../../Inputs/TextInput/TextInput";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../Base/Form/Form";
import FormHeader from "../Base/FormHeader/FormHeader";

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type SchemaT = z.infer<typeof schema>;

export default function SignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const form = useForm<SchemaT>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submit = async (data: SchemaT) => {
    setLoading(true);
    if (!isLoaded) return;

    await signIn
      .create({
        identifier: data.email,
        password: data.password,
      })
      .then((result) => {
        if (result.status === "complete") {
          setActive({
            session: result.createdSessionId,
            beforeEmit: () => {
              push("/auth/signin/register");
            },
          });
        } else {
          toast({
            title: "Uh oh!",
            description:
              "Something went wrong with signing in. Please try again.",
            variant: "error",
          });
          console.error(result);
        }
      })
      .catch((error) => {
        if (error.errors[0].code === "user_not_found") {
          form.setError("email", {
            type: "manual",
            message: "Invalid password or email",
          });
        } else if (error.errors[0].code === "invalid_password") {
          form.setError("password", {
            type: "manual",
            message: "Invalid password or email.",
          });
        } else if (error.errors[0].code === "strategy_for_user_invalid") {
          form.setError("email", {
            type: "manual",
            message: "Invalid sign in method. Try signing in with Google.",
          });
        } else {
          form.setError("password", {
            type: "manual",
            message: "Invalid password or email.",
          });
          console.error(error);
        }
      });
    setLoading(false);
  };

  const signInWithGoogle = () => {
    if (!isLoaded) return null;
    signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/auth/sso-callback",
      redirectUrlComplete: "/",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)}>
        <FormHeader
          title="Welcome back"
          subtitle="Enter your information to sign in."
          className="mb-5"
        />
        <div className="form-actions">
          <Button
            variant="secondary"
            width="full"
            onClick={signInWithGoogle}
            type="button"
          >
            <GoogleLogo className="mr-2 h-4 w-4" />
            Sign In with Google
          </Button>
        </div>
        <Divider className="my-5" />
        <div className="form-elements">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="email">Email</Label>
                <FormControl>
                  <TextInput type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="password">Password</Label>
                <FormControl>
                  <TextInput
                    type="password"
                    autoComplete="password"
                    placeholder="Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="form-actions w-full">
          <Button
            variant="primary"
            type="submit"
            width="full"
            loading={loading}
          >
            <EnvelopeClosedIcon className="mr-2 h-4 w-4" />
            Sign In with Email
          </Button>
        </div>
      </form>
    </Form>
  );
}
