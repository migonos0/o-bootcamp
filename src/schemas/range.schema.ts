import { TypeOf, boolean, number, object, string } from "zod";
import { samplingRange } from "./sampling-range.schema";

export const rangeSchema = object({
  id: string(),
  maximum: number(),
  minimum: number(),
  status: boolean(),
  samplingRanges: samplingRange.array(),
});
export type Range = TypeOf<typeof rangeSchema>;
