import { TypeOf, number, object, string } from "zod";
import { samplingSchema } from "./sampling.schema";

export const samplingRange = object({
  id: string(),
  numberSamples: number(),
  sampling: samplingSchema,
});
export type SamplingRange = TypeOf<typeof samplingRange>;
