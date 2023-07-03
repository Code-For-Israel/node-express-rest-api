import { Box } from "@mui/material";

type Props = { progress: number; totalSteps: number };

const FormProgress = ({ progress, totalSteps }: Props) => {
  const progressPercent = (progress / (totalSteps - 1)) * 100;

  return (
    <Box
      sx={{
        width: "100%",
        height: 10,
        bgcolor: "#E3E3E3",
        overflow: "hidden",
        position: "relative",
        borderRadius: 20,
        my: 2,
      }}
    >
      <Box
        sx={{
          transition: "width 0.5s ease-in-out",
          width: `${progressPercent}%`,
          position: "absolute",
          left: 0,
          height: 10,
          borderRadius: 20,
          bgcolor: "primary.main",
        }}
      />
    </Box>
  );
};

export default FormProgress;
