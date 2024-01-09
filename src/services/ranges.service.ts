import { DATA } from "@/constants";
import { Range, rangeSchema } from "@/schemas/range.schema";

export const findAllRanges = async () => {
  const data = DATA.ranges;

  return await rangeSchema.array().parseAsync(data);
};

export const createRange = async (input: Omit<Range, "id">) => {
  const range = { ...input, id: Date.now().toString() };
  DATA.ranges.push(range);

  return range;
};
