import { RANGES_KEY } from "@/constants/state-keys";
import { createRange, findAllRanges } from "@/services/ranges.service";
import { buildSWRMutationFetcher } from "@/utilities/build-swr-mutation-fetcher";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { Range } from "../schemas/range.schema";

export const useRanges = () => {
  const { data } = useSWR(RANGES_KEY, findAllRanges);

  return { ranges: data };
};

export const useCreateRange = () => {
  const fetcher = buildSWRMutationFetcher(createRange);
  const { trigger } = useSWRMutation(RANGES_KEY, fetcher);

  return { createRangeTrigger: trigger };
};
