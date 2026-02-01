// src/gameplay/flip-coin/useFlipAnimation.ts
import { useRef } from "react";
import { MIN_FPS, MAX_FPS, DURATION, STOP_INDEX } from "./config";


export function useFlipAnimation(
  frameCount: number,
  onFrameChange: (index: number) => void,
  onFinish: (finalIndex: number) => void
) {
  const anmRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef(0);
  const indexRef = useRef(0);
  const fpsRef = useRef(MIN_FPS);
  
  

  function animate(timestamp: number) {
    if (startTimeRef.current === null) {
      startTimeRef.current = timestamp;
      lastFrameTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / DURATION, 1);

    fpsRef.current =
      MIN_FPS + (MAX_FPS - MIN_FPS) * progress;

    const frameInterval = 1000 / fpsRef.current;
    let advanced = false;

    if (timestamp - lastFrameTimeRef.current >= frameInterval) {
      lastFrameTimeRef.current = timestamp;
      advanced = true;

      indexRef.current = (indexRef.current + 1) % frameCount;
      onFrameChange(indexRef.current);
    }

    if (
      advanced &&
      elapsed >= DURATION &&
      STOP_INDEX.includes(indexRef.current)
    ) {
      stop();
      onFinish(indexRef.current);
      return;
    }

    anmRef.current = requestAnimationFrame(animate);
  }

  function start() {
    if (anmRef.current) return;

    fpsRef.current = MIN_FPS;
    startTimeRef.current = null;
    lastFrameTimeRef.current = 0;

    anmRef.current = requestAnimationFrame(animate);
  }

  function stop() {
    if (anmRef.current) {
      cancelAnimationFrame(anmRef.current);
      anmRef.current = null;
      startTimeRef.current = null;
    }
  }

  return { start };
}
