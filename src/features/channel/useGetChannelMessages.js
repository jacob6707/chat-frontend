import { useInfiniteQuery } from "@tanstack/react-query";
import { getChannelMessages } from "../../services/apiChannel";
import { MESSAGE_LIMIT } from "../../util/constants";

export function useGetChannelMessages(cid) {
  // const {
  //   isPending: isLoadingMessages,
  //   data: messages,
  //   error,
  // } = useQuery({
  //   queryKey: ["channelMessages", cid],
  //   queryFn: () => getChannelMessages(cid),
  // });

  const {
    data: messages,
    isPending: isLoadingMessages,
    error,
    hasPreviousPage,
    fetchPreviousPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["channelMessages", cid],
    queryFn: ({ pageParam }) =>
      getChannelMessages(cid, pageParam, MESSAGE_LIMIT),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) =>
      lastPageParam > 1 ? lastPageParam - 1 : undefined,
    getPreviousPageParam: (lastPage, allPages, lastPageParam) =>
      lastPageParam < Math.ceil(lastPage.totalMessages / MESSAGE_LIMIT)
        ? lastPageParam + 1
        : undefined,
  });

  return {
    isLoadingMessages,
    messages,
    error,
    hasPreviousPage,
    fetchPreviousPage,
    isFetching,
  };
}
