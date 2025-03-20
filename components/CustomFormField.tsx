import React from "react";
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";
import { authFormSchema } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = authFormSchema("sign-up");

interface CustomInputs {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
  type: string;
}

const CustomFormField = ({
  control,
  type = "",
  name,
  label,
  placeholder,
}: CustomInputs) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex flex-col gap-1.5">
          <FormLabel className="text-[14px] w-full max-w-[280px] font-medium text-gray-700">
            {label}
          </FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                {...field}
                type={type}
                placeholder={placeholder}
                className="text-16 placeholder:text-[16px] rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500"
              ></Input>
            </FormControl>
            <FormMessage className="text-[12px] text-red-500 mt-2"></FormMessage>
          </div>
        </div>
      )}
    />
  );
};

export default CustomFormField;
