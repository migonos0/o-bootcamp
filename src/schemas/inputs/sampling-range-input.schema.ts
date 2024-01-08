import { TypeOf, number, object, string } from "zod";
import { samplingInputSchema } from "./sampling-input.schema";

export const samplingInputRange = object({
  id: string(),
  numberSamples: number(),
  sampling: samplingInputSchema,
});
export type SamplingInputRange = TypeOf<typeof samplingInputRange>;
