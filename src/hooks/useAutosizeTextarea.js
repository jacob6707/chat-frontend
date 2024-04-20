import { useEffect } from "react";
import { MESSAGE_LENGTH_LIMIT } from "../util/constants";

const useAutosizeTextArea = (
  textAreaRef,
  maxHeight = MESSAGE_LENGTH_LIMIT * 24,
  value,
) => {
  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.style.height = "0px";
      const scrollHeight = Number(textAreaRef.scrollHeight);
      textAreaRef.style.height = Math.min(maxHeight, scrollHeight) + "px";
    }
  }, [textAreaRef, maxHeight, value]);
};

export default useAutosizeTextArea;
