export const buildSWRMutationFetcher = <T, U>(
  fetcher: (input: T) => U | Promise<U>
) => {
  const fetcher2 = async (_: unknown, { arg }: { arg: T }) => {
    return await fetcher(arg);
  };
  return fetcher2;
};
