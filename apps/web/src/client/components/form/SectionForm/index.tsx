"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SectionType } from "@prisma/client";
import { useErrorBoundary } from "react-error-boundary";
import { Controller, useForm } from "react-hook-form";
import { LuLoader as Loader } from "react-icons/lu";
import { toast } from "sonner";

import { Button } from "~/client/components/Button";
import { Input } from "~/client/components/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/client/components/Select";
import {
  Form,
  FormControl,
  FormErrorMessage,
  FormField,
  FormItem,
  FormLabel,
} from "~/client/components/form";
import { formatPrismaEnum } from "~/client/lib/utils";
import {
  type CreateSectionClientInput,
  type SectionDTO,
  createSectionClientSchema,
} from "~/common/schemas/section";
import { type ApiResponse, isErrorResponse } from "~/lib/client/api";

type SectionFormProps = {};

const SectionForm = ({}: SectionFormProps) => {
  // const { showBoundary } = useErrorBoundary();
  const form = useForm<CreateSectionClientInput>({
    resolver: zodResolver(createSectionClientSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "",
    },
  });

  const onSubmit = async (data: CreateSectionClientInput) => {
    console.log(`DATA: `, data);
    // try {
    //   const response = await fetch("/api/pod", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ creatorId: userId, ...data }),
    //   });

    //   const result: ApiResponse<SectionDTO> = await response.json();

    //   if (isErrorResponse(result)) {
    //     toast.error(result.message);
    //   } else {
    //     router.push(`/pod/${result.data.id}`);
    //   }
    // } catch (err) {
    //   showBoundary(err);
    // }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col space-y-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="My Bedroom" {...field} />
                </FormControl>
                <FormErrorMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Section Type</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent className="h-40">
                      {Object.values(SectionType).map((sectionType) => (
                        <SelectItem key={sectionType} value={sectionType}>
                          {formatPrismaEnum(sectionType)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormErrorMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="2nd floor, first room to the right"
                  {...field}
                />
              </FormControl>
              <FormErrorMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && (
            <Loader className="animate-spin text-white" />
          )}
          Submit
        </Button>
      </form>
    </Form>
  );
};

export { SectionForm };
