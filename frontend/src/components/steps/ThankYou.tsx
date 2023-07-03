import useFormWizard from "@/hooks/useFormWizard";
import { Button, Stack, Typography } from "@mui/material";

const ThankYou = () => {
  const { stepTo, resetFormData } = useFormWizard();

  const handleClose = () => {
    resetFormData();
    stepTo("start");
  };

  return (
    <Stack
      gap={2}
      pt={5}
      pb={2}
      alignItems={"center"}
      width={"100%"}
      justifyContent={"space-between"}
    >
      <Stack gap={2} alignItems={"center"} textAlign={"center"} width={"100%"}>
        <Typography variant="h1">תודה לך!</Typography>
        <Typography variant="body1">
          קיבלנו את הפרטים וניצור איתך קשר לאיסוף התרופות בהקדם
        </Typography>
      </Stack>
      <Button onClick={handleClose}>סיום</Button>
    </Stack>
  );
};

export default ThankYou;
