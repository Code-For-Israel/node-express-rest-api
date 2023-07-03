import useFormWizard from "@/hooks/useFormWizard";
import { Box, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import backArrow from "public/icons/backArrow.svg";

type Props = {};

const FormHeader = ({}: Props) => {
  const { activeStep, getStepDetails, stepBack } = useFormWizard();
  const { title, finalStep } = getStepDetails(activeStep);
  const hideArrow = activeStep === 0 || finalStep;

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        mt: 5,
        alignItems: "end",
        color: "white",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          left: 18,
          top: "50%",
          transform: "translateY(-50%)",
          display: hideArrow ? "none" : "block",
        }}
      >
        <IconButton disableRipple onClick={stepBack}>
          <Image src={backArrow} alt="חזרה" />
        </IconButton>
      </Box>
      <Typography variant="h3">{title}</Typography>
    </Box>
  );
};

export default FormHeader;
