import { RANGES_KEY } from "@/constants/state-keys";
import { findAllRanges } from "@/services/ranges.service";
import useSWR from "swr";

export const useRanges = () => {
  const { data } = useSWR(RANGES_KEY, findAllRanges);

  return { ranges: data };
};
