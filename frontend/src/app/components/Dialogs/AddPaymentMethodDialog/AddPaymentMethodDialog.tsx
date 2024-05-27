"use client";

import { toast } from "@/app/hooks/useToast/useToast";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Button } from "../../Inputs/Button/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../Base/Dialog";
import { getIntentSecret, getPaymentMethods } from "./actions";

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC!);

// Customize the appearance of Elements using the Appearance API.

const CheckoutPage = ({ clientSecret }: { clientSecret: string }) => (
  <Elements stripe={stripe} options={{ clientSecret }}>
    <CheckoutForm />
  </Elements>
);

export function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const { error } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: window.location.href,
      },
    });

    if (error) {
      // handle error
      toast({
        variant: "error",
        title: "Uh oh!",
        description: "There was an error saving your payment method.",
      });
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement
        options={{
          defaultValues: {
            billingDetails: {
              email: "foo@bar.com",
              name: "John Doe",
              phone: "888-888-8888",
            },
          },
        }}
      />
      <div className="form-actions flex flex-row gap-4 w-full justify-end">
        <DialogClose asChild>
          <Button variant={"secondary"}>Cancel</Button>
        </DialogClose>
        <Button variant={"primary"} type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
}

export default function AddPaymentMethodDialog() {
  const [secret, setSecret] = useState<string | null>();

  useEffect(() => {
    getIntentSecret().then((secret) => {
      setSecret(secret);
    });

    getPaymentMethods();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">
          Add payment method <FaPlus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div>
          <p className="text-lg font-medium">Add Payment Method</p>
          <p className="text-sm text-grey-600">
            Add your credit card details below. This card will be saved to your
            account and can be removed at any time.
          </p>
        </div>
        {secret && <CheckoutPage clientSecret={secret} />}
      </DialogContent>
    </Dialog>
  );
}
