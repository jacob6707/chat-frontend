import { useQuery } from "@tanstack/react-query";
import { getChannel } from "../../services/apiChannel";

export function useGetChannel(cid) {
  const {
    isPending: isLoadingChannel,
    data: channel,
    error,
  } = useQuery({
    queryKey: ["channel", cid],
    queryFn: () => getChannel(cid),
  });

  return { isLoadingChannel, channel, error };
}
