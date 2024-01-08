import { TypeOf, object, string } from "zod";

export const samplingInputSchema = object({ id: string(), name: string() });
export type SamplingInput = TypeOf<typeof samplingInputSchema>;
