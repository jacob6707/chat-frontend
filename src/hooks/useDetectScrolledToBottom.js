import { useCallback, useEffect, useState } from "react";

export function useDetectScrolledToBottom(node) {
  const [isBottom, setIsBottom] = useState(false);
  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = node.current;
    if (scrollTop + clientHeight === scrollHeight) {
      setIsBottom(true);
    } else {
      setIsBottom(false);
    }
  }, [node]);
  useEffect(() => {
    if (node.current) {
      const el = node.current;
      el.addEventListener("scroll", handleScroll);
      return () => el.removeEventListener("scroll", handleScroll);
    }
  }, [node, handleScroll]);
  return { isBottom };
}
