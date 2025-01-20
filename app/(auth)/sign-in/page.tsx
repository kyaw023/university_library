"use client";
import AuthForm from "@/components/AuthForm";
import { signInwithCredentials } from "@/lib/actions/auth";
import { signInSchema } from "@/lib/validations";
import React from "react";

const page = () => (
  <AuthForm
    type="sign-in"
    schema={signInSchema}
    defaultValues={{
      email : "",
      password: "",
    }}
    onSubmit={signInwithCredentials}
  />
);

export default page;
