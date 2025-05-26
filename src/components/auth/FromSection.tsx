import { Stack, Typography } from "@mui/material";
import TextField from "../shared/components/text-field";
import {
  UseFormRegister,
  FieldErrors,
  Path,
  FieldValues,
} from "react-hook-form";

interface FieldItem<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type?: string;
  placeholder?: string;
}

interface FormSectionProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  fields: readonly FieldItem<T>[];
}

export const FormSection = <T extends FieldValues>({
  register,
  errors,
  fields,
}: FormSectionProps<T>) => {
  return (
    <Stack width="100%" gap={4}>
      {fields.map(({ name, label, type, placeholder }) => (
        <Stack key={name} gap={2}>
          <Typography>{label}</Typography>
          <TextField.Input
            placeholder={placeholder}
            register={register(name)}
            errorMessage={errors?.[name]?.message as string | undefined}
            type={type}
          />
        </Stack>
      ))}
    </Stack>
  );
};
