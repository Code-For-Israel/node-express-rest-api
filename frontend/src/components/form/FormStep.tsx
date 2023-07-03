import FormHeader from "@/components/form/FormHeader";
import FormProgress from "@/components/form/FormProgress";
import useFormWizard from "@/hooks/useFormWizard";
import { Box } from "@mui/material";

const FormStep = () => {
  const { activeStep, getStepDetails, totalSteps } = useFormWizard();
  const { showProgress, component: Component } = getStepDetails(activeStep);

  return (
    <>
      <FormHeader />
      <Box
        sx={{
          bgcolor: "white",
          borderRadius: "32px 32px 0 0",
          width: "100%",
          height: "calc(100% - 115px)",
          position: "absolute",
          boxShadow: "inset 0px 3px 6px rgba(0, 0, 0, 0.20)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          bottom: 0,
          py: 3,
          px: 4,
          overflow: "hidden",
        }}
      >
        {showProgress && (
          <FormProgress progress={activeStep} totalSteps={totalSteps} />
        )}
        <Box
          sx={{
            pt: 4,
            display: "flex",
            width: "100%",
            flex: 1,
          }}
        >
          {Component && <Component />}
        </Box>
      </Box>
    </>
  );
};

export default FormStep;
