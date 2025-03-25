"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type z from "@repo/zod";
import { logInSchema } from "@repo/zod";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import { LuLoader as Loader } from "react-icons/lu";
import { toast } from "sonner";

import { Button } from "~/client/components/Button";
import { Input } from "~/client/components/Input";
import {
  Form,
  FormControl,
  FormErrorMessage,
  FormField,
  FormItem,
  FormLabel,
} from "~/client/components/form";
import { fetchApi } from "~/client/lib/api";

type LogInData = z.infer<typeof logInSchema>;

const LogInForm = () => {
  //const router = useRouter();
  const form = useForm<LogInData>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LogInData) => {
    try {
      const result = await fetchApi("/api/v1/auth/log-in", {
        method: "POST",
        body: data,
      });

      if (result.status === "error") {
        if (result.errors && result.errors.length > 0) {
          form.setFocus(result.errors[0].field as keyof LogInData);
          for (const { field, message } of result.errors) {
            form.setError(field as keyof LogInData, { message });
          }
        } else {
          toast.error(result.message);
        }

        return;
      }

      toast.success(result.message);
      // router.push("/onboarding");
    } catch (err) {
      // SENTRY
      console.error;
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col space-y-3 sm:w-sm"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john@email.com" type="email" {...field} />
              </FormControl>
              <FormErrorMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your password"
                  type="password"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    form.trigger("password");
                  }}
                />
              </FormControl>
              <FormErrorMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <>
              <Loader className="animate-spin text-white" />
              <span className="sr-only">Submitting...</span>
            </>
          ) : (
            "Log In"
          )}
        </Button>
      </form>
    </Form>
  );
};

export { LogInForm };
