import useFormWizard from "@/hooks/useFormWizard";
import { generatWALink } from "@/util/whatsapp";
import {
  Box,
  Button,
  Link,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { FormValuesType } from "FormTypes";
import { FieldValues, UseFormRegister, useForm } from "react-hook-form";

const Details = () => {
  const { stepTo, updateFormData } = useFormWizard();
  const link = generatWALink();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();

  const onSubmit = (data: FormValuesType) => {
    updateFormData(data);
    const waLink = generatWALink(123456789, `שם: דניאל כהן`);
    window.open(waLink, "_blank");
    stepTo("thank-you");
  };

  return (
    <Stack
      gap={2}
      pb={2}
      alignItems={"center"}
      width={"100%"}
      justifyContent={"space-between"}
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack gap={1} alignItems={"center"} textAlign={"center"}>
        <Typography variant="h1">מה הפרטים שלך?</Typography>
        <Typography variant="body1">
          כדי שנוכל לתאם לך ל שליח לאיסוף התרופות, נבקש לקבל את הפרטים שלך!
        </Typography>
      </Stack>
      <Stack gap={3} width={"100%"} flex={1} mt={2} px={0.5}>
        <FormField name="fullName" label="שם מלא" register={register} />
        <FormField name="town" label="יישוב" register={register} />
        <Box sx={{ display: "grid", gap: 3, gridTemplateColumns: "2fr 1fr" }}>
          <FormField name="street" label="רחוב" register={register} />
          <FormField
            name="street_number"
            label="מספר"
            register={register}
            type="number"
          />
        </Box>
      </Stack>
      <Stack gap={2} width={"100%"} textAlign={"center"}>
        <Button type="submit" disabled={!isValid}>
          אישור
        </Button>
        <Link color={"inherit"} href={link}>
          מסירת פרטים בוואטסאפ
        </Link>
      </Stack>
    </Stack>
  );
};

export default Details;

type FormFieldProps = {
  name: string;
  label: string;
  register: UseFormRegister<FieldValues>;
  type?: TextFieldProps["type"];
};
const FormField = ({
  name,
  label,
  register,
  type,
  ...rest
}: FormFieldProps) => {
  return (
    <TextField
      fullWidth
      variant="standard"
      type={type || "text"}
      label={label}
      {...rest}
      {...register(name, {
        required: true,
      })}
    />
  );
};
