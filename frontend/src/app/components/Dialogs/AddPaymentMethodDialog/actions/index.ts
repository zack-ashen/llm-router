"use server";

import paymentsService from "@/services/payments.service";
import userService from "@/services/user.service";

export async function getIntentSecret() {
  const uid = await userService.getUid();
  const user = await userService.get(uid);
  const intent = await paymentsService.setupIntent();
  return intent.client_secret;
}

export async function getPaymentMethods() {
  const uid = await userService.getUid();
  const user = await userService.get(uid);
  const methods = await paymentsService.getPaymentMethods();
}
