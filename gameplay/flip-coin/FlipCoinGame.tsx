import { useState, useEffect } from "react";
import { View, Text, Pressable, Image, StyleSheet } from "react-native";

import { frames } from "./assets";
import { COIN_FACE } from "./config";

import { usePreload } from "./usePreloadFrames";
import { useFlipSound } from "./useFlipSound";
import { useFlipAnimation } from "./useFlipAnimation";
import { useFlipStorage } from "./useFlipStorage";

type FlipStats = {
  heads: number;
  tails: number;
  lastResult: "HEADS" | "TAILS" | null;
  timestamp: number;
  row: number;
};

export default function FlipCoin() {
  const imgArr = frames;

  const [currentImg, setCurrentImg] = useState<number>(
    Math.random() >= 0.5 ? COIN_FACE.HEADS : COIN_FACE.TAILS
  );

  const { ready, onFrameLoad } = usePreload(imgArr.length);
  const { play } = useFlipSound();
  const { save, load } = useFlipStorage();

  const [count, setCount] = useState<FlipStats | null>(null);

  // Load stored stats on start
  useEffect(() => {
    const init = async () => {
      const existing = await load();

      if (existing) {
        setCount(existing);
      } else {
        const initial: FlipStats = {
          heads: 0,
          tails: 0,
          row: 0,
          lastResult: null,
          timestamp: Date.now(),
        };
        await save(initial);
        setCount(initial);
      }
    };
    init();
  }, []);

  async function handleAnimationFinish(finalIndex: number) {
    const result: "HEADS" | "TAILS" =
      finalIndex === COIN_FACE.HEADS ? "HEADS" : "TAILS";

    // Use current 'count' state to calculate the new streak
    const prevHeads = count?.heads ?? 0;
    const prevTails = count?.tails ?? 0;
    const prevResult = count?.lastResult;
    const prevRow = count?.row ?? 0;

    // Logic: If current result matches previous, increment row. Otherwise, start at 1.
    const updatedRow = result === prevResult ? prevRow + 1 : 1;

    const updated: FlipStats = {
      heads: result === "HEADS" ? prevHeads + 1 : prevHeads,
      tails: result === "TAILS" ? prevTails + 1 : prevTails,
      lastResult: result,
      row: updatedRow,
      timestamp: Date.now(),
    };

    // Save to storage and update UI
    await save(updated);
    setCount(updated);
  }

  const { start } = useFlipAnimation(
    imgArr.length,
    setCurrentImg,
    handleAnimationFinish
  );

  function onFlip() {
    play();
    start();
  }

  return (
    <View style={styles.container}>

      {imgArr.map((item, index) => (
        <Image
          key={index}
          source={item}
          style={styles.hiddenImage}
          onLoadEnd={onFrameLoad}
        />
      ))}

      {!ready ? (
        <Text>Loading...</Text>
      ) : (
        <>
          {count && (
            <View style={styles.statsContainer}>
              <Text style={styles.statsText}>
                Heads: {count.heads} | Tails: {count.tails}
              </Text>
              {count.row >= 2 && (
                <Text style={styles.streakText}>
                  In a row {count.lastResult} {count.row} 
                </Text>
              )}
            </View>
          )}

          <Pressable onPress={onFlip}>
            <Image
              source={imgArr[currentImg]}
              style={styles.coinImage}
            />
          </Pressable>

          <Pressable style={styles.button} onPress={onFlip}>
            <Text style={styles.buttonText}>FLIP</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  hiddenImage: {
    width: 0,
    height: 0,
    opacity: 0,
    position: "absolute",
  },
  statsContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  statsText: {
    fontSize: 18,
    color: "#333",
  },
  streakText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "blue",
    marginTop: 5,
  },
  coinImage: {
    width: 300,
    height: 300,
  },
  button: {
    borderRadius: 10,
    marginTop: 50,
    padding: 15,
    width: 200,
    backgroundColor: "blue",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "900",
    fontSize: 18,
  },
});