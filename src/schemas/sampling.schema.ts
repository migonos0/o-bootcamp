import { TypeOf, object, string } from "zod";

export const samplingSchema = object({ id: string(), name: string() });
export type Sampling = TypeOf<typeof samplingSchema>;
