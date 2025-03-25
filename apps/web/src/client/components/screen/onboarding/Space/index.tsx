"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import {
  type CreateSpaceClientInput,
  createSpaceClientSchema,
} from "~/common/schemas/space";

const Space = ({
  name,
  onClick,
}: { name: string; onClick: (value: CreateSpaceClientInput) => void }) => {
  const form = useForm<CreateSpaceClientInput>({
    resolver: zodResolver(createSpaceClientSchema),
    defaultValues: {
      name,
    },
  });

  return (
    <Form {...form}>
      <form
        className="flex flex-col flex-1 justify-center items-center px-5 space-y-7"
        onSubmit={form.handleSubmit(onClick)}
      >
        <h1 className="text-4xl text-center">
          What should we call your space?
        </h1>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="My Home"
                  autoFocus
                  className="h-12 placeholder:text-lg"
                  {...field}
                />
              </FormControl>
              <FormErrorMessage />
            </FormItem>
          )}
        />
        <div className="mt-15">
          <Button type="submit" variant="primary" size="lg">
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
};

export { Space };
