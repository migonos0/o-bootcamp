import { TypeOf, boolean, number, object, string } from "zod";
import { samplingInputRange } from "./sampling-range-input.schema";

export const rangeInputSchema = object({
  id: string(),
  maximum: number(),
  minimum: number(),
  status: boolean(),
  samplingRanges: samplingInputRange.array(),
});
export type RangeInput = TypeOf<typeof rangeInputSchema>;
