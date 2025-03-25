"use client";

import type { Root as LabelPrimiteRoot } from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
  type ComponentPropsWithRef,
  createContext,
  useContext,
  useId,
} from "react";
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form";

import { Label } from "~/client/components/Label";
import { cn } from "~/client/lib/utils";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formErrorMessageId: `${id}-form-item-error-message`,
    ...fieldState,
  };
};

// *************************************************
// *                  Form Item                    *
// *************************************************
type FormItemContextValue = {
  id: string;
};

const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

const FormItem = ({ className, ...props }: ComponentPropsWithRef<"div">) => {
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  );
};

// *************************************************
// *                  Form Label                   *
// *************************************************
const FormLabel = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof LabelPrimiteRoot>) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      className={cn(error && "text-(--error)", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
};

// *************************************************
// *                  Form Control                 *
// *************************************************
const FormControl = ({ ...props }: ComponentPropsWithRef<typeof Slot>) => {
  const { error, formItemId, formDescriptionId, formErrorMessageId } =
    useFormField();

  return (
    <Slot
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formErrorMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
};

// *************************************************
// *                  Form Description             *
// *************************************************
const FormDescription = ({
  className,
  ...props
}: ComponentPropsWithRef<"p">) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      id={formDescriptionId}
      className={cn("text-[0.8rem] text-(--muted)", className)}
      {...props}
    />
  );
};

// *************************************************
// *                  Form Message                 *
// *************************************************
const FormErrorMessage = ({
  className,
  children,
  ...props
}: ComponentPropsWithRef<"p">) => {
  const { error, formErrorMessageId } = useFormField();

  return (
    <p
      id={formErrorMessageId}
      className={cn("text-[0.8rem] font-medium text-(--error)", className)}
      role="alert"
      {...props}
    >
      {error?.message}
    </p>
  );
};

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormErrorMessage,
  FormField,
};
