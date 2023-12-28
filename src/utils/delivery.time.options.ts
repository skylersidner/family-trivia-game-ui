import MESSAGE_OPTIONS from "./message.options";

const DELIVERY_TIME_OPTIONS = {
  MORNING: {
    label: "Morning (9:30am CST)",
    value: "MORNING",
  },
  AFTERNOON: {
    label: "Afternoon (1:00pm CST)",
    value: "AFTERNOON",
  },
  EVENING: {
    label: "Evening (6:00pm CST)",
    value: "EVENING",
  },
};

export const getDeliveryTimeOptionFromValue = (value: string) => {
  if (!value) return null;
  const keys = Object.keys(DELIVERY_TIME_OPTIONS);
  // @ts-ignore
  const key = keys.find((key) => DELIVERY_TIME_OPTIONS[key].value === value);
  // @ts-ignore
  return DELIVERY_TIME_OPTIONS[key];
};

export default DELIVERY_TIME_OPTIONS;
