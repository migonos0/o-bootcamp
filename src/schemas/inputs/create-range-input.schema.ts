import { TypeOf, boolean, number, object, string } from "zod";
import { samplingInputRange } from "./sampling-range-input.schema";

export const createRangeInputSchema = object({
  maximum: number().min(1, { message: "Por favor ingrese un valor válido." }),
  minimum: number().min(1, { message: "Por favor ingrese un valor válido." }),
  status: boolean(),
  samplingRanges: samplingInputRange.array(),
});
export type CreateRangeInput = TypeOf<typeof createRangeInputSchema>;
