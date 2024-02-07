import { startCase, camelCase } from "lodash";

export const snakeCaseToSentenceCase = (snakeCaseValue: string) => {
  return startCase(camelCase(snakeCaseValue));
};
