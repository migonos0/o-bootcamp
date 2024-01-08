import { DATA } from "@/constants";
import { rangeSchema } from "@/schemas/range.schema";

export const findAllRanges = async () => {
  const data = DATA.ranges;

  return await rangeSchema.array().parseAsync(data);
};
