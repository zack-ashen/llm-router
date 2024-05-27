import Stripe from "stripe";
import userService from "./user.service";

const stripe = new Stripe(process.env.STRIPE_SECRET!);

const paymentsService = {
  createCustomer: async (email: string) => {
    const customer = await stripe.customers.create({
      email,
    });
    return customer.id;
  },

  setupIntent: async () => {
    const uid = await userService.getUid();
    const user = await userService.get(uid);

    const setupIntent = await stripe.setupIntents.create({
      customer: user.stripeId,
      payment_method_types: ["card"],
    });

    return setupIntent;
  },

  getPaymentMethods: async () => {
    const uid = await userService.getUid();
    const user = await userService.get(uid);
    const paymentMethods = await stripe.paymentMethods.list({
      customer: user.stripeId,
      type: "card",
    });

    return paymentMethods;
  },
};

export default paymentsService;
