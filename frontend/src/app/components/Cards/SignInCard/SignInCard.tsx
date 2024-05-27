"use client";

import SignInForm from "../../Forms/SignInForm/SignInForm";
import { Card } from "../Base";

export default function SignInCard() {
  return (
    <Card
      className="w-96 p-12 sm:p-6 shadow-none border-0 sm:bg-white sm:shadow-sm sm:border sm:border-grey-200"
      withShadow
    >
      <SignInForm />
    </Card>
  );
}
