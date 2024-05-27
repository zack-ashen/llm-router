"use client";

import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

// Load your publishable key
const stripePromise = loadStripe("your-publishable-key-here");

const AddPaymentMethod = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {};

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Save Payment Method
      </button>
      {error && <div>{error}</div>}
      {success && <div>Payment Method Saved Successfully</div>}
    </form>
  );
};

const WrappedAddPaymentMethod = () => (
  <Elements stripe={stripePromise}>
    <AddPaymentMethod />
  </Elements>
);

export default WrappedAddPaymentMethod;
