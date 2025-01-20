"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { ZodType } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";

import ImageUpload from "./ImageUpload";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface Props<T extends FieldValues> {
  type: "sign-in" | "sign-up";
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ error?: string; success: boolean }>;
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const router = useRouter();
  const isSignIn = type === "sign-in";

  const form: UseFormReturn<T> = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data: T) => {
    const result = await onSubmit(data);

    if (result.success) {
      toast({
        title: "Success",
        description: isSignIn
          ? "Logged in successfully"
          : "Account created successfully",
      });

      router.push("/");
    } else {
      toast({
        title: `${isSignIn ? "Sign in" : "Sign up"} failed`,
        description: result.error || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
        {isSignIn ? "Welcome back to BookWise" : "Create your library account"}
      </h1>
      <p className="text-light-100 ">
        {isSignIn
          ? "Access the vast collection of resources and stay updated"
          : "Please complete all fields and upload a valid university ID to gain access to the library"}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 w-full"
        >
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {field.name === "universityCard" ? (
                      <ImageUpload onFileChange={field.onChange} />
                    ) : (
                      <Input
                        required
                        type={
                          FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                        }
                        {...field}
                        className="form-input"
                      />
                    )}
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button type="submit" className="form-btn">
            {isSignIn ? "Sign in" : "Sign up"}
          </Button>
        </form>
      </Form>
      <p className="text-center text-base font-medium">
        {isSignIn ? "New to BookWise?" : "Already have an account?"}{" "}
        <Link
          className="text-primary font-bold"
          href={isSignIn ? "/sign-up" : "/sign-in"}
        >
          {isSignIn ? "Create an account" : "Sign in"}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
