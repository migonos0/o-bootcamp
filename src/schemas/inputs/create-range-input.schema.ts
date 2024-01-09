import { TypeOf, boolean, coerce, number, object, string } from "zod";
import { samplingInputRange } from "./sampling-range-input.schema";

export const createRangeInputSchema = object({
  maximum: coerce
    .number()
    .min(1, { message: "Por favor ingrese un valor válido." }),
  minimum: coerce
    .number()
    .min(1, { message: "Por favor ingrese un valor válido." }),
  status: boolean(),
  samplingRanges: samplingInputRange.array(),
});
export type CreateRangeInput = TypeOf<typeof createRangeInputSchema>;
