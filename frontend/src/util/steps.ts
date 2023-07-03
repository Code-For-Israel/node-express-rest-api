import Home from "@/components/steps/Home";
import Quantity from "@/components/steps/Quantity";
import Names from "@/components/steps/Names";
import Cold from "@/components/steps/Cold";
import ThankYou from "@/components/steps/ThankYou";
import Details from "@/components/steps/Details";
import Map from "@/components/steps/Map";

import { FormStepType } from "FormTypes";

const steps: FormStepType[] = [
  {
    title: "תרומת תרופות",
    path: "start",
    showProgress: false,
    finalStep: false,
    component: Home,
  },
  {
    title: "כמות תרופות",
    path: "quantity",
    showProgress: true,
    finalStep: false,
    component: Quantity,
  },
  {
    title: "שמות תרופות",
    path: "names",
    showProgress: true,
    finalStep: false,
    component: Names,
  },
  {
    title: "אחסון בקירור",
    path: "cold-storage",
    showProgress: true,
    finalStep: false,
    component: Cold,
  },
  {
    title: "פרטי התורמ/ת",
    path: "details",
    showProgress: false,
    finalStep: true,
    component: Details,
  },
  {
    title: "אפשרויות מסירה",
    path: "map",
    showProgress: false,
    finalStep: true,
    component: Map,
  },
  {
    title: "",
    path: "thank-you",
    showProgress: false,
    finalStep: true,
    component: ThankYou,
  },
];

export default steps;
