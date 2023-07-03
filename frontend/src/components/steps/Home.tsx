import useFormWizard from "@/hooks/useFormWizard";
import { Button, Icon, Link, Stack, Typography } from "@mui/material";
import Image from "next/image";
import CheckIcon from "public/icons/check.svg";

const BENEFITS = [
  { text: <span>עוזרים להציל חיים</span> },
  { text: <span>תורמים לשמירה על איכות הסביבה</span> },
  {
    text: (
      <span>
        משתפים פעולה עם{" "}
        <Link
          color="primary"
          href="https://www.haverim.org.il/"
          target="_blank"
        >
          חברים לרפואה
        </Link>
      </span>
    ),
  },
];

const Home = () => {
  const { stepTo } = useFormWizard();
  const startForm = () => stepTo("quantity");

  return (
    <Stack
      gap={2}
      pt={5}
      pb={2}
      alignItems={"center"}
      width={"100%"}
      justifyContent={"space-between"}
    >
      <Stack gap={2} alignItems={"center"}>
        <Typography variant="h1">יש ברשותך תרופות שאינן בשימוש?</Typography>
        <Typography variant="body1">
          נשמח לקבל אותן ולהעביר למי שצריך!
        </Typography>
      </Stack>
      <Stack gap={2} flex="1" pt={10} width={"100%"}>
        {BENEFITS.map(({ text }, index) => (
          <Stack
            key={index}
            direction="row"
            gap={2}
            width={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
            position={"relative"}
          >
            <Icon
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image src={CheckIcon} alt="check" />
            </Icon>
            <Typography sx={{ flex: 1, display: "flex" }} variant="body1">
              {text}
            </Typography>
          </Stack>
        ))}
      </Stack>
      <span>
        *אסור לנו לקבל <Link>תרופות נרקוטיות</Link>
      </span>
      <Button sx={{ mt: 1 }} onClick={startForm}>
        רוצה לתרום
      </Button>
    </Stack>
  );
};

export default Home;
