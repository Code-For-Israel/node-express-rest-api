import { Box, ButtonBase, Chip, Stack, Typography } from "@mui/material";
import { PlaceType } from "PlaceTypes";

type Props = { place: PlaceType };

const PlacePreviewItem = ({ place }: Props) => {
  return (
    <Stack
      direction="row"
      component={ButtonBase}
      sx={{
        height: 65,
        py: 5,
        borderBottom: "1px solid #727272",
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
        textAlign: "left",
        position: "relative",
      }}
    >
      <Stack direction={"column"} flex={1} sx={{ width: "fit-content" }}>
        <Typography variant="h2">{place.name}</Typography>
        <Typography variant="body1">רח׳ {place.address}</Typography>
      </Stack>
      {place.hasCold && (
        <Chip
          size="small"
          sx={{
            fontSize: 12,
            bgcolor: "#E5EBFF",
            color: "primary.main",
            fontWeight: 600,
          }}
          color="primary"
          label="אחסון בקירור"
        />
      )}
    </Stack>
  );
};

export default PlacePreviewItem;
