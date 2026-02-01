import { useRef, useState } from "react";
import { View, Text, Pressable } from "react-native";

export default function OddOneOut() {
  const [count, setCount] = useState(0);

  const rafID = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const DURATION = 3000;

  function animate(timestamp: number) {
    if (startTimeRef.current === null) {
      startTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;

    setCount((c) => c + 1);

    if (elapsed < DURATION) {
      rafID.current = requestAnimationFrame(animate);
    } else {
      stop();
    }
  }

  function start() {
    if (rafID.current) return;

    setCount(0);
    startTimeRef.current = null; // 🔴 important reset
    rafID.current = requestAnimationFrame(animate);
  }

  function stop() {
    if (rafID.current) {
      cancelAnimationFrame(rafID.current);
      rafID.current = null;
      startTimeRef.current = null;
      console.log("stopped after 3 seconds");
    }
  }

  return (
    <View>
      <Pressable onPress={start}>
        <Text>Button</Text>
      </Pressable>

      <Text>{count}</Text>
    </View>
  );
}
