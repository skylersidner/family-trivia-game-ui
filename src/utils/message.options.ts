const MESSAGE_OPTIONS = {
  SELF_AFFIRMATIONS: {
    label: "Self Affirmations (Most Common)",
    value: "self-affirmation",
  },
  IMPOSTER_SYNDROME: {
    label: "Imposter Syndrome",
    value: "imposter-syndrome",
  },
  HYPE: {
    label: "Get Me Hyped",
    value: "hyped",
  },
};

export const getMessageOptionFromValue = (value: string) => {
  if (!value) return null;
  const keys = Object.keys(MESSAGE_OPTIONS);
  // @ts-ignore
  const key = keys.find((key) => MESSAGE_OPTIONS[key].value === value);
  // @ts-ignore
  return MESSAGE_OPTIONS[key];
};

export default MESSAGE_OPTIONS;
