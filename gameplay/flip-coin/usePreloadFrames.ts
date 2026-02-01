

import { useState, useRef } from "react";

export function usePreload(total: number){
  const loadRef = useRef(0);
  const [ready, setReady] = useState(false)

  function onFrameLoad(){
    loadRef.current += 1;
      if (loadRef.current >= total) {
      setReady(true);
    }
  }
  return {ready, onFrameLoad}
}