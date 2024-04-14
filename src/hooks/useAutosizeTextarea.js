import { useEffect } from "react";

const useAutosizeTextArea = (textAreaRef, maxHeight, value) => {
  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.style.height = "0px";
      const scrollHeight = Number(textAreaRef.scrollHeight);
      textAreaRef.style.height = Math.min(maxHeight, scrollHeight) + "px";
    }
  }, [textAreaRef, maxHeight, value]);
};

export default useAutosizeTextArea;
